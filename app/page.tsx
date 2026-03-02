import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { BentoGrid } from "@/components/bento-grid"
import { ActivationsSection } from "@/components/activations-section"

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <FeaturedProducts />
                <BentoGrid />
                <ActivationsSection />
            </main>
        </div>
    )
}
