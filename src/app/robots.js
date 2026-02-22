export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/account/', '/api/', '/checkout/'],
        },
        sitemap: 'https://urbanslay.in/sitemap.xml',
    }
}
