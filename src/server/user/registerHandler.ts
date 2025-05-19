import bcrypt from "bcryptjs";
import { UserModel } from "@/models/User";
import { IUser } from "@/utils/interfaces/userInterfaces";
import dbConnect from "@/lib/mongodb";

export async function registerUser(data: IUser) {
    await dbConnect();

    const { username, password, ...rest } = data;

    const exisingUser = await UserModel.findOne({ username });

    if(exisingUser) {
        throw new Error("Nome de usuário já está cadastrado");
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
        ...rest,
        username,
        password: hashedPasword
    });

    return {
        id: newUser._id.toString(),
        username: newUser.username
    };
}

