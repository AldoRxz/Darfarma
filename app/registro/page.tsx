"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Leaf, Mail, Lock, Eye, EyeOff, UserPlus, User } from "lucide-react"
import { motion } from "framer-motion"

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Error al crear la cuenta")
            } else {
                router.push("/login?registered=true")
            }
        } catch {
            setError("Ocurrió un error. Intenta de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <Leaf className="h-8 w-8 text-primary" strokeWidth={2.5} />
                    <span className="text-2xl font-bold text-foreground tracking-tight">Dar Farma</span>
                </Link>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg shadow-black/5">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-foreground mb-1">Crear Cuenta</h1>
                        <p className="text-muted-foreground text-sm">Únete a la familia Dar Farma</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-3 text-sm mb-4"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1.5">
                                Nombre completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Tu nombre"
                                    required
                                    className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1.5">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-1.5">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mínimo 6 caracteres"
                                    required
                                    className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-12 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground/80 mb-1.5">
                                Confirmar contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repite tu contraseña"
                                    required
                                    className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20"
                        >
                            {loading ? (
                                <span className="animate-pulse">Creando cuenta...</span>
                            ) : (
                                <>
                                    Crear Cuenta
                                    <UserPlus className="h-4 w-4" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Login link */}
                    <p className="text-center text-muted-foreground text-sm mt-6">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-primary font-semibold hover:underline">
                            Iniciar sesión
                        </Link>
                    </p>
                </div>

                {/* Back home */}
                <p className="text-center mt-6">
                    <Link href="/" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
                        ← Volver al inicio
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
