import { CustomError } from "@/errors/CustomError";
import { deleteUser } from "@/server/user/deleteHandler";
import { getUserById } from "@/server/user/fetchHandler";
import { updateUser } from "@/server/user/updateHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> } ) {
    try {
        const { id } = await context.params;
        const userFounded = await getUserById(id);
        return NextResponse.json(userFounded);
    }
    catch(err: any) {
        if(err instanceof CustomError) {
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }
        return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {

        const { id } = await context.params;

        const body = await request.json();
        const updatedUser = await updateUser(id, body);

        return NextResponse.json({ message: "Usuário atualizado com sucesso!", user: updatedUser });
    }
    catch(err: any) {
        if(err instanceof CustomError) {
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

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