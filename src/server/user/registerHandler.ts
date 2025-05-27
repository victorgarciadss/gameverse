import bcrypt from "bcryptjs";
import { UserModel } from "@/models/User";
import { IUser } from "@/utils/interfaces/userInterfaces";
import dbConnect from "@/lib/mongodb";
import { CustomError } from "@/errors/CustomError";

export async function registerUser(data: IUser) {
    await dbConnect();

    const { username, password, email, ...rest } = data;

    if(!username || !password) {
        throw new Error("Campos username e senha são obrigatórios!");
    }

    const exisingUser = await UserModel.findOne({ username });
    const existingEmail = await UserModel.findOne({ email});

    if(exisingUser) {
        throw new CustomError("Nome de usuário já está cadastrado", 409);
    }
    if(existingEmail) {
        throw new CustomError("Email já está sendo utilizado!", 409);
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
        ...rest,
        username,
        password: hashedPasword,
        email
    });

    return {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email
    };
}

