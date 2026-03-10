import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
    _prisma: PrismaClient | undefined
}

function getClient(): PrismaClient {
    if (globalForPrisma._prisma) return globalForPrisma._prisma

    // Dynamic import of adapter to avoid Turbopack bundling native pg
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaPg } = require("@prisma/adapter-pg")
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
    const client = new PrismaClient({ adapter })

    if (process.env.NODE_ENV !== "production") {
        globalForPrisma._prisma = client
    }

    return client
}

// Use a Proxy so that `prisma.user.findMany()` etc. work seamlessly
// but the actual client is only created on first property access (at runtime, not build time)
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
    get(_target, prop) {
        const client = getClient()
        return Reflect.get(client, prop)
    },
})
