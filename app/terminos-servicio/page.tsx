import { Header } from "@/components/header"
import { TermsOfServiceSection } from "@/components/terms-of-service-section"
import { Footer } from "@/components/footer"

export default function TerminosServicio() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <TermsOfServiceSection />
            </main>
            <Footer />
        </div>
    )
}
