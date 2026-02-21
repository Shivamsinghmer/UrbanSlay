import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        shippingAddress: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
        },
        status: {
            type: String,
            enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
            default: "PENDING",
        },
        paymentIntentId: { type: String },
        paymentStatus: {
            type: String,
            enum: ["PENDING", "COMPLETED", "FAILED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
