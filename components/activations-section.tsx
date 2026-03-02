"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Dumbbell, Building2, Calendar } from "lucide-react"

const activations = [
    {
        icon: Sparkles,
        title: "Eventos de Degustación",
        description: "Conoce nuestros productos en eventos exclusivos cerca de ti.",
        cta: "Ver Eventos",
    },
    {
        icon: Dumbbell,
        title: "Gimnasios y Estudios",
        description: "Asóciate con nosotros para ofrecer suplementos a tu comunidad fitness.",
        cta: "Ser Socio",
    },
    {
        icon: Building2,
        title: "Oficinas y Empresas",
        description: "Lleva bienestar a tu lugar de trabajo. Pedidos mayoreo disponibles.",
        cta: "Pedir Cotización",
    },
    {
        icon: Calendar,
        title: "Organizadores de Eventos",
        description: "Patrocina tu próximo evento con productos Dar Farma.",
        cta: "Patrocinar Evento",
    },
]

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
        },
    },
}

export function ActivationsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="sobre-nosotros" className="relative py-16 bg-background overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
                <div className="text-center mb-8">
                    <motion.span
                        className="inline-block font-mono text-primary text-xs tracking-[0.3em] uppercase"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Dónde Encontrarnos
                    </motion.span>

                    <motion.h2
                        className="text-3xl md:text-4xl font-black text-foreground tracking-tight mt-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const, delay: 0.15 }}
                    >
                        Conoce <span className="text-primary">Dar Farma</span>
                    </motion.h2>

                    <motion.div
                        className="h-[2px] w-12 bg-primary mx-auto mt-2 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
                    />

                    <motion.p
                        className="text-sm text-foreground/80 font-mono mt-3 max-w-xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        Desde eventos de degustación hasta alianzas corporativas, lleva Dar Farma a tu mundo.
                    </motion.p>
                </div>

                <motion.div
                    ref={ref}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {activations.map((activation) => (
                        <motion.div
                            key={activation.title}
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 400, damping: 17 },
                            }}
                            className="group bg-foreground rounded-2xl p-6 cursor-pointer relative overflow-hidden flex flex-col"
                        >
                            <motion.div
                                className="absolute inset-0 bg-primary/0 group-hover:bg-primary"
                                transition={{ duration: 0.4 }}
                            />

                            <div className="relative z-10 flex flex-col flex-1">
                                <motion.div
                                    className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:bg-foreground transition-colors duration-300"
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <activation.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" />
                                </motion.div>

                                <h3 className="text-lg font-black text-background group-hover:text-foreground tracking-tight mb-2 transition-colors duration-300">
                                    {activation.title}
                                </h3>
                                <p className="text-background/80 group-hover:text-foreground/80 font-mono text-xs leading-relaxed mb-4 flex-1 transition-colors duration-300">
                                    {activation.description}
                                </p>

                                <motion.button
                                    className="flex items-center gap-2 text-primary group-hover:text-foreground font-bold text-xs tracking-wide mt-auto transition-colors duration-300"
                                    whileHover={{ x: 4 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    {activation.cta}
                                    <motion.svg
                                        className="w-3 h-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 4 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </motion.svg>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
