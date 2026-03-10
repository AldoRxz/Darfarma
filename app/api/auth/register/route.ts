import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Todos los campos son requeridos" },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "La contraseña debe tener al menos 6 caracteres" },
                { status: 400 }
            )
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "Ya existe una cuenta con ese correo" },
                { status: 409 }
            )
        }

        // Create user
        const passwordHash = await hash(password, 12)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
            },
        })

        return NextResponse.json(
            { message: "Cuenta creada exitosamente", userId: user.id },
            { status: 201 }
        )
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
