"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const { user, isLoaded } = useUser();
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // ─── Load data on login/logout ───────────────────────────────────────────
    useEffect(() => {
        if (!isLoaded) return;

        async function fetchUserData() {
            if (user) {
                try {
                    console.log('[ShopContext] Fetching user data from DB for:', user.primaryEmailAddress?.emailAddress);
                    const res = await fetch('/api/users');
                    if (!res.ok) {
                        console.error('[ShopContext] /api/users returned:', res.status);
                        return;
                    }
                    const data = await res.json();

                    if (!data.error) {
                        // Cart: DB stores { product: <populated obj>, quantity }
                        if (Array.isArray(data.cart)) {
                            const cartItems = data.cart
                                .filter(item => item.product)
                                .map(item => ({ ...item.product, quantity: item.quantity }));
                            setCart(cartItems);
                            console.log('[ShopContext] Loaded cart from DB:', cartItems.length, 'items');
                        }
                        // Wishlist: DB stores populated product objects
                        if (Array.isArray(data.wishlist)) {
                            setWishlist(data.wishlist);
                            console.log('[ShopContext] Loaded wishlist from DB:', data.wishlist.length, 'items');
                        }
                    }
                } catch (e) {
                    console.error('[ShopContext] Failed to fetch user data:', e);
                }
            } else {
                // Not logged in — load from localStorage
                try {
                    const savedCart = localStorage.getItem('cart');
                    const savedWishlist = localStorage.getItem('wishlist');
                    if (savedCart) setCart(JSON.parse(savedCart));
                    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
                } catch (e) {
                    console.error('[ShopContext] Failed to load localStorage:', e);
                }
            }
        }

        fetchUserData();
    }, [isLoaded, user]);

    // ─── Persist to localStorage as a local backup ────────────────────────────
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // ─── DB sync helpers ──────────────────────────────────────────────────────
    const syncCart = useCallback(async (productId, quantity, action) => {
        if (!user) return; // Only sync when logged in
        try {
            const res = await fetch('/api/users/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity, action }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.error('[ShopContext] Cart sync failed:', data);
            } else {
                console.log('[ShopContext] Cart synced →', action, productId, 'qty:', quantity);
            }
        } catch (e) {
            console.error('[ShopContext] Cart sync error:', e);
        }
    }, [user]);

    const syncWishlist = useCallback(async (productId, action) => {
        if (!user) return; // Only sync when logged in
        try {
            const res = await fetch('/api/users/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, action }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.error('[ShopContext] Wishlist sync failed:', data);
            } else {
                console.log('[ShopContext] Wishlist synced →', action, productId);
            }
        } catch (e) {
            console.error('[ShopContext] Wishlist sync error:', e);
        }
    }, [user]);

    // ─── Cart actions ─────────────────────────────────────────────────────────
    const addToCart = (product) => {
        if (!product.inStock) return;
        const alreadyInCart = cart.find(item => item._id === product._id);
        if (alreadyInCart) return;

        setCart((prev) => [...prev, { ...product, quantity: 1 }]);
        syncCart(product._id, 1, 'update'); // DB: add with qty 1
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item._id !== productId));
        syncCart(productId, 0, 'remove'); // DB: remove entry
    };

    const updateQuantity = (productId, change) => {
        setCart((prev) => {
            const updated = prev.map(item => {
                if (item._id !== productId) return item;
                if (change > 0 && item.inStock === false) return item; // block restock increase if OOS
                const newQty = item.quantity + change;
                if (newQty <= 0) return null; // will be filtered
                return { ...item, quantity: newQty };
            }).filter(Boolean);

            // Determine new quantity (or 0 if removed) and sync AFTER state update
            const updated_item = updated.find(i => i._id === productId);
            const newQty = updated_item ? updated_item.quantity : 0;

            if (newQty <= 0) {
                syncCart(productId, 0, 'remove');
            } else {
                syncCart(productId, newQty, 'update');
            }

            return updated;
        });
    };

    const emptyCart = () => {
        // Sync each removal to DB if logged in
        if (user) {
            cart.forEach(item => {
                syncCart(item._id, 0, 'remove');
            });
        }
        setCart([]);
    };

    // ─── Wishlist actions ─────────────────────────────────────────────────────
    const toggleWishlist = (product) => {
        const isCurrentlyInWishlist = wishlist.some(item => item._id === product._id);
        const isAdding = !isCurrentlyInWishlist;

        if (isAdding) {
            setWishlist((prev) => [...prev, product]);
        } else {
            setWishlist((prev) => prev.filter(item => item._id !== product._id));
        }

        syncWishlist(product._id, isAdding ? 'add' : 'remove'); // DB sync
    };

    // ─── Helpers ──────────────────────────────────────────────────────────────
    const isInWishlist = (productId) => wishlist.some(item => item._id === productId);
    const getCartItem = (productId) => cart.find(item => item._id === productId);

    return (
        <ShopContext.Provider value={{
            cart,
            wishlist,
            addToCart,
            removeFromCart,
            updateQuantity,
            emptyCart,
            toggleWishlist,
            isInWishlist,
            getCartItem,
        }}>
            {children}
        </ShopContext.Provider>
    );
};
