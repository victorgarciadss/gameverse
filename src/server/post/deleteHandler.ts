import { CustomError } from "@/errors/CustomError";
import dbConnect from "@/lib/mongodb";
import { PostModel } from "@/models/Post";

export async function deletePost(slug: string) {
    try {
        await dbConnect();
        const postDeleted = await PostModel.findOneAndDelete({ slug });

        if(!postDeleted) {
            throw new CustomError ("Post não encontrado", 404);
        }

        return postDeleted;
    }
    catch (err: any) {
        throw new Error("Erro ao tentar apagar o post: " + err.message);
    }
}