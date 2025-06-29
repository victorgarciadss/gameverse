import Link from "next/link";
import styles from "./not-found.module.css";

import Image from "next/image";

export default function NotFound() {
    
    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.title}>Página não encontrada</h1>

            <Image
                src={"/not-found-image.jpg"} 
                alt={"Imagem de página não encontrada com o número 404"}
                width={500}
                height={300}
            />

            <Link href={"/"}>
                <button className={styles.backButton}>Voltar para homepage</button>
            </Link>
            
        </main>
    )
}