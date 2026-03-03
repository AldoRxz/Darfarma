import { Header } from "@/components/header"
import { PrivacyPolicySection } from "@/components/privacy-policy-section"
import { Footer } from "@/components/footer"

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
