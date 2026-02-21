"use client";
import React from "react";
import { Package, Truck, CheckCircle } from "lucide-react";

export default function OrdersPage() {
    return (
        <div className="py-24 px-4 max-w-5xl mx-auto min-h-screen">
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide mb-2 text-[#1a1a1a]">
                Order History
            </h2>
            <p className="text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-12">
                Track and manage your purchases
            </p>

            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <div className="p-8 text-center flex flex-col items-center justify-center min-h-[40vh]">
                    <Package className="w-16 h-16 text-gray-200 mb-6" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-sm text-gray-500 mb-8 max-w-sm">Looks like you haven't made your first purchase yet. Discover our beautiful collections and find something you love.</p>
                    <a href="/" className="px-8 py-3 bg-black text-white text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer rounded-sm">
                        Start Shopping
                    </a>
                </div>
            </div>
        </div>
    );
}
