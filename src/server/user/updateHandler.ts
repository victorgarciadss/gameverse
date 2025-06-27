import { CustomError } from "@/errors/CustomError";
import dbConnect from "@/lib/mongodb";
import { UserModel } from "@/models/User";
import { IUser } from "@/utils/interfaces/userInterfaces";

export async function updateUser(id: string, data: IUser) {
    try {

        await dbConnect();

        const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

        if(!updatedUser) {
            throw new CustomError("Usuário não encontrado", 404);
        }

        return updatedUser;
    }
    catch(err: any) {
        throw new Error("Erro ao atualizar o usuário: " + err.message);
    }
}