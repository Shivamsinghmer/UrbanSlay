"use client";
import React from "react";
import ShopPage from "@/components/ShopPage";

export default function MenShop() {
    return (
        <ShopPage
            mainCategory="Men"
            title="Men's Collection"
            description="Bold designs for the modern man"
            categories={["BRACELETS", "RINGS", "CHAINS"]}
        />
    );
}
