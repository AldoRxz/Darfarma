import { BlogArticle } from "@/lib/blog-data"

export function OrganizationJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Dar Farma",
        alternateName: "DARFARMA",
        url: "https://darfarma.com",
        logo: "https://darfarma.com/images/og-image.png",
        description:
            "Empresa mexicana de suplementos naturales y nutracéuticos elaborados con los más altos estándares de calidad.",
        contactPoint: {
            "@type": "ContactPoint",
            email: "contacto@darfarma.com",
            telephone: "+523335060196",
            contactType: "customer service",
            availableLanguage: "Spanish",
        },
        sameAs: [
            "https://www.instagram.com/darfarmaoficial",
            "https://www.facebook.com/darfarma",
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

export function WebSiteJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Dar Farma",
        url: "https://darfarma.com",
        inLanguage: "es-MX",
        description:
            "Suplementos naturales premium elaborados en México con los más altos estándares de calidad.",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: "https://darfarma.com/blog?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

export function ArticleJsonLd({ article }: { article: BlogArticle }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.dateISO,
        dateModified: article.dateISO,
        image: "https://darfarma.com/images/og-image.png",
        author: {
            "@type": "Organization",
            name: "Dar Farma",
            url: "https://darfarma.com",
        },
        publisher: {
            "@type": "Organization",
            name: "Dar Farma",
            url: "https://darfarma.com",
            logo: {
                "@type": "ImageObject",
                url: "https://darfarma.com/images/og-image.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://darfarma.com/blog/${article.slug}`,
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

interface BreadcrumbItem {
    name: string
    href: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `https://darfarma.com${item.href}`,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

interface ProductData {
    name: string
    description: string
    price: string
    image: string
}

export function ProductJsonLd({ products }: { products: ProductData[] }) {
    const jsonLd = products.map((product) => ({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: `https://darfarma.com${product.image}`,
        brand: {
            "@type": "Brand",
            name: "Dar Farma",
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "MXN",
            price: product.price.replace("$", "").replace(",", ""),
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "Dar Farma",
            },
        },
    }))

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
