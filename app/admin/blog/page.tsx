"use client"

import { useEffect, useState, useCallback } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    Leaf, LogOut, Home, BarChart3, Settings, FileText,
    Users, Package, ShoppingCart, Plus, Pencil, Trash2,
    Eye, EyeOff, X, Save, ArrowLeft
} from "lucide-react"
import { signOut } from "next-auth/react"

interface ContentBlock {
    type: "paragraph" | "heading" | "subheading" | "list"
    text?: string
    items?: string[]
}

interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    readTime: string
    image: string
    content: ContentBlock[]
    published: boolean
    author: { name: string | null; email: string }
    createdAt: string
    updatedAt: string
}

const CATEGORIES = ["Nutracéuticos", "Suplementos", "Bienestar", "Deporte", "Salud", "Nutrición"]

export default function AdminBlog() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<BlogPost | null>(null)
    const [creating, setCreating] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)

    // Form state
    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        category: CATEGORIES[0],
        readTime: "5 min",
        image: "",
        published: false,
        content: [{ type: "paragraph" as const, text: "" }] as ContentBlock[],
    })

    useEffect(() => {
        if (status === "unauthenticated") router.push("/login")
        if (status === "authenticated" && session?.user?.role !== "ADMIN") router.push("/")
        if (status === "authenticated") fetchPosts()
    }, [status, session, router])

    const fetchPosts = useCallback(async () => {
        const res = await fetch("/api/admin/blog")
        if (res.ok) {
            const data = await res.json()
            setPosts(data.posts)
        }
        setLoading(false)
    }, [])

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim()
    }

    const openCreate = () => {
        setForm({
            title: "", slug: "", excerpt: "", category: CATEGORIES[0],
            readTime: "5 min", image: "", published: false,
            content: [{ type: "paragraph", text: "" }],
        })
        setEditing(null)
        setCreating(true)
    }

    const openEdit = (post: BlogPost) => {
        setForm({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            category: post.category,
            readTime: post.readTime,
            image: post.image,
            published: post.published,
            content: (post.content as ContentBlock[]) || [{ type: "paragraph", text: "" }],
        })
        setEditing(post)
        setCreating(true)
    }

    const closeForm = () => {
        setCreating(false)
        setEditing(null)
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const url = editing ? `/api/admin/blog/${editing.id}` : "/api/admin/blog"
            const method = editing ? "PUT" : "POST"
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                await fetchPosts()
                closeForm()
            } else {
                const err = await res.json()
                alert(err.error || "Error al guardar")
            }
        } catch {
            alert("Error de conexión")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("¿Eliminar este artículo?")) return
        setDeleting(id)
        try {
            await fetch(`/api/admin/blog/${id}`, { method: "DELETE" })
            await fetchPosts()
        } catch {
            alert("Error al eliminar")
        } finally {
            setDeleting(null)
        }
    }

    const togglePublish = async (post: BlogPost) => {
        await fetch(`/api/admin/blog/${post.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ published: !post.published }),
        })
        await fetchPosts()
    }

    // Content block helpers
    const addBlock = (type: ContentBlock["type"]) => {
        const newBlock: ContentBlock = type === "list"
            ? { type: "list", items: [""] }
            : { type, text: "" }
        setForm({ ...form, content: [...form.content, newBlock] })
    }

    const updateBlock = (idx: number, value: Partial<ContentBlock>) => {
        const content = [...form.content]
        content[idx] = { ...content[idx], ...value }
        setForm({ ...form, content })
    }

    const removeBlock = (idx: number) => {
        setForm({ ...form, content: form.content.filter((_, i) => i !== idx) })
    }

    const addListItem = (blockIdx: number) => {
        const content = [...form.content]
        const items = [...(content[blockIdx].items || []), ""]
        content[blockIdx] = { ...content[blockIdx], items }
        setForm({ ...form, content })
    }

    const updateListItem = (blockIdx: number, itemIdx: number, value: string) => {
        const content = [...form.content]
        const items = [...(content[blockIdx].items || [])]
        items[itemIdx] = value
        content[blockIdx] = { ...content[blockIdx], items }
        setForm({ ...form, content })
    }

    const removeListItem = (blockIdx: number, itemIdx: number) => {
        const content = [...form.content]
        const items = (content[blockIdx].items || []).filter((_, i) => i !== itemIdx)
        content[blockIdx] = { ...content[blockIdx], items }
        setForm({ ...form, content })
    }

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

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
                    <SidebarLink icon={BarChart3} label="Dashboard" href="/admin" />
                    <SidebarLink icon={Package} label="Productos" href="/admin/productos" />
                    <SidebarLink icon={ShoppingCart} label="Pedidos" href="/admin/pedidos" />
                    <SidebarLink icon={FileText} label="Blog" href="/admin/blog" active />
                    <SidebarLink icon={Users} label="Usuarios" href="/admin/usuarios" />
                    <SidebarLink icon={Settings} label="Configuración" href="/admin/configuracion" />
                </nav>
                <div className="p-4 border-t border-gray-100 space-y-2">
                    <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                        <Home className="h-4 w-4" />
                        Ver tienda
                    </Link>
                    <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors w-full">
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 ml-64 p-8">
                <AnimatePresence mode="wait">
                    {!creating ? (
                        /* ─── LIST VIEW ─── */
                        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
                                    <p className="text-sm text-gray-500">{posts.length} artículos</p>
                                </div>
                                <button
                                    onClick={openCreate}
                                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all shadow-md shadow-primary/20"
                                >
                                    <Plus className="h-4 w-4" />
                                    Nuevo Artículo
                                </button>
                            </div>

                            {posts.length === 0 ? (
                                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-medium">No hay artículos aún</p>
                                    <p className="text-gray-400 text-sm mt-1">Crea tu primer artículo del blog</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {posts.map((post) => (
                                        <motion.div
                                            key={post.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:shadow-sm transition-shadow"
                                        >
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                {post.image && (
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <img src={post.image} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-sm font-bold text-gray-900 truncate">{post.title}</h3>
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                                            }`}>
                                                            {post.published ? "Publicado" : "Borrador"}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 truncate">{post.excerpt}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{post.category}</span>
                                                        <span className="text-[10px] text-gray-400">{post.readTime}</span>
                                                        <span className="text-[10px] text-gray-400">{new Date(post.createdAt).toLocaleDateString("es-MX")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                                <button
                                                    onClick={() => togglePublish(post)}
                                                    title={post.published ? "Despublicar" : "Publicar"}
                                                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                                                >
                                                    {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                                <button
                                                    onClick={() => openEdit(post)}
                                                    className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    disabled={deleting === post.id}
                                                    className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        /* ─── CREATE/EDIT FORM ─── */
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <button onClick={closeForm} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                                    </button>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {editing ? "Editar Artículo" : "Nuevo Artículo"}
                                    </h1>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.published}
                                            onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                            className="rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        Publicar
                                    </label>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving || !form.title || !form.slug}
                                        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50 shadow-md shadow-primary/20"
                                    >
                                        <Save className="h-4 w-4" />
                                        {saving ? "Guardando..." : "Guardar"}
                                    </button>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Main Content */}
                                <div className="lg:col-span-2 space-y-4">
                                    {/* Title */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Título</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={(e) => {
                                                setForm({
                                                    ...form,
                                                    title: e.target.value,
                                                    slug: !editing ? generateSlug(e.target.value) : form.slug,
                                                })
                                            }}
                                            placeholder="Título del artículo"
                                            className="w-full text-lg font-bold text-gray-900 border-0 bg-transparent p-0 focus:outline-none focus:ring-0 placeholder:text-gray-300"
                                        />
                                    </div>

                                    {/* Excerpt */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Extracto</label>
                                        <textarea
                                            value={form.excerpt}
                                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                            placeholder="Breve descripción del artículo..."
                                            rows={2}
                                            className="w-full text-sm text-gray-700 border-0 bg-transparent p-0 focus:outline-none focus:ring-0 placeholder:text-gray-300 resize-none"
                                        />
                                    </div>

                                    {/* Content Blocks */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Contenido</label>

                                        <div className="space-y-3">
                                            {form.content.map((block, idx) => (
                                                <div key={idx} className="group relative border border-gray-100 rounded-lg p-3 hover:border-gray-200 transition-colors">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                            {block.type === "paragraph" ? "Párrafo" :
                                                                block.type === "heading" ? "Encabezado" :
                                                                    block.type === "subheading" ? "Subencabezado" : "Lista"}
                                                        </span>
                                                        <button
                                                            onClick={() => removeBlock(idx)}
                                                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 hover:text-red-500 text-gray-300 transition-all"
                                                        >
                                                            <X className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>

                                                    {block.type === "list" ? (
                                                        <div className="space-y-2">
                                                            {(block.items || []).map((item, itemIdx) => (
                                                                <div key={itemIdx} className="flex items-start gap-2">
                                                                    <span className="text-xs text-gray-300 mt-2">•</span>
                                                                    <textarea
                                                                        value={item}
                                                                        onChange={(e) => updateListItem(idx, itemIdx, e.target.value)}
                                                                        placeholder="Elemento de lista..."
                                                                        rows={1}
                                                                        className="flex-1 text-sm text-gray-700 border border-gray-100 rounded-md px-2 py-1.5 focus:outline-none focus:border-primary/30 placeholder:text-gray-300 resize-none"
                                                                    />
                                                                    <button
                                                                        onClick={() => removeListItem(idx, itemIdx)}
                                                                        className="p-1 text-gray-300 hover:text-red-400"
                                                                    >
                                                                        <X className="h-3 w-3" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <button
                                                                onClick={() => addListItem(idx)}
                                                                className="text-xs text-primary hover:underline"
                                                            >
                                                                + Agregar elemento
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <textarea
                                                            value={block.text || ""}
                                                            onChange={(e) => updateBlock(idx, { text: e.target.value })}
                                                            placeholder={block.type === "heading" ? "Encabezado..." : block.type === "subheading" ? "Subencabezado..." : "Escribe el contenido..."}
                                                            rows={block.type === "paragraph" ? 3 : 1}
                                                            className={`w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0 placeholder:text-gray-300 resize-none ${block.type === "heading" ? "text-base font-bold text-gray-900" :
                                                                    block.type === "subheading" ? "text-sm font-semibold text-gray-800" :
                                                                        "text-sm text-gray-700"
                                                                }`}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Add block buttons */}
                                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                                            <button onClick={() => addBlock("paragraph")} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md transition-colors">+ Párrafo</button>
                                            <button onClick={() => addBlock("heading")} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md transition-colors">+ Encabezado</button>
                                            <button onClick={() => addBlock("subheading")} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md transition-colors">+ Subencabezado</button>
                                            <button onClick={() => addBlock("list")} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md transition-colors">+ Lista</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-4">
                                    {/* Slug */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Slug (URL)</label>
                                        <input
                                            type="text"
                                            value={form.slug}
                                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                            placeholder="mi-articulo"
                                            className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                        />
                                        <p className="text-[10px] text-gray-400 mt-1">/blog/{form.slug || "..."}</p>
                                    </div>

                                    {/* Category */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categoría</label>
                                        <select
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                                            className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                        >
                                            {CATEGORIES.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Read Time */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tiempo de lectura</label>
                                        <input
                                            type="text"
                                            value={form.readTime}
                                            onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                                            placeholder="5 min"
                                            className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                        />
                                    </div>

                                    {/* Image */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Imagen (URL)</label>
                                        <input
                                            type="url"
                                            value={form.image}
                                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                        />
                                        {form.image && (
                                            <div className="mt-3 rounded-lg overflow-hidden border border-gray-100">
                                                <img src={form.image} alt="Preview" className="w-full h-32 object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}

function SidebarLink({ icon: Icon, label, href, active = false }: {
    icon: typeof BarChart3; label: string; href: string; active?: boolean
}) {
    return (
        <Link href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    )
}
