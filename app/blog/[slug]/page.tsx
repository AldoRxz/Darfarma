import { Header } from "@/components/header"
import { BlogArticleSection } from "@/components/blog-article-section"
import { Footer } from "@/components/footer"
import { getArticleBySlug, getAllSlugs } from "@/lib/blog-data"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }))
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
                <BlogArticleSection article={article} />
            </main>
            <Footer />
        </div>
    )
}
