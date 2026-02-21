import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

const initialCategories = [
    { name: "EARRINGS", slug: "earrings", image: "/landingImage/ring-women.jpeg" },
    { name: "NECKLACES", slug: "necklaces", image: "/landingImage/Bracelet-women.jpeg" },
    { name: "BRACELETS", slug: "bracelets", image: "/landingImage/Bracelet-men.jpeg" },
    { name: "MANGALSUTRAS", slug: "mangalsutras", image: "/landingImage/ring-women.jpeg" },
    { name: "MENS", slug: "mens", image: "/landingImage/Bracelet-men.jpeg" },
    { name: "RINGS", slug: "rings", image: "/landingImage/ring-women.jpeg" },
];

const initialProducts = [
    {
        name: "Hearts All Over Bracelet",
        price: 2229,
        originalPrice: 3184,
        discount: 30,
        gender: "WOMEN",
        category: "BRACELETS",
        images: ["/landingImage/Bracelet-women.jpeg"],
        isTopProduct: true
    },
    {
        name: "Crystal Love Bangle Bracelet",
        price: 2659,
        originalPrice: 3799,
        discount: 30,
        gender: "MEN",
        category: "BRACELETS",
        images: ["/landingImage/Bracelet-men.jpeg"],
        isTopProduct: true
    },
    {
        name: "Athena Solitaire Hoop Earrings",
        price: 2258,
        originalPrice: 3226,
        discount: 30,
        gender: "WOMEN",
        category: "EARRINGS",
        images: ["/landingImage/ring-women.jpeg"],
        isTopProduct: true
    },
    {
        name: "Diamond Affair Bracelet",
        price: 2553,
        originalPrice: 3647,
        discount: 30,
        gender: "WOMEN",
        category: "BRACELETS",
        images: ["/landingImage/Bracelet-women.jpeg"],
        isTopProduct: true
    },
];

export async function GET() {
    try {
        await connectDB();

        // Clear existing data to avoid validation errors with old documents missing 'gender'
        await Product.deleteMany({});
        await Category.deleteMany({});

        await Category.insertMany(initialCategories);
        await Product.insertMany(initialProducts);

        return NextResponse.json({ message: "Database seeded (Categories and Products) successfully" });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
