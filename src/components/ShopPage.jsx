"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Heart, Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";

function ShopContent({ mainCategory, title, description, categories }) {
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get("category");

    const [activeTab, setActiveTab] = useState(categoryQuery ? categoryQuery.replace("-", " ").toUpperCase() : "ALL");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryQuery) {
            setActiveTab(categoryQuery.replace("-", " ").toUpperCase());
        }
    }, [categoryQuery]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();

                // Filter by mainCategory (e.g., "Men", "Women", "Home Decor")
                const filteredByMain = Array.isArray(data)
                    ? data.filter(p => {
                        const mCat = mainCategory?.toLowerCase() || "";
                        const pMainCat = p.mainCategory?.toLowerCase() || "";
                        const pGender = p.gender?.toLowerCase() || "";
                        const pCat = p.category?.toLowerCase() || "";

                        // Match if explicitly matches mainCategory
                        if (pMainCat === mCat || pGender === mCat || pCat === mCat) return true;

                        // Include "both" genders for Men and Women sections
                        if ((mCat === "men" || mCat === "women") && pGender === "both") return true;

                        return false;
                    })
                    : [];

                // If no mainCategory match (e.g. backend doesn't have gender), just use all and rely on subcategory
                const listToUse = filteredByMain.length > 0 ? filteredByMain : Array.isArray(data) ? data : [];
                setProducts(listToUse);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [mainCategory]);

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto min-h-screen">
            <h2 className="text-center font-serif text-3xl md:text-5xl font-light tracking-wide mb-4 text-[#1a1a1a]">
                {title}
            </h2>
            <p className="text-center text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-12">
                {description}
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 border-b border-gray-100 pb-4 px-2">
                <button
                    onClick={() => setActiveTab("ALL")}
                    className={`pb-2 text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 relative cursor-pointer ${activeTab === "ALL" ? "text-black" : "text-gray-400 hover:text-black"
                        }`}
                >
                    ALL
                    {activeTab === "ALL" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black animate-in fade-in slide-in-from-top-1 duration-300"></div>
                    )}
                </button>
                {categories.map((tab) => {
                    const tabKey = tab.toUpperCase();
                    return (
                        <button
                            key={tabKey}
                            onClick={() => setActiveTab(tabKey)}
                            className={`pb-2 text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 relative cursor-pointer ${activeTab === tabKey ? "text-black" : "text-gray-400 hover:text-black"
                                }`}
                        >
                            {tab}
                            {activeTab === tabKey && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black animate-in fade-in slide-in-from-top-1 duration-300"></div>
                            )}
                        </button>
                    );
                })}
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    <p className="text-xs tracking-widest uppercase text-gray-500">Loading {title}...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {(() => {
                        const displayProducts = products.filter(p =>
                            activeTab === "ALL" ||
                            (p.subCategory && p.subCategory.toString().toUpperCase() === activeTab) ||
                            (p.category && p.category.toString().toUpperCase() === activeTab)
                        );

                        if (displayProducts.length === 0) {
                            return (
                                <div className="col-span-full py-20 text-center border border-dashed border-gray-200 rounded-sm bg-gray-50/30">
                                    <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium">
                                        No items found in {activeTab.toLowerCase()}
                                    </p>
                                    <button
                                        onClick={() => setActiveTab("ALL")}
                                        className="mt-4 px-6 py-2 border border-black text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all cursor-pointer shadow-sm">
                                        View All
                                    </button>
                                </div>
                            );
                        }

                        return displayProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ));
                    })()}
                </div>
            )}
        </div>
    );
}

export default function ShopPage(props) {
    return (
        <Suspense fallback={<div className="min-h-screen py-24 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" /></div>}>
            <ShopContent {...props} />
        </Suspense>
    );
}
