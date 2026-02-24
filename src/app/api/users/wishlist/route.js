import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { productId, action } = await req.json(); // action: "add" or "remove"
        await connectDB();

        const user = await User.findOne({ clerkId: userId });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        if (action === "add") {
            // Use .toString() comparison so Mongoose ObjectIds match string productId
            const alreadyInWishlist = user.wishlist.some(id => id.toString() === productId);
            if (!alreadyInWishlist) {
                user.wishlist.push(productId);
            }
        } else {
            user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        }

        await user.save();
        return NextResponse.json({ wishlist: user.wishlist });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
