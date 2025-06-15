import { Header } from "@/components/header";
import styles from "./page.module.css";

export default async function Home() {

  const data = await fetch("http://localhost:3000/api/post", {
    method: "GET",
    cache: "no-store"
  });

  const posts = await data.json();

  console.log(posts);

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        

        <section>
          <h2 className={styles.subtitle}>Em destaque</h2>
          <div className={styles.imageContainer}>

          </div>
        </section>
      </main>
    </>
  );
}
