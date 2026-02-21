import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        originalPrice: { type: Number },
        discount: { type: Number },
        gender: { type: String, enum: ["MEN", "WOMEN", "BOTH","HOME"], required: true },
        category: { type: String, required: true },
        images: [{ type: String }],
        inStock: { type: Boolean, default: true },
        isTopProduct: { type: Boolean, default: false },
        buyOneGetOne: { type: Boolean, default: false },
        bestSeller: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
