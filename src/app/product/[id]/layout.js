export async function generateMetadata({ params }) {
    // Note: In a real DB, you'd fetch the product here to get its title and description.
    // We don't have direct access here without fetching, but we can do a quick fetch
    try {
        const { id } = await params;
        const res = await fetch(`https://urbanslay.in/api/products/${id}`);
        if (!res.ok) return { title: "Product Not Found | UrbanSlay" };
        const product = await res.json();

        return {
            title: `${product.name} | UrbanSlay`,
            description: product.description || `Buy trendy ${product.name} at affordable price. Lightweight daily wear jewellery. Free shipping across India.`,
        };
    } catch (e) {
        return {
            title: "UrbanSlay Product",
        };
    }
}

export default function ProductLayout({ children }) {
    return <>{children}</>;
}
