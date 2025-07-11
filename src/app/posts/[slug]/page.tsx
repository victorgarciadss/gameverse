import { Header } from "@/components/header";
import styles from "./post.module.css";
import { IPostResponse } from "@/utils/interfaces/postInterfaces";
import Image from "next/image";
import { formatDate } from "@/utils/functions/formatDate";

export default async function PostPage(context: { params: Promise<{ slug: string }> }) {

    const slugResolved = (await context.params).slug;

    const data = await fetch(`http://localhost:3000/api/post/${slugResolved}`, {
        method: "GET",
        cache: "no-store"
    });

    const postFounded: IPostResponse = await data.json();
    

    return (
        <>
            <Header />
            <main className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.postTitle}>{postFounded.title}</h1>

                    <p className={styles.secondaryInfos}>
                        <span>
                            {formatDate(postFounded.createdAt!)}
                        </span>
                        por
                        <span className={styles.postAuthor}>{postFounded.author}</span>
                    </p>  
                </div>
                

                <article className={styles.postContainer}>
                    <div className={styles.imageContainer}>
                        {postFounded.images?.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                width={500}
                                height={300}
                                alt={"Imagem de jogo do post"}
                                className={styles.postImage}
                            />
                        ))}
                        
                    </div>
                    <div className={styles.postContent}>
                        {postFounded.content.split("\n").map((line, index) => (
                            <p className={styles.paragraphContent} key={index}>
                                {line}
                            </p>
                        ))}
                    </div>
                </article>
            </main>

            
        </>
        
    )
}