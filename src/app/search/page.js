"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/products");
                const data = await res.json();

                // Search in title, category, subCategory, mainCategory, gender
                const searchQuery = query.toLowerCase();
                const results = Array.isArray(data) ? data.filter(p => {
                    const match = (p.name && p.name.toLowerCase().includes(searchQuery)) ||
                        (p.category && p.category.toLowerCase().includes(searchQuery)) ||
                        (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery)) ||
                        (p.mainCategory && p.mainCategory.toLowerCase().includes(searchQuery)) ||
                        (p.gender && p.gender.toLowerCase().includes(searchQuery));

                    if (match) return true;

                    // Include "both" genders for Men and Women searches
                    const isMenOrWomenSearch = ["men", "women", "mens", "womens", "men's", "women's"].includes(searchQuery);
                    if (isMenOrWomenSearch && p.gender && p.gender.toLowerCase() === "both") {
                        return true;
                    }

                    return false;
                }) : [];

                setProducts(results);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query]);

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto min-h-screen">
            <h2 className="text-center font-serif text-3xl md:text-5xl font-light tracking-wide mb-4 text-[#1a1a1a]">
                Search Results
            </h2>
            <p className="text-center text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-12">
                {query ? `Showing results for "${query}"` : "Discover our collections"}
            </p>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    <p className="text-xs tracking-widest uppercase text-gray-500">Searching...</p>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-dashed border-gray-200 rounded-sm bg-gray-50/30 flex flex-col items-center justify-center">
                    <Search className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-xs md:text-sm text-gray-500 tracking-[0.2em] uppercase font-medium">
                        We couldn't find any matches for "{query}"
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2 tracking-widest uppercase">
                        Try a different search term or check out our bestsellers
                    </p>
                    <a href="/" className="mt-6 inline-block px-8 py-3 bg-black text-white text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer">
                        Back to Home
                    </a>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>}>
            <SearchContent />
        </Suspense>
    );
}
