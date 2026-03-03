import { BlogArticle } from "@/lib/blog-data"

export function OrganizationJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Dar Farma",
        alternateName: "DARFARMA",
        url: "https://darfarma.com",
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
            "https://www.instagram.com/darfarma",
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
        datePublished: article.date,
        author: {
            "@type": "Organization",
            name: "Dar Farma",
            url: "https://darfarma.com",
        },
        publisher: {
            "@type": "Organization",
            name: "Dar Farma",
            url: "https://darfarma.com",
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
