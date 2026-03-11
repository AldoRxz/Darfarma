import { Header } from "@/components/header"
import { BlogArticleSection } from "@/components/blog-article-section"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { Footer } from "@/components/footer"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await prisma.blogPost.findUnique({
        where: { slug },
        select: { title: true, excerpt: true, slug: true },
    })

    if (!post) {
        return { title: "Artículo no encontrado" }
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: `${post.title} | Dar Farma`,
            description: post.excerpt,
            url: `https://darfarma.com/blog/${post.slug}`,
            type: "article",
            authors: ["Dar Farma"],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
        },
        alternates: {
            canonical: `https://darfarma.com/blog/${post.slug}`,
        },
    }
}

export default async function BlogArticlePage({ params }: Props) {
    const { slug } = await params
    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: { author: { select: { name: true, image: true } } },
    })

    if (!post || !post.published) {
        notFound()
    }

    // Transform to the format BlogArticleSection expects
    const article = {
        slug: post.slug,
        title: post.title,
        date: new Date(post.createdAt).toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }),
        dateISO: post.createdAt.toISOString(),
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
        image: post.image,
        content: post.content as { type: "paragraph" | "heading" | "subheading" | "list"; text?: string; items?: string[] }[],
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <BreadcrumbJsonLd
                    items={[
                        { name: "Inicio", href: "/" },
                        { name: "Blog", href: "/blog" },
                        { name: article.title, href: `/blog/${article.slug}` },
                    ]}
                />
                <BlogArticleSection article={article} />
            </main>
            <Footer />
        </div>
    )
}
