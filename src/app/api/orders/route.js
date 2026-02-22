export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";

// Ensure mongoose is connected
const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI);
};

export async function POST(req) {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let dbUser = await User.findOne({ clerkId: user.id });
        if (!dbUser) {
            dbUser = await User.create({
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstName: user.firstName,
                lastName: user.lastName
            });
        }

        const body = await req.json();
        const { products, totalAmount, shippingAddress, paymentMethod, paymentStatus } = body;

        const order = await Order.create({
            user: dbUser._id,
            products: products.map(p => ({
                product: p._id,
                quantity: p.quantity,
                price: p.price
            })),
            totalAmount,
            shippingAddress,
            status: "PROCESSING",
            paymentStatus: paymentStatus || "PENDING"
        });

        return NextResponse.json({ order, success: true });
    } catch (error) {
        console.error("Order Creation Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await User.findOne({ clerkId: user.id });

        if (!dbUser) {
            return NextResponse.json({ orders: [], success: true });
        }

        const orders = await Order.find({ user: dbUser._id })
            .populate('products.product')
            .sort({ createdAt: -1 });

        return NextResponse.json({ orders, success: true });
    } catch (error) {
        console.error("Fetch Orders Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
