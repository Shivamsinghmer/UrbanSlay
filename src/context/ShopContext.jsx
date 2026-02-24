"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            const savedWishlist = localStorage.getItem('wishlist');
            if (savedCart) setCart(JSON.parse(savedCart));
            if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
        } catch (e) {
            console.error("Failed to load shop state:", e);
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product) => {
        if (!product.inStock) return;
        setCart((prev) => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) {
                return prev;
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, change) => {
        setCart((prev) => {
            return prev.map(item => {
                if (item._id === productId) {
                    // Prevent increasing quantity if not in stock
                    // Though if it's in the cart, it WAS in stock. But this is safer.
                    if (change > 0 && item.inStock === false) {
                        return item;
                    }

                    const newQuantity = item.quantity + change;
                    if (newQuantity <= 0) {
                        return null; // Will be filtered out
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(Boolean);
        });
    };

    const emptyCart = () => {
        setCart([]);
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) {
                return prev.filter(item => item._id !== product._id);
            }
            return [...prev, product];
        });
    };

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
            getCartItem
        }}>
            {children}
        </ShopContext.Provider>
    );
};
