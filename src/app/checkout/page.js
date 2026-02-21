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
                <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-gray-200 via-gray-900 to-gray-200"></div>

                <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-8 text-black">
                    <Rocket size={40} strokeWidth={1.5} />
                </div>

                <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4 tracking-wide">
                    Launching Soon
                </h1>

                <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    We are putting the final touches on our beautiful new checkout experience. Let's head back to the cart while we polish things up!
                </p>

                <Link
                    href="/account/cart"
                    className="inline-flex items-center justify-center gap-2 w-full py-4 text-[11px] font-bold tracking-[0.2em] uppercase bg-black text-white hover:bg-gray-800 transition-colors rounded-sm group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Bag
                </Link>
            </div>
        </div>
    );
}
