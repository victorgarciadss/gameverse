
import { CustomError } from "@/errors/CustomError";
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

export async function getPostBySlug(slug: string) {
    try {
        await dbConnect();

        const post = await PostModel.findOne({ slug }).lean();

        if(!post) {
            throw new CustomError("Post não encontrado", 404);
        }

        return post;
    }
    catch(err: any) {
        throw new Error("Erro ao buscar o post: " + err.message);
    }
}