export default function sitemap() {
    const baseUrl = 'https://urbanslay.in';

    // Static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/faqs',
        '/shop/men',
        '/shop/women',
        '/collections/best-sellers',
        '/collections/under-149',
        '/collections/under-299',
        '/collections/under-499',
        '/gift-hampers',
        '/search',
        '/privacy-policy',
        '/privacy-policy/terms',
        '/privacy-policy/refund',
        '/privacy-policy/shipping'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
    }));

    // You can also add dynamic routes here if you fetch products from an API,
    // but static routes and top level categories are the most crucial for basic SEO.

    return [...routes];
}
