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