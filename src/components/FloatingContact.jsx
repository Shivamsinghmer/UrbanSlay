"use client";
import React, { useState, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Mail, X, Send, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useAuth, useClerk } from "@clerk/nextjs";

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    // EmailJS Form State
    const form = useRef();
    const [status, setStatus] = useState(null);

    const { isSignedIn } = useAuth();
    const clerk = useClerk();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isOpen) setIsEmailModalOpen(false);
    };

    const handleWhatsApp = () => {
        if (!isSignedIn) {
            clerk.openSignIn();
            return;
        }
        window.open('https://wa.me/919451201779', '_blank');
        setIsOpen(false);
    };

    const handleEmailClick = () => {
        if (!isSignedIn) {
            clerk.openSignIn();
            return;
        }
        setIsEmailModalOpen(true);
        setIsOpen(false);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        // IMPORTANT: Ensure you have NEXT_PUBLIC_SERVICE_ID, NEXT_PUBLIC_TEMPLATE_ID, and NEXT_PUBLIC_PUBLIC_KEY in your .env.local
        const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID || 'YOUR_SERVICE_ID';
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                setStatus('success');
                setTimeout(() => {
                    setIsEmailModalOpen(false);
                    setStatus(null);
                    if (form.current) form.current.reset();
                }, 2000);
            }, (error) => {
                console.error("EmailJS Error Response:", error);
                setStatus('error');
            });
    };

    return (
        <>
            {/* Floating Action Button Group */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
                {/* Secondary Buttons (Expanded) */}
                <div className={`flex flex-col gap-4 transition-all duration-300 ease-out origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10 pointer-events-none'}`}>

                    {/* WhatsApp Button */}
                    <button
                        onClick={handleWhatsApp}
                        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer relative group"
                        aria-label="Contact via WhatsApp"
                    >
                        <FaWhatsapp size={24} />
                        <span className="absolute right-14 bg-black/80 text-white text-xs px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            WhatsApp Us
                        </span>
                    </button>

                    {/* Email Button */}
                    <button
                        onClick={handleEmailClick}
                        className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer relative group"
                        aria-label="Contact via Email"
                    >
                        <Mail size={20} />
                        <span className="absolute right-14 bg-black/80 text-white text-xs px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Email Us
                        </span>
                    </button>

                </div>

                {/* Primary Toggle Button */}
                <button
                    onClick={toggleMenu}
                    className="w-14 h-14 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-black transition-all duration-300 cursor-pointer"
                    aria-label="Contact Us"
                >
                    {isOpen ? <X size={24} className="animate-in fade-in zoom-in duration-300" /> : <MessageCircle size={24} className="animate-in fade-in zoom-in duration-300" />}
                </button>
            </div>

            {isEmailModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl relative animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsEmailModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-serif text-gray-900 mb-2">Send us a message</h2>
                            <p className="text-sm text-gray-500">We'd love to hear from you. Fill out the form below and we'll reply as soon as possible.</p>
                        </div>

                        <form ref={form} onSubmit={sendEmail} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    required
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="from_email"
                                    required
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
                                    placeholder="Your phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
                                    placeholder="What is this regarding?"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 ${status === 'success' ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
                            >
                                {status === 'sending' ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </span>
                                ) : status === 'success' ? (
                                    <span>Sent Successfully!</span>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Message
                                    </>
                                )}
                            </button>
                            {status === 'error' && (
                                <p className="text-xs text-red-500 text-center mt-2">Oops! Something went wrong. Please check your EmailJS configurations.</p>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
