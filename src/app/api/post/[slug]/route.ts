import { CustomError } from "@/errors/CustomError";
import { getPostBySlug } from "@/server/post/fetchHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> } ) {
    try {
        const slugResolved = (await context.params).slug;
        const postFounded = await getPostBySlug(slugResolved);
        return NextResponse.json(postFounded);
    }
    catch(err: any) {
        if(err instanceof CustomError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Erro ao buscar post" }, { status: 500 });
    }
}