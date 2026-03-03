"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
    ShieldCheck,
    UserCheck,
    AlertCircle,
    Info,
    Lock,
    CreditCard,
    Receipt,
    BadgeAlert,
    Truck,
    PackageSearch,
    XCircle,
    Copyright,
    RefreshCw,
    Gavel,
    ChevronDown,
    Mail,
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

interface TermItem {
    icon: React.ElementType
    title: string
    description: string
}

const siteUsage: TermItem[] = [
    {
        icon: UserCheck,
        title: "1.1 Plataforma de Comercio Electrónico",
        description:
            "Darfarma.com es una plataforma de comercio electrónico que ofrece la venta de productos y servicios relacionados con el campo farmacéutico. Al acceder a nuestro sitio, declaras que eres mayor de edad o cuentas con la supervisión y consentimiento de un adulto para realizar compras.",
    },
    {
        icon: AlertCircle,
        title: "1.2 Uso Ético y Legal",
        description:
            "Te comprometes a utilizar nuestro sitio de forma ética y legal, y a no realizar actividades que puedan dañar o afectar su funcionamiento o la experiencia de otros usuarios.",
    },
    {
        icon: Info,
        title: "1.3 Información No Médica",
        description:
            "La información proporcionada en Darfarma.com tiene fines informativos y no debe considerarse como asesoramiento médico. Siempre consulta a un profesional de la salud antes de tomar decisiones relacionadas con tu bienestar.",
    },
    {
        icon: Lock,
        title: "2.1 Privacidad y Protección de Datos",
        description:
            "Respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Nuestra Política de Privacidad detalla cómo recopilamos, utilizamos y protegemos tu información. Al utilizar nuestro sitio, aceptas nuestra Política de Privacidad.",
    },
]

const purchasesPayments: TermItem[] = [
    {
        icon: CreditCard,
        title: "3.1 Disponibilidad de Productos",
        description:
            "Los productos y servicios ofrecidos en Darfarma.com están sujetos a disponibilidad. Nos reservamos el derecho de modificar, limitar o interrumpir la venta de cualquier producto en cualquier momento sin previo aviso.",
    },
    {
        icon: Receipt,
        title: "3.2 Precios e Impuestos",
        description:
            "Los precios de los productos se muestran en la moneda local (MXN) e incluyen los impuestos aplicables, a menos que se indique lo contrario. En términos del artículo 42 de la Ley Federal de Protección al Consumidor, el precio ofrecido por cada insumo es el precio de venta al público aprobado en términos de la legislación aplicable y sugerido por el fabricante.",
    },
    {
        icon: ShieldCheck,
        title: "3.3 Métodos de Pago",
        description:
            "Aceptamos diversas formas de pago que se detallan en la sección de Métodos de Pago de nuestro sitio. Al realizar una compra, garantizas que tienes los derechos de utilizar el método de pago seleccionado. En caso de requerir factura, favor de ponerse en contacto al correo facturacion@darfarma.com.",
    },
    {
        icon: BadgeAlert,
        title: "3.4 Seguridad Financiera",
        description:
            "Nos comprometemos a mantener un ambiente seguro en nuestro sitio. Sin embargo, no nos responsabilizamos por cualquier pérdida, daño o robo de información financiera durante el proceso de pago.",
    },
]

const shippingAndMore: TermItem[] = [
    {
        icon: Truck,
        title: "4.1 Plazos y Costos de Envío",
        description:
            "Los plazos y costos de envío se especifican en la sección de Envíos de nuestro sitio. Haremos nuestro mejor esfuerzo para que los productos sean entregados en tiempo y forma, pero no nos hacemos responsables de retrasos causados por terceros.",
    },
    {
        icon: PackageSearch,
        title: "4.2 Verificación de Productos",
        description:
            "Al recibir los productos, es tu responsabilidad verificar que estén en buen estado y coincidan con tu pedido. Si hay algún problema con los productos recibidos, por favor, contáctanos dentro del plazo especificado en nuestra Política de Devoluciones.",
    },
    {
        icon: XCircle,
        title: "5.1 Cancelaciones",
        description:
            "Darfarma podrá cancelar la orden de compra cuando no tenga disponibilidad del producto, cuando no exista disponibilidad de medios de entrega, cuando no reciba el pago, cuando no reciba documentos o recetas médicas correspondientes a la entrega de producto, o por causas de fuerza mayor.",
    },
    {
        icon: Copyright,
        title: "6.1 Propiedad Intelectual",
        description:
            "Todos los contenidos de Darfarma.com, incluyendo textos, imágenes, logotipos, marcas registradas, gráficos y otros materiales, están protegidos por leyes de propiedad intelectual y son propiedad exclusiva de Darfarma.com o sus licenciantes. Queda prohibida su reproducción o uso no autorizado.",
    },
    {
        icon: RefreshCw,
        title: "7.1 Modificaciones y Actualizaciones",
        description:
            "Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán efectivas desde su publicación en el sitio. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.",
    },
    {
        icon: Gavel,
        title: "8.1 Ley Aplicable y Jurisdicción",
        description:
            "Estos Términos y Condiciones, así como las operaciones de compraventa entre Darfarma y el Cliente, estarán sujetas a la Ley Federal de Protección al Consumidor, Ley General de Salud, su reglamento, Reglamento de Insumos para la Salud y demás normatividad aplicable. Cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales de Querétaro.",
    },
]

function AccordionItem({
    item,
    isOpen,
    onToggle,
}: {
    item: TermItem
    isOpen: boolean
    onToggle: () => void
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
                    <h4 className="text-white font-bold text-sm">
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

export function TermsOfServiceSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const [openUsage, setOpenUsage] = useState<number | null>(0)
    const [openPayments, setOpenPayments] = useState<number | null>(0)
    const [openShipping, setOpenShipping] = useState<number | null>(0)

    return (
        <section
            id="terminos-servicio"
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
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

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
                        CONDICIONES DE USO
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
                        TÉRMINOS DEL{" "}
                        <span className="text-primary">SERVICIO</span>
                    </motion.h2>
                    <motion.p
                        className="text-white/50 font-mono text-xs max-w-3xl mx-auto mt-4 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Al acceder, usar o visitar nuestro sitio, Usted acepta
                        los siguientes Términos y Condiciones de conformidad con
                        lo dispuesto en el artículo 1803 del Código Civil
                        Federal. En caso de no aceptar en forma absoluta y
                        completa los presentes Términos y Condiciones, deberá
                        abstenerse de acceder y utilizar nuestro sitio.
                    </motion.p>
                </motion.div>

                {/* Two Column Layout */}
                <div ref={ref} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Site Usage */}
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
                                    Uso del Sitio y Privacidad
                                </h3>
                            </div>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                        </motion.div>

                        <div className="space-y-2">
                            {siteUsage.map((item, index) => (
                                <AccordionItem
                                    key={item.title}
                                    item={item}
                                    isOpen={openUsage === index}
                                    onToggle={() =>
                                        setOpenUsage(
                                            openUsage === index ? null : index
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Purchases & Payments */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants} className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <CreditCard className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                    Compras y Pagos
                                </h3>
                            </div>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                        </motion.div>

                        <div className="space-y-2">
                            {purchasesPayments.map((item, index) => (
                                <AccordionItem
                                    key={item.title}
                                    item={item}
                                    isOpen={openPayments === index}
                                    onToggle={() =>
                                        setOpenPayments(
                                            openPayments === index
                                                ? null
                                                : index
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Full Width: Shipping, Cancellations, IP, Legal */}
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
                                <Gavel className="w-4 h-4 text-primary" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                Envíos, Cancelaciones y Marco Legal
                            </h3>
                        </div>
                        <div className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {shippingAndMore.map((item, index) => (
                            <AccordionItem
                                key={item.title}
                                item={item}
                                isOpen={openShipping === index}
                                onToggle={() =>
                                    setOpenShipping(
                                        openShipping === index ? null : index
                                    )
                                }
                            />
                        ))}
                    </div>
                </motion.div>

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
                                Gracias por leer y aceptar nuestros Términos y
                                Condiciones
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
                            <Mail className="w-3.5 h-3.5 relative z-10" />
                            <span className="relative z-10">Contáctanos</span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
