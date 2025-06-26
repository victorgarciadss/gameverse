import { CustomError } from "@/errors/CustomError";
import dbConnect from "@/lib/mongodb";
import { PostModel } from "@/models/Post";
import { IPostRequest } from "@/utils/interfaces/postInterfaces";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function updatePost(slug: string, data: IPostRequest) {
    try {
        await dbConnect();

        const { files, title, content, author, existingFiles } = data;

        const imagesUrls: string[] = existingFiles ? [...existingFiles] : [];

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

        const updatedData = {
            title,
            content,
            author,
            images: imagesUrls.length > 0 ? imagesUrls : undefined
        }

        const updatedPost = await PostModel.findOneAndUpdate(
            { slug },
            updatedData,
            { new: true, runValidators: true }
        );

        if(!updatedPost) {
            throw new CustomError("Post não encontrado", 404);
        }
        
        return updatedPost;
    }
    catch(err: any) {
        throw new Error("Erro ao atualizar post: " + err.message);
    }
}