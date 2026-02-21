"use client";
import React from "react";
import { heroImages } from "@/constants/constant.js";
import { Carousel } from "@/components/carousel.jsx";
import Marquee from "@/components/Marquee.jsx";

const Hero = () => {
    const slides = heroImages.map((img, idx) => (
        <picture key={idx}>
            <source media="(max-width: 768px)" srcSet={img.src_mobile} />
            <img
                src={img.src_pc}
                className="w-full h-auto md:h-170 rounded-2xl md:rounded-3xl object-cover object-top shadow-lg"
                alt={img.alt}
            />
        </picture>
    ));

    return (
        <div className="mx-auto w-[90%] max-w-350 pt-15 md:pt-10 pb-10">
            <div className="w-full">
                <Carousel
                    slides={slides}
                    autoplayDelay={2500}
                    showPlay={false}
                    showDots={false}
                    showProgress={false}
                />
            </div>
        </div>
    );
}

export default Hero;
