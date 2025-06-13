import { Header } from "@/components/header";
import styles from "./createPost.module.css";

export default function CreatePost() {
    return (
        <>
            <Header />
            
            <main className={styles.mainContainer}>
                <h1 className={styles.title}>Escreva seu Post</h1>
                
                <form action="" className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Título</label>
                        <input className={styles.inputTitle} type="text" name="title" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="content">Escreva seu Post:</label>
                        <textarea className={styles.inputContent} name="content" ></textarea>
                    </div>
                </form>
            </main>
        </>
        
    )
}