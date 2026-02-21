"use client";
import PriceCollectionPage from "@/components/PriceCollectionPage";

export default function Under149() {
    return (
        <PriceCollectionPage
            priceLimit={149}
            title="Under ₹149"
            description="Stunning pieces that fit your budget"
        />
    );
}
