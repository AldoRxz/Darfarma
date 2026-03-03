"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
    Heart,
    Shield,
    Leaf,
    Award,
    Users,
    Target,
    Sparkles,
    CheckCircle,
    Globe,
    Microscope,
} from "lucide-react"

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
    hidden: { opacity: 0, y: 25 },
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

const values = [
    {
        icon: Shield,
        title: "Calidad Garantizada",
        description:
            "Cada producto pasa por rigurosos controles de calidad para asegurar que cumple con los estándares más exigentes de la industria farmacéutica.",
    },
    {
        icon: Leaf,
        title: "Ingredientes Naturales",
        description:
            "Formulamos nuestros suplementos con ingredientes naturales de la más alta pureza, sin aditivos artificiales ni rellenos innecesarios.",
    },
    {
        icon: Microscope,
        title: "Respaldo Científico",
        description:
            "Nuestras fórmulas están desarrolladas con base en investigación científica, garantizando eficacia y biodisponibilidad en cada producto.",
    },
    {
        icon: Heart,
        title: "Bienestar Integral",
        description:
            "Creemos en un enfoque holístico de la salud. Nuestros productos están diseñados para complementar un estilo de vida saludable y equilibrado.",
    },
    {
        icon: Users,
        title: "Compromiso con el Cliente",
        description:
            "Tu satisfacción es nuestra prioridad. Brindamos atención personalizada y acompañamiento en cada paso de tu experiencia con nosotros.",
    },
    {
        icon: Globe,
        title: "Orgullosamente Mexicanos",
        description:
            "Somos una empresa 100% mexicana comprometida con el desarrollo de productos de clase mundial, contribuyendo al bienestar de nuestras comunidades.",
    },
]

const stats = [
    { value: "100%", label: "Mexicana", icon: "🇲🇽" },
    { value: "0", label: "Aditivos Artificiales", icon: "🌿" },
    { value: "+1000", label: "Clientes Satisfechos", icon: "⭐" },
    { value: "Alta", label: "Pureza Garantizada", icon: "🔬" },
]

const commitments = [
    "Productos formulados con ingredientes de la más alta calidad",
    "Sin conservadores, colorantes ni saborizantes artificiales",
    "Procesos de manufactura con estándares farmacéuticos",
    "Transparencia total en nuestros ingredientes y procesos",
    "Compromiso con la sustentabilidad y el medio ambiente",
    "Atención al cliente personalizada y cercana",
]

export function AboutUsSection() {
    const valuesRef = useRef(null)
    const statsRef = useRef(null)
    const isValuesInView = useInView(valuesRef, { once: true, margin: "-50px" })
    const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" })

    return (
        <section
            id="sobre-nosotros"
            className="relative bg-[#0e0e0e] overflow-hidden"
        >
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(126,204,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(126,204,92,0.3) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Gradient orbs */}
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

            {/* Hero Section */}
            <div className="relative py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.4, 0.25, 1] as const,
                        }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            className="font-mono text-primary text-xs tracking-[0.3em] inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            CONÓCENOS
                        </motion.span>
                        <motion.h1
                            className="text-4xl md:text-7xl font-black text-white tracking-tighter mt-3 leading-[0.95]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                ease: [0.25, 0.4, 0.25, 1] as const,
                                delay: 0.2,
                            }}
                        >
                            SOBRE{" "}
                            <span className="text-primary">NOSOTROS</span>
                        </motion.h1>
                    </motion.div>

                    {/* Main Story */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                ease: [0.25, 0.4, 0.25, 1] as const,
                            }}
                        >
                            <div className="space-y-6">
                                <div>
                                    <span className="font-mono text-primary/60 text-[10px] tracking-widest">
                                        NUESTRA HISTORIA
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
                                        Una empresa orgullosamente{" "}
                                        <span className="text-primary">
                                            mexicana
                                        </span>
                                    </h2>
                                </div>

                                <p className="text-white/60 font-mono text-sm leading-relaxed">
                                    <strong className="text-white">
                                        DARFARMA
                                    </strong>{" "}
                                    es una empresa orgullosamente mexicana en la
                                    cual creemos que la salud y el bienestar
                                    comienzan con la confianza. Por eso
                                    elaboramos productos con los más altos
                                    estándares de calidad, cuidando cada detalle
                                    para que tengas la seguridad de elegir lo
                                    mejor para ti y tu familia.
                                </p>

                                <p className="text-white/60 font-mono text-sm leading-relaxed">
                                    Nacimos con la convicción de que cada persona
                                    merece acceso a suplementos de calidad
                                    premium que realmente marquen la diferencia
                                    en su bienestar diario. Desde nuestros
                                    inicios, nos hemos dedicado a investigar,
                                    desarrollar y ofrecer productos que combinan
                                    la ciencia moderna con ingredientes naturales
                                    de la más alta pureza.
                                </p>

                                <p className="text-white/60 font-mono text-sm leading-relaxed">
                                    Cada fórmula que creamos pasa por un riguroso
                                    proceso de desarrollo y control de calidad,
                                    asegurando que nuestros clientes reciban
                                    productos seguros, efectivos y libres de
                                    aditivos innecesarios. Nuestra promesa es
                                    simple: ofrecerte lo mejor, sin
                                    compromisos.
                                </p>
                            </div>
                        </motion.div>

                        {/* Mission / Vision cards */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                ease: [0.25, 0.4, 0.25, 1] as const,
                                delay: 0.2,
                            }}
                        >
                            {/* Mission */}
                            <motion.div
                                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                                whileHover={{ y: -4 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                        <Target className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <span className="font-mono text-primary/60 text-[10px] tracking-widest block">
                                            NUESTRA MISIÓN
                                        </span>
                                        <h3 className="text-white font-bold text-base">
                                            Misión
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-white/50 font-mono text-xs leading-relaxed">
                                    Mejorar la calidad de vida de las personas a
                                    través de suplementos naturales de alta
                                    pureza, elaborados con los más altos
                                    estándares de calidad, haciéndolos accesibles
                                    para todas las familias mexicanas que buscan
                                    cuidar su salud de manera responsable y
                                    efectiva.
                                </p>
                            </motion.div>

                            {/* Vision */}
                            <motion.div
                                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                                whileHover={{ y: -4 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <span className="font-mono text-primary/60 text-[10px] tracking-widest block">
                                            NUESTRA VISIÓN
                                        </span>
                                        <h3 className="text-white font-bold text-base">
                                            Visión
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-white/50 font-mono text-xs leading-relaxed">
                                    Ser la marca líder de suplementos naturales
                                    en México, reconocida por nuestra excelencia
                                    en calidad, innovación y compromiso con el
                                    bienestar de nuestros clientes, expandiendo
                                    nuestra presencia a nivel internacional como
                                    referente de confianza y pureza.
                                </p>
                            </motion.div>

                            {/* Promise */}
                            <motion.div
                                className="bg-primary/[0.08] border border-primary/20 rounded-2xl p-6"
                                whileHover={{ y: -4 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                                        <Award className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <span className="font-mono text-primary/60 text-[10px] tracking-widest block">
                                            NUESTRA PROMESA
                                        </span>
                                        <h3 className="text-white font-bold text-base">
                                            Compromiso de Calidad
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-white/50 font-mono text-xs leading-relaxed">
                                    Nos comprometemos a ofrecerte productos
                                    elaborados con ingredientes puros, procesos
                                    transparentes y la pasión de un equipo que
                                    vive y respira bienestar. Tu confianza es
                                    nuestro mayor motor.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative py-16 border-y border-white/[0.06]">
                <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
                    <motion.div
                        ref={statsRef}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isStatsInView ? "visible" : "hidden"}
                    >
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                className="text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl py-8 px-4 hover:border-primary/20 transition-all duration-300"
                                whileHover={{ y: -4 }}
                            >
                                <span className="text-3xl mb-2 block">
                                    {stat.icon}
                                </span>
                                <span className="text-3xl md:text-4xl font-black text-primary block tracking-tighter">
                                    {stat.value}
                                </span>
                                <span className="font-mono text-white/50 text-[11px] tracking-wide mt-1 block">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Values Section */}
            <div className="relative py-20 md:py-28">
                <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.4, 0.25, 1] as const,
                        }}
                        className="text-center mb-14"
                    >
                        <motion.span
                            className="font-mono text-primary text-xs tracking-[0.3em] inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            LO QUE NOS DEFINE
                        </motion.span>
                        <motion.h2
                            className="text-3xl md:text-5xl font-black text-white tracking-tighter mt-3"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                ease: [0.25, 0.4, 0.25, 1] as const,
                                delay: 0.2,
                            }}
                        >
                            NUESTROS{" "}
                            <span className="text-primary">VALORES</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        ref={valuesRef}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isValuesInView ? "visible" : "hidden"}
                    >
                        {values.map((value) => {
                            const Icon = value.icon
                            return (
                                <motion.div
                                    key={value.title}
                                    variants={itemVariants}
                                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
                                    whileHover={{ y: -4 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-white font-bold text-base mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-white/50 font-mono text-xs leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Commitments Section */}
            <div className="relative py-16 pb-24">
                <div className="max-w-[900px] mx-auto px-8 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-10"
                    >
                        <div className="text-center mb-8">
                            <span className="font-mono text-primary text-xs tracking-[0.3em]">
                                NUESTRO COMPROMISO CONTIGO
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
                                ¿Por qué elegir{" "}
                                <span className="text-primary">Dar Farma</span>?
                            </h3>
                        </div>

                        <motion.div
                            className="grid sm:grid-cols-2 gap-3"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {commitments.map((commitment) => (
                                <motion.div
                                    key={commitment}
                                    variants={itemVariants}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-primary/20 transition-all duration-300"
                                >
                                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-white/60 font-mono text-xs leading-relaxed">
                                        {commitment}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
