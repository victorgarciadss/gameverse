import { CustomError } from "@/errors/CustomError";
import dbConnect from "@/lib/mongodb";
import { UserModel } from "@/models/User";

export async function getAllUsers() {
    try {
        await dbConnect();

        const users = await UserModel.find({}).lean();
        return users;
    }
    catch(err: any) {
        throw new Error(`Erro ao buscar usuários: ${err.message}`);
    }
}

export async function getUserById(id: string) {
    try {
        await dbConnect();

        const user = await UserModel.findById(id);

        if(!user) {
            throw new CustomError("Usuário não encontrado", 404);
        }

        return user;
    }
    catch(err: any) {
        throw new Error(`Erro ao buscar usuário pelo id: ${err.message}`)
    }
}