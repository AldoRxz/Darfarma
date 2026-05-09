"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X, ShoppingCart, ChevronDown } from "lucide-react"
import { Header } from "@/components/header"
import { products, categories } from "@/lib/products-data"

const sortOptions = [
    { value: "featured", label: "Destacados" },
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
    { value: "name", label: "Nombre A-Z" },
]

export default function ProductsPage() {
    const [searchInput, setSearchInput] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [sort, setSort] = useState("featured")
    const [showFilters, setShowFilters] = useState(false)

    const filteredProducts = useMemo(() => {
        let result = [...products]

        // Search filter
        if (searchInput) {
            const q = searchInput.toLowerCase()
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.shortDesc.toLowerCase().includes(q) ||
                    p.category.name.toLowerCase().includes(q)
            )
        }

        // Category filter
        if (selectedCategory) {
            result = result.filter((p) => p.category.slug === selectedCategory)
        }

        // Sort
        switch (sort) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price)
                break
            case "price-desc":
                result.sort((a, b) => b.price - a.price)
                break
            case "name":
                result.sort((a, b) => a.name.localeCompare(b.name))
                break
            case "featured":
            default:
                result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
                break
        }

        return result
    }, [searchInput, selectedCategory, sort])

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50">
                <div className="mx-auto max-w-[1400px] px-8 lg:px-12 py-10 md:py-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                            Nuestros Productos
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-base max-w-lg">
                            Suplementos de grado farmacéutico formulados para tu bienestar.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-8 lg:px-12 py-8">
                {/* Search + Controls Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                        {searchInput && (
                            <button
                                onClick={() => setSearchInput("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                            >
                                <X className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="appearance-none w-full md:w-52 px-4 py-3 pr-10 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer transition-all"
                        >
                            {sortOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filtros
                    </button>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-56 flex-shrink-0`}>
                        <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
                            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                                <SlidersHorizontal className="h-4 w-4 text-primary" />
                                Categorías
                            </h3>
                            <div className="space-y-1">
                                <button
                                    onClick={() => setSelectedCategory("")}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-foreground hover:bg-muted"
                                        }`}
                                >
                                    Todos
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.slug}
                                        onClick={() =>
                                            setSelectedCategory(
                                                selectedCategory === cat.slug ? "" : cat.slug
                                            )
                                        }
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.slug
                                            ? "bg-primary/10 text-primary font-semibold"
                                            : "text-foreground hover:bg-muted"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Results count */}
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-muted-foreground">
                                {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
                                {searchInput && <span className="text-foreground"> para &quot;{searchInput}&quot;</span>}
                                {selectedCategory && (
                                    <span className="text-foreground"> en {categories.find(c => c.slug === selectedCategory)?.name}</span>
                                )}
                            </p>
                            {(searchInput || selectedCategory) && (
                                <button
                                    onClick={() => { setSearchInput(""); setSelectedCategory(""); }}
                                    className="text-xs text-primary hover:underline font-medium"
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    No se encontraron productos
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Intenta con otra búsqueda o cambia los filtros.
                                </p>
                                <button
                                    onClick={() => { setSearchInput(""); setSelectedCategory(""); }}
                                    className="text-sm text-primary hover:underline font-medium"
                                >
                                    Ver todos los productos
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                            >
                                {filteredProducts.map((product, i) => {
                                    const discount = product.compareAt
                                        ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
                                        : null

                                    return (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                        >
                                            <Link href={`/productos/${product.slug}`}>
                                                <article className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full cursor-pointer">
                                                    <div className="relative aspect-square overflow-hidden bg-muted/20">
                                                        {product.tags[0] && (
                                                            <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm">
                                                                {product.tags[0]}
                                                            </div>
                                                        )}
                                                        {discount && (
                                                            <div className="absolute top-2 right-2 z-10 bg-destructive/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                                                -{discount}%
                                                            </div>
                                                        )}
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain p-4 md:p-8 transition-transform duration-500 group-hover:scale-105"
                                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                        />
                                                    </div>
                                                    <div className="flex flex-1 flex-col p-3 md:p-5">
                                                        <span className="text-[10px] text-primary font-semibold uppercase tracking-wider mb-1">
                                                            {product.category.name}
                                                        </span>
                                                        <h3 className="text-xs md:text-base font-bold tracking-tight text-card-foreground line-clamp-1">
                                                            {product.name}
                                                        </h3>
                                                        <p className="mt-1 flex-1 text-[11px] md:text-sm leading-relaxed text-muted-foreground line-clamp-2 hidden sm:block">
                                                            {product.shortDesc}
                                                        </p>
                                                        <div className="mt-2 md:mt-4 flex items-center justify-between">
                                                            <div className="flex items-baseline gap-1.5">
                                                                <span className="text-sm md:text-lg font-bold text-foreground">
                                                                    ${product.price.toFixed(2)}
                                                                </span>
                                                                {product.compareAt && (
                                                                    <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                                                                        ${product.compareAt.toFixed(2)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span
                                                                className="inline-flex items-center gap-1 md:gap-2 rounded-lg bg-primary px-2 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-semibold text-primary-foreground transition-all hover:bg-[#6ab848]"
                                                                aria-label={`Ver ${product.name}`}
                                                            >
                                                                <ShoppingCart className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                                                <span className="hidden sm:inline">Ver más</span>
                                                                <span className="sm:hidden">+</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </article>
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
