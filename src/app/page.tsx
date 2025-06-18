import { Header } from "@/components/header";
import styles from "./page.module.css";
import Image from "next/image";
import { IPostResponse, PostProps } from "@/utils/interfaces/postInterfaces";
import Link from "next/link";
import PostComponent from "@/components/postComponent";

export default async function Home() {

  const data = await fetch("http://localhost:3000/api/post", {
    method: "GET",
    cache: "no-store"
  });

  const posts: IPostResponse[] = await data.json();
  
  let featuredPost: IPostResponse = posts[Math.floor(Math.random() * posts.length)];
  while (!featuredPost.images || featuredPost.images.length === 0) {
    featuredPost = posts[Math.floor(Math.random() * posts.length)];
  }

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        
        <h2 className={styles.subtitle}>Em destaque</h2>
        <section className={styles.imageContainer}>
          <Image
            src={featuredPost.images![0]}
            alt={"Imagem em destaque"}
            width={800}
            height={500}
            className={styles.featuredImage}
          />

          <div className={styles.overImage}>
            <h3 className={styles.featuredPostTitle}>{featuredPost.title}</h3>
            <Link href={`/posts/${featuredPost.slug}`} className={styles.linkToFeaturedPost} >
              Ler post completo
            </Link>
          </div>
        </section>

        <section className={styles.postsSection}>
          {
            posts.map((post: IPostResponse) => {
              return (
                <Link href={`/posts/${post.slug}`} key={post._id} >
                  <PostComponent
                    title={post.title}
                    images={post.images && post.images?.length > 0 ? post.images : ["/default-image.png"]}
                    createdAt={post.createdAt}
                  />
                </Link>
              )
            })
          }
        </section>
        
      </main>
    </>
  );
}
