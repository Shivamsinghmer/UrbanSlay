"use client";
import React, { useState } from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart } = useShop();
    const { isSignedIn } = useAuth();
    const clerk = useClerk();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("online"); // "online" or "cod"

    const cartTotalAmount = cart.reduce(
        (acc, item) => acc + (item.price || 0) * item.quantity,
        0
    );

    const shippingCost = cartTotalAmount < 600 ? 80 : 0;
    const codFee = paymentMethod === "cod" ? 40 : 0;
    const finalTotal = cartTotalAmount + shippingCost + codFee;

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto min-h-screen">
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-2 text-[#1a1a1a]">
                Your Bag
            </h2>
            <p className="text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-12">
                Items you've added to your cart
            </p>

            {cart.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                    <div className="p-8 text-center flex flex-col items-center justify-center min-h-[40vh]">
                        <ShoppingCart className="w-16 h-16 text-gray-200 mb-6" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your bag is empty</h3>
                        <p className="text-sm text-gray-500 mb-8 max-w-sm">Looks like you haven't made your choice yet. Explore our stunning collections to find what you're looking for.</p>
                        <a href="/" className="px-8 py-3 bg-black text-white text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer rounded-sm">
                            Explore Collections
                        </a>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {cart.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="bg-[#f9f9f9] rounded-xl p-8 sticky top-32 border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-serif mb-6 tracking-wide">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal ({cart.length} items)</span>
                                    <span>₹{cartTotalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Shipping</span>
                                    {shippingCost === 0 ? (
                                        <span className="text-emerald-600 font-medium">Free</span>
                                    ) : (
                                        <span>₹{shippingCost}</span>
                                    )}
                                </div>
                                {paymentMethod === "cod" && (
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>COD Fee</span>
                                        <span>₹{codFee}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <h4 className="text-xs font-bold tracking-widest uppercase mb-3 text-gray-800">Payment Method</h4>
                                <div className="space-y-2">
                                    <label className={`block border cursor-pointer p-3 rounded-sm transition-colors ${paymentMethod === 'online' ? 'border-black bg-black/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="online"
                                                checked={paymentMethod === 'online'}
                                                onChange={() => setPaymentMethod('online')}
                                                className="accent-black"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold">Pay Online</span>
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">UPI, Cards, Netbanking</span>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`block border cursor-pointer p-3 rounded-sm transition-colors ${paymentMethod === 'cod' ? 'border-black bg-black/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="payment_method"
                                                    value="cod"
                                                    checked={paymentMethod === 'cod'}
                                                    onChange={() => setPaymentMethod('cod')}
                                                    className="accent-black"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">Cash on Delivery</span>
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Pay when you receive</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-semibold text-gray-600">+₹40</span>
                                        </div>
                                    </label>
                                </div>
                                {cartTotalAmount < 600 && (
                                    <p className="text-[10px] text-red-500 mt-2 tracking-wide font-medium">
                                        Add ₹{(600 - cartTotalAmount).toLocaleString()} more for free shipping!
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-6 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-base font-semibold">Total</span>
                                    <span className="text-2xl font-semibold">₹{finalTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 tracking-widest uppercase">
                                    Includes all taxes
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    if (!isSignedIn) {
                                        clerk.openSignIn();
                                        return;
                                    }
                                    router.push("/checkout");
                                }}
                                className="w-full bg-black text-white py-4 text-[12px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 group shadow-xl">
                                Checkout
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-6">
                                <p className="text-xs text-center text-gray-500 leading-relaxed">
                                    We offer easy 15-day returns. Need help? <a href="/contact" className="underline hover:text-black transition-colors">Contact Support</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
