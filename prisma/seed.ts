import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { hash } from "bcryptjs"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

// Prisma 7 exports enums from the generated client
const Role = { CUSTOMER: "CUSTOMER" as const, ADMIN: "ADMIN" as const }

async function main() {
    console.log("🌱 Seeding database...")

    // ─── Categories ───────────────────────────────
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: "minerales" },
            update: {},
            create: {
                name: "Minerales",
                slug: "minerales",
                description: "Suplementos de minerales esenciales para el bienestar",
                position: 1,
            },
        }),
        prisma.category.upsert({
            where: { slug: "proteinas" },
            update: {},
            create: {
                name: "Proteínas",
                slug: "proteinas",
                description: "Colágeno, proteínas y aminoácidos de alta calidad",
                position: 2,
            },
        }),
        prisma.category.upsert({
            where: { slug: "acidos-grasos" },
            update: {},
            create: {
                name: "Ácidos Grasos",
                slug: "acidos-grasos",
                description: "Omega 3 y ácidos grasos esenciales",
                position: 3,
            },
        }),
        prisma.category.upsert({
            where: { slug: "rendimiento" },
            update: {},
            create: {
                name: "Rendimiento",
                slug: "rendimiento",
                description: "Suplementos para rendimiento deportivo",
                position: 4,
            },
        }),
    ])

    const [minerales, proteinas, acidosGrasos, rendimiento] = categories

    console.log(`✅ Created ${categories.length} categories`)

    // ─── Products (from current hardcoded data) ───
    const productsData = [
        {
            name: "Citrato de Magnesio",
            slug: "citrato-de-magnesio",
            description:
                "Citrato de Magnesio puro sin excipientes. 240 cápsulas para relajación y recuperación muscular. Formulado con ingredientes de grado farmacéutico para máxima absorción y biodisponibilidad.",
            shortDesc:
                "Citrato de Magnesio puro sin excipientes. 240 cápsulas para relajación y recuperación muscular.",
            categoryId: minerales.id,
            isFeatured: true,
            tags: ["Más vendido"],
            variant: {
                name: "240 cápsulas",
                sku: "DF-CMAG-240",
                price: 349.0,
                stock: 100,
                weight: 250,
            },
            image: "/products/citrato.png",
        },
        {
            name: "Colágeno Hidrolizado",
            slug: "colageno-hidrolizado",
            description:
                "Colágeno hidrolizado premium para piel, cabello, uñas y articulaciones saludables. Fórmula de alta absorción con péptidos bioactivos de colágeno tipo I y III.",
            shortDesc:
                "Colágeno hidrolizado premium para piel, cabello, uñas y articulaciones saludables.",
            categoryId: proteinas.id,
            isFeatured: true,
            tags: [],
            variant: {
                name: "Presentación estándar",
                sku: "DF-COLH-001",
                price: 399.0,
                stock: 80,
                weight: 300,
            },
            image: "/products/colageno.png",
        },
        {
            name: "Omega 3",
            slug: "omega-3",
            description:
                "Ácidos grasos omega-3 de alta pureza para la salud cardiovascular y función cognitiva. Cápsulas con EPA y DHA concentrados de aceite de pescado purificado.",
            shortDesc:
                "Ácidos grasos omega-3 de alta pureza para la salud cardiovascular y función cognitiva.",
            categoryId: acidosGrasos.id,
            isFeatured: true,
            tags: [],
            variant: {
                name: "Presentación estándar",
                sku: "DF-OMG3-001",
                price: 289.0,
                stock: 120,
                weight: 200,
            },
            image: "/products/Omega 3.png",
        },
        {
            name: "Creatina Monohidratada",
            slug: "creatina-monohidratada",
            description:
                "Creatina monohidratada de grado farmacéutico para rendimiento y fuerza muscular. Micronizada para una mejor absorción y disolución.",
            shortDesc:
                "Creatina monohidratada de grado farmacéutico para rendimiento y fuerza muscular.",
            categoryId: rendimiento.id,
            isFeatured: true,
            tags: ["Nuevo"],
            variant: {
                name: "Presentación estándar",
                sku: "DF-CREA-001",
                price: 329.0,
                stock: 90,
                weight: 350,
            },
            image: "/products/Creatina-Monohidratada.png",
        },
        {
            name: "Colágeno + Glucosamina",
            slug: "colageno-glucosamina",
            description:
                "Fórmula avanzada de colágeno hidrolizado con glucosamina para articulaciones y movilidad. Combinación sinérgica que apoya la salud articular y la regeneración del cartílago.",
            shortDesc:
                "Fórmula avanzada de colágeno hidrolizado con glucosamina para articulaciones y movilidad.",
            categoryId: proteinas.id,
            isFeatured: true,
            tags: [],
            variant: {
                name: "Presentación estándar",
                sku: "DF-COLG-001",
                price: 449.0,
                stock: 60,
                weight: 280,
            },
            image: "/products/Colágeno Hidrolizado + Glucosamina.png",
        },
        {
            name: "Magnesio Premium",
            slug: "magnesio-premium",
            description:
                "Suplemento alimenticio de Citrato de Magnesio en presentación premium de 240 cápsulas. Formulación de alta concentración para quienes buscan la mejor calidad.",
            shortDesc:
                "Suplemento alimenticio de Citrato de Magnesio en presentación premium de 240 cápsulas.",
            categoryId: minerales.id,
            isFeatured: true,
            tags: [],
            variant: {
                name: "240 cápsulas premium",
                sku: "DF-MAGP-240",
                price: 379.0,
                stock: 70,
                weight: 260,
            },
            image: "/products/darfarma-magnesio.png",
        },
    ]

    for (const data of productsData) {
        const product = await prisma.product.upsert({
            where: { slug: data.slug },
            update: {},
            create: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                shortDesc: data.shortDesc,
                categoryId: data.categoryId,
                isFeatured: data.isFeatured,
                tags: data.tags,
                metaTitle: `${data.name} | Dar Farma`,
                metaDescription: data.shortDesc,
                variants: {
                    create: {
                        name: data.variant.name,
                        sku: data.variant.sku,
                        price: data.variant.price,
                        stock: data.variant.stock,
                        weight: data.variant.weight,
                        isDefault: true,
                    },
                },
                images: {
                    create: {
                        url: data.image,
                        alt: `Suplemento natural Dar Farma - ${data.name}`,
                        position: 0,
                    },
                },
            },
        })
        console.log(`  📦 Product: ${product.name}`)
    }

    console.log(`✅ Created ${productsData.length} products with variants and images`)

    // ─── Admin user ───────────────────────────────
    const adminPassword = await hash("admin123", 12)
    const admin = await prisma.user.upsert({
        where: { email: "admin@darfarma.com" },
        update: {},
        create: {
            email: "admin@darfarma.com",
            name: "Admin Dar Farma",
            passwordHash: adminPassword,
            role: Role.ADMIN,
            emailVerified: new Date(),
        },
    })
    console.log(`✅ Admin user created: ${admin.email}`)

    // ─── Sample coupon ────────────────────────────
    const coupon = await prisma.coupon.upsert({
        where: { code: "BIENVENIDO10" },
        update: {},
        create: {
            code: "BIENVENIDO10",
            type: "PERCENTAGE",
            value: 10,
            minPurchase: 500,
            isActive: true,
        },
    })
    console.log(`✅ Sample coupon created: ${coupon.code} (10% off)`)

    // ─── Blog Posts ──────────────────────────────
    const { blogArticles } = await import("../lib/blog-data")
    let blogCount = 0
    for (const article of blogArticles) {
        await prisma.blogPost.upsert({
            where: { slug: article.slug },
            update: {},
            create: {
                slug: article.slug,
                title: article.title,
                excerpt: article.excerpt,
                category: article.category,
                readTime: article.readTime,
                image: article.image,
                content: article.content,
                published: true,
                authorId: admin.id,
            },
        })
        blogCount++
    }
    console.log(`✅ Seeded ${blogCount} blog articles`)

    console.log("\n🎉 Seeding completed!")
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
