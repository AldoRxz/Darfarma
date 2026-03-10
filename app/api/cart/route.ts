import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/cart — Get cart items for current user
export async function GET() {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ items: [] })
    }

    const cartItems = await prisma.cartItem.findMany({
        where: { userId: session.user.id },
        include: {
            variant: {
                include: {
                    product: {
                        include: {
                            images: {
                                take: 1,
                                orderBy: { position: "asc" },
                            },
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    })

    const items = cartItems.map((item) => ({
        id: item.id,
        variantId: item.variant.id,
        productId: item.variant.product.id,
        name: item.variant.product.name,
        slug: item.variant.product.slug,
        variantName: item.variant.name,
        price: Number(item.variant.price),
        image: item.variant.product.images[0]?.url || `/products/${item.variant.product.slug}.png`,
        quantity: item.quantity,
    }))

    return NextResponse.json({ items })
}

// POST /api/cart — Add item to cart
export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Inicia sesión para agregar al carrito" }, { status: 401 })
    }

    const { variantId, quantity = 1 } = await req.json()

    if (!variantId) {
        return NextResponse.json({ error: "variantId es requerido" }, { status: 400 })
    }

    // Upsert: if item exists, increment quantity; otherwise create
    const cartItem = await prisma.cartItem.upsert({
        where: {
            userId_variantId: {
                userId: session.user.id,
                variantId,
            },
        },
        update: {
            quantity: { increment: quantity },
        },
        create: {
            userId: session.user.id,
            variantId,
            quantity,
        },
        include: {
            variant: {
                include: {
                    product: {
                        include: {
                            images: {
                                take: 1,
                                orderBy: { position: "asc" },
                            },
                        },
                    },
                },
            },
        },
    })

    return NextResponse.json({
        item: {
            id: cartItem.id,
            variantId: cartItem.variant.id,
            productId: cartItem.variant.product.id,
            name: cartItem.variant.product.name,
            slug: cartItem.variant.product.slug,
            variantName: cartItem.variant.name,
            price: Number(cartItem.variant.price),
            image: cartItem.variant.product.images[0]?.url || `/products/${cartItem.variant.product.slug}.png`,
            quantity: cartItem.quantity,
        },
    })
}

// PUT /api/cart — Update item quantity
export async function PUT(req: Request) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { variantId, quantity } = await req.json()

    if (!variantId || typeof quantity !== "number") {
        return NextResponse.json({ error: "variantId y quantity son requeridos" }, { status: 400 })
    }

    if (quantity <= 0) {
        // Remove the item
        await prisma.cartItem.deleteMany({
            where: { userId: session.user.id, variantId },
        })
        return NextResponse.json({ deleted: true })
    }

    await prisma.cartItem.update({
        where: {
            userId_variantId: {
                userId: session.user.id,
                variantId,
            },
        },
        data: { quantity },
    })

    return NextResponse.json({ success: true })
}

// DELETE /api/cart — Remove item from cart
export async function DELETE(req: Request) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { variantId } = await req.json()

    if (!variantId) {
        return NextResponse.json({ error: "variantId es requerido" }, { status: 400 })
    }

    await prisma.cartItem.deleteMany({
        where: { userId: session.user.id, variantId },
    })

    return NextResponse.json({ deleted: true })
}
