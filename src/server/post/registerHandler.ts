import { CustomError } from "@/errors/CustomError";
import dbConnect from "@/lib/mongodb";
import { PostModel } from "@/models/Post";
import { IPost } from "@/utils/interfaces/postInterfaces";

export async function registerPost(data: IPost) {

    await dbConnect();

    if(!data.title || !data.content) {
        throw new CustomError("Título e conteúdo são obrigatórios!", 400)
    }

    const newPost = await PostModel.create(data);

    return {
        id: newPost._id.toString(),
        title: newPost.title
    }
}