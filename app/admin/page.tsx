"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    Users, Package, ShoppingCart, DollarSign,
    TrendingUp, Clock, CheckCircle, Truck, XCircle,
    Leaf, LogOut, Home, BarChart3, Settings, FileText
} from "lucide-react"
import { signOut } from "next-auth/react"

interface DashboardData {
    stats: {
        totalUsers: number
        totalProducts: number
        totalOrders: number
        totalRevenue: number
    }
    recentOrders: {
        id: string
        orderNumber: string
        status: string
        total: number
        user: { name: string | null; email: string }
        itemCount: number
        createdAt: string
    }[]
    recentUsers: {
        id: string
        name: string | null
        email: string
        role: string
        createdAt: string
    }[]
    ordersByStatus: { status: string; count: number }[]
    topProducts: { name: string; totalQuantity: number; totalRevenue: number }[]
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    PENDING: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    PAYMENT_PENDING: { label: "Pago Pendiente", color: "bg-orange-100 text-orange-800", icon: Clock },
    PAID: { label: "Pagado", color: "bg-blue-100 text-blue-800", icon: DollarSign },
    PROCESSING: { label: "Procesando", color: "bg-indigo-100 text-indigo-800", icon: Package },
    SHIPPED: { label: "Enviado", color: "bg-purple-100 text-purple-800", icon: Truck },
    DELIVERED: { label: "Entregado", color: "bg-green-100 text-green-800", icon: CheckCircle },
    CANCELLED: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
    REFUNDED: { label: "Reembolsado", color: "bg-gray-100 text-gray-800", icon: XCircle },
}

export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
            return
        }
        if (status === "authenticated" && session?.user?.role !== "ADMIN") {
            router.push("/")
            return
        }
        if (status === "authenticated") {
            fetchDashboard()
        }
    }, [status, session, router])

    const fetchDashboard = async () => {
        try {
            const res = await fetch("/api/admin/dashboard")
            if (res.ok) {
                const json = await res.json()
                setData(json)
            }
        } catch {
            console.error("Error loading dashboard")
        } finally {
            setLoading(false)
        }
    }

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-muted-foreground">Cargando dashboard...</span>
                </div>
            </div>
        )
    }

    const stats = data?.stats || { totalUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 }

    return (
        <div className="min-h-screen bg-[#f4f6f8] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-20">
                <div className="p-6 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2">
                        <Leaf className="h-7 w-7 text-primary" strokeWidth={2.5} />
                        <span className="text-lg font-bold text-gray-900 tracking-tight">Dar Farma</span>
                    </Link>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold mt-1">Panel Admin</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarLink icon={BarChart3} label="Dashboard" href="/admin" active />
                    <SidebarLink icon={Package} label="Productos" href="/admin/productos" />
                    <SidebarLink icon={ShoppingCart} label="Pedidos" href="/admin/pedidos" />
                    <SidebarLink icon={FileText} label="Blog" href="/admin/blog" />
                    <SidebarLink icon={Users} label="Usuarios" href="/admin/usuarios" />
                    <SidebarLink icon={Settings} label="Configuración" href="/admin/configuracion" />
                </nav>

                <div className="p-4 border-t border-gray-100 space-y-2">
                    <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                        <Home className="h-4 w-4" />
                        Ver tienda
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 ml-64 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500">Bienvenido, {session?.user?.name || session?.user?.email}</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <StatCard
                        icon={DollarSign}
                        label="Ingresos Totales"
                        value={`$${stats.totalRevenue.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`}
                        color="bg-emerald-500"
                        delay={0}
                    />
                    <StatCard
                        icon={ShoppingCart}
                        label="Pedidos"
                        value={stats.totalOrders.toString()}
                        color="bg-blue-500"
                        delay={0.05}
                    />
                    <StatCard
                        icon={Users}
                        label="Usuarios"
                        value={stats.totalUsers.toString()}
                        color="bg-violet-500"
                        delay={0.1}
                    />
                    <StatCard
                        icon={Package}
                        label="Productos"
                        value={stats.totalProducts.toString()}
                        color="bg-amber-500"
                        delay={0.15}
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm"
                        >
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <ShoppingCart className="h-4 w-4 text-primary" />
                                    Pedidos Recientes
                                </h2>
                                <span className="text-xs text-gray-400">{data?.recentOrders.length || 0} pedidos</span>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {data?.recentOrders.length === 0 && (
                                    <div className="p-8 text-center text-gray-400 text-sm">
                                        No hay pedidos aún
                                    </div>
                                )}
                                {data?.recentOrders.map((order) => {
                                    const sc = statusConfig[order.status] || statusConfig.PENDING
                                    const StatusIcon = sc.icon
                                    return (
                                        <div key={order.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sc.color}`}>
                                                    <StatusIcon className="h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
                                                    <p className="text-xs text-gray-400">{order.user.name || order.user.email} · {order.itemCount} productos</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</p>
                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sc.color}`}>
                                                    {sc.label}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Orders by Status */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm"
                        >
                            <div className="p-5 border-b border-gray-100">
                                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-primary" />
                                    Estado de Pedidos
                                </h2>
                            </div>
                            <div className="p-5 space-y-3">
                                {data?.ordersByStatus.length === 0 && (
                                    <p className="text-sm text-gray-400 text-center py-4">Sin datos</p>
                                )}
                                {data?.ordersByStatus.map((item) => {
                                    const sc = statusConfig[item.status] || statusConfig.PENDING
                                    const total = stats.totalOrders || 1
                                    const pct = Math.round((item.count / total) * 100)
                                    return (
                                        <div key={item.status}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-medium text-gray-600">{sc.label}</span>
                                                <span className="text-xs font-bold text-gray-900">{item.count}</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-primary rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ duration: 0.8, delay: 0.3 }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Top Products */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm mt-6"
                        >
                            <div className="p-5 border-b border-gray-100">
                                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    Productos Top
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {data?.topProducts.length === 0 && (
                                    <p className="text-sm text-gray-400 text-center py-6">Sin ventas aún</p>
                                )}
                                {data?.topProducts.map((product, i) => (
                                    <div key={product.name} className="px-5 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                                                {i + 1}
                                            </span>
                                            <p className="text-sm font-medium text-gray-700 line-clamp-1">{product.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-gray-900">{product.totalQuantity} vendidos</p>
                                            <p className="text-[10px] text-gray-400">${product.totalRevenue.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Recent Users */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            Usuarios Recientes
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                    <th className="px-5 py-3">Nombre</th>
                                    <th className="px-5 py-3">Email</th>
                                    <th className="px-5 py-3">Rol</th>
                                    <th className="px-5 py-3">Registro</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data?.recentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-5 py-3 text-sm font-medium text-gray-900">{user.name || "—"}</td>
                                        <td className="px-5 py-3 text-sm text-gray-500">{user.email}</td>
                                        <td className="px-5 py-3">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${user.role === "ADMIN" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-gray-400">
                                            {new Date(user.createdAt).toLocaleDateString("es-MX")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

function SidebarLink({ icon: Icon, label, href, active = false }: {
    icon: typeof BarChart3; label: string; href: string; active?: boolean
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                ? "bg-primary/10 text-primary"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    )
}

function StatCard({ icon: Icon, label, value, color, delay }: {
    icon: typeof DollarSign; label: string; value: string; color: string; delay: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
                <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-4 w-4 text-white" />
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </motion.div>
    )
}
