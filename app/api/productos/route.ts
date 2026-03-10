import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/productos — List all products with optional search and category filter
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const sort = searchParams.get("sort") || "featured"

    // Build where clause
    const where: Record<string, unknown> = { isActive: true }

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { shortDesc: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
        ]
    }

    if (category) {
        where.category = { slug: category }
    }

    // Build orderBy
    let orderBy: Record<string, string> = { createdAt: "desc" }
    if (sort === "price-asc") orderBy = { name: "asc" } // will sort after fetch
    if (sort === "price-desc") orderBy = { name: "desc" }
    if (sort === "name") orderBy = { name: "asc" }
    if (sort === "newest") orderBy = { createdAt: "desc" }
    if (sort === "featured") orderBy = { isFeatured: "desc" }

    const products = await prisma.product.findMany({
        where,
        include: {
            category: { select: { name: true, slug: true } },
            variants: {
                where: { isActive: true },
                orderBy: { isDefault: "desc" },
                take: 1,
            },
            images: {
                orderBy: { position: "asc" },
                take: 1,
            },
        },
        orderBy,
    })

    // Get all categories for the filter
    const categories = await prisma.category.findMany({
        orderBy: { position: "asc" },
        select: { name: true, slug: true },
    })

    // Map to response format
    const items = products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        shortDesc: p.shortDesc,
        tags: p.tags,
        category: p.category,
        price: p.variants[0] ? Number(p.variants[0].price) : 0,
        compareAt: p.variants[0]?.compareAt ? Number(p.variants[0].compareAt) : null,
        image: p.images[0]?.url || `/products/${p.slug}.png`,
        isFeatured: p.isFeatured,
    }))

    // Sort by price if requested (since Prisma can't sort by variant price directly)
    if (sort === "price-asc") items.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") items.sort((a, b) => b.price - a.price)

    return NextResponse.json({ products: items, categories })
}
