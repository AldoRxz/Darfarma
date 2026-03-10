"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Leaf, User, Mail, LogOut, ShoppingBag, MapPin, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function ProfilePage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-muted-foreground animate-pulse text-sm">Cargando perfil...</div>
            </div>
        )
    }

    if (!session?.user) return null

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" })
    }

    return (
        <div className="min-h-screen bg-background px-4 py-12">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Leaf className="h-7 w-7 text-primary" strokeWidth={2.5} />
                        <span className="text-xl font-bold text-foreground tracking-tight">Dar Farma</span>
                    </Link>
                    <Link href="/" className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        Inicio
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-foreground mb-8">Mi Perfil</h1>

                    {/* User info card */}
                    <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center">
                                {session.user.image ? (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name || "Avatar"}
                                        className="h-16 w-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="h-8 w-8 text-primary" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    {session.user.name || "Usuario"}
                                </h2>
                                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-0.5">
                                    <Mail className="h-3.5 w-3.5" />
                                    {session.user.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <Link href="/carrito">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
                            >
                                <ShoppingBag className="h-6 w-6 text-primary mb-3" />
                                <h3 className="text-foreground font-semibold text-sm">Mis Pedidos</h3>
                                <p className="text-muted-foreground text-xs mt-1">Ver historial de compras</p>
                            </motion.div>
                        </Link>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
                        >
                            <MapPin className="h-6 w-6 text-primary mb-3" />
                            <h3 className="text-foreground font-semibold text-sm">Direcciones</h3>
                            <p className="text-muted-foreground text-xs mt-1">Administrar direcciones de envío</p>
                        </motion.div>
                    </div>

                    {/* Logout */}
                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-card border border-border text-muted-foreground font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}
