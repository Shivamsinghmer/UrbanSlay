"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const PriceCollectionPage = ({ priceLimit, title, description }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                const filteredList = Array.isArray(data)
                    ? data.filter(p => p.price <= priceLimit)
                    : [];
                setProducts(filteredList);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [priceLimit]);

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto min-h-screen">
            <h2 className="text-center font-serif text-3xl md:text-5xl font-light tracking-wide mb-4 text-[#1a1a1a]">
                {title}
            </h2>
            <p className="text-center text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-16">
                {description}
            </p>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-dashed border-gray-200 rounded-sm bg-gray-50/30">
                    <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium">
                        No items found under ₹{priceLimit} at this moment
                    </p>
                </div>
            )}
        </div>
    );
};

export default PriceCollectionPage;
