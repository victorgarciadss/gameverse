import { IPost } from "@/utils/interfaces/postInterfaces";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema<IPost>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: false
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

export const PostModel = mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);