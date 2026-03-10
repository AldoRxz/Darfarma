/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@prisma/adapter-pg', 'pg', 'bcryptjs'],
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    compress: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'www.instagram.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60 * 60 * 24 * 30,
    },
}

export default nextConfig
