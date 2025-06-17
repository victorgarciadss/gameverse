import { PostProps } from "@/utils/interfaces/postInterfaces";
import styles from "./postComponent.module.css";
import Image from "next/image";

export default function PostComponent({ title, images, createdAt } : PostProps) {

    function formatDate(date: Date) : string {
        return new Date(date).toLocaleDateString("pt-BR");
    }

    return (
        <article className={styles.postContainer}>
            <Image
                width={300}
                height={180}
                src={images![0]}
                alt={"Imagem de capa do post"}
                className={styles.postImage}
            />

            <div className={styles.postContent}>
                
                <h3>{title}</h3>
                <p className={styles.postCreationDate}>{formatDate(createdAt!)}</p>
            </div>
        </article>
    )
}