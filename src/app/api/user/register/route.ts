import { CustomError } from "@/errors/CustomError";
import { registerUser } from "@/server/user/registerHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newUser = await registerUser(body);

        return NextResponse.json({ message: "Usuário cadastrado com sucesso", user: newUser });
    }
    catch(err: any) {

        if (err instanceof CustomError) {
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }

        return NextResponse.json({ error: err.message || "Erro no servidor ao cadastrar usuário" }, { status: 500 });
    }
}