import { Header } from "@/components/header"
import { TermsOfServiceSection } from "@/components/terms-of-service-section"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Términos del Servicio",
    description:
        "Términos y condiciones de uso de Darfarma.com. Conoce las reglas y políticas que rigen el uso de nuestra plataforma de comercio electrónico.",
    openGraph: {
        title: "Términos del Servicio | Dar Farma",
        description:
            "Términos y condiciones de uso de Darfarma.com.",
        url: "https://darfarma.com/terminos-servicio",
    },
    alternates: {
        canonical: "https://darfarma.com/terminos-servicio",
    },
}

export default function TerminosServicio() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <BreadcrumbJsonLd
                    items={[
                        { name: "Inicio", href: "/" },
                        { name: "Términos del Servicio", href: "/terminos-servicio" },
                    ]}
                />
                <TermsOfServiceSection />
            </main>
            <Footer />
        </div>
    )
}
