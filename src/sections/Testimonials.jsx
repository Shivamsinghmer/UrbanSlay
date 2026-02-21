"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const Testimonials = () => {
    const reviews = [
        {
            name: "Joshna D.",
            text: '"This piece is just amazing, I want to purchase 1 more set but it was out of stock 😭 😭 😭 I wish I could get more"',
            product: "Nail Bangle Bracelet",
            img: "/landingImage/ring-women.jpeg"
        },
        {
            name: "Amila M.",
            text: '"They are soooo pretty. I always wished to have such earrings in real gold, but gold is sooo expensive now. So I am glad I stumbled into Palmonas. Thank you and keep up the awesome work."',
            product: "Golden Heart Love Hoops",
            img: "/landingImage/ring-women.jpeg"
        },
        {
            name: "Yash K.",
            text: '"My experience was amazing after purchasing this product. I was eagerly waiting to buy this. Price and quality is amazing you can buy it. It\'s give a tough competition to gold products."',
            product: "Small Heart Hoop Earrings",
            img: "/landingImage/ring-women.jpeg"
        },
        {
            name: "Joshna D.",
            text: '"This piece is just amazing, I want to purchase 1 more set but it was out of stock 😭 😭 😭 I wish I could get more"',
            product: "Nail Bangle Bracelet",
            img: "/landingImage/ring-women.jpeg"
        },
        {
            name: "Amila M.",
            text: '"They are soooo pretty. I always wished to have such earrings in real gold, but gold is sooo expensive now. So I am glad I stumbled into Palmonas. Thank you and keep up the awesome work."',
            product: "Golden Heart Love Hoops",
            img: "/landingImage/ring-women.jpeg"
        },
        {
            name: "Yash K.",
            text: '"My experience was amazing after purchasing this product. I was eagerly waiting to buy this. Price and quality is amazing you can buy it. It\'s give a tough competition to gold products."',
            product: "Small Heart Hoop Earrings",
            img: "/landingImage/ring-women.jpeg"
        }
    ];

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
        <div className="py-24 px-4 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl mb-16 font-serif tracking-tight text-[#1a5b4f] italic">
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
                                <div key={idx} className="flex-[0_0_100%] md:flex-[0_0_33.33%] min-w-0 px-4">
                                    <div className="flex flex-col items-center h-full">
                                        <div className="flex gap-1 mb-4 text-[#212121]">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                        </div>
                                        <p className="text-sm font-medium mb-4 text-gray-800 tracking-tight">{review.name}</p>
                                        <p className="text-xs text-gray-600 leading-relaxed mb-8 max-w-75">
                                            {review.text}
                                        </p>
                                        <div className="mt-auto bg-[#f8f8f8] rounded-sm p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors w-full max-w-55 shadow-sm">
                                            <div className="w-12 h-12 bg-white rounded-sm overflow-hidden shrink-0">
                                                <Image src={review.img} width={48} height={48} className="object-cover h-full w-full" alt="Product" />
                                            </div>
                                            <span className="text-[10px] font-medium underline tracking-tight text-gray-900 line-clamp-2 text-left">{review.product}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <Link href="/reviews">
                        <button className="px-10 py-3 border border-black text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all cursor-pointer">
                            View All Reviews
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
