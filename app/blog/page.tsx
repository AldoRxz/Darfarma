import { Header } from "@/components/header"
import { BlogListingSection } from "@/components/blog-listing-section"
import { Footer } from "@/components/footer"

export default function Blog() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <BlogListingSection />
            </main>
            <Footer />
        </div>
    )
}
