"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"

interface BlogPostData {
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    readTime: string
    image: string
    createdAt: string
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
        },
    },
}

const categoryColors: Record<string, string> = {
    Nutracéuticos: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Suplementos: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Bienestar: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Deporte: "bg-red-500/10 text-red-400 border-red-500/20",
    Salud: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    Nutrición: "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    return d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })
}

export function BlogListingSection() {
    const gridRef = useRef(null)
    const isInView = useInView(gridRef, { once: true, margin: "-50px" })
    const [posts, setPosts] = useState<BlogPostData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => setPosts(data.posts || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const featuredArticle = posts[0]
    const restArticles = posts.slice(1)

    return (
        <section className="relative py-20 md:py-28 bg-[#0e0e0e] overflow-hidden min-h-screen">
            {/* Grid bg */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(126,204,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(126,204,92,0.3) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
                    className="text-center mb-16"
                >
                    <motion.span
                        className="font-mono text-primary text-xs tracking-[0.3em] inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        CONOCIMIENTO Y BIENESTAR
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-7xl font-black text-white tracking-tighter mt-3 leading-[0.95]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const, delay: 0.2 }}
                    >
                        NUESTRO <span className="text-primary">BLOG</span>
                    </motion.h1>
                    <motion.p
                        className="text-white/50 font-mono text-xs max-w-2xl mx-auto mt-4 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Artículos sobre salud, nutrición y bienestar para ayudarte a tomar las mejores decisiones para tu cuerpo y mente.
                    </motion.p>
                </motion.div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* Empty state */}
                {!loading && posts.length === 0 && (
                    <div className="text-center py-20">
                        <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/40 font-mono text-sm">No hay artículos publicados aún</p>
                    </div>
                )}

                {/* Featured Article */}
                {featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mb-8"
                    >
                        <Link href={`/blog/${featuredArticle.slug}`} className="block group">
                            <motion.div
                                className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500"
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="relative w-full aspect-[21/9] overflow-hidden">
                                    <Image
                                        src={featuredArticle.image}
                                        alt={featuredArticle.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 1400px"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
                                </div>

                                <div className="relative z-10 p-8 md:p-10 -mt-20">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className={`font-mono text-[10px] tracking-widest px-3 py-1 rounded-full border ${categoryColors[featuredArticle.category] || "bg-primary/10 text-primary border-primary/20"}`}>
                                            {featuredArticle.category.toUpperCase()}
                                        </span>
                                        <span className="font-mono text-primary/40 text-[10px] tracking-widest">
                                            ARTÍCULO DESTACADO
                                        </span>
                                    </div>

                                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight group-hover:text-primary transition-colors duration-300 leading-tight">
                                        {featuredArticle.title}
                                    </h2>

                                    <p className="text-white/50 font-mono text-sm leading-relaxed mt-4 max-w-3xl">
                                        {featuredArticle.excerpt}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-6 mt-6">
                                        <div className="flex items-center gap-2 text-white/40">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <time dateTime={featuredArticle.createdAt} className="font-mono text-xs">{formatDate(featuredArticle.createdAt)}</time>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/40">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="font-mono text-xs">{featuredArticle.readTime} lectura</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-primary font-bold text-sm ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Leer artículo
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                )}

                {/* Article Grid */}
                {restArticles.length > 0 && (
                    <motion.div
                        ref={gridRef}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {restArticles.map((article) => (
                            <motion.div key={article.slug} variants={itemVariants}>
                                <Link href={`/blog/${article.slug}`} className="block group h-full">
                                    <motion.div
                                        className="h-full bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col relative"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <div className="relative w-full aspect-[16/9] overflow-hidden">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-transparent" />
                                        </div>

                                        <div className="relative z-10 p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className={`font-mono text-[10px] tracking-widest px-2.5 py-0.5 rounded-full border ${categoryColors[article.category] || "bg-primary/10 text-primary border-primary/20"}`}>
                                                    {article.category.toUpperCase()}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300 leading-snug flex-1">
                                                {article.title}
                                            </h3>

                                            <p className="text-white/40 font-mono text-xs leading-relaxed mt-3 line-clamp-3">
                                                {article.excerpt}
                                            </p>

                                            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/[0.06]">
                                                <div className="flex items-center gap-1.5 text-white/30">
                                                    <Calendar className="w-3 h-3" />
                                                    <time dateTime={article.createdAt} className="font-mono text-[11px]">{formatDate(article.createdAt)}</time>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-white/30">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="font-mono text-[11px]">{article.readTime}</span>
                                                </div>
                                                <ArrowRight className="w-3.5 h-3.5 text-primary ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Bottom message */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 text-white/25 font-mono text-xs">
                        <BookOpen className="w-3.5 h-3.5" />
                        Más artículos próximamente
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
