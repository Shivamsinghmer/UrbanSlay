import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        firstName: { type: String },
        lastName: { type: String },
        photo: { type: String },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        cart: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, default: 1 },
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
