import { Header } from "@/components/header"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contacto",
    description:
        "Contáctanos por WhatsApp, correo electrónico o formulario. Estamos para ayudarte con tus dudas sobre nuestros suplementos naturales.",
    openGraph: {
        title: "Contacto | Dar Farma",
        description:
            "Contáctanos por WhatsApp o correo electrónico. Estamos para ayudarte.",
        url: "https://darfarma.com/contacto",
    },
    alternates: {
        canonical: "https://darfarma.com/contacto",
    },
}

export default function Contacto() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <BreadcrumbJsonLd
                    items={[
                        { name: "Inicio", href: "/" },
                        { name: "Contacto", href: "/contacto" },
                    ]}
                />
                <ContactSection />
            </main>
            <Footer />
        </div>
    )
}
