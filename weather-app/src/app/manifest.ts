import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Vibe Weather',
        short_name: 'VibeWeather',
        description: 'Immersive Weather Experience',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        icons: [
            {
                src: '/next.svg',
                sizes: '192x192',
                type: 'image/svg+xml',
            },
            {
                src: '/next.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
            },
        ],
    }
}
