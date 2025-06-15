
import dbConnect from "@/lib/mongodb";
import { PostModel } from "@/models/Post";

export async function getAllPosts() {
    try {
        await dbConnect();

        const posts = await PostModel.find({}).sort({ createdAt: -1 }).lean();
        return posts;
    } 
    catch (err: any) {
        throw new Error(`Erro ao buscar posts: ${err.message}`);
    }
}