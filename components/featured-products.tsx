"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
    name: string
    description: string
    price: string
    image: string
    tag?: string
}

const products: Product[] = [
    {
        name: "Citrato de Magnesio",
        description:
            "Citrato de Magnesio puro sin excipientes. 240 cápsulas para relajación y recuperación muscular.",
        price: "$349.00",
        image: "/products/citrato.png",
        tag: "Más vendido",
    },
    {
        name: "Colágeno Hidrolizado",
        description:
            "Colágeno hidrolizado premium para piel, cabello, uñas y articulaciones saludables.",
        price: "$399.00",
        image: "/products/colageno.png",
    },
    {
        name: "Omega 3",
        description:
            "Ácidos grasos omega-3 de alta pureza para la salud cardiovascular y función cognitiva.",
        price: "$289.00",
        image: "/products/Omega 3.png",
    },
    {
        name: "Creatina Monohidratada",
        description:
            "Creatina monohidratada de grado farmacéutico para rendimiento y fuerza muscular.",
        price: "$329.00",
        image: "/products/Creatina-Monohidratada.png",
        tag: "Nuevo",
    },
    {
        name: "Colágeno + Glucosamina",
        description:
            "Fórmula avanzada de colágeno hidrolizado con glucosamina para articulaciones y movilidad.",
        price: "$449.00",
        image: "/products/Colágeno Hidrolizado + Glucosamina.png",
    },
    {
        name: "Magnesio Premium",
        description:
            "Suplemento alimenticio de Citrato de Magnesio en presentación premium de 240 cápsulas.",
        price: "$379.00",
        image: "/products/darfarma-magnesio.png",
    },
]

function ProductCard({ name, description, price, image, tag }: Product) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-muted/20">
                {tag && (
                    <div className="absolute top-2 left-2 z-20 bg-primary text-primary-foreground text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm">
                        {tag}
                    </div>
                )}
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain p-4 md:p-8 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col p-3 md:p-5">
                <h3 className="text-xs md:text-base font-bold tracking-tight text-card-foreground line-clamp-1">
                    {name}
                </h3>
                <p className="mt-1 flex-1 text-[11px] md:text-sm leading-relaxed text-muted-foreground line-clamp-2 hidden sm:block">
                    {description}
                </p>
                <div className="mt-2 md:mt-4 flex items-center justify-between">
                    <span className="text-sm md:text-lg font-bold text-foreground">{price}</span>
                    <button
                        className="inline-flex items-center gap-1 md:gap-2 rounded-lg bg-primary px-2 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-semibold text-primary-foreground transition-all hover:bg-[#6ab848]"
                        aria-label={`Agregar ${name} al carrito`}
                    >
                        <ShoppingCart className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        <span className="hidden sm:inline">Agregar</span>
                        <span className="sm:hidden">+</span>
                    </button>
                </div>
            </div>
        </article>
    )
}

function useVisibleCount() {
    const [count, setCount] = useState(4)

    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 640) setCount(2)
            else if (window.innerWidth < 1024) setCount(3)
            else setCount(4)
        }
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    return count
}

export function FeaturedProducts() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const visibleCount = useVisibleCount()

    const getVisibleProducts = useCallback(() => {
        const visible: { product: Product; index: number }[] = []
        for (let i = 0; i < visibleCount; i++) {
            const idx = (currentIndex + i) % products.length
            visible.push({ product: products[idx], index: idx })
        }
        return visible
    }, [currentIndex, visibleCount])

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length)
    }, [])

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    }, [])

    useEffect(() => {
        if (isPaused) return
        const interval = setInterval(next, 5000)
        return () => clearInterval(interval)
    }, [isPaused, next])

    const visibleProducts = getVisibleProducts()

    // Dynamic grid cols based on visible count
    const gridClass =
        visibleCount === 2
            ? "grid-cols-2"
            : visibleCount === 3
                ? "grid-cols-3"
                : "grid-cols-4"

    return (
        <section
            id="productos"
            className="bg-background py-12 md:py-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="mb-8 md:mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
                >
                    <div>
                        <span className="mb-2 md:mb-3 inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-primary">
                            Nuestra Colección
                        </span>
                        <h2 className="text-balance text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                            Productos Destacados
                        </h2>
                        <p className="mx-auto mt-3 md:mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
                            Cada producto está formulado con ingredientes naturales de primera
                            calidad para acercarte a tus metas de bienestar.
                        </p>
                    </div>
                </motion.div>

                {/* Product Grid */}
                <div className={`grid gap-3 md:gap-6 ${gridClass}`}>
                    <AnimatePresence mode="popLayout">
                        {visibleProducts.map(({ product, index }) => (
                            <motion.div
                                key={`${product.name}-${index}`}
                                layout
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.25, 0.4, 0.25, 1],
                                }}
                            >
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Progress dots */}
                <div className="mt-6 md:mt-8 flex items-center justify-center gap-1.5">
                    {products.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex
                                ? "w-6 bg-primary"
                                : "w-2 bg-border hover:bg-primary/40"
                                }`}
                            aria-label={`Ir a producto ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
