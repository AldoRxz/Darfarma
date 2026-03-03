import { Header } from "@/components/header"
import { RefundPolicySection } from "@/components/refund-policy-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Política de Reembolso",
    description:
        "Política de devoluciones y reembolsos de Darfarma.com. Conoce los pasos y condiciones para procesar una devolución dentro de los 30 días.",
    openGraph: {
        title: "Política de Reembolso | Dar Farma",
        description:
            "Política de devoluciones y reembolsos de Darfarma.com.",
        url: "https://darfarma.com/politica-rembolso",
    },
    alternates: {
        canonical: "https://darfarma.com/politica-rembolso",
    },
}

export default function PoliticaRembolso() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <RefundPolicySection />
            </main>
            <Footer />
        </div>
    )
}
