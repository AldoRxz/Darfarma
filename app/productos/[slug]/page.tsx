"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
    ShoppingCart,
    ArrowLeft,
    Minus,
    Plus,
    Star,
    Truck,
    Shield,
    RotateCcw,
    ChevronRight,
    Check,
} from "lucide-react"
import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"

interface Variant {
    id: string
    name: string
    sku: string
    price: string
    compareAt: string | null
    stock: number
    isDefault: boolean
}

interface ProductImage {
    id: string
    url: string
    alt: string | null
    position: number
}

interface ProductData {
    id: string
    name: string
    slug: string
    description: string
    shortDesc: string | null
    tags: string[]
    category: { name: string; slug: string } | null
    variants: Variant[]
    images: ProductImage[]
    reviews: {
        id: string
        rating: number
        title: string | null
        comment: string | null
        user: { name: string | null; image: string | null }
    }[]
}

interface RecommendedProduct {
    id: string
    name: string
    slug: string
    shortDesc: string | null
    tags: string[]
    variants: Variant[]
    images: ProductImage[]
}

export default function ProductPage() {
    const params = useParams()
    const slug = params.slug as string
    const { addItem } = useCart()

    const [product, setProduct] = useState<ProductData | null>(null)
    const [recommended, setRecommended] = useState<RecommendedProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/productos/${slug}`)
                if (!res.ok) {
                    setError("Producto no encontrado")
                    return
                }
                const data = await res.json()
                setProduct(data.product)
                setRecommended(data.recommended)
                setSelectedVariant(
                    data.product.variants.find((v: Variant) => v.isDefault) ||
                    data.product.variants[0]
                )
            } catch {
                setError("Error al cargar el producto")
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [slug])

    const handleAddToCart = () => {
        if (!product || !selectedVariant) return

        const productImage = product.images[0]?.url || `/products/${slug}.png`

        addItem(
            {
                productId: product.id,
                variantId: selectedVariant.id,
                name: product.name,
                variantName: selectedVariant.name,
                price: parseFloat(selectedVariant.price),
                image: productImage,
                slug: product.slug,
            },
            quantity
        )

        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-10 h-10">
                        <div className="absolute inset-0 rounded-full border-2 border-foreground/10" />
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
                    </div>
                    <span className="text-muted-foreground text-sm">Cargando producto...</span>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-2">Producto no encontrado</h1>
                    <p className="text-muted-foreground mb-6">El producto que buscas no existe o fue eliminado.</p>
                    <Link
                        href="/#productos"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-6 rounded-xl text-sm hover:brightness-110"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Ver Productos
                    </Link>
                </div>
            </div>
        )
    }

    const price = selectedVariant ? parseFloat(selectedVariant.price) : 0
    const compareAt = selectedVariant?.compareAt ? parseFloat(selectedVariant.compareAt) : null
    const discount = compareAt ? Math.round(((compareAt - price) / compareAt) * 100) : null
    const avgRating =
        product.reviews.length > 0
            ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
            : 0

    const productImages = product.images.length > 0
        ? product.images
        : [{ id: "fallback", url: `/products/${slug}.png`, alt: product.name, position: 0 }]

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Breadcrumb */}
            <div className="mx-auto max-w-[1400px] px-8 lg:px-12 py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href="/#productos" className="hover:text-foreground transition-colors">Productos</Link>
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
                        {/* Image Gallery */}
                        <div>
                            <div className="relative aspect-square bg-card rounded-2xl border border-border overflow-hidden mb-4 shadow-sm">
                                {product.tags.length > 0 && (
                                    <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        {product.tags[0]}
                                    </div>
                                )}
                                <Image
                                    src={productImages[selectedImage]?.url || productImages[0]?.url}
                                    alt={productImages[selectedImage]?.alt || product.name}
                                    fill
                                    className="object-contain p-8 md:p-16"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            {productImages.length > 1 && (
                                <div className="flex gap-3">
                                    {productImages.map((img, i) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setSelectedImage(i)}
                                            className={`relative w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${selectedImage === i
                                                ? "border-primary shadow-md"
                                                : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <Image
                                                src={img.url}
                                                alt={img.alt || product.name}
                                                fill
                                                className="object-contain p-2"
                                                sizes="80px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            {product.category && (
                                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                                    {product.category.name}
                                </span>
                            )}

                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                                {product.name}
                            </h1>

                            {product.reviews.length > 0 && (
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${star <= Math.round(avgRating)
                                                    ? "text-amber-400 fill-amber-400"
                                                    : "text-border"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        ({product.reviews.length} reseña{product.reviews.length !== 1 ? "s" : ""})
                                    </span>
                                </div>
                            )}

                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-3xl font-bold text-foreground">
                                    ${price.toFixed(2)}
                                </span>
                                {compareAt && (
                                    <>
                                        <span className="text-lg text-muted-foreground line-through">
                                            ${compareAt.toFixed(2)}
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

                            {product.variants.length > 1 && (
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-foreground mb-2">
                                        Presentación
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedVariant?.id === variant.id
                                                    ? "border-primary bg-primary/10 text-primary"
                                                    : "border-border hover:border-primary/50 text-foreground"
                                                    }`}
                                            >
                                                {variant.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

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
                                {recommended.map((rec) => {
                                    const recPrice = rec.variants[0]
                                        ? parseFloat(rec.variants[0].price)
                                        : 0
                                    const recImage = rec.images[0]?.url || `/products/${rec.slug}.png`
                                    return (
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
                                                        src={recImage}
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
                                                        ${recPrice.toFixed(2)}
                                                    </p>
                                                </div>
                                            </motion.article>
                                        </Link>
                                    )
                                })}
                            </div>
                        </section>
                    )}
                </motion.div>
            </main>
        </div>
    )
}
