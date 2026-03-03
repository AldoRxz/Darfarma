"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
    UserCheck,
    ShoppingCart,
    MessageSquare,
    Globe,
    Smartphone,
    Settings,
    ClipboardList,
    Send,
    Handshake,
    Scale,
    Cookie,
    ShieldCheck,
    KeyRound,
    RefreshCw,
    Mail,
    ChevronDown,
} from "lucide-react"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
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

interface PolicyItem {
    icon: React.ElementType
    title: string
    description: string
}

const infoCollected: PolicyItem[] = [
    {
        icon: UserCheck,
        title: "Información de Registro",
        description:
            "Al crear una cuenta en nuestro Sitio web, solicitamos información personal como nombre, dirección de correo electrónico, dirección de envío, número de teléfono y contraseña para crear y gestionar su cuenta.",
    },
    {
        icon: ShoppingCart,
        title: "Información de Compra",
        description:
            "Para procesar sus pedidos, podemos recopilar información sobre los productos que compra, detalles de pago y cualquier otra información necesaria para completar la transacción.",
    },
    {
        icon: MessageSquare,
        title: "Información de Contacto",
        description:
            "Si se comunica con nosotros a través de formularios de contacto, correos electrónicos u otros medios, podemos recopilar su nombre y dirección de correo electrónico, así como cualquier otra información que nos proporcione.",
    },
    {
        icon: Globe,
        title: "Información de Navegación",
        description:
            "Podemos recopilar información sobre su navegación en nuestro Sitio web, incluidas páginas visitadas, tiempo de visita y otras acciones realizadas en el Sitio.",
    },
    {
        icon: Smartphone,
        title: "Información de Dispositivos y Ubicación",
        description:
            "Podemos recopilar información sobre el dispositivo que está utilizando para acceder a nuestro Sitio web, como el tipo de dispositivo, la dirección IP y la ubicación aproximada.",
    },
]

const infoUsage: PolicyItem[] = [
    {
        icon: Settings,
        title: "Mejora de Servicios",
        description:
            "Utilizamos la información recopilada para mejorar nuestros servicios, ofrecer un contenido más relevante y personalizado, y optimizar la experiencia del usuario en nuestro Sitio web.",
    },
    {
        icon: ClipboardList,
        title: "Procesamiento de Pedidos",
        description:
            "Utilizamos la información de compra para procesar y entregar sus pedidos, así como para brindarle asistencia relacionada con sus compras.",
    },
    {
        icon: Send,
        title: "Comunicaciones",
        description:
            "Podemos utilizar su información de contacto para enviarle comunicaciones relacionadas con el servicio, como confirmaciones de pedidos, actualizaciones sobre el estado de los pedidos y respuestas a sus consultas.",
    },
    {
        icon: Mail,
        title: "Marketing",
        description:
            "Si usted nos ha dado su consentimiento expreso, podemos utilizar su información para enviarle correos electrónicos promocionales y comunicaciones de marketing sobre nuestros productos y servicios.",
    },
]

const additionalPolicies: PolicyItem[] = [
    {
        icon: Handshake,
        title: "Proveedores de Servicios",
        description:
            "Podemos compartir su información con proveedores de servicios externos que nos ayuden a operar nuestro Sitio web y brindar servicios relacionados, como servicios de pago y envío.",
    },
    {
        icon: Scale,
        title: "Cumplimiento Legal",
        description:
            "Podemos divulgar su información en respuesta a una solicitud legal válida, como una orden judicial o una solicitud de una autoridad gubernamental.",
    },
    {
        icon: Cookie,
        title: "Cookies y Tecnologías Similares",
        description:
            "Nuestro Sitio web utiliza cookies y tecnologías similares para recopilar información sobre su actividad de navegación y mejorar su experiencia en línea. Puede modificar la configuración de su navegador para bloquear las cookies, aunque esto puede afectar la funcionalidad.",
    },
    {
        icon: ShieldCheck,
        title: "Seguridad de la Información",
        description:
            "Nos comprometemos a proteger la información personal que recopilamos y empleamos medidas de seguridad adecuadas para evitar el acceso no autorizado, la divulgación o la modificación no autorizada de los datos.",
    },
    {
        icon: KeyRound,
        title: "Sus Derechos",
        description:
            "Usted tiene ciertos derechos en relación con su información personal, incluido el derecho a acceder, corregir, eliminar, restringir o trasladar sus datos. Puede comunicarse con nosotros para ejercer cualquiera de estos derechos.",
    },
    {
        icon: RefreshCw,
        title: "Cambios en la Política",
        description:
            "Nos reservamos el derecho de actualizar o modificar esta Política de Privacidad en cualquier momento. Si realizamos cambios significativos, se lo notificaremos a través de nuestra plataforma.",
    },
]

function AccordionItem({
    item,
    index,
    isOpen,
    onToggle,
    label,
}: {
    item: PolicyItem
    index: number
    isOpen: boolean
    onToggle: () => void
    label: string
}) {
    const Icon = item.icon

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
                            {label} {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                    <h4 className="text-white font-bold text-sm mt-0.5">
                        {item.title}
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
                    {item.description}
                </p>
            </motion.div>
        </motion.div>
    )
}

export function PrivacyPolicySection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const [openInfo, setOpenInfo] = useState<number | null>(0)
    const [openUsage, setOpenUsage] = useState<number | null>(0)
    const [openAdditional, setOpenAdditional] = useState<number | null>(0)

    return (
        <section
            id="politica-privacidad"
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
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

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
                        TU INFORMACIÓN PROTEGIDA
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
                        <span className="text-primary">PRIVACIDAD</span>
                    </motion.h2>
                    <motion.p
                        className="text-white/50 font-mono text-xs max-w-2xl mx-auto mt-4 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        En Darfarma.com, valoramos y respetamos la privacidad de
                        nuestros usuarios y clientes. Esta Política de
                        Privacidad describe cómo recopilamos, utilizamos,
                        divulgamos y protegemos la información personal a través
                        de nuestra tienda en línea y servicios relacionados.
                    </motion.p>
                </motion.div>

                {/* Content Grid */}
                <div
                    ref={ref}
                    className="grid lg:grid-cols-2 gap-8 lg:gap-12"
                >
                    {/* Left Column: Information Collected */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants} className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <UserCheck className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                    Información que Recopilamos
                                </h3>
                            </div>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                        </motion.div>

                        <div className="space-y-2">
                            {infoCollected.map((item, index) => (
                                <AccordionItem
                                    key={item.title}
                                    item={item}
                                    index={index}
                                    isOpen={openInfo === index}
                                    onToggle={() =>
                                        setOpenInfo(
                                            openInfo === index ? null : index
                                        )
                                    }
                                    label="DATO"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Usage */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants} className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <Settings className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                    Uso de la Información
                                </h3>
                            </div>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                        </motion.div>

                        <div className="space-y-2">
                            {infoUsage.map((item, index) => (
                                <AccordionItem
                                    key={item.title}
                                    item={item}
                                    index={index}
                                    isOpen={openUsage === index}
                                    onToggle={() =>
                                        setOpenUsage(
                                            openUsage === index ? null : index
                                        )
                                    }
                                    label="USO"
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Full Width: Additional Policies */}
                <motion.div
                    className="mt-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                Compartir Información, Seguridad y Derechos
                            </h3>
                        </div>
                        <div className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {additionalPolicies.map((item, index) => (
                            <AccordionItem
                                key={item.title}
                                item={item}
                                index={index}
                                isOpen={openAdditional === index}
                                onToggle={() =>
                                    setOpenAdditional(
                                        openAdditional === index ? null : index
                                    )
                                }
                                label="ART"
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                    className="mt-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl px-8 py-8 max-w-2xl mx-auto">
                        <div className="text-center mb-5">
                            <h4 className="text-white font-bold text-base">
                                Contacto
                            </h4>
                            <p className="text-white/40 font-mono text-xs mt-1">
                                Si tiene alguna pregunta sobre nuestra Política
                                de Privacidad, contáctenos
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                <span className="font-mono text-primary/60 text-[10px] tracking-widest block mb-1">
                                    EMPRESA
                                </span>
                                <p className="text-white text-sm font-bold">
                                    Darfarma.com
                                </p>
                                <p className="text-white/40 font-mono text-[11px] leading-relaxed mt-1">
                                    Volcán Popocatepetl #4581
                                    <br />
                                    El Colli Urbano, 1era. Sección, Int. B
                                    <br />
                                    45070 Zapopan, Jal.
                                </p>
                            </div>

                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                <span className="font-mono text-primary/60 text-[10px] tracking-widest block mb-1">
                                    CONTACTO
                                </span>
                                <div className="space-y-2 mt-1">
                                    <motion.a
                                        href="mailto:contacto@darfarma.com"
                                        className="flex items-center gap-2 text-white hover:text-primary transition-colors text-sm font-bold"
                                        whileHover={{ x: 4 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }}
                                    >
                                        <Mail className="w-3.5 h-3.5 text-primary" />
                                        contacto@darfarma.com
                                    </motion.a>
                                    <motion.a
                                        href="https://wa.me/5233350601960"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white hover:text-primary transition-colors text-sm font-bold"
                                        whileHover={{ x: 4 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }}
                                    >
                                        <MessageSquare className="w-3.5 h-3.5 text-primary" />
                                        33 3506 0196
                                    </motion.a>
                                </div>
                            </div>
                        </div>

                        <p className="text-white/25 font-mono text-[10px] text-center mt-5">
                            Gracias por confiar en Darfarma.com
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
