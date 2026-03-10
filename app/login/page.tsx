"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Email o contraseña incorrectos")
            } else {
                router.push("/perfil")
                router.refresh()
            }
        } catch {
            setError("Ocurrió un error. Intenta de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/perfil" })
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
                        <h1 className="text-2xl font-bold text-foreground mb-1">Iniciar Sesión</h1>
                        <p className="text-muted-foreground text-sm">Accede a tu cuenta Dar Farma</p>
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
                                    placeholder="••••••••"
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

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20"
                        >
                            {loading ? (
                                <span className="animate-pulse">Iniciando sesión...</span>
                            ) : (
                                <>
                                    Iniciar Sesión
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-muted-foreground text-xs">o continúa con</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Google */}
                    <motion.button
                        onClick={handleGoogleSignIn}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-muted/50 border border-border text-foreground font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-3 hover:bg-muted transition-colors"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </motion.button>

                    {/* Register link */}
                    <p className="text-center text-muted-foreground text-sm mt-6">
                        ¿No tienes cuenta?{" "}
                        <Link href="/registro" className="text-primary font-semibold hover:underline">
                            Crear cuenta
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
