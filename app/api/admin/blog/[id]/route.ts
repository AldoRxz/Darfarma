import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// PUT /api/admin/blog/[id] — Update a blog post
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()
    const { title, slug, excerpt, category, readTime, image, content, published } = body

    // Check slug uniqueness (excluding current post)
    if (slug) {
        const existing = await prisma.blogPost.findFirst({
            where: { slug, NOT: { id } },
        })
        if (existing) {
            return NextResponse.json({ error: "El slug ya existe" }, { status: 409 })
        }
    }

    const post = await prisma.blogPost.update({
        where: { id },
        data: {
            ...(title !== undefined && { title }),
            ...(slug !== undefined && { slug }),
            ...(excerpt !== undefined && { excerpt }),
            ...(category !== undefined && { category }),
            ...(readTime !== undefined && { readTime }),
            ...(image !== undefined && { image }),
            ...(content !== undefined && { content }),
            ...(published !== undefined && { published }),
        },
    })

    return NextResponse.json({ post })
}

// DELETE /api/admin/blog/[id] — Delete a blog post
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const { id } = await params

    await prisma.blogPost.delete({ where: { id } })

    return NextResponse.json({ success: true })
}
