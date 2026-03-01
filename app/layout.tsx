import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Dar Farma | Suplementos Naturales para tu Bienestar',
    description:
        'Suplementos naturales premium para ayudarte a sentirte mejor. Dar Farma, para estar bien.',
}

export const viewport: Viewport = {
    themeColor: '#fcf4ff',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
            <body className={`${montserrat.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    )
}
