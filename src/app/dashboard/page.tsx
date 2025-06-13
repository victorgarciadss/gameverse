import { Header } from "@/components/header";
import styles from "./dashboard.module.css";
import Link from "next/link";


export default function Dashboard() {
    return (
        <>
            <Header />

            <main className={styles.mainContainer}>
                <aside className={styles.asideContainer}>
                    <nav>
                        <ul className={styles.listContainer}>
                            <li>
                                <button className={styles.dashboardGroupButton}>Posts</button>
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
            </main>
        
        </>
        
    )
}