import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Página no encontrada",
    description:
        "La página que buscas no existe o fue movida. Vuelve al inicio para explorar nuestros suplementos naturales.",
    robots: {
        index: false,
        follow: true,
    },
}

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center bg-[#0e0e0e]">
                <div className="text-center px-8 py-20">
                    <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-4">
                        ERROR 404
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-4">
                        Página no
                        <span className="text-primary block">encontrada</span>
                    </h1>
                    <p className="text-white/50 font-mono text-sm max-w-md mx-auto mt-6 leading-relaxed">
                        La página que buscas no existe o fue movida. Regresa al
                        inicio para explorar nuestros suplementos naturales.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/"
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
                        >
                            Volver al Inicio
                        </Link>
                        <Link
                            href="/blog"
                            className="border-2 border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:border-primary hover:text-primary transition-colors"
                        >
                            Ver Blog
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
