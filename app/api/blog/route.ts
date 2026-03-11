import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/blog — Public: list published blog posts
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const category = searchParams.get("category")

        const where: Record<string, unknown> = { published: true }
        if (category) where.category = category

        const posts = await prisma.blogPost.findMany({
            where,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                slug: true,
                title: true,
                excerpt: true,
                category: true,
                readTime: true,
                image: true,
                published: true,
                createdAt: true,
            },
        })

        return NextResponse.json({ posts })
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        const stack = error instanceof Error ? error.stack : undefined
        console.error("Blog API error:", message, stack)
        return NextResponse.json(
            { posts: [], error: message, hasDbUrl: !!process.env.DATABASE_URL },
            { status: 500 }
        )
    }
}
