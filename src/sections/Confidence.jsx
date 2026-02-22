"use client";
import React from "react";
import { Smile, Zap, Gem } from "lucide-react";

const Confidence = () => {
    const items = [
        {
            icon: Smile,
            title: "Skin Safe",
            description: "Our jewelry is hypoallergenic and skin-safe, crafted with care to ensure comfort for all skin types. Enjoy beautiful, irritation-free wear every day, knowing each piece is designed with your well-being in mind."
        },
        {
            icon: Zap,
            title: "18K Gold Vermeil",
            description: "Our jewelry is crafted from premium metals like surgical steel, sterling silver, and thick 18k gold plating, ensuring durability and lasting shine. Experience luxury and quality with every piece, designed to stand the test of time."
        },
        {
            icon: Gem,
            title: "Authentic Diamonds",
            description: "Our lab-grown diamonds are SGL Certified, ensuring the highest standards of quality and authenticity same like natural diamonds. Each diamond undergoes rigorous testing to guarantee its brilliance and ethical origins. Shine with confidence in every sparkly moment."
        }
    ];

    return (
        <div className="bg-muted/30 py-24 px-4 overflow-hidden relative">
            {/* Soft background radial blur */}
            <div className="absolute top-0 right-0 w-full max-w-3xl aspect-square bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center mb-20 text-center">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide text-gray-900 mb-6 drop-shadow-xs">
                        Quality You Can Trust
                    </h2>
                    <div className="w-16 h-0.5 bg-primary/60 mb-8 rounded-full"></div>
                    <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.35em] font-light uppercase">
                        The UrbanSlay Promise
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="mb-10 relative">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center transition-all duration-700 group-hover:scale-110 shadow-[0_4px_24px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/5 z-10 relative">
                                    <item.icon className="w-10 h-10 text-primary drop-shadow-sm transition-transform duration-700 group-hover:scale-110" strokeWidth={1.2} />
                                </div>
                                <div className="absolute -inset-4 bg-primary/5 rounded-full z-0 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                            </div>
                            <h3 className="text-xs md:text-sm font-bold tracking-[0.25em] mb-4 uppercase text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-[12px] md:text-[13px] leading-relaxed text-gray-500 max-w-sm tracking-wide font-light">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Confidence;
