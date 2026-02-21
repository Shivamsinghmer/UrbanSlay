"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
    const { wishlist } = useShop();

    return (
        <div className="py-24 px-4 max-w-5xl mx-auto min-h-screen">
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide mb-2 text-[#1a1a1a]">
                Your Wishlist
            </h2>
            <p className="text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-12">
                Pieces you've saved for later
            </p>

            {wishlist.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                    <div className="p-8 text-center flex flex-col items-center justify-center min-h-[40vh]">
                        <Heart className="w-16 h-16 text-gray-200 mb-6" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                        <p className="text-sm text-gray-500 mb-8 max-w-sm">Save your favorite pieces here to easily find them later. Just click the heart icon on any product.</p>
                        <a href="/" className="px-8 py-3 bg-black text-white text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer rounded-sm">
                            Explore Collections
                        </a>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {wishlist.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
