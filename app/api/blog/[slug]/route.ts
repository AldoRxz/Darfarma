import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/blog/[slug] — Public: get single published blog post by slug
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: {
            author: { select: { name: true, image: true } },
        },
    })

    if (!post || !post.published) {
        return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ post })
}
