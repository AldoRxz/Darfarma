import { Header } from "@/components/header"
import { BlogArticleSection } from "@/components/blog-article-section"
import { ArticleJsonLd } from "@/components/json-ld"
import { Footer } from "@/components/footer"
import { getArticleBySlug, getAllSlugs } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const article = getArticleBySlug(slug)

    if (!article) {
        return { title: "Artículo no encontrado" }
    }

    return {
        title: article.title,
        description: article.excerpt,
        openGraph: {
            title: `${article.title} | Dar Farma`,
            description: article.excerpt,
            url: `https://darfarma.com/blog/${article.slug}`,
            type: "article",
            publishedTime: article.date,
            authors: ["Dar Farma"],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
        },
        alternates: {
            canonical: `https://darfarma.com/blog/${article.slug}`,
        },
    }
}

export default async function BlogArticlePage({ params }: Props) {
    const { slug } = await params
    const article = getArticleBySlug(slug)

    if (!article) {
        notFound()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <ArticleJsonLd article={article} />
                <BlogArticleSection article={article} />
            </main>
            <Footer />
        </div>
    )
}
