"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ShopByRecipient = () => {
    return (
        <div className="max-w-350 mx-auto px-4 py-24">
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide text-gray-900 mb-6 drop-shadow-xs">
                    The Art of Gifting
                </h2>
                <div className="w-24 h-0.5 bg-primary/60 mb-8 rounded-full"></div>
                <p className="text-gray-500 text-xs md:text-sm tracking-[0.25em] uppercase max-w-xl font-light">
                    Find the perfect silhouette for your someone special
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Gifts For Her */}
                <div className="group relative cursor-pointer overflow-hidden rounded-4xl ring-1 ring-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-700">
                    <div className="relative aspect-16/10 overflow-hidden rounded-4xl">
                        <img
                            src="/landingImage/Bracelet-women.jpeg"
                            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                            alt="Gifts For Her"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-500"></div>
                    </div>
                    <Link href="/shop/women">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                            <span className="text-[10px] tracking-[0.3em] uppercase mb-4 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-md">
                                For Her
                            </span>
                            <h3 className="font-serif text-3xl md:text-5xl font-medium tracking-wider mb-8 drop-shadow-md">
                                Gifts For <span className="italic font-light">Her</span>
                            </h3>
                            <button className="px-10 py-3.5 bg-white text-black text-[10px] font-bold tracking-[0.25em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 uppercase hover:bg-black hover:text-white rounded-full shadow-lg">
                                Shop Collection
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Gifts For Him */}
                <div className="group relative cursor-pointer overflow-hidden rounded-4xl ring-1 ring-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-700">
                    <div className="relative aspect-16/10 overflow-hidden rounded-4xl">
                        <img
                            src="/landingImage/Bracelet-men.jpeg"
                            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                            alt="Gifts For Him"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-500"></div>
                    </div>
                    <Link href="/shop/men">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                            <span className="text-[10px] tracking-[0.3em] uppercase mb-4 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-md">
                                For Him
                            </span>
                            <h3 className="font-serif text-3xl md:text-5xl font-medium tracking-wider mb-8 drop-shadow-md">
                                Gifts For <span className="italic font-light">Him</span>
                            </h3>
                            <button className="px-10 py-3.5 bg-white text-black text-[10px] font-bold tracking-[0.25em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 uppercase hover:bg-black hover:text-white rounded-full shadow-lg">
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
