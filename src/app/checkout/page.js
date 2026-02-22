"use client";
import React from "react";
import { ArrowLeft, Rocket } from "lucide-react";
import Link from "next/link";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

export default function CheckoutPage() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return (
            <div className="flex h-[80vh] items-center justify-center bg-[#f8f7fa]">
                <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-[#f8f7fa] text-center">
            <div className="bg-white p-10 md:p-14 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 max-w-lg w-full relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-emerald-400 via-emerald-600 to-emerald-400"></div>

                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-sm border border-emerald-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4 tracking-wide">
                    Thank You!
                </h1>

                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-emerald-600 mb-6 drop-shadow-xs">
                    Order Placed Successfully
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    We've received your order and are getting it ready to be shipped. We will notify you once it's on its way!
                </p>

                <div className="flex flex-col gap-4">
                    <Link
                        href="/account/orders"
                        className="inline-flex items-center justify-center gap-2 w-full py-4 text-[11px] font-bold tracking-[0.2em] uppercase bg-black text-white hover:bg-gray-800 transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] rounded-xl group"
                    >
                        View Order History
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Link>

                    <Link
                        href="/collections/best-sellers"
                        className="inline-flex items-center justify-center gap-2 w-full py-4 text-[11px] font-bold tracking-[0.2em] uppercase bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors rounded-xl border border-gray-200"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
