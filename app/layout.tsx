import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/json-ld'
import './globals.css'

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://darfarma.com'),
    title: {
        default: 'Dar Farma | Suplementos Naturales para tu Bienestar',
        template: '%s | Dar Farma',
    },
    description:
        'Suplementos naturales premium elaborados en México con los más altos estándares de calidad. Nutracéuticos, creatina y más para tu salud y bienestar.',
    keywords: [
        'suplementos naturales',
        'nutracéuticos',
        'Dar Farma',
        'Darfarma',
        'salud',
        'bienestar',
        'suplementos México',
        'creatina',
        'vitaminas',
        'productos naturales',
    ],
    authors: [{ name: 'Dar Farma' }],
    creator: 'Dar Farma',
    publisher: 'Dar Farma',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'es_MX',
        url: 'https://darfarma.com',
        siteName: 'Dar Farma',
        title: 'Dar Farma | Suplementos Naturales para tu Bienestar',
        description:
            'Suplementos naturales premium elaborados en México con los más altos estándares de calidad.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dar Farma | Suplementos Naturales para tu Bienestar',
        description:
            'Suplementos naturales premium elaborados en México con los más altos estándares de calidad.',
    },
    alternates: {
        canonical: 'https://darfarma.com',
    },
}

export const viewport: Viewport = {
    themeColor: '#0e0e0e',
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
            <body className={`${montserrat.variable} font-sans antialiased`}>
                <OrganizationJsonLd />
                <WebSiteJsonLd />
                {children}
            </body>
        </html>
    )
}
