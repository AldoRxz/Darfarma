"use client"

import Link from "next/link"
import { Leaf, ShoppingCart, ArrowLeft, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

export default function CartPage() {
    return (
        <div className="min-h-screen bg-background px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Leaf className="h-7 w-7 text-primary" strokeWidth={2.5} />
                        <span className="text-xl font-bold text-foreground tracking-tight">Dar Farma</span>
                    </Link>
                    <Link href="/" className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        Seguir comprando
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                        <ShoppingCart className="h-7 w-7 text-primary" />
                        Mi Carrito
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cart items area */}
                        <div className="lg:col-span-2">
                            {/* Empty state */}
                            <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                                </motion.div>
                                <h2 className="text-xl font-bold text-foreground mb-2">Tu carrito está vacío</h2>
                                <p className="text-muted-foreground text-sm mb-6">
                                    Explora nuestros productos y encuentra los suplementos perfectos para ti.
                                </p>
                                <Link href="/#productos">
                                    <motion.span
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-6 rounded-xl text-sm hover:brightness-110 transition-all shadow-md shadow-primary/20"
                                    >
                                        Ver Productos
                                        <ShoppingBag className="h-4 w-4" />
                                    </motion.span>
                                </Link>
                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-sm">
                                <h3 className="text-lg font-bold text-foreground mb-4">Resumen del Pedido</h3>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="text-foreground">$0.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Envío</span>
                                        <span className="text-muted-foreground text-xs">Por calcular</span>
                                    </div>
                                    <div className="h-px bg-border" />
                                    <div className="flex justify-between">
                                        <span className="text-foreground font-bold">Total</span>
                                        <span className="text-primary font-bold text-lg">$0.00</span>
                                    </div>
                                </div>

                                <motion.button
                                    disabled
                                    className="w-full bg-primary/30 text-primary-foreground/50 font-bold py-3 rounded-xl text-sm cursor-not-allowed"
                                >
                                    Proceder al Pago
                                </motion.button>

                                <p className="text-muted-foreground text-xs text-center mt-3">
                                    Envío gratis en compras mayores a $599
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
