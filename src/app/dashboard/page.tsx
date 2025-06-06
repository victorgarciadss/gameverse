import { Header } from "@/components/header";
import styles from "./dashboard.module.css";


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
                        </ul>
                    </nav>
                </aside>
            </main>
        
        </>
        
    )
}