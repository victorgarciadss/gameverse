import { CustomError } from "@/errors/CustomError";
import { deleteUser } from "@/server/user/deleteHandler";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const userDeleted = await deleteUser(id);
        return NextResponse.json({ message: "Usuário deletado com sucesso", user: userDeleted });
    }
    catch(err: any) {
        if(err instanceof CustomError) {
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}