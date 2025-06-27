import { CustomError } from "@/errors/CustomError";
import { deletePost } from "@/server/post/deleteHandler";
import { getPostBySlug } from "@/server/post/fetchHandler";
import { updatePost } from "@/server/post/updateHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> } ) {
    try {
        const slugResolved = (await context.params).slug;
        const postFounded = await getPostBySlug(slugResolved);
        return NextResponse.json(postFounded);
    }
    catch(err: any) {
        if(err instanceof CustomError) {
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }
        return NextResponse.json({ error: "Erro ao buscar post" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;

        const formData = await request.formData();

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const author = formData.get("author") as string;
        const files = formData.getAll("files") as File[];
        const existingFiles = formData.getAll("existingFiles") as string[];

        const updatedData = {
            title,
            content,
            author,
            files,
            existingFiles
        };

        const updatedPost = await updatePost(slug, updatedData);

        return NextResponse.json({ message: "Post atualizado com sucesso", post: updatedPost });
    }
    catch(err: any) {
        if(err instanceof CustomError) {
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ slug: string }> } ) {
    try {
        const { slug } = await context.params;

        const postDeleted = await deletePost(slug);
        return NextResponse.json({ message: "Post apagado com sucesso", post: postDeleted });
    }
    catch(err: any) {
        if(err instanceof CustomError) {
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}