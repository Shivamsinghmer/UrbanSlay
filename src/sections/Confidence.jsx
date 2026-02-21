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
        <div className="bg-[#fcfcfc] py-24 px-4 border-y border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-gray-900 mb-4">
                        Quality You Can Trust
                    </h2>
                    <div className="w-16 h-px bg-[#D4A373] mb-6"></div>
                    <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.3em] uppercase">
                        The UrbanSlay Promise
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="mb-8 relative">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm ring-1 ring-black/5">
                                    <item.icon className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                                </div>
                                <div className="absolute -inset-2 bg-[#D4A373]/5 rounded-full -z-10 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                            </div>
                            <h3 className="text-[11px] font-bold tracking-[0.25em] mb-4 uppercase text-gray-900">{item.title}</h3>
                            <p className="text-[11px] md:text-xs leading-relaxed text-gray-500 max-w-sm tracking-wide">
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
