import styles from "./table.module.css";

import { IPostResponse } from "@/utils/interfaces/postInterfaces";
import { formatDate } from "@/utils/functions/formatDate";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function PostTable({ posts }: { posts: IPostResponse[] }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.tableLine}>
                    <th>Titulo</th>
                    <th>Autor</th>
                    <th>Data</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post: IPostResponse) => (
                    <tr key={post._id} className={styles.tableLine}>
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>{formatDate(post.createdAt!)}</td>
                        <td>
                            <div className={styles.actionsContainer} >
                                <MdEdit className={styles.actionContainer} />
                                <MdDelete className={styles.actionContainer} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}