"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { useSession } from "next-auth/react"

export interface CartItem {
    id?: string
    productId: string
    variantId: string
    name: string
    variantName: string
    price: number
    image: string
    slug: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "quantity" | "id">, quantity?: number) => void
    removeItem: (variantId: string) => void
    updateQuantity: (variantId: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
    loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession()
    const [items, setItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(false)

    // Fetch cart from DB when user logs in
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            fetchCart()
        }
        if (status === "unauthenticated") {
            setItems([])
        }
    }, [status, session?.user])

    const fetchCart = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/cart")
            const data = await res.json()
            setItems(data.items || [])
        } catch {
            console.error("Error fetching cart")
        } finally {
            setLoading(false)
        }
    }

    const addItem = useCallback(async (item: Omit<CartItem, "quantity" | "id">, quantity = 1) => {
        // Optimistic update
        setItems((prev) => {
            const existing = prev.find((i) => i.variantId === item.variantId)
            if (existing) {
                return prev.map((i) =>
                    i.variantId === item.variantId
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                )
            }
            return [...prev, { ...item, quantity }]
        })

        // Persist to DB
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ variantId: item.variantId, quantity }),
            })

            if (!res.ok) {
                // Rollback on error
                await fetchCart()
            }
        } catch {
            await fetchCart()
        }
    }, [])

    const removeItem = useCallback(async (variantId: string) => {
        // Optimistic update
        setItems((prev) => prev.filter((i) => i.variantId !== variantId))

        try {
            await fetch("/api/cart", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ variantId }),
            })
        } catch {
            await fetchCart()
        }
    }, [])

    const updateQuantity = useCallback(async (variantId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(variantId)
            return
        }

        // Optimistic update
        setItems((prev) =>
            prev.map((i) =>
                i.variantId === variantId ? { ...i, quantity } : i
            )
        )

        try {
            await fetch("/api/cart", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ variantId, quantity }),
            })
        } catch {
            await fetchCart()
        }
    }, [removeItem])

    const clearCart = useCallback(async () => {
        // Remove all items one by one
        const variantIds = items.map(i => i.variantId)
        setItems([])
        for (const variantId of variantIds) {
            await fetch("/api/cart", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ variantId }),
            }).catch(() => { })
        }
    }, [items])

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, loading }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
