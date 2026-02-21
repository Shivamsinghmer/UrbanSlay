"use client";
import React, { useState } from "react";

export default function PrivacyPolicyPage() {
    const [activeSegment, setActiveSegment] = useState("privacy");

    const segments = [
        { id: "privacy", label: "Privacy Policy" },
        { id: "terms", label: "Terms of Service" },
        { id: "refund", label: "Refund Policy" },
        { id: "shipping", label: "Shipping Policy" },
    ];

    return (
        <main className="min-h-screen pt-24 pb-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-[#1a1a1a]">Our Policies</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm">Everything you need to know about shopping with us</p>
                </div>

                <div className="flex flex-wrap gap-4 mb-10 w-full justify-center">
                    {segments.map(seg => (
                        <button
                            key={seg.id}
                            id={seg.id}
                            onClick={() => setActiveSegment(seg.id)}
                            className={`px-6 py-2 text-xs font-semibold tracking-widest uppercase rounded-sm transition-colors border ${activeSegment === seg.id ? 'bg-black text-white border-black' : 'bg-transparent text-gray-600 border-gray-200 hover:border-gray-400'}`}
                        >
                            {seg.label}
                        </button>
                    ))}
                </div>

                <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed">
                    {activeSegment === "privacy" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <h2>Privacy Policy</h2>
                            <p>Welcome to UrbanSlay. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
                            <h3>Information We Collect</h3>
                            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                            <ul>
                                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                                <li><strong>Financial Data</strong> includes payment card details.</li>
                            </ul>
                            <p>We use this data to process your orders, provide customer support, and improve our services to offer you the best experience.</p>
                        </div>
                    )}

                    {activeSegment === "terms" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <h2>Terms of Service</h2>
                            <p>These terms and conditions outline the rules and regulations for the use of UrbanSlay's Website.</p>
                            <h3>Purchases</h3>
                            <p>If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>
                            <h3>Links To Other Web Sites</h3>
                            <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by UrbanSlay.</p>
                        </div>
                    )}

                    {activeSegment === "refund" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <h2>Refund Policy</h2>
                            <p>We want you to be completely satisfied with your purchase. If you are not entirely happy, we're here to help.</p>
                            <h3>Returns</h3>
                            <p>You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.</p>
                            <h3>Refunds</h3>
                            <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment).</p>
                        </div>
                    )}

                    {activeSegment === "shipping" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <h2>Shipping Policy</h2>
                            <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
                            <h3>Shipping rates & delivery estimates</h3>
                            <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
                            <ul>
                                <li>Standard Delivery: ₹50 (3-5 business days)</li>
                                <li>Free Standard Delivery on orders over ₹600</li>
                                <li>Cash on Delivery is currently available only in Kanpur.</li>
                            </ul>
                            <p>Delivery delays can occasionally occur.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
