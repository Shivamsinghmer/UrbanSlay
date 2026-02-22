"use client";
import React, { useEffect, useState } from "react";
import { Package, Truck, CheckCircle, Clock, Search, ChevronRight, XCircle } from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
    const { isLoaded, isSignedIn } = useAuth();
    const clerk = useClerk();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            clerk.openSignIn();
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                if (!res.ok) throw new Error("Failed to fetch orders");
                const data = await res.json();
                setOrders(data.orders || []);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isLoaded, isSignedIn, clerk]);

    const getStatusIcon = (status) => {
        switch (status) {
            case "PENDING":
                return <Clock className="w-4 h-4 text-orange-500" />;
            case "PROCESSING":
                return <Package className="w-4 h-4 text-blue-500" />;
            case "SHIPPED":
                return <Truck className="w-4 h-4 text-indigo-500" />;
            case "DELIVERED":
                return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case "CANCELLED":
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-orange-50 text-orange-700 border-orange-200";
            case "PROCESSING":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "SHIPPED":
                return "bg-indigo-50 text-indigo-700 border-indigo-200";
            case "DELIVERED":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "CANCELLED":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    if (loading || !isLoaded) {
        return (
            <div className="py-24 px-4 max-w-5xl mx-auto min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="py-24 px-4 max-w-5xl mx-auto min-h-screen">
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-2 text-[#1a1a1a] flex items-center gap-4">
                Order History
                <span className="bg-gray-100 text-gray-800 text-sm font-semibold rounded-full px-4 py-1 tracking-widest uppercase">
                    {orders.length}
                </span>
            </h2>
            <p className="text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-12">
                Track and manage your purchases
            </p>

            {orders.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
                    <div className="p-12 text-center flex flex-col items-center justify-center min-h-[50vh]">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Search className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-serif text-gray-900 mb-3 tracking-wide">No orders found</h3>
                        <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed font-medium">Looks like you haven't made your first purchase yet. Discover our beautiful collections and find something you'll love.</p>
                        <Link href="/" className="px-10 py-4 bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gray-900 shadow-xl transition-all duration-300 cursor-pointer rounded-xl">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] overflow-hidden transition-all hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                            {/* Order Header */}
                            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 tracking-widest uppercase font-bold mb-1">Order Placed</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] text-gray-500 tracking-widest uppercase font-bold mb-1">Total</p>
                                    <p className="text-sm font-medium text-gray-900">₹{order.totalAmount.toLocaleString()}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] text-gray-500 tracking-widest uppercase font-bold mb-1">Order #</p>
                                    <p className="text-sm font-mono font-medium text-gray-900">{order._id.slice(-8).toUpperCase()}</p>
                                </div>

                                <div className="self-end md:self-auto">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6 md:p-8 space-y-6">
                                {order.products.map((item, idx) => {
                                    // Make sure product exists to handle safely
                                    if (!item.product) return null;

                                    return (
                                        <div key={idx} className="flex gap-6 items-start pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                                                <Image
                                                    src={item.product.images[0]?.url || item.product.images?.[0] || "https://placehold.co/100x100"}
                                                    alt={item.product.name}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-base font-medium text-gray-900 mb-1 truncate">{item.product.name}</h4>
                                                <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{item.product.description}</p>

                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                                                        <span>Qty:</span>
                                                        <span className="text-gray-900">{item.quantity}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                                                        <span>Price:</span>
                                                        <span className="text-gray-900">₹{item.price.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="hidden sm:block sm:w-32 shrink-0 text-right">
                                                <Link href={`/product/${item.product._id}`} className="text-[10px] text-gray-500 tracking-widest font-bold uppercase hover:text-black border-b border-transparent hover:border-black transition-all flex items-center justify-end gap-1">
                                                    View Item
                                                    <ChevronRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Order Footer - Shipping Info */}
                            <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-4 text-xs text-gray-500">
                                <div>
                                    <span className="font-bold tracking-widest uppercase text-gray-900 text-[9px] mb-1 block">Shipping To</span>
                                    <p className="font-medium text-gray-600 line-clamp-1">{order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                                </div>
                                <div className="sm:text-right">
                                    <span className="font-bold tracking-widest uppercase text-gray-900 text-[9px] mb-1 block">Payment status</span>
                                    <p className="font-medium inline-flex items-center gap-1">
                                        <span className={`w-1.5 h-1.5 rounded-full ${order.paymentStatus === 'COMPLETED' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                                        {order.paymentStatus === 'COMPLETED' ? 'Paid Online' : 'Pending / Cash on Delivery'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
