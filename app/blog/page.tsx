import { Header } from "@/components/header"
import { BlogListingSection } from "@/components/blog-listing-section"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Artículos sobre salud, nutrición, suplementos y bienestar. Aprende sobre nutracéuticos, creatina, hábitos saludables y más con Dar Farma.",
    openGraph: {
        title: "Blog | Dar Farma",
        description:
            "Artículos sobre salud, nutrición, suplementos y bienestar por Dar Farma.",
        url: "https://darfarma.com/blog",
    },
    alternates: {
        canonical: "https://darfarma.com/blog",
    },
}

export default function Blog() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <BreadcrumbJsonLd
                    items={[
                        { name: "Inicio", href: "/" },
                        { name: "Blog", href: "/blog" },
                    ]}
                />
                <BlogListingSection />
            </main>
            <Footer />
        </div>
    )
}
