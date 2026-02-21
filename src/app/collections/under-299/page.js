"use client";
import PriceCollectionPage from "@/components/PriceCollectionPage";

export default function Under299() {
    return (
        <PriceCollectionPage
            priceLimit={299}
            title="Under ₹299"
            description="Elevate your look without breaking the bank"
        />
    );
}
