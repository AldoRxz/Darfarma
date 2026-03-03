import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { LazyHomeSections } from "@/components/lazy-home-sections"
import { Footer } from "@/components/footer"
import { ProductJsonLd } from "@/components/json-ld"

const products = [
    {
        name: "Citrato de Magnesio",
        description:
            "Citrato de Magnesio puro sin excipientes. 240 cápsulas para relajación y recuperación muscular.",
        price: "349.00",
        image: "/products/citrato.png",
    },
    {
        name: "Colágeno Hidrolizado",
        description:
            "Colágeno hidrolizado premium para piel, cabello, uñas y articulaciones saludables.",
        price: "399.00",
        image: "/products/colageno.png",
    },
    {
        name: "Omega 3",
        description:
            "Ácidos grasos omega-3 de alta pureza para la salud cardiovascular y función cognitiva.",
        price: "289.00",
        image: "/products/Omega 3.png",
    },
    {
        name: "Creatina Monohidratada",
        description:
            "Creatina monohidratada de grado farmacéutico para rendimiento y fuerza muscular.",
        price: "329.00",
        image: "/products/Creatina-Monohidratada.png",
    },
    {
        name: "Colágeno + Glucosamina",
        description:
            "Fórmula avanzada de colágeno hidrolizado con glucosamina para articulaciones y movilidad.",
        price: "449.00",
        image: "/products/Colágeno Hidrolizado + Glucosamina.png",
    },
    {
        name: "Magnesio Premium",
        description:
            "Suplemento alimenticio de Citrato de Magnesio en presentación premium de 240 cápsulas.",
        price: "379.00",
        image: "/products/darfarma-magnesio.png",
    },
]

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <ProductJsonLd products={products} />
                <HeroSection />
                <FeaturedProducts />
                <LazyHomeSections />
            </main>
            <Footer />
        </div>
    )
}
