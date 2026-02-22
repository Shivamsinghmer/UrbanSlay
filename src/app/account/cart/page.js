"use client";
import React, { useState } from "react";
import { ShoppingCart, ArrowRight, X } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import emailjs from '@emailjs/browser';

export default function CartPage() {
    const { cart, emptyCart } = useShop();
    const { isSignedIn, isLoaded, userId } = useAuth();
    const clerk = useClerk();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("online"); // "online" or "cod"
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });
    const [address, setAddress] = useState({ street: "", city: "", state: "", postalCode: "" });
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const cartTotalAmount = cart.reduce(
        (acc, item) => acc + (item.price || 0) * item.quantity,
        0
    );

    const shippingCost = cartTotalAmount < 600 ? 80 : 0;
    const codFee = paymentMethod === "cod" ? 40 : 0;
    const finalTotal = cartTotalAmount + shippingCost + codFee;

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto min-h-screen relative">
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
                    {/* Left Column: Cart Items */}
                    <div className="flex-1 flex flex-col gap-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {cart.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="bg-white rounded-2xl p-6 md:p-8 sticky top-32 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            <h3 className="text-xl font-serif mb-6 tracking-wide border-b border-gray-100 pb-4">Order Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Subtotal ({cart.length} items)</span>
                                    <span className="text-gray-900 font-medium">₹{cartTotalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Shipping</span>
                                    {shippingCost === 0 ? (
                                        <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase">Free</span>
                                    ) : (
                                        <span className="text-gray-900 font-medium">₹{shippingCost}</span>
                                    )}
                                </div>
                                {paymentMethod === "cod" && (
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>COD Fee</span>
                                        <span className="text-gray-900 font-medium">₹{codFee}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mb-8">
                                <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-gray-800 flex items-center gap-2">
                                    <span className="w-4 h-px bg-gray-300"></span> Payment Method
                                </h4>
                                <div className="space-y-3">
                                    <label className={`block border cursor-pointer p-4 rounded-xl transition-all duration-200 ${paymentMethod === 'online' ? 'border-black bg-gray-50 ring-1 ring-black shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="online"
                                                checked={paymentMethod === 'online'}
                                                onChange={() => setPaymentMethod('online')}
                                                className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900">Pay Online</span>
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">UPI, Cards, Netbanking</span>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`block border cursor-pointer p-4 rounded-xl transition-all duration-200 ${paymentMethod === 'cod' ? 'border-black bg-gray-50 ring-1 ring-black shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="radio"
                                                    name="payment_method"
                                                    value="cod"
                                                    checked={paymentMethod === 'cod'}
                                                    onChange={() => setPaymentMethod('cod')}
                                                    className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-900">Cash on Delivery</span>
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Pay when you receive</span>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">+₹40</span>
                                        </div>
                                    </label>
                                </div>
                                {cartTotalAmount < 600 && (
                                    <div className="bg-red-50/50 border border-red-100 rounded-lg p-3 mt-4 text-center">
                                        <span className="text-[11px] tracking-wide text-red-600 font-medium">Add ₹{(600 - cartTotalAmount).toLocaleString()} more for free shipping!</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 pt-6 mb-8">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="font-bold tracking-widest uppercase text-gray-400 text-[10px]">Total Amount</span>
                                    <span className="text-3xl font-serif text-gray-900">₹{finalTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-[9px] font-bold text-gray-300 tracking-widest uppercase text-right">
                                    Includes all taxes
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    if (!isSignedIn) {
                                        clerk.openSignIn();
                                        return;
                                    }
                                    setShowModal(true);
                                }}
                                className="w-full bg-black text-white py-4 rounded-xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)]"
                            >
                                Checkout
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-[11px] text-center text-gray-500 leading-relaxed font-medium">
                                    We offer easy 15-day returns.<br />Need help? <a href="/contact" className="text-black underline-offset-2 hover:underline transition-all">Contact Support</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-999 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10 rounded-t-2xl">
                            <h3 className="text-xl font-serif tracking-wide text-gray-900">Delivery Details</h3>
                            <button onClick={() => { setShowModal(false); setErrorMsg(""); }} className="text-gray-400 hover:text-black transition-colors rounded-full p-1 hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>

                        {errorMsg && (
                            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-1000 bg-red-500 text-white px-6 py-4 rounded-full shadow-[0_8px_30px_rgba(239,68,68,0.3)] flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                <span className="text-sm font-bold tracking-wide">{errorMsg}</span>
                                <button onClick={() => setErrorMsg("")} className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        <div className="p-6 md:p-8">
                            <div className="mb-8">
                                <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-gray-800 flex items-center gap-2">
                                    <span className="w-4 h-px bg-gray-300"></span> Contact Info
                                </h4>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Full Name" required value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} className="w-full bg-gray-50/50 border border-gray-100 p-3.5 rounded-lg text-sm outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400" />
                                    <input type="email" placeholder="Email Address" required value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} className="w-full bg-gray-50/50 border border-gray-100 p-3.5 rounded-lg text-sm outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400" />
                                    <input type="tel" placeholder="Phone Number" required value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} className="w-full bg-gray-50/50 border border-gray-100 p-3.5 rounded-lg text-sm outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-gray-800 flex items-center gap-2">
                                    <span className="w-4 h-px bg-gray-300"></span> Shipping Address
                                </h4>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Street Address" required value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="w-full bg-gray-50/50 border border-gray-100 p-3.5 rounded-lg text-sm outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400" />
                                    <div className="flex gap-4">
                                        <input type="text" placeholder="City" required value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="w-full bg-gray-50/50 border border-gray-100 p-3.5 rounded-lg text-sm outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400" />
                                        <input type="text" placeholder="State" required value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} className="w-full bg-gray-50/50 border border-gray-100 p-3.5 rounded-lg text-sm outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400" />
                                    </div>
                                    <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} className="w-full bg-gray-50/50 border border-gray-100 p-3.5 rounded-lg text-sm outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400" />
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <button
                                    disabled={isProcessing}
                                    onClick={async () => {
                                        if (!contact.name || !contact.email || !contact.phone || !address.street || !address.city || !address.state || !address.postalCode) {
                                            setErrorMsg("Please fill in all contact and shipping information.");
                                            return;
                                        }

                                        setErrorMsg("");
                                        setIsProcessing(true);

                                        // Create order function
                                        const createOrder = async (payStatus) => {
                                            const res = await fetch("/api/orders", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    products: cart,
                                                    totalAmount: finalTotal,
                                                    shippingAddress: address,
                                                    paymentMethod: paymentMethod,
                                                    paymentStatus: payStatus
                                                })
                                            });
                                            return res.ok;
                                        };

                                        // Function to send email
                                        const sendOrderEmail = () => {
                                            const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID || 'YOUR_SERVICE_ID';
                                            const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
                                            const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

                                            const emailDataCustomer = {
                                                to_name: contact.name,
                                                to_email: contact.email,
                                                phone: contact.phone,
                                                message: `Your order for ${cart.length} item(s) total ₹${finalTotal} has been placed successfully! Payment Method: ${paymentMethod.toUpperCase()}. We are currently processing your order and will contact you once it has shipped.`,
                                                from_name: "UrbanSlay"
                                            };

                                            const emailDataOwner = {
                                                to_name: "UrbanSlay Admin",
                                                to_email: "urbanslay.in@gmail.com",
                                                phone: contact.phone,
                                                message: `NEW ORDER ALERT! You received a new order for ${cart.length} item(s) total ₹${finalTotal}. Payment Method: ${paymentMethod.toUpperCase()}. Customer: ${contact.name} | ${contact.email} | ${contact.phone}`,
                                                from_name: "UrbanSlay Automated System"
                                            };

                                            if (SERVICE_ID !== 'YOUR_SERVICE_ID') {
                                                // 1. Send confirmation to the Customer
                                                emailjs.send(SERVICE_ID, TEMPLATE_ID, emailDataCustomer, PUBLIC_KEY).catch(err => {
                                                    console.error("Order notification email to customer failed:", err);
                                                });

                                                // 2. Send notification to the Owner
                                                emailjs.send(SERVICE_ID, TEMPLATE_ID, emailDataOwner, PUBLIC_KEY).catch(err => {
                                                    console.error("Order notification email to owner failed:", err);
                                                });
                                            }
                                        };

                                        if (paymentMethod === "online") {
                                            const { handlePayment } = await import('@/lib/razorpay');
                                            handlePayment({
                                                amount: finalTotal,
                                                description: `Payment for ${cart.length} items from UrbanSlay`,
                                                onSuccess: async (response) => {
                                                    const success = await createOrder("COMPLETED");
                                                    if (success) {
                                                        sendOrderEmail();
                                                        emptyCart();
                                                        setShowModal(false);
                                                        router.push("/checkout");
                                                    } else {
                                                        setErrorMsg("Payment was successful but something went wrong logging the order.");
                                                    }
                                                    setIsProcessing(false);
                                                },
                                                onDismiss: () => {
                                                    setIsProcessing(false);
                                                },
                                                onError: (msg) => {
                                                    setErrorMsg(msg);
                                                    setIsProcessing(false);
                                                }
                                            });
                                        } else {
                                            // If COD
                                            const success = await createOrder("PENDING");
                                            if (success) {
                                                sendOrderEmail();
                                                emptyCart();
                                                setShowModal(false);
                                                router.push("/checkout");
                                            } else {
                                                setErrorMsg("Something went wrong while placing your order.");
                                            }
                                            setIsProcessing(false);
                                        }
                                    }}
                                    className="w-full bg-black text-white py-4 rounded-xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] disabled:opacity-70 disabled:pointer-events-none"
                                >
                                    {isProcessing ? "Processing..." : "Confirm & Pay"}
                                    {!isProcessing && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
