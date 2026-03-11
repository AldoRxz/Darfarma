import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/dashboard — Dashboard stats (admin only)
export async function GET() {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    // Fetch all stats in parallel
    const [
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        recentOrders,
        recentUsers,
        ordersByStatus,
        topProducts,
    ] = await Promise.all([
        // Total users
        prisma.user.count(),

        // Total active products
        prisma.product.count({ where: { isActive: true } }),

        // Total orders
        prisma.order.count(),

        // Total revenue
        prisma.order.aggregate({
            _sum: { total: true },
            where: { status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } },
        }),

        // Recent orders (last 10)
        prisma.order.findMany({
            take: 10,
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true, email: true } },
                items: { select: { productName: true, quantity: true, totalPrice: true } },
            },
        }),

        // Recent users (last 5)
        prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        }),

        // Orders by status
        prisma.order.groupBy({
            by: ["status"],
            _count: true,
        }),

        // Top products by order count
        prisma.orderItem.groupBy({
            by: ["productName"],
            _sum: { quantity: true, totalPrice: true },
            orderBy: { _sum: { quantity: "desc" } },
            take: 5,
        }),
    ])

    return NextResponse.json({
        stats: {
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenue._sum.total ? Number(totalRevenue._sum.total) : 0,
        },
        recentOrders: recentOrders.map((o) => ({
            id: o.id,
            orderNumber: o.orderNumber,
            status: o.status,
            total: Number(o.total),
            user: o.user,
            itemCount: o.items.length,
            createdAt: o.createdAt,
        })),
        recentUsers,
        ordersByStatus: ordersByStatus.map((g) => ({
            status: g.status,
            count: g._count,
        })),
        topProducts: topProducts.map((p) => ({
            name: p.productName,
            totalQuantity: p._sum.quantity || 0,
            totalRevenue: p._sum.totalPrice ? Number(p._sum.totalPrice) : 0,
        })),
    })
}
