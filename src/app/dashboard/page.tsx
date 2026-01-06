"use client";

import { Header } from "@/components/header";
import styles from "./dashboard.module.css";
import Link from "next/link";
import { useContext } from "react";
import UserTable from "@/components/tables/UserTable";
import PostTable from "@/components/tables/PostTable";
import { DashboardContext } from "@/contexts/DashboardProvider";


export default function Dashboard() {

    const { posts,
        users,
        group,
        handleFetchPosts,
        handleFetchUsers
    } = useContext(DashboardContext);

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