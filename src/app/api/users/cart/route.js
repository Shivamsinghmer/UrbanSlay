import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { productId, quantity, action } = await req.json(); // action: "update" or "remove"
        await connectDB();

        const user = await User.findOne({ clerkId: userId });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (action === "update") {
            if (cartItemIndex > -1) {
                user.cart[cartItemIndex].quantity = quantity;
            } else {
                user.cart.push({ product: productId, quantity });
            }
        } else if (action === "remove") {
            user.cart = user.cart.filter(item => item.product.toString() !== productId);
        }

        await user.save();
        return NextResponse.json({ cart: user.cart });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
