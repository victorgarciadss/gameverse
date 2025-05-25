import { registerUser } from "@/server/user/registerHandler";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if(!username || !password) {
            return NextResponse.json(
                { error: "Campos username e senha são obrigatórios" },
                { status: 400 }
            );
        }

        const newUser = await registerUser(body);

        return NextResponse.json({ message: "Usuário cadastrado com sucesso", user: newUser });
    }
    catch(err: any) {

        if (err.message === "Nome de usuário já está cadastrado") {
            return NextResponse.json({ error: err.message }, { status: 409 });
        }

        return NextResponse.json({ error: err.message || "Erro no servidor ao cadastrar usuário" }, { status: 500 });
    }
}