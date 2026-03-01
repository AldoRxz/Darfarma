import { Header } from "@/components/header"

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center px-6">
                    <h1 className="text-4xl font-bold text-foreground mb-4">
                        Bienvenido a Dar Farma
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Suplementos naturales premium para tu bienestar.
                    </p>
                </div>
            </main>
        </div>
    )
}
