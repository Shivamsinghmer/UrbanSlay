"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Minus, Plus, Heart, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    const { toggleWishlist, isInWishlist, addToCart, getCartItem, updateQuantity } = useShop();

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                } else {
                    console.error("Failed to fetch product");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen py-32 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
                <p className="text-xs tracking-widest uppercase text-gray-500">Loading Product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen py-32 flex flex-col items-center justify-center gap-4 text-center">
                <h1 className="text-2xl font-serif">Product Not Found</h1>
                <p className="text-sm text-gray-500 uppercase tracking-widest mt-2">The item you are looking for does not exist.</p>
                <a href="/" className="mt-8 px-8 py-3 bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black/80 transition-colors">
                    Back to Home
                </a>
            </div>
        );
    }

    const isWishlisted = isInWishlist(product._id);
    const cartItem = getCartItem(product._id);
    const images = product.images?.length > 0 ? product.images : ["https://images.unsplash.com/photo-1515562141207-7a8efbf34707?w=800&auto=format&fit=crop&q=80"];

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Images Section */}
                <div className="flex flex-col gap-4">
                    <div className="aspect-4/5 overflow-hidden bg-gray-50 relative rounded-sm">
                        <img
                            src={images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-opacity duration-500"
                        />
                        {(product.bestSeller || product.isTopProduct) && (
                            <div className="absolute top-4 right-0 z-10">
                                <div className="bg-black/70 backdrop-blur-md text-white text-[9px] px-3 py-1 font-bold tracking-[0.2em] uppercase rounded-l-xs shadow-sm shadow-black/20">
                                    BESTSELLER
                                </div>
                            </div>
                        )}
                        {product.buyOneGetOne && (
                            <div className="absolute top-4 left-0 z-10">
                                <div className="bg-[#D4A373] text-white text-[10px] px-3 py-1 font-medium tracking-widest uppercase shadow-sm">
                                    Buy 1 Get 1
                                </div>
                            </div>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`w-20 lg:w-24 aspect-4/5 shrink-0 overflow-hidden cursor-pointer rounded-xs border-2 transition-all duration-300 ${selectedImage === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-center space-y-8">
                    <div className="space-y-2 border-b border-gray-100 pb-8">
                        {product.category && (
                            <p className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase mb-2">
                                {product.category} {product.subCategory ? `/ ${product.subCategory}` : ''}
                            </p>
                        )}
                        <h1 className="text-3xl md:text-5xl font-serif text-[#1a1a1a] leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 mt-4 pt-2">
                            <span className="text-2xl font-light">₹{product.price?.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                            {product.discount && (
                                <span className="text-sm font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-sm">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Inclusive of all taxes</p>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                            {product.description || "Elevate your everyday style with this exquisite piece. Handcrafted with premium materials for lasting elegance and comfort. Perfect for any occasion."}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {cartItem ? (
                                    <div className="w-full sm:flex-1 border border-black h-12 flex items-center justify-between px-6 rounded-xs">
                                        <button
                                            onClick={() => updateQuantity(product._id, -1)}
                                            className="text-gray-500 hover:text-black transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="text-xs font-bold tracking-widest">{cartItem.quantity} IN BAG</span>
                                        <button
                                            onClick={() => updateQuantity(product._id, 1)}
                                            className="text-gray-500 hover:text-black transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full sm:flex-1 bg-white text-black border-2 border-black h-12 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 rounded-xs cursor-pointer shadow-sm"
                                    >
                                        <ShoppingBag size={16} />
                                        Add to Bag
                                    </button>
                                )}

                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className={`h-12 w-full sm:w-16 border rounded-xs flex items-center justify-center transition-colors cursor-pointer ${isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300 text-gray-400 hover:border-black hover:text-black'}`}
                                >
                                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    if (!cartItem) addToCart(product);
                                    router.push('/account/cart');
                                }}
                                className="w-full bg-[#D4A373] text-white h-12 text-[11px] font-bold tracking-widest uppercase hover:bg-[#c29161] transition-colors flex items-center justify-center gap-3 rounded-xs cursor-pointer shadow-sm"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Fake Accrodions for UI */}
                    <div className="space-y-4 pt-8">
                        <div className="border border-gray-100 p-4 rounded-xs">
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1a1a1a] mb-2">Product Details</h3>
                            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
                                <li>Material: Premium Brass with 18K Gold Plating</li>
                                <li>Dimensions: One size fits most</li>
                                <li>Care: Keep away from water and perfume</li>
                            </ul>
                        </div>
                        <div className="border border-gray-100 p-4 rounded-xs bg-gray-50/50">
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1a1a1a] mb-2">Shipping & Returns</h3>
                            <p className="text-sm text-gray-500">Free shipping on orders above ₹999. Easy 7-day returns.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
