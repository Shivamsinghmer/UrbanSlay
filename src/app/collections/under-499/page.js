"use client";
import PriceCollectionPage from "@/components/PriceCollectionPage";

export default function Under499() {
    return (
        <PriceCollectionPage
            priceLimit={499}
            title="Under ₹499"
            description="Premium jewelry collections at accessible prices"
        />
    );
}
