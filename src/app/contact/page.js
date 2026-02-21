"use client";
import React from "react";
import { MoveRight, Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-4">Get in Touch</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm">We'd Love to Hear Form You</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">Our Studio</h4>
                                        <p className="text-gray-600">123 Design District,<br />Kanpur, UP 208001<br />India</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="w-5 h-5 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">Phone</h4>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="w-5 h-5 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">Email</h4>
                                        <p className="text-gray-600">hello@urbanslay.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h3 className="text-lg font-serif mb-4">Customer Support Hours</h3>
                            <p className="text-sm text-gray-600 mb-2">Monday - Friday: 10:00 AM - 6:00 PM (IST)</p>
                            <p className="text-sm text-gray-600">Saturday: 10:00 AM - 2:00 PM (IST)</p>
                        </div>
                    </div>

                    <form className="space-y-6 bg-white shadow-xl p-8 rounded-xl border border-gray-100">
                        <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>
                        <div>
                            <label htmlFor="name" className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">Full Name</label>
                            <input type="text" id="name" className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors rounded-sm" placeholder="John Doe" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">Email Address</label>
                            <input type="email" id="email" className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors rounded-sm" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">Message</label>
                            <textarea id="message" rows="5" className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors rounded-sm" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-black text-white font-semibold py-4 hover:bg-gray-800 transition-colors tracking-widest text-sm uppercase rounded-sm flex justify-center items-center gap-2">
                            Send Message <MoveRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
