"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ShopByRecipient = () => {
    return (
        <div className="max-w-350 mx-auto px-4 py-24">
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-gray-900 mb-4">
                    The Art of Gifting
                </h2>
                <div className="w-24 h-px bg-[#D4A373] mb-6"></div>
                <p className="text-gray-500 text-xs md:text-sm tracking-[0.25em] uppercase max-w-xl">
                    Find the perfect silhouette for your someone special
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Gifts For Her */}
                <div className="group relative cursor-pointer overflow-hidden rounded-xs ring-1 ring-black/5">
                    <div className="relative aspect-16/10 overflow-hidden">
                        <img
                            src="/landingImage/Bracelet-women.jpeg"
                            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                            alt="Gifts For Her"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                    </div>
                    <Link href="/shop/women">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                        <span className="text-[10px] tracking-[0.3em] uppercase mb-3 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            For Her
                        </span>
                        <h3 className="font-serif text-2xl md:text-4xl font-light tracking-wider mb-6">
                            Gifts For <span className="italic">Her</span>
                        </h3>
                        <button className="px-8 py-3 bg-white text-black text-[10px] font-bold tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 uppercase hover:bg-black hover:text-white">
                            Shop Collection
                        </button>
                    </div>
                    </Link>
                </div>

                {/* Gifts For Him */}
                <div className="group relative cursor-pointer overflow-hidden rounded-xs ring-1 ring-black/5">
                    <div className="relative aspect-16/10 overflow-hidden">
                        <img
                            src="/landingImage/Bracelet-men.jpeg"
                            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                            alt="Gifts For Him"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                    </div>
                    <Link href="/shop/men">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                        <span className="text-[10px] tracking-[0.3em] uppercase mb-3 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            For Him
                        </span>
                        <h3 className="font-serif text-2xl md:text-4xl font-light tracking-wider mb-6">
                            Gifts For <span className="italic">Him</span>
                        </h3>
                        <button className="px-8 py-3 bg-white text-black text-[10px] font-bold tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 uppercase hover:bg-black hover:text-white">
                            Shop Collection
                        </button>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShopByRecipient;
