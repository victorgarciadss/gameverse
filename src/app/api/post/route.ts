import { CustomError } from "@/errors/CustomError";
import { getAllPosts } from "@/server/post/fetchHandler";
import { registerPost } from "@/server/post/registerHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const posts = await getAllPosts();
        return NextResponse.json(posts);
    }
    catch(err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const author = formData.get("author") as string;
        const files = formData.getAll("files") as File[];

        const postData = {
            title,
            content,
            author,
            files
        }

        const postCreated = await registerPost(postData);

        return NextResponse.json({ message: "Post cadastrado com sucesso", post: postCreated });
    }
    catch(err: any) {
        if(err instanceof CustomError) {
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }

        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}