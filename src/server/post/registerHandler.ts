import { CustomError } from "@/errors/CustomError";
import dbConnect from "@/lib/mongodb";
import { PostModel } from "@/models/Post";
import { IPostRequest } from "@/utils/interfaces/postInterfaces";

import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function registerPost(data: IPostRequest) {
    const { title, content, author, files } = data;

    if(!title || !content) {
        throw new CustomError("Título e conteúdo são obrigatórios!", 400);
    }

    await dbConnect();

    const imagesUrls: string[] = [];
    
    if(files && files.length > 0) {
        for(const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResponse = await new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                        resource_type: "image",
                        folder: "posts",
                    },
                    (error, result) => {
                        if(error) {
                            reject(new CustomError("Erro ao fazer upload da imagem: " + error.message, 500));
                        }
                        if(result) {
                            resolve(result);
                        }
                    }
                );

                stream.end(buffer);
            });
            
            if(uploadResponse) {
                imagesUrls.push(uploadResponse.secure_url);
            }
        }
    }

    const slug = slugify(title, { lower: true, strict: true });

    const newPost = await PostModel.create({
        title,
        content,
        author,
        images: imagesUrls,
        slug
    });

    return {
        id: newPost._id.toString(),
        title: newPost.title,
        slug: newPost.slug
    }
}