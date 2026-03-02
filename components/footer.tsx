"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
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

export function Footer() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const footerRef = useRef(null)
    const isInView = useInView(footerRef, { once: true, margin: "-100px" })

    const handleSubmit = () => {
        setIsSubmitting(true)
        setTimeout(() => setIsSubmitting(false), 2000)
    }

    const footerLinks = [
        {
            title: "Productos",
            links: [
                { label: "Citrato de Magnesio", href: "#productos" },
                { label: "Colágeno Hidrolizado", href: "#productos" },
                { label: "Omega 3", href: "#productos" },
                { label: "Creatina", href: "#productos" },
            ],
        },
        {
            title: "Enlaces",
            links: [
                { label: "Inicio", href: "#" },
                { label: "Productos", href: "#productos" },
                { label: "Sobre Nosotros", href: "#sobre-nosotros" },
                { label: "Contacto", href: "#contacto" },
            ],
        },
        {
            title: "Compañía",
            links: [
                { label: "Sobre Nosotros", href: "#sobre-nosotros" },
                { label: "Blog", href: "#blog" },
                { label: "Distribuidores", href: "#" },
                { label: "Contacto", href: "#contacto" },
            ],
        },
        {
            title: "Legal",
            links: [
                { label: "Política de Privacidad", href: "#" },
                { label: "Términos de Servicio", href: "#" },
                { label: "Aviso Legal", href: "#" },
            ],
        },
    ]

    return (
        <footer ref={footerRef} id="contacto" className="relative bg-[#121212] pt-16 pb-6 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
                {/* CTA Header */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
                    className="text-center mb-12"
                >
                    <motion.h2
                        className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
                    >
                        <span className="block">LISTO PARA</span>
                        <span className="block text-primary">SENTIRTE MEJOR?</span>
                    </motion.h2>
                </motion.div>

                {/* Email signup */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-xl mx-auto mb-12"
                >
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 font-mono text-sm focus:outline-none focus:border-primary transition-all duration-300"
                            />
                        </div>
                        <motion.button
                            className="bg-primary text-[#121212] px-6 py-3 rounded-xl font-bold text-sm tracking-wide whitespace-nowrap relative overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            onClick={handleSubmit}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                            <span className="relative z-10">
                                {isSubmitting ? "Enviando..." : "Obtener 10% OFF"}
                            </span>
                        </motion.button>
                    </div>
                    <motion.p
                        className="text-white/40 font-mono text-xs mt-2 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        Únete a nuestra comunidad. Sin spam, solo bienestar.
                    </motion.p>
                </motion.div>

                {/* Brand description */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-white/60 font-mono text-xs max-w-xl mx-auto leading-relaxed">
                        Dar Farma ofrece suplementos naturales de la más alta calidad, formulados con ingredientes puros
                        sin aditivos artificiales. Alta pureza, máximo desempeño para tu bienestar.
                    </p>
                </motion.div>

                {/* Footer links */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-white/10"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {footerLinks.map((section) => (
                        <motion.div key={section.title} variants={itemVariants}>
                            <h4 className="font-bold text-white text-sm mb-3">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((item) => (
                                    <li key={item.label}>
                                        <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                            <Link
                                                href={item.href}
                                                className="text-white/60 hover:text-primary font-mono text-xs transition-colors inline-block"
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom bar */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <span className="text-xl font-black">
                            <span className="text-white">Dar </span>
                            <span className="text-primary">Farma</span>
                        </span>
                    </motion.div>

                    <p className="text-white/40 font-mono text-xs">© 2026 Dar Farma. Todos los derechos reservados.</p>

                    <motion.p
                        className="text-white/30 font-mono text-xs cursor-pointer hover:text-primary transition-colors"
                    >
                        Hecho por Escala+
                    </motion.p>
                </motion.div>
            </div>

            {/* Background watermark */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[20rem] font-black text-white/[0.02] pointer-events-none select-none leading-none whitespace-nowrap"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                DAR FARMA
            </motion.div>
        </footer>
    )
}
