"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X, Leaf, User } from "lucide-react"
import Link from "next/link"

const navLinks = [
    { label: "Productos", href: "#productos" },
    { label: "Sobre Nosotros", href: "/sobre-nosotros" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
]

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
            <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 lg:px-12 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Leaf className="h-7 w-7 text-primary" strokeWidth={2.5} />
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        Dar Farma
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                    ))}
                </nav>

                {/* User + Cart + Mobile Toggle */}
                <div className="flex items-center gap-2">
                    {/* User Button */}
                    <button
                        aria-label="Mi cuenta"
                        className="relative rounded-full p-2 transition-colors hover:bg-primary/10"
                    >
                        <User className="h-5 w-5 text-foreground" />
                    </button>

                    {/* Cart Button */}
                    <button
                        aria-label="Carrito de compras"
                        className="relative rounded-full p-2 transition-colors hover:bg-primary/10"
                    >
                        <ShoppingCart className="h-5 w-5 text-foreground" />
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            0
                        </span>
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                        className="rounded-md p-2 md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5 text-foreground" />
                        ) : (
                            <Menu className="h-5 w-5 text-foreground" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <nav
                    className="border-t border-border/50 bg-background px-6 pb-6 pt-4 md:hidden"
                    aria-label="Navegación móvil"
                >
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    )
}
