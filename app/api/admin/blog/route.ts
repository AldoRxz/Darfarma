import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/blog — List all blog posts (admin)
export async function GET() {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true, email: true } } },
    })

    return NextResponse.json({ posts })
}

// POST /api/admin/blog — Create a new blog post
export async function POST(req: NextRequest) {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const body = await req.json()
    const { title, slug, excerpt, category, readTime, image, content, published } = body

    if (!title || !slug || !excerpt || !category) {
        return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (existing) {
        return NextResponse.json({ error: "El slug ya existe" }, { status: 409 })
    }

    const post = await prisma.blogPost.create({
        data: {
            title,
            slug,
            excerpt,
            category,
            readTime: readTime || "5 min",
            image: image || "",
            content: content || [],
            published: published ?? false,
            authorId: session.user.id,
        },
    })

    return NextResponse.json({ post }, { status: 201 })
}
