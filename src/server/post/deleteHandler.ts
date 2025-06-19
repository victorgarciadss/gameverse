import { CustomError } from "@/errors/CustomError";
import dbConnect from "@/lib/mongodb";
import { PostModel } from "@/models/Post";

export async function deletePost(id: string) {
    try {
        await dbConnect();
        const postDeleted = await PostModel.findByIdAndDelete(id);

        if(!postDeleted) {
            throw new CustomError ("Post não encontrado", 404);
        }

        return {
            message: "Post apagado corretamente",
            post: postDeleted
        };
    }
    catch (err: any) {
        throw new Error("Erro ao tentar apagar o post: " + err.message);
    }
}