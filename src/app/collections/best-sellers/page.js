"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function BestSellersPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("ALL");

    const tabs = ["ALL", "NECKLACE SETS", "BRACELETS", "EARRINGS", "RINGS", "PENDANTS", "CHAINS"];

    const filteredProducts = products.filter(p =>
        activeTab === "ALL" ||
        (p.category && p.category.toString().toUpperCase() === activeTab.toUpperCase())
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                const bestsellerList = Array.isArray(data)
                    ? data.filter(p => p.isTopProduct || p.bestSeller)
                    : [];
                setProducts(bestsellerList);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto min-h-screen">
            <h2 className="text-center font-serif text-3xl md:text-5xl font-light tracking-wide mb-4 text-[#1a1a1a]">
                Our Bestsellers
            </h2>
            <p className="text-center text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-16">
                Timeless pieces loved by you
            </p>

            {/* filter */}
            <div className="flex flex-wrap justify-center gap-6 mb-16 border-b border-gray-100 pb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 relative cursor-pointer ${activeTab === tab
                            ? "text-black"
                            : "text-gray-400 hover:text-black"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black animate-in fade-in slide-in-from-top-1 duration-300"></div>
                        )}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    <p className="text-xs tracking-widest uppercase text-gray-500">Loading Bestsellers...</p>
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-dashed border-gray-200 rounded-sm bg-gray-50/30">
                    <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium">
                        {products.length === 0 ? "No bestsellers found at this moment" : `No bestsellers found in ${activeTab.toLowerCase()}`}
                    </p>
                </div>
            )}
        </div>
    );
}
