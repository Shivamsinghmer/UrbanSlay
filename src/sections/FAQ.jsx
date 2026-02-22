"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: "How should I care for my UrbanSlay products?",
            a: "Wipe gently with a soft, dry cloth after use. Avoid exposing to water, perfumes, or harsh chemicals. Store items in a dry pouch or box to prevent scratches and tangling."
        },
        {
            q: "Are UrbanSlay products durable for everyday use?",
            a: "Yes, our products are designed for regular wear. Handle with care and avoid excessive force to maintain their finish and shine."
        },
        {
            q: "Does UrbanSlay offer international shipping?",
            a: "Yes, we ship to most countries. Shipping fees and delivery times may vary depending on the destination. Please contact our customer service team for details."
        },
        {
            q: "How can I contact customer service?",
            a: "You can email queries@UrbanSlay.co.in or message us on Instagram. Our team is available 24x7 to assist with any questions or concerns."
        },
        {
            q: "When will my order be delivered?",
            a: "We usually dispatch the same day or within 24 hours if placed late. Delivery time is 1-3 days for metro cities, 3-5 days for most major cities, and 5-8 days for the rest of India. You can check the estimated delivery date on the product page by entering your pincode."
        },
        {
            q: "How can I add products to a gift box?",
            a: "After selecting the product(s), please choose \"Make it a Gift\" on the Checkout Details page. You can also select a personalised card on select products to include your custom message."
        }
    ];

    return (
        <div className="py-24 px-4 max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide text-gray-900 mb-6 drop-shadow-xs">
                    Common Questions
                </h2>
                <div className="w-16 h-0.5 bg-primary/60 mb-8 rounded-full"></div>
                <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.35em] uppercase font-light">
                    Your queries, answered
                </p>
            </div>

            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-black/5 last:border-0 overflow-hidden">
                        <button
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            className="w-full flex justify-between items-center text-left py-6 cursor-pointer group"
                        >
                            <span className={`text-sm md:text-base tracking-wide transition-colors duration-300 font-serif ${openFaq === index ? "text-primary font-medium" : "text-gray-700 group-hover:text-black"}`}>
                                {faq.q}
                            </span>
                            <div className={`p-1.5 rounded-full transition-all duration-500 select-none ${openFaq === index ? "bg-primary text-white rotate-180 shadow-md" : "bg-muted/50 text-gray-400 group-hover:bg-muted group-hover:text-gray-600"}`}>
                                <ChevronDown size={14} />
                            </div>
                        </button>
                        <div
                            className={`transition-all duration-500 ease-in-out ${openFaq === index ? "max-h-75 opacity-100 pb-8" : "max-h-0 opacity-0"}`}
                        >
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed pr-10">
                                {faq.a}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 p-10 bg-muted/30 border border-black/5 rounded-4xl text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <p className="text-sm font-serif text-gray-500 mb-4 tracking-wide">Still have questions?</p>
                <a href="mailto:queries@UrbanSlay.co.in" className="text-[11px] font-bold tracking-[0.25em] uppercase border-b-2 border-transparent hover:border-black/20 pb-1 text-gray-900 hover:text-primary transition-all duration-300">
                    Get in touch with us
                </a>
            </div>
        </div>
    );
};

export default FAQ;
