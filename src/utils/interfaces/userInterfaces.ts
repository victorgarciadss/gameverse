export interface IUser {
    username: string;
    name: string;
    password: string;
    email: string;
    phone?: string;
    birthdate?: Date;
    createdAt?: Date;
    role: "admin" | "user";
}

export interface IUserResponse extends IUser {
    _id: string;
}

export interface UserCredentials {
    username: string;
    password: string;
}