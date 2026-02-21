"use client";
import React from "react";
import { MoveRight } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-4">Our Story</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm">Crafting Elegance Since 2024</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative  bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src="https://cdn.shopify.com/s/files/1/0644/2457/5191/files/About_Us_Image_b4672f80-1f13-473e-9dc8-a5513f2b22bf_480x480.webp?v=1699063090"
                            alt="Jewelry making"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl font-serif">Redefining Modern Luxury</h2>
                        <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                            <p>
                                UrbanSlay was born from a simple belief: that luxury should be accessible, and every piece of jewelry should tell a story. We blend traditional craftsmanship with contemporary design to create pieces that resonate with the modern individual.
                            </p>
                            <p>
                                Our journey started when our founders realized a gap in the market for high-quality, ethically sourced, and uniquely designed jewelry that doesn't compromise on aesthetic appeal.
                            </p>
                            <p>
                                Each collection is thoughtfully curated to empower you to express your unique style, whether you're dressing up for a special occasion or elevating your everyday look.
                            </p>
                        </div>

                        <button className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold pb-1 border-b-2 border-black hover:opacity-75 transition-opacity">
                            Explore Collections <MoveRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
