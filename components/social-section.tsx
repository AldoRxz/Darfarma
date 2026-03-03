"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Instagram } from "lucide-react"

const instagramPosts = [
    { image: "https://www.instagram.com/p/DNHKBirzW3p/media/?size=l", link: "https://www.instagram.com/p/DNHKBirzW3p/", likes: "2.4k" },
    { image: "https://www.instagram.com/p/DMiWmrepmWW/media/?size=l", link: "https://www.instagram.com/p/DMiWmrepmWW/", likes: "1.8k" },
    { image: "https://www.instagram.com/p/DMaoAF1ibsW/media/?size=l", link: "https://www.instagram.com/p/DMaoAF1ibsW/", likes: "3.2k" },
    { image: "https://www.instagram.com/p/DMS6LBHtN8n/media/?size=l", link: "https://www.instagram.com/p/DMS6LBHtN8n/", likes: "956" },
    { image: "https://www.instagram.com/p/DMLLVU_MSWZ/media/?size=l", link: "https://www.instagram.com/p/DMLLVU_MSWZ/", likes: "1.5k" },
    { image: "https://www.instagram.com/p/DMGCM4JtA2s/media/?size=l", link: "https://www.instagram.com/p/DMGCM4JtA2s/", likes: "2.1k" },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.15,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
        },
    },
}

export function SocialSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <section aria-label="Redes sociales" className="relative py-16 bg-[#121212] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
                    className="text-center mb-10"
                >
                    <motion.span
                        className="font-mono text-primary text-xs tracking-widest inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        SÍGUENOS EN INSTAGRAM
                    </motion.span>
                    <motion.h2
                        className="text-3xl md:text-5xl font-black text-white tracking-tighter mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const, delay: 0.2 }}
                    >
                        @DARFARMA<span className="text-primary">OFICIAL</span>
                    </motion.h2>
                </motion.div>

                <motion.div
                    ref={ref}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {instagramPosts.map((post, index) => (
                        <motion.a
                            key={index}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                zIndex: 10,
                                transition: { type: "spring", stiffness: 300, damping: 20 },
                            }}
                            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src={post.image}
                                alt={`Publicación de Instagram de Dar Farma - ${post.likes} likes`}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.a
                        href="https://www.instagram.com/darfarmaoficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-primary text-[#121212] px-6 py-3 rounded-full font-bold text-sm tracking-wide relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                            whileHover={{ x: "200%" }}
                            transition={{ duration: 0.6 }}
                        />
                        <Instagram className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Seguir @darfarmaoficial</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
