"use client";
import React from "react";
import FAQ from "@/sections/FAQ";

export default function FAQPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-4 text-[#1a1a1a]">Frequently Asked Questions</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm">Everything you need to know</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <FAQ />
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-xl font-serif mb-4">Still have questions?</h3>
                    <p className="text-sm text-gray-500 mb-6">Can't find the answer you're looking for? Please contact our friendly team.</p>
                    <a href="/contact" className="inline-block px-8 py-3 bg-black text-white text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer">
                        Contact Us
                    </a>
                </div>
            </div>
        </main>
    );
}
