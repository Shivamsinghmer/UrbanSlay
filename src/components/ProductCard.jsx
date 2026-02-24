"use client";
import React from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
    const { toggleWishlist, isInWishlist, addToCart, getCartItem, updateQuantity } = useShop();
    const router = useRouter();

    const isWishlisted = isInWishlist(product._id);
    const cartItem = getCartItem(product._id);

    return (
        <Link href={`/product/${product._id}`} className="group relative flex flex-col cursor-pointer">
            <div className="relative aspect-4/5 overflow-hidden bg-muted rounded-3xl transition-all duration-700 ease-out shadow-[0_4px_24px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] group-hover:-translate-y-1">
                {product.buyOneGetOne && product.inStock && (
                    <div className="absolute top-4 left-4 z-10">
                        <div className="bg-primary text-white text-[9px] px-3.5 py-1.5 font-bold tracking-[0.2em] uppercase rounded-full shadow-sm drop-shadow-md">
                            Buy 1 Get 1
                        </div>
                    </div>
                )}
                {!product.inStock && (
                    <div className="absolute top-4 left-4 z-10">
                        <div className="bg-red-600 text-white text-[9px] px-3.5 py-1.5 font-bold tracking-[0.2em] uppercase rounded-full shadow-sm drop-shadow-md">
                            OUT OF STOCK
                        </div>
                    </div>
                )}

                {(product.bestSeller || product.isTopProduct) && (
                    <div className="absolute top-4 right-4 z-10">
                        <div className="bg-white/90 backdrop-blur-md text-black text-[8px] md:text-[9px] px-3.5 py-1.5 font-bold tracking-[0.2em] uppercase rounded-full shadow-sm ring-1 ring-black/5 drop-shadow-md">
                            BESTSELLER
                        </div>
                    </div>
                )}

                <img
                    src={(product.images && product.images[0]) ? product.images[0] : "https://images.unsplash.com/photo-1515562141207-7a8efbf34707?w=800&auto=format&fit=crop&q=60"}
                    alt={product.name || "Product Image"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />

                {/* Action Buttons Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-linear-to-t from-black/20 to-transparent flex flex-col gap-2">
                    <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                        {cartItem ? (
                            <div className="flex-1 bg-white text-black text-[11px] font-bold tracking-widest py-1.5 rounded-xs flex items-center justify-between px-3 shadow-lg">
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(product._id, -1); }}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                >
                                    <Minus size={14} />
                                </button>
                                <span>{cartItem.quantity} IN BAG</span>
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(product._id, 1); }}
                                    disabled={!product.inStock}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${!product.inStock ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        ) : !product.inStock ? (
                            <button
                                disabled
                                className="flex-1 bg-gray-200 text-gray-500 text-[11px] font-bold tracking-widest py-3 rounded-xs flex items-center justify-center gap-2 shadow-lg cursor-not-allowed border-2 border-transparent"
                            >
                                OUT OF STOCK
                            </button>
                        ) : (
                            <button
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                                className="flex-1 bg-white text-black text-[11px] font-bold tracking-widest py-3 rounded-xs hover:bg-black hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer border-2 border-transparent hover:border-black"
                            >
                                ADD TO BAG
                            </button>
                        )}

                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                            className={`w-11 h-11 bg-white text-black rounded-xs flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 shadow-lg cursor-pointer shrink-0 ${isWishlisted ? 'text-red-500' : ''}`}
                        >
                            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                    </div>

                    {!product.inStock ? null : (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!cartItem) addToCart(product);
                                router.push('/account/cart');
                            }}
                            className="w-full bg-primary text-white text-[11px] font-bold tracking-widest py-3 hover:bg-black transition-colors duration-500 flex items-center justify-center gap-2 shadow-lg cursor-pointer uppercase rounded-full border border-black/5"
                        >
                            BUY NOW
                        </button>
                    )}
                </div>

                {/* Quick view button - appears on hover (if TopProducts specifically needs it, otherwise it can stay here) */}
                {/*
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm px-6 py-2 text-[10px] font-bold tracking-[0.2em] transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 uppercase shadow-sm">
                Quick View
            </div>
        </div>
        */}
            </div>

            <div className="mt-6 text-center space-y-1">
                <h3 className="text-[13px] font-medium tracking-wide text-gray-900 group-hover:text-[#D4A373] transition-colors">{product.name || 'Beautiful Jewelry Piece'}</h3>
                <div className="flex items-center justify-center gap-3">
                    <span className="text-sm font-semibold">₹{product.price?.toLocaleString() || '1,999'}</span>
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                    {product.discount && (
                        <span className="text-[11px] font-bold text-emerald-600">-{product.discount}%</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
