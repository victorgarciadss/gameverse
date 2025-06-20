import { IPostResponse } from "./postInterfaces";
import { IUserResponse } from "./userInterfaces";

export interface DashboardContextProps {
    posts: IPostResponse[];
    users: IUserResponse[];
    group: "posts" | "users";
    postsQuantity: number;
    usersQuantity: number;
    getPosts: () => void;
    getUsers: () => void;
    handleFetchPosts: () => void;
    handleFetchUsers: () => void;
    adjustPostDataInterface: (slug: string) => void;
   adjustUserDataInterface: (id: string) => void;
}