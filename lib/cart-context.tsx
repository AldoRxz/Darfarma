"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

export interface CartItem {
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
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
    removeItem: (variantId: string) => void
    updateQuantity: (variantId: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [loaded, setLoaded] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("darfarma-cart")
            if (saved) {
                setItems(JSON.parse(saved))
            }
        } catch {
            // ignore parse errors
        }
        setLoaded(true)
    }, [])

    // Save to localStorage on changes
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("darfarma-cart", JSON.stringify(items))
        }
    }, [items, loaded])

    const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
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
    }, [])

    const removeItem = useCallback((variantId: string) => {
        setItems((prev) => prev.filter((i) => i.variantId !== variantId))
    }, [])

    const updateQuantity = useCallback((variantId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((i) => i.variantId !== variantId))
        } else {
            setItems((prev) =>
                prev.map((i) =>
                    i.variantId === variantId ? { ...i, quantity } : i
                )
            )
        }
    }, [])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
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
