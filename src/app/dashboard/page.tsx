"use client";

import { Header } from "@/components/header";
import styles from "./dashboard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IPostResponse } from "@/utils/interfaces/postInterfaces";
import { IUser, IUserResponse } from "@/utils/interfaces/userInterfaces";
import { formatDate } from "@/utils/functions/formatDate";
import UserTable from "@/components/tables/UserTable";
import PostTable from "@/components/tables/PostTable";


export default function Dashboard() {

    const [posts, setPosts] = useState<IPostResponse[]>([]);
    const [users, setUsers] = useState<IUserResponse[]>([]);
    const [group, setGroup] = useState<"posts" | "users">("posts");

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

    useEffect(() => {
        getPosts();
        getUsers();
    }, []);

    return (
        <>
            <Header />

            <main className={styles.mainContainer}>
                <aside className={styles.asideContainer}>
                    <nav>
                        <ul className={styles.listContainer}>
                            <li>
                                <button
                                    className={styles.dashboardGroupButton}
                                    onClick={handleFetchPosts}
                                >
                                    Posts
                                </button>
                            </li>
                            <li>
                                <button
                                    className={styles.dashboardGroupButton}
                                    onClick={handleFetchUsers}
                                >
                                    Usuários
                                </button>
                            </li>
                            <li>
                                <Link href={"/dashboard/create-post"}>
                                    <button className={styles.createPostButton}>Criar Post</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <section className={styles.infoToAdminContainer}>
                    <div className={styles.cardsToInfo}>
                        <div className={styles.card}>
                            <span className={styles.icon}>📝</span>
                            <p>Total de Posts: {posts.length}</p>   
                        </div>
                        <div className={styles.card}>
                            <span className={styles.icon}>👥</span>
                            <p>Total de Usuários: {users.length}</p>    
                        </div>
                    </div>
                    
                    {group === "posts" ? (
                        <PostTable posts={posts} />
                    ) : (
                        <UserTable users={users} />
                    )}
                    
                </section>
                
            </main>
        
        </>
        
    )
}