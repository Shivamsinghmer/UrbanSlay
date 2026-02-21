"use client";
import React from "react";
import ShopPage from "@/components/ShopPage";

export default function WomenShop() {
    return (
        <ShopPage
            mainCategory="Women"
            title="Women's Collection"
            description="Elegance in every exquisite piece"
            categories={["EARRINGS", "RINGS", "PENDANTS", "BRACELETS", "NECKLACE SETS"]}
        />
    );
}
