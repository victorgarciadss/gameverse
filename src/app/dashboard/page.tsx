"use client";

import { Header } from "@/components/header";
import styles from "./dashboard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IPostResponse } from "@/utils/interfaces/postInterfaces";
import { IUser } from "@/utils/interfaces/userInterfaces";
import { formatDate } from "@/utils/functions/formatDate";


export default function Dashboard() {

    const [posts, setPosts] = useState<IPostResponse[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    async function getPosts() {
        try {
            const response = await fetch("http://localhost:3000/api/post", {
                method: "GET",
                cache: "no-store"
            });

            const posts: IPostResponse[] = await response.json();
            setPosts(posts);
        }
        catch(error: any) {
            throw new Error("Erro ao buscar os posts: " + error.message);
        }
    }

    useEffect(() => {
        getPosts();
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
                                    onClick={getPosts}
                                >
                                    Posts
                                </button>
                            </li>
                            <li>
                                <button className={styles.dashboardGroupButton}>Usuários</button>
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
                            <p>Total de Posts: 25</p>   
                        </div>
                        <div className={styles.card}>
                            <span className={styles.icon}>👥</span>
                            <p>Total de Usuários: 5</p>
                            
                        </div>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tableLine}>
                                <th>Titulo</th>
                                <th>Autor</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {posts.map((post: IPostResponse) => (
                                <tr key={post._id} className={styles.tableLine}>
                                    <td>{post.title}</td>
                                    <td>{post.author}</td>
                                    <td>{formatDate(post.createdAt!)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                
            </main>
        
        </>
        
    )
}