"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
    ShoppingCart,
    ArrowLeft,
    Minus,
    Plus,
    Truck,
    Shield,
    RotateCcw,
    ChevronRight,
    Check,
} from "lucide-react"
import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"
import { getProductBySlug, getRecommendedProducts } from "@/lib/products-data"

export default function ProductPage() {
    const params = useParams()
    const slug = params.slug as string
    const { addItem } = useCart()

    const product = getProductBySlug(slug)
    const recommended = product ? getRecommendedProducts(slug) : []

    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    const handleAddToCart = () => {
        if (!product) return

        addItem(
            {
                productId: product.id,
                variantId: product.variant.id,
                name: product.name,
                variantName: product.variant.name,
                price: product.price,
                image: product.image,
                slug: product.slug,
            },
            quantity
        )

        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-2">Producto no encontrado</h1>
                    <p className="text-muted-foreground mb-6">El producto que buscas no existe o fue eliminado.</p>
                    <Link
                        href="/productos"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-6 rounded-xl text-sm hover:brightness-110"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Ver Productos
                    </Link>
                </div>
            </div>
        )
    }

    const discount = product.compareAt
        ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
        : null

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Breadcrumb */}
            <div className="mx-auto max-w-[1400px] px-8 lg:px-12 py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href="/productos" className="hover:text-foreground transition-colors">Productos</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-foreground font-medium">{product.name}</span>
                </div>
            </div>

            {/* Product Detail */}
            <main className="mx-auto max-w-[1400px] px-8 lg:px-12 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Image */}
                        <div>
                            <div className="relative aspect-square bg-card rounded-2xl border border-border overflow-hidden mb-4 shadow-sm">
                                {product.tags.length > 0 && (
                                    <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        {product.tags[0]}
                                    </div>
                                )}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8 md:p-16"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                                {product.category.name}
                            </span>

                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-3xl font-bold text-foreground">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.compareAt && (
                                    <>
                                        <span className="text-lg text-muted-foreground line-through">
                                            ${product.compareAt.toFixed(2)}
                                        </span>
                                        <span className="bg-destructive/10 text-destructive text-xs font-bold px-2 py-0.5 rounded-full">
                                            -{discount}%
                                        </span>
                                    </>
                                )}
                            </div>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {product.description}
                            </p>

                            <div className="mb-4">
                                <span className="text-sm text-muted-foreground">
                                    Presentación: <strong className="text-foreground">{product.variant.name}</strong>
                                </span>
                            </div>

                            {/* Quantity + Add to cart */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-3 hover:bg-muted transition-colors"
                                    >
                                        <Minus className="h-4 w-4 text-foreground" />
                                    </button>
                                    <span className="px-4 py-3 text-sm font-bold text-foreground min-w-[40px] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-3 hover:bg-muted transition-colors"
                                    >
                                        <Plus className="h-4 w-4 text-foreground" />
                                    </button>
                                </div>

                                <motion.button
                                    onClick={handleAddToCart}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-1 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md ${added
                                        ? "bg-green-600 text-white shadow-green-600/20"
                                        : "bg-primary text-primary-foreground hover:brightness-110 shadow-primary/20"
                                        }`}
                                >
                                    {added ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            ¡Agregado al carrito!
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="h-4 w-4" />
                                            Agregar al Carrito
                                        </>
                                    )}
                                </motion.button>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col items-center text-center p-3 bg-card border border-border rounded-xl">
                                    <Truck className="h-5 w-5 text-primary mb-1.5" />
                                    <span className="text-[11px] font-medium text-foreground">Envío Gratis</span>
                                    <span className="text-[10px] text-muted-foreground">En compras +$599</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-3 bg-card border border-border rounded-xl">
                                    <Shield className="h-5 w-5 text-primary mb-1.5" />
                                    <span className="text-[11px] font-medium text-foreground">Pago Seguro</span>
                                    <span className="text-[10px] text-muted-foreground">SSL encriptado</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-3 bg-card border border-border rounded-xl">
                                    <RotateCcw className="h-5 w-5 text-primary mb-1.5" />
                                    <span className="text-[11px] font-medium text-foreground">Devoluciones</span>
                                    <span className="text-[10px] text-muted-foreground">30 días</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Products */}
                    {recommended.length > 0 && (
                        <section className="mt-16 md:mt-24">
                            <h2 className="text-2xl font-bold text-foreground mb-8">
                                También te puede interesar
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                {recommended.map((rec) => (
                                    <Link key={rec.id} href={`/productos/${rec.slug}`}>
                                        <motion.article
                                            whileHover={{ y: -4 }}
                                            className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
                                        >
                                            <div className="relative aspect-square overflow-hidden bg-muted/20">
                                                {rec.tags && rec.tags[0] && (
                                                    <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                                        {rec.tags[0]}
                                                    </div>
                                                )}
                                                <Image
                                                    src={rec.image}
                                                    alt={rec.name}
                                                    fill
                                                    className="object-contain p-4 md:p-8 transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 640px) 50vw, 25vw"
                                                />
                                            </div>
                                            <div className="p-3 md:p-4">
                                                <h3 className="text-xs md:text-sm font-bold text-foreground line-clamp-1">
                                                    {rec.name}
                                                </h3>
                                                <p className="text-sm md:text-base font-bold text-primary mt-1">
                                                    ${rec.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </motion.article>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </motion.div>
            </main>
        </div>
    )
}
