export interface ProductData {
    id: string
    name: string
    slug: string
    description: string
    shortDesc: string
    category: { name: string; slug: string }
    price: number
    compareAt: number | null
    image: string
    tags: string[]
    isFeatured: boolean
    variant: {
        id: string
        name: string
        sku: string
        price: number
        stock: number
    }
}

export const categories = [
    { name: "Minerales", slug: "minerales" },
    { name: "Proteínas", slug: "proteinas" },
    { name: "Ácidos Grasos", slug: "acidos-grasos" },
    { name: "Rendimiento", slug: "rendimiento" },
]

export const products: ProductData[] = [
    {
        id: "citrato-mag",
        name: "Citrato de Magnesio",
        slug: "citrato-de-magnesio",
        description:
            "Citrato de Magnesio puro sin excipientes. 240 cápsulas para relajación y recuperación muscular. Formulado con ingredientes de grado farmacéutico para máxima absorción y biodisponibilidad.",
        shortDesc:
            "Citrato de Magnesio puro sin excipientes. 240 cápsulas para relajación y recuperación muscular.",
        category: { name: "Minerales", slug: "minerales" },
        price: 349.0,
        compareAt: null,
        image: "/products/citrato.png",
        tags: ["Más vendido"],
        isFeatured: true,
        variant: { id: "v-cmag", name: "240 cápsulas", sku: "DF-CMAG-240", price: 349.0, stock: 100 },
    },
    {
        id: "colageno-hid",
        name: "Colágeno Hidrolizado",
        slug: "colageno-hidrolizado",
        description:
            "Colágeno hidrolizado premium para piel, cabello, uñas y articulaciones saludables. Fórmula de alta absorción con péptidos bioactivos de colágeno tipo I y III.",
        shortDesc:
            "Colágeno hidrolizado premium para piel, cabello, uñas y articulaciones saludables.",
        category: { name: "Proteínas", slug: "proteinas" },
        price: 399.0,
        compareAt: null,
        image: "/products/colageno.png",
        tags: [],
        isFeatured: true,
        variant: { id: "v-colh", name: "Presentación estándar", sku: "DF-COLH-001", price: 399.0, stock: 80 },
    },
    {
        id: "omega-3",
        name: "Omega 3",
        slug: "omega-3",
        description:
            "Ácidos grasos omega-3 de alta pureza para la salud cardiovascular y función cognitiva. Cápsulas con EPA y DHA concentrados de aceite de pescado purificado.",
        shortDesc:
            "Ácidos grasos omega-3 de alta pureza para la salud cardiovascular y función cognitiva.",
        category: { name: "Ácidos Grasos", slug: "acidos-grasos" },
        price: 289.0,
        compareAt: null,
        image: "/products/Omega 3.png",
        tags: [],
        isFeatured: true,
        variant: { id: "v-omg3", name: "Presentación estándar", sku: "DF-OMG3-001", price: 289.0, stock: 120 },
    },
    {
        id: "creatina-mono",
        name: "Creatina Monohidratada",
        slug: "creatina-monohidratada",
        description:
            "Creatina monohidratada de grado farmacéutico para rendimiento y fuerza muscular. Micronizada para una mejor absorción y disolución.",
        shortDesc:
            "Creatina monohidratada de grado farmacéutico para rendimiento y fuerza muscular.",
        category: { name: "Rendimiento", slug: "rendimiento" },
        price: 329.0,
        compareAt: null,
        image: "/products/Creatina-Monohidratada.png",
        tags: ["Nuevo"],
        isFeatured: true,
        variant: { id: "v-crea", name: "Presentación estándar", sku: "DF-CREA-001", price: 329.0, stock: 90 },
    },
    {
        id: "colageno-gluc",
        name: "Colágeno + Glucosamina",
        slug: "colageno-glucosamina",
        description:
            "Fórmula avanzada de colágeno hidrolizado con glucosamina para articulaciones y movilidad. Combinación sinérgica que apoya la salud articular y la regeneración del cartílago.",
        shortDesc:
            "Fórmula avanzada de colágeno hidrolizado con glucosamina para articulaciones y movilidad.",
        category: { name: "Proteínas", slug: "proteinas" },
        price: 449.0,
        compareAt: null,
        image: "/products/Colágeno Hidrolizado + Glucosamina.png",
        tags: [],
        isFeatured: true,
        variant: { id: "v-colg", name: "Presentación estándar", sku: "DF-COLG-001", price: 449.0, stock: 60 },
    },
    {
        id: "magnesio-prem",
        name: "Magnesio Premium",
        slug: "magnesio-premium",
        description:
            "Suplemento alimenticio de Citrato de Magnesio en presentación premium de 240 cápsulas. Formulación de alta concentración para quienes buscan la mejor calidad.",
        shortDesc:
            "Suplemento alimenticio de Citrato de Magnesio en presentación premium de 240 cápsulas.",
        category: { name: "Minerales", slug: "minerales" },
        price: 379.0,
        compareAt: null,
        image: "/products/darfarma-magnesio.png",
        tags: [],
        isFeatured: true,
        variant: { id: "v-magp", name: "240 cápsulas premium", sku: "DF-MAGP-240", price: 379.0, stock: 70 },
    },
]

export function getProductBySlug(slug: string): ProductData | undefined {
    return products.find((p) => p.slug === slug)
}

export function getRecommendedProducts(currentSlug: string): ProductData[] {
    return products.filter((p) => p.slug !== currentSlug).slice(0, 4)
}
