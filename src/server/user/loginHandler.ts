import { UserModel } from "@/models/User";
import { UserCredentials } from "@/utils/interfaces/userInterfaces";
import bcrypt from "bcryptjs";

export async function loginUser(credentials: UserCredentials) {
    const { username, password } = credentials;

    if(!username || !password) {
        return null;
    }

    const user = await UserModel.findOne({ username: username });

    if(!user) {
        return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) {
        return null;
    }

    return {
        id: user._id.toString(),
        name: user.name,
        role: user.role
    }
}