"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const TopProducts = () => {
    const [activeTab, setActiveTab] = useState("ALL");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();

                // Fetch products that are either marked as isTopProduct OR bestSeller
                const bestsellerList = Array.isArray(data)
                    ? data.filter(p => p.isTopProduct || p.bestSeller)
                    : [];

                // Shuffle the products on fetch to show a random order
                const shuffled = [...bestsellerList].sort(() => Math.random() - 0.5);
                setProducts(shuffled);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const tabs = ["ALL", "NECKLACE SETS", "BRACELETS", "EARRINGS", "RINGS", "PENDANTS", "CHAINS"];

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                <p className="text-xs tracking-widest uppercase text-gray-500">Loading Collections...</p>
            </div>
        );
    }

    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
            <h2 className="text-center font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide mb-6 text-[#1a1a1a]">
                Our Bestsellers
            </h2>
            <p className="text-center text-gray-500 text-xs md:text-sm tracking-[0.25em] uppercase mb-16 font-light">
                Timeless pieces loved by you
            </p>

            {/* Filter Tabs - More refined styling */}
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

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {(() => {
                    const filtered = products.filter(p =>
                        activeTab === "ALL" ||
                        (p.category && p.category.toString().toUpperCase() === activeTab.toUpperCase())
                    ).slice(0, 4);

                    if (filtered.length === 0) {
                        return (
                            <div className="col-span-full py-20 text-center border border-dashed border-gray-200 rounded-sm bg-gray-50/30">
                                <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium">
                                    No bestseller {activeTab.toLowerCase()} currently available
                                </p>
                                <p className="text-[9px] text-gray-400 mt-2 tracking-widest uppercase">
                                    Explore our other collections
                                </p>
                            </div>
                        );
                    }

                    return filtered.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ));
                })()}
            </div>

            <div className="flex justify-center mt-20">
                <Link href="/collections/best-sellers">
                    <button className="px-12 py-4 border border-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-500 ease-in-out cursor-pointer shadow-sm">
                        Discover All Collections
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TopProducts;
