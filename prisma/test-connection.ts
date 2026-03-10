import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

console.log("ENV loaded, DATABASE_URL:", process.env.DATABASE_URL ? "EXISTS (length: " + process.env.DATABASE_URL.length + ")" : "MISSING")

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

console.log("PrismaClient instantiated with PrismaPg adapter")

prisma.$queryRaw`SELECT 1 as test`
    .then((result: any) => {
        console.log("✅ Connection successful:", result)
    })
    .catch((e: any) => {
        console.error("❌ Connection failed:", e.message)
    })
    .finally(() => {
        prisma.$disconnect()
    })
