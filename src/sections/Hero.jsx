"use client";
import React from "react";
import { heroImages } from "@/constants/constant.js";
import { Carousel } from "@/components/carousel.jsx";
import Marquee from "@/components/Marquee.jsx";

const Hero = () => {
    const slides = heroImages.map((img, idx) => (
        <div key={idx} className="relative w-[80%] mx-auto overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] bg-black">
            <picture>
                <source media="(max-width: 768px)" srcSet={img.src_mobile} />
                <img
                    src={img.src_pc}
                    className="w-full  block"
                    alt={img.alt || "Hero Banner"}
                />
            </picture>

            {/* Dark overlay gradient for readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end pb-16 md:pb-24 px-6 text-center">
                <h1 className="text-white font-serif text-4xl md:text-6xl lg:text-7xl tracking-wide mb-4 animate-fade-in-up" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                    Elegance, Defined.
                </h1>
                <p className="text-white/90 text-sm md:text-lg mb-8 max-w-lg tracking-widest uppercase font-light animate-fade-in-up animation-delay-150">
                    Discover jewelry that speaks louder than words.
                </p>
                <a href="/collections/best-sellers" className="bg-white/90 backdrop-blur-md text-black px-10 py-4 rounded-full text-xs font-bold tracking-[0.25em] uppercase hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.2)] animate-fade-in-up animation-delay-300 pointer-events-auto">
                    Shop The Collection
                </a>
            </div>
        </div>
    ));

    return (
        <div className="mx-auto w-[95%] max-w-350 pt-20 md:pt-15 pb-10">
            <div className="w-full">
                <Carousel
                    slides={slides}
                    autoplayDelay={4000}
                    showPlay={false}
                    showDots={true}
                    showProgress={false}
                    transition="fade"
                />
            </div>
        </div>
    );
}

export default Hero;
