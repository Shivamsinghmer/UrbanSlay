import connectDB from "@/lib/db";
import User from "@/models/User";

export const getMongoUser = async (clerkId) => {
    try {
        await connectDB();
        const user = await User.findOne({ clerkId });
        return user;
    } catch (error) {
        console.error("Error fetching user from MongoDB:", error);
        return null;
    }
};

export const syncUser = async (clerkId, userData) => {
    try {
        await connectDB();
        const user = await User.findOneAndUpdate(
            { clerkId },
            { ...userData },
            { new: true, upsert: true }
        );
        return user;
    } catch (error) {
        console.error("Error syncing user with MongoDB:", error);
        return null;
    }
};
