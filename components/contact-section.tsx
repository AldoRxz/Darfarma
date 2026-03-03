"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageCircle,
    Clock,
    CheckCircle2,
} from "lucide-react"

const contactMethods = [
    {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "33 3506 0196",
        href: "https://wa.me/523335060196",
        description: "Respuesta rápida",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
    },
    {
        icon: Mail,
        label: "Correo Electrónico",
        value: "contacto@darfarma.com",
        href: "mailto:contacto@darfarma.com",
        description: "Atención general",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
    },
    {
        icon: Mail,
        label: "Atención al Cliente",
        value: "atencion@darfarma.com",
        href: "mailto:atencion@darfarma.com",
        description: "Pedidos y devoluciones",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
    },
    {
        icon: Clock,
        label: "Horario de Atención",
        value: "Lun - Vie: 9:00 - 18:00",
        href: "#",
        description: "Hora del centro de México",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
    },
]

export function ContactSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const mailtoLink = `mailto:contacto@darfarma.com?subject=${encodeURIComponent(formState.subject || "Contacto desde darfarma.com")}&body=${encodeURIComponent(`Nombre: ${formState.name}\nCorreo: ${formState.email}\n\n${formState.message}`)}`
        window.open(mailtoLink, "_blank")
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 4000)
    }

    return (
        <section
            ref={ref}
            className="relative py-20 md:py-28 bg-[#0e0e0e] overflow-hidden min-h-screen"
        >
            {/* Grid bg */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(126,204,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(126,204,92,0.3) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                    className="text-center mb-16"
                >
                    <motion.span
                        className="font-mono text-primary text-xs tracking-[0.3em] inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                    >
                        ESTAMOS PARA AYUDARTE
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-7xl font-black text-white tracking-tighter mt-3 leading-[0.95]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.6,
                            ease: [0.25, 0.4, 0.25, 1],
                            delay: 0.2,
                        }}
                    >
                        <span className="text-primary">CONTÁCTA</span>NOS
                    </motion.h1>
                    <motion.p
                        className="text-white/50 font-mono text-xs max-w-2xl mx-auto mt-4 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        ¿Tienes preguntas sobre nuestros productos? ¿Necesitas
                        ayuda con un pedido? Estamos aquí para ti.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Methods */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h2 className="font-mono text-white/40 text-xs tracking-widest mb-6">
                            CANALES DE COMUNICACIÓN
                        </h2>

                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={index}
                                href={method.href}
                                target={
                                    method.href.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    method.href.startsWith("http")
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className={`block bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-primary/30 transition-all duration-500 group ${method.href === "#" ? "pointer-events-none" : ""}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    isInView ? { opacity: 1, y: 0 } : {}
                                }
                                transition={{
                                    duration: 0.4,
                                    delay: 0.4 + index * 0.1,
                                }}
                                whileHover={
                                    method.href !== "#" ? { y: -2 } : {}
                                }
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-xl ${method.bgColor} border flex items-center justify-center flex-shrink-0`}
                                    >
                                        <method.icon
                                            className={`w-5 h-5 ${method.color}`}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-white/40 text-[10px] tracking-widest">
                                                {method.label.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-white font-bold text-sm mt-0.5 group-hover:text-primary transition-colors truncate">
                                            {method.value}
                                        </p>
                                        <p className="text-white/30 font-mono text-[11px] mt-0.5">
                                            {method.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.a>
                        ))}

                        {/* WhatsApp CTA */}
                        <motion.a
                            href="https://wa.me/523335060196?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.8 }}
                        >
                            <motion.div
                                className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 flex items-center gap-4 hover:bg-green-500/15 hover:border-green-500/40 transition-all duration-300 cursor-pointer group"
                                whileHover={{ y: -2 }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-green-400 font-bold text-sm group-hover:text-green-300 transition-colors">
                                        Escríbenos por WhatsApp
                                    </p>
                                    <p className="text-white/40 font-mono text-[11px] mt-0.5">
                                        Respuesta inmediata en horario de
                                        atención
                                    </p>
                                </div>
                                <Send className="w-4 h-4 text-green-500/50 ml-auto group-hover:translate-x-1 group-hover:text-green-400 transition-all" />
                            </motion.div>
                        </motion.a>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8">
                            <h2 className="font-mono text-white/40 text-xs tracking-widest mb-6">
                                ENVÍANOS UN MENSAJE
                            </h2>

                            {submitted ? (
                                <motion.div
                                    className="flex flex-col items-center justify-center py-16 text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring" }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="text-white font-bold text-lg">
                                        ¡Mensaje preparado!
                                    </p>
                                    <p className="text-white/40 font-mono text-xs mt-2 max-w-xs">
                                        Se abrió tu cliente de correo. Si no se
                                        abrió, envíanos un correo a
                                        contacto@darfarma.com
                                    </p>
                                </motion.div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-mono text-white/40 text-[10px] tracking-widest block mb-2">
                                                NOMBRE
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formState.name}
                                                onChange={(e) =>
                                                    setFormState((s) => ({
                                                        ...s,
                                                        name: e.target.value,
                                                    }))
                                                }
                                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-colors"
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-mono text-white/40 text-[10px] tracking-widest block mb-2">
                                                CORREO
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formState.email}
                                                onChange={(e) =>
                                                    setFormState((s) => ({
                                                        ...s,
                                                        email: e.target.value,
                                                    }))
                                                }
                                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-colors"
                                                placeholder="tu@correo.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="font-mono text-white/40 text-[10px] tracking-widest block mb-2">
                                            ASUNTO
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.subject}
                                            onChange={(e) =>
                                                setFormState((s) => ({
                                                    ...s,
                                                    subject: e.target.value,
                                                }))
                                            }
                                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-colors"
                                            placeholder="¿En qué podemos ayudarte?"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-mono text-white/40 text-[10px] tracking-widest block mb-2">
                                            MENSAJE
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={(e) =>
                                                setFormState((s) => ({
                                                    ...s,
                                                    message: e.target.value,
                                                }))
                                            }
                                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-colors resize-none"
                                            placeholder="Escribe tu mensaje aquí..."
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="w-full bg-primary text-[#121212] py-3.5 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden group"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                                            whileHover={{ x: "200%" }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <Send className="w-4 h-4" />
                                            Enviar Mensaje
                                        </span>
                                    </motion.button>

                                    <p className="text-white/20 font-mono text-[10px] text-center mt-2">
                                        Se abrirá tu cliente de correo
                                        electrónico para enviar el mensaje
                                    </p>
                                </form>
                            )}
                        </div>

                        {/* Location */}
                        <motion.div
                            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 mt-4 flex items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.9 }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-white/40 font-mono text-[10px] tracking-widest">
                                    UBICACIÓN
                                </p>
                                <p className="text-white font-bold text-sm mt-0.5">
                                    Guadalajara, Jalisco, México
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
