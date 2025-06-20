import { CustomError } from "@/errors/CustomError";
import dbConnect from "@/lib/mongodb";
import { UserModel } from "@/models/User";

export async function deleteUser(id: string) {
    try {
        await dbConnect();

        const userDeleted = await UserModel.findByIdAndDelete(id);

        if(!userDeleted) {
            throw new CustomError("Usuário não encontrado", 404);
        }

        return userDeleted;
    }
    catch(err: any) {
        throw new Error("Erro ao deletar o usuário: " + err.message);
    }
}