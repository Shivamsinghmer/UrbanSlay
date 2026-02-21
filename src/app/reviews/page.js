import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const allReviews = [
    {
        name: "Joshna D.",
        text: '"This piece is just amazing, I want to purchase 1 more set but it was out of stock 😭 😭 😭 I wish I could get more"',
        product: "Nail Bangle Bracelet",
        img: "/landingImage/ring-women.jpeg",
        rating: 5,
        date: "October 12, 2023"
    },
    {
        name: "Amila M.",
        text: '"They are soooo pretty. I always wished to have such earrings in real gold, but gold is sooo expensive now. So I am glad I stumbled into Palmonas. Thank you and keep up the awesome work."',
        product: "Golden Heart Love Hoops",
        img: "/landingImage/ring-women.jpeg",
        rating: 5,
        date: "November 5, 2023"
    },
    {
        name: "Yash K.",
        text: '"My experience was amazing after purchasing this product. I was eagerly waiting to buy this. Price and quality is amazing you can buy it. It\'s give a tough competition to gold products."',
        product: "Small Heart Hoop Earrings",
        img: "/landingImage/ring-women.jpeg",
        rating: 5,
        date: "December 20, 2023"
    },
    {
        name: "Sarah T.",
        text: '"Absolutely gorgeous! The craftsmanship is incredible. It looks so much more expensive than it actually is. Highly recommend!"',
        product: "Diamond Embedded Ring",
        img: "/landingImage/ring-women.jpeg",
        rating: 5,
        date: "January 14, 2024"
    },
    {
        name: "Priya S.",
        text: '"I bought this as a gift for my sister, and she hasn\'t stopped wearing it since. The packaging was also very luxurious. Will definitely order again."',
        product: "Classic Silver Chain",
        img: "/landingImage/ring-women.jpeg",
        rating: 4,
        date: "February 2, 2024"
    },
    {
        name: "Meera R.",
        text: '"I was skeptical about buying jewelry online, but UrbanSlay proved me wrong. Fast delivery and stunning quality. It hasn\'t tarnished at all after weeks of daily wear."',
        product: "Gold Plated Pendant",
        img: "/landingImage/ring-women.jpeg",
        rating: 5,
        date: "February 18, 2024"
    },
    {
        name: "Ayesha N.",
        text: '"The customer service was excellent. I had to exchange a ring size, and they handled it seamlessly. The new ring fits perfectly and sparkles brilliantly."',
        product: "Solitaire Promise Ring",
        img: "/landingImage/ring-women.jpeg",
        rating: 5,
        date: "March 5, 2024"
    },
    {
        name: "Simran J.",
        text: '"Good quality but slightly smaller than I expected based on the pictures. Still very beautiful and perfect for everyday wear."',
        product: "Minimalist Gold Studs",
        img: "/landingImage/ring-women.jpeg",
        rating: 4,
        date: "March 22, 2024"
    },
    {
        name: "Ridhi A.",
        text: '"I am obsessing over these earrings! They instantly elevate any outfit. A must-have for every jewelry lover out there."',
        product: "Chunky Hoop Earrings",
        img: "/landingImage/ring-women.jpeg",
        rating: 5,
        date: "April 10, 2024"
    }
];

export default function ReviewsPage() {
    return (
        <div className="py-24 px-4 bg-[#f8f7fa] min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-[#1a1a1a] mb-4">
                        Customer Reviews
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto uppercase tracking-widest">
                        Hear what our brilliant community has to say about their UrbanSlay experience
                    </p>
                </div>

                {/* Stats Header */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 bg-white p-8 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100">
                    <div className="text-center">
                        <div className="text-5xl font-serif text-[#D4A373] mb-2">4.9</div>
                        <div className="flex gap-1 justify-center text-[#D4A373] mb-2">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-gray-400">Average Rating</div>
                    </div>

                    <div className="hidden md:block w-px h-24 bg-gray-100"></div>

                    <div className="text-center">
                        <div className="text-4xl font-serif text-[#1a1a1a] mb-2">99%</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500 mt-5">Would recommend us</div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {allReviews.map((review, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="font-serif text-lg font-medium text-gray-900">{review.name}</div>
                                    <div className="text-xs text-gray-400 mt-1">{review.date}</div>
                                </div>
                                <div className="flex gap-0.5 text-[#D4A373]">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    {[...Array(5 - review.rating)].map((_, i) => <Star key={i} size={14} className="text-gray-200" />)}
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1 italic">
                                {review.text}
                            </p>

                            <div className="mt-auto bg-[#f8f8f8] rounded-xl p-3 flex items-center gap-4 hover:bg-gray-100 transition-colors">
                                <div className="w-14 h-14 bg-white rounded-lg overflow-hidden shrink-0 shadow-sm">
                                    <img src={review.img} className="object-cover h-full w-full" alt="Product" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Purchased</div>
                                    <div className="text-xs font-medium text-gray-900 tracking-wide line-clamp-1">{review.product}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
