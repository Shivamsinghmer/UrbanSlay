"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { reviews } from "../constants/constant";

const Testimonials = () => {


    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 3 }
        }
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="py-24 px-4 overflow-hidden relative">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl mb-16 font-serif tracking-wide text-gray-900 drop-shadow-xs">
                    Trusted by our community
                </h2>

                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={scrollPrev}
                        className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-black text-white rounded-full cursor-pointer transition-opacity opacity-50 hover:opacity-100 hidden md:block"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-black text-white rounded-full cursor-pointer transition-opacity opacity-50 hover:opacity-100 hidden md:block"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {reviews.map((review, idx) => (
                                <div key={idx} className="flex-[0_0_100%] md:flex-[0_0_33.33%] min-w-0 px-4 py-8">
                                    <div className="flex flex-col items-center h-full bg-white rounded-4xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                                        <div className="flex gap-1 mb-6 text-primary drop-shadow-xs">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <p className="text-base font-medium mb-6 text-gray-900 tracking-wide font-serif">{review.name}</p>
                                        <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs font-light tracking-wide">
                                            {review.text}
                                        </p>
                                        <div className="mt-auto bg-muted/30 rounded-full p-2 pr-6 flex items-center gap-4 cursor-pointer hover:bg-muted/60 transition-colors w-full shadow-sm ring-1 ring-black/5">
                                            <div className="w-12 h-12 bg-white rounded-full overflow-hidden shrink-0 shadow-sm ring-1 ring-black/5">
                                                <Image src={review.img} width={48} height={48} className="object-cover h-full w-full" alt="Product" />
                                            </div>
                                            <span className="text-[11px] font-bold tracking-widest uppercase text-gray-900 line-clamp-1 text-left">{review.product}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <Link href="/reviews">
                        <button className="px-12 py-4 bg-transparent border border-black text-black text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-500 rounded-full shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer">
                            View All Reviews
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
