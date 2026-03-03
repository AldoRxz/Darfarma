"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { BlogArticle } from "@/lib/blog-data"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"

const categoryColors: Record<string, string> = {
    Nutracéuticos: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Suplementos: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Bienestar: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Deporte: "bg-red-500/10 text-red-400 border-red-500/20",
}

export function BlogArticleSection({ article }: { article: BlogArticle }) {
    return (
        <section className="relative bg-[#0e0e0e] overflow-hidden min-h-screen">
            {/* Hero Image */}
            <motion.div
                className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/30 to-transparent" />
            </motion.div>

            {/* Grid bg */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(126,204,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(126,204,92,0.3) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="max-w-[800px] mx-auto px-8 lg:px-12 relative z-10 -mt-16 md:-mt-24 pb-20">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-10"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-primary font-mono text-xs transition-colors group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        Volver al Blog
                    </Link>
                </motion.div>

                {/* Article Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                    className="mb-10"
                >
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span
                            className={`font-mono text-[10px] tracking-widest px-3 py-1 rounded-full border ${categoryColors[article.category] || "bg-primary/10 text-primary border-primary/20"}`}
                        >
                            {article.category.toUpperCase()}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.05]">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 mt-6 pb-8 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2 text-white/40">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={article.dateISO} className="font-mono text-xs">
                                {article.date}
                            </time>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-mono text-xs">
                                {article.readTime} lectura
                            </span>
                        </div>
                        <motion.button
                            className="flex items-center gap-2 text-white/30 hover:text-primary font-mono text-xs transition-colors ml-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: article.title,
                                        url: window.location.href,
                                    })
                                } else {
                                    navigator.clipboard.writeText(
                                        window.location.href
                                    )
                                }
                            }}
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            Compartir
                        </motion.button>
                    </div>
                </motion.div>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-5"
                >
                    {article.content.map((block, index) => {
                        if (block.type === "heading") {
                            return (
                                <motion.h2
                                    key={index}
                                    className="text-xl md:text-2xl font-bold text-white tracking-tight mt-8 mb-3"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {block.text}
                                </motion.h2>
                            )
                        }

                        if (block.type === "subheading") {
                            return (
                                <motion.h3
                                    key={index}
                                    className="text-lg font-bold text-white/90 tracking-tight mt-6 mb-2"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {block.text}
                                </motion.h3>
                            )
                        }

                        if (block.type === "list" && block.items) {
                            return (
                                <motion.ul
                                    key={index}
                                    className="space-y-3 my-4"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {block.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-white/60 font-mono text-sm leading-relaxed"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                                            {item}
                                        </li>
                                    ))}
                                </motion.ul>
                            )
                        }

                        return (
                            <motion.p
                                key={index}
                                className="text-white/60 font-mono text-sm leading-[1.8]"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                            >
                                {block.text}
                            </motion.p>
                        )
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-16 pt-8 border-t border-white/[0.08]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-white/30 font-mono text-xs">
                                ¿Te gustó este artículo?
                            </p>
                            <p className="text-white/50 font-mono text-xs mt-0.5">
                                Explora más contenido en nuestro blog
                            </p>
                        </div>
                        <Link href="/blog">
                            <motion.span
                                className="inline-flex items-center gap-2 bg-primary text-[#121212] px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide relative overflow-hidden group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                                    whileHover={{ x: "200%" }}
                                    transition={{ duration: 0.6 }}
                                />
                                <span className="relative z-10">
                                    Ver todos los artículos
                                </span>
                                <ArrowLeft className="w-3.5 h-3.5 relative z-10 rotate-180" />
                            </motion.span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
