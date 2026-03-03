import { Header } from "@/components/header"
import { PrivacyPolicySection } from "@/components/privacy-policy-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Política de Privacidad",
    description:
        "Conoce cómo Darfarma.com recopila, utiliza y protege tu información personal. Política de privacidad y protección de datos.",
    openGraph: {
        title: "Política de Privacidad | Dar Farma",
        description:
            "Política de privacidad y protección de datos de Darfarma.com.",
        url: "https://darfarma.com/politica-privacidad",
    },
    alternates: {
        canonical: "https://darfarma.com/politica-privacidad",
    },
}

export default function PoliticaPrivacidad() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <PrivacyPolicySection />
            </main>
            <Footer />
        </div>
    )
}
