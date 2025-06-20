"use client"

import { DashboardContextProps } from "@/utils/interfaces/dashboardInterfaces";
import { IPostResponse } from "@/utils/interfaces/postInterfaces";
import { IUserResponse } from "@/utils/interfaces/userInterfaces";
import { createContext, useState } from "react"

export const DashboardContext = createContext({} as DashboardContextProps);

export function DashboardProvider({ children } : { children : React.ReactNode }) {

    const [posts, setPosts] = useState<IPostResponse[]>([]);
    const [users, setUsers] = useState<IUserResponse[]>([]);
    const [group, setGroup] = useState<"posts" | "users">("posts");
    const [postsQuantity, setPostsQuantity] = useState<number>(posts.length);
    const [usersQuantity, setUsersQuantity] = useState<number>(users.length);

    async function getPosts() {
        try {
            const response = await fetch("http://localhost:3000/api/post", {
                method: "GET",
                cache: "no-store"
            });

            const postsFounded: IPostResponse[] = await response.json();
            setPosts(postsFounded);
        }
        catch(error: any) {
            throw new Error("Erro ao buscar os posts: " + error.message);
        }
    }

    async function getUsers() {
        try {
            const response = await fetch("http://localhost:3000/api/user", {
                method: "GET",
                cache: "no-store"
            });

            const usersFounded: IUserResponse[] = await response.json();
            setUsers(usersFounded);
        }
        catch(error: any) {
            throw new Error("Erro ao buscar usuários: " + error.message);
        }
    }

    function handleFetchPosts() {
        getPosts();
        setGroup("posts");
    }

    function handleFetchUsers() {
        getUsers();
        setGroup("users");
    }

    function adjustPostDataInterface(slug: string) {
        setPosts(prevPosts => prevPosts.filter(post => post.slug !== slug));
        setPostsQuantity(prevNumber => prevNumber - 1);
    }

    function adjustUserDataInterface(id: string) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        setUsersQuantity(prevNumber => prevNumber - 1);
    }
    
    return (
        <DashboardContext.Provider value={{
            posts,
            users,
            group,
            postsQuantity,
            usersQuantity,
            getPosts,
            getUsers,
            handleFetchPosts,
            handleFetchUsers,
            adjustPostDataInterface,
            adjustUserDataInterface
        }}>
            {children}
        </DashboardContext.Provider>
    )
}