import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params

        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                variants: {
                    where: { isActive: true },
                    orderBy: { isDefault: "desc" },
                },
                images: {
                    orderBy: { position: "asc" },
                },
                reviews: {
                    where: { isVisible: true },
                    include: {
                        user: {
                            select: { name: true, image: true },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                    take: 5,
                },
            },
        })

        if (!product || !product.isActive) {
            return NextResponse.json(
                { error: "Producto no encontrado" },
                { status: 404 }
            )
        }

        // Get recommended products (same category, exclude current)
        const recommended = await prisma.product.findMany({
            where: {
                isActive: true,
                id: { not: product.id },
                ...(product.categoryId ? { categoryId: product.categoryId } : {}),
            },
            include: {
                variants: {
                    where: { isDefault: true },
                    take: 1,
                },
                images: {
                    take: 1,
                    orderBy: { position: "asc" },
                },
            },
            take: 4,
        })

        // If not enough recommendations from same category, fill with other products
        if (recommended.length < 4) {
            const moreProducts = await prisma.product.findMany({
                where: {
                    isActive: true,
                    id: {
                        notIn: [product.id, ...recommended.map((p) => p.id)],
                    },
                },
                include: {
                    variants: {
                        where: { isDefault: true },
                        take: 1,
                    },
                    images: {
                        take: 1,
                        orderBy: { position: "asc" },
                    },
                },
                take: 4 - recommended.length,
            })
            recommended.push(...moreProducts)
        }

        return NextResponse.json({ product, recommended })
    } catch (error) {
        console.error("Product fetch error:", error)
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
