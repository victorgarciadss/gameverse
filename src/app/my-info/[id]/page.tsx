import { Header } from "@/components/header/index";

import styles from "./myInfo.module.css";

export default async function MyInfo(context: { params: Promise<{ id: string }> }) {

    const { id } = await context.params;
    
    const response = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "GET",
        cache: "no-store"
    });

    const user = await response.json();
    console.log(user);

    return (
        <>
            <Header />

            <main className={styles.mainContainer}>
                <div>

                </div>
            </main>
        </>
    )
}