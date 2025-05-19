import mongoose from "mongoose";
import { IUser } from "../utils/interfaces/userInterfaces";

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    birthdate: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema); 