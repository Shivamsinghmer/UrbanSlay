"use client";
import React from "react";
import Link from "next/link";
import { Gift } from "lucide-react";

export default function GiftHampersPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-muted/10 relative overflow-hidden pt-24 pb-12">

            {/* Soft background radial blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="max-w-xl mx-auto text-center space-y-8 relative z-10 w-full animate-fade-in-up">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
                    <Gift className="w-10 h-10 text-primary drop-shadow-sm" strokeWidth={1.2} />
                </div>

                <h1 className="text-5xl md:text-7xl font-serif tracking-wide text-gray-900 drop-shadow-sm font-medium mb-6">
                    Gift Hampers
                </h1>

                <div className="w-16 h-0.5 bg-primary/60 mx-auto rounded-full mb-8"></div>

                <p className="text-gray-500 tracking-[0.35em] font-medium uppercase text-sm mb-6 drop-shadow-xs">
                    Launching Soon
                </p>

                <p className="text-gray-500 font-light leading-relaxed max-w-sm mx-auto text-sm">
                    We're curating something extraordinary. Handpicked, beautifully packaged, and designed to make every occasion unforgettable. Stay tuned.
                </p>

                <div className="pt-8 block">
                    <Link href="/collections/all" className="inline-block bg-primary text-white px-10 py-4 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-black transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:-translate-y-1">
                        Explore Collections
                    </Link>
                </div>
            </div>
        </div>
    );
}
