import { Header } from "@/components/header"
import { AboutUsSection } from "@/components/about-us-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sobre Nosotros",
    description:
        "Conoce DARFARMA, empresa orgullosamente mexicana que elabora suplementos naturales y nutracéuticos con los más altos estándares de calidad para tu bienestar.",
    openGraph: {
        title: "Sobre Nosotros | Dar Farma",
        description:
            "Conoce DARFARMA, empresa orgullosamente mexicana que elabora suplementos naturales con los más altos estándares de calidad.",
        url: "https://darfarma.com/sobre-nosotros",
    },
    alternates: {
        canonical: "https://darfarma.com/sobre-nosotros",
    },
}

export default function SobreNosotros() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <AboutUsSection />
            </main>
            <Footer />
        </div>
    )
}
