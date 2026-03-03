import { Header } from "@/components/header"
import { RefundPolicySection } from "@/components/refund-policy-section"
import { Footer } from "@/components/footer"

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
