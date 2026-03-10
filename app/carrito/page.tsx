"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Trash2, Minus, Plus, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalItems, subtotal } = useCart()

    const shippingThreshold = 599
    const freeShipping = subtotal >= shippingThreshold
    const shippingCost = freeShipping ? 0 : 99
    const total = subtotal + shippingCost

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-8 md:py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Mi Carrito {totalItems > 0 && <span className="text-muted-foreground text-lg font-normal">({totalItems} {totalItems === 1 ? "producto" : "productos"})</span>}
                        </h1>
                        <Link href="/" className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1">
                            <ArrowLeft className="h-4 w-4" />
                            Seguir comprando
                        </Link>
                    </div>

                    {items.length === 0 ? (
                        /* Empty state */
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
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Cart items */}
                            <div className="lg:col-span-2 space-y-4">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.variantId}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="bg-card border border-border rounded-xl p-4 flex gap-4 shadow-sm"
                                    >
                                        {/* Image */}
                                        <Link href={`/productos/${item.slug}`} className="flex-shrink-0">
                                            <div className="relative w-24 h-24 md:w-28 md:h-28 bg-muted/20 rounded-lg overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain p-2"
                                                    sizes="112px"
                                                />
                                            </div>
                                        </Link>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                            <div>
                                                <Link href={`/productos/${item.slug}`}>
                                                    <h3 className="font-bold text-foreground text-sm md:text-base hover:text-primary transition-colors">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-xs text-muted-foreground mt-0.5">{item.variantName}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                {/* Quantity controls */}
                                                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                                        className="px-2 py-1.5 hover:bg-muted transition-colors"
                                                    >
                                                        <Minus className="h-3 w-3 text-foreground" />
                                                    </button>
                                                    <span className="px-3 py-1.5 text-xs font-bold text-foreground min-w-[30px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                        className="px-2 py-1.5 hover:bg-muted transition-colors"
                                                    >
                                                        <Plus className="h-3 w-3 text-foreground" />
                                                    </button>
                                                </div>

                                                {/* Price + Delete */}
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-foreground">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                    <button
                                                        onClick={() => removeItem(item.variantId)}
                                                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                                        aria-label={`Eliminar ${item.name}`}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Order summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-sm">
                                    <h3 className="text-lg font-bold text-foreground mb-4">Resumen del Pedido</h3>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="text-foreground">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Envío</span>
                                            {freeShipping ? (
                                                <span className="text-primary font-medium text-xs">¡Gratis!</span>
                                            ) : (
                                                <span className="text-foreground">${shippingCost.toFixed(2)}</span>
                                            )}
                                        </div>
                                        {!freeShipping && (
                                            <p className="text-xs text-muted-foreground">
                                                Te faltan <span className="font-semibold text-primary">${(shippingThreshold - subtotal).toFixed(2)}</span> para envío gratis
                                            </p>
                                        )}
                                        <div className="h-px bg-border" />
                                        <div className="flex justify-between">
                                            <span className="text-foreground font-bold">Total</span>
                                            <span className="text-primary font-bold text-lg">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl text-sm hover:brightness-110 transition-all shadow-md shadow-primary/20"
                                    >
                                        Proceder al Pago
                                    </motion.button>

                                    <p className="text-muted-foreground text-xs text-center mt-3">
                                        Envío gratis en compras mayores a $599
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
