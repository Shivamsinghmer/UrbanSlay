"use client";
import React from "react";
import ShopPage from "@/components/ShopPage";

export default function HomeDecorShop() {
    return (
        <ShopPage
            mainCategory="Home Decor"
            title="Home Decor"
            description="Artistically crafted pieces for your space"
            categories={["DECOR OBJECTS", "VASES", "CANDLES", "CLOCKS", "AROMA DIFFUSERS"]}
        />
    );
}
