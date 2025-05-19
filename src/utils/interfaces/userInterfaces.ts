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