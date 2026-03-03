import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Dar Farma - Suplementos Naturales',
        short_name: 'Dar Farma',
        description:
            'Suplementos naturales premium elaborados en México con los más altos estándares de calidad.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0e0e0e',
        theme_color: '#7ecc5c',
        icons: [
            {
                src: '/images/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
