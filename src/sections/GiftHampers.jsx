"use client";
import React from "react";

const GiftHampers = () => {
    return (
        <div className="max-w-350 mx-auto px-4 py-12 md:py-24">
            <a href="/search?q=hampers" className="block overflow-hidden rounded-4xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 cursor-pointer transition-all duration-700 hover:-translate-y-2 mt-12 mb-12">
                <picture>
                    <source media="(max-width: 768px)" srcSet="/landingImage/GiftHampersmobile.jpg" />
                    <img
                        src="/landingImage/GiftHamper.jpg"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                        alt="Gift Hamper"
                    />
                </picture>
            </a>
        </div>
    );
};

export default GiftHampers;
