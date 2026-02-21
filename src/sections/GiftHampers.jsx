"use client";
import React from "react";

const GiftHampers = () => {
    return (
        <div className="max-w-350 mx-auto px-4 py-12 md:py-24">
            <a href="/search?q=hampers" className="block overflow-hidden rounded-xs shadow-sm ring-1 ring-black/5 cursor-pointer">
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
