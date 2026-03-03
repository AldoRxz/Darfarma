"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
    MailOpen,
    PackageCheck,
    ShieldCheck,
    Truck,
    ClipboardCheck,
    Clock,
    MapPin,
    Search,
    AlertTriangle,
    Timer,
    ChevronDown,
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
    hidden: { opacity: 0, y: 20 },
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

const returnSteps = [
    {
        icon: MailOpen,
        title: "Contacto Inicial",
        description:
            "Para iniciar el proceso de devolución, póngase en contacto con nuestro servicio al cliente a través de atencion@darfarma.com dentro del período de 30 días. Proporcione el número de pedido y una descripción detallada del motivo de la devolución.",
    },
    {
        icon: PackageCheck,
        title: "Estado del Producto",
        description:
            "El producto debe estar en su estado original, sin abrir, en su empaque original y con todas las etiquetas y sellos intactos. Si al abrir el producto cuenta con alguna anomalía ocasionada en el proceso de producción, comuníquese a atencion@darfarma.com para brindar el servicio adecuado.",
    },
    {
        icon: ShieldCheck,
        title: "Autorización de Devolución",
        description:
            "Una vez que se haya comunicado con nuestro equipo de servicio al cliente y se haya aprobado la devolución, recibirá una autorización de devolución junto con instrucciones adicionales.",
    },
    {
        icon: Truck,
        title: "Envío de Devolución",
        description:
            "Los gastos de envío para la devolución del producto correrán por cuenta de Darfarma sólo en ocasiones específicas.",
    },
    {
        icon: ClipboardCheck,
        title: "Inspección y Reembolso",
        description:
            "Una vez recibido el producto devuelto y confirmado que cumple con nuestras condiciones, procesaremos el reembolso con el mismo método de pago original. Los reembolsos se procesan dentro de 15 días hábiles a partir de la recepción.",
    },
]

const shippingDetails = [
    {
        icon: Timer,
        title: "Tiempo de Procesamiento",
        description:
            "Los pedidos se procesarán y enviarán dentro de 3 días hábiles a partir de la confirmación de compra. Los pedidos en fines de semana o días festivos pueden experimentar un ligero retraso.",
    },
    {
        icon: Truck,
        title: "Opciones de Envío",
        description:
            "Ofrecemos varias opciones de envío incluyendo estándar y express. Los plazos de entrega y costos se mostrarán claramente al momento de la compra.",
    },
    {
        icon: Search,
        title: "Seguimiento",
        description:
            "Una vez enviado su pedido, recibirá un correo electrónico de confirmación con un número de seguimiento para rastrear su paquete hasta la entrega.",
    },
    {
        icon: MapPin,
        title: "Dirección de Envío",
        description:
            "Asegúrese de proporcionar la dirección correcta al realizar su pedido. No nos haremos responsables de paquetes entregados en direcciones incorrectas por información proporcionada erróneamente.",
    },
    {
        icon: Clock,
        title: "Tiempo de Entrega",
        description:
            "Una vez procesado y reflejado el pago de su pedido, se enviará al domicilio proporcionado y el tiempo de entrega será de 5 a 7 días hábiles dependiendo de la zona.",
    },
    {
        icon: AlertTriangle,
        title: "Daños durante el Envío",
        description:
            "Si su paquete llega dañado (empaque del producto roto o en mal estado), póngase en contacto con nuestro servicio al cliente de inmediato. Puede necesitarse evidencia fotográfica del daño.",
    },
]

function AccordionItem({
    step,
    index,
    isOpen,
    onToggle,
}: {
    step: (typeof returnSteps)[0]
    index: number
    isOpen: boolean
    onToggle: () => void
}) {
    const Icon = step.icon

    return (
        <motion.div variants={itemVariants} className="group">
            <motion.button
                onClick={onToggle}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-primary/30 transition-all duration-300 text-left"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-primary/60 text-[10px] tracking-widest">
                            PASO {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                    <h4 className="text-white font-bold text-sm mt-0.5">
                        {step.title}
                    </h4>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className="w-4 h-4 text-white/40" />
                </motion.div>
            </motion.button>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="overflow-hidden"
            >
                <p className="text-white/50 font-mono text-xs leading-relaxed px-4 py-3 pl-[4.5rem]">
                    {step.description}
                </p>
            </motion.div>
        </motion.div>
    )
}

export function RefundPolicySection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const [openReturn, setOpenReturn] = useState<number | null>(0)
    const [openShipping, setOpenShipping] = useState<number | null>(0)

    return (
        <section
            id="politica-reembolso"
            className="relative py-20 md:py-28 bg-[#0e0e0e] overflow-hidden"
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
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
                {/* Section Header */}
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
                        TU COMPRA PROTEGIDA
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-6xl font-black text-white tracking-tighter mt-3 leading-[0.95]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            ease: [0.25, 0.4, 0.25, 1] as const,
                            delay: 0.2,
                        }}
                    >
                        POLÍTICA DE{" "}
                        <span className="text-primary">REEMBOLSO</span>
                    </motion.h2>
                    <motion.p
                        className="text-white/50 font-mono text-xs max-w-2xl mx-auto mt-4 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        En Darfarma.com nos esforzamos por ofrecer productos de la más alta
                        calidad. Si no está completamente satisfecho, le ofrecemos una
                        política de devolución flexible dentro de 30 días desde la
                        recepción.
                    </motion.p>
                </motion.div>

                {/* Two Column Layout */}
                <div ref={ref} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Returns Column */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="mb-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <PackageCheck className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                    Devoluciones
                                </h3>
                            </div>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                        </motion.div>

                        <div className="space-y-2">
                            {returnSteps.map((step, index) => (
                                <AccordionItem
                                    key={step.title}
                                    step={step}
                                    index={index}
                                    isOpen={openReturn === index}
                                    onToggle={() =>
                                        setOpenReturn(
                                            openReturn === index
                                                ? null
                                                : index
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Shipping Column */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="mb-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <Truck className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                    Envíos
                                </h3>
                            </div>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                        </motion.div>

                        <div className="space-y-2">
                            {shippingDetails.map((step, index) => (
                                <AccordionItem
                                    key={step.title}
                                    step={step}
                                    index={index}
                                    isOpen={openShipping === index}
                                    onToggle={() =>
                                        setOpenShipping(
                                            openShipping === index
                                                ? null
                                                : index
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-14 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-8 py-5">
                        <div className="text-center sm:text-left">
                            <p className="text-white font-bold text-sm">
                                ¿Tienes alguna pregunta?
                            </p>
                            <p className="text-white/40 font-mono text-xs mt-0.5">
                                Estamos aquí para ayudarte con tu compra
                            </p>
                        </div>
                        <motion.a
                            href="mailto:atencion@darfarma.com"
                            className="flex items-center gap-2 bg-primary text-[#121212] px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide relative overflow-hidden group whitespace-nowrap"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                                whileHover={{ x: "200%" }}
                                transition={{ duration: 0.6 }}
                            />
                            <MailOpen className="w-3.5 h-3.5 relative z-10" />
                            <span className="relative z-10">
                                atencion@darfarma.com
                            </span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
