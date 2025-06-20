"use client"

import styles from "./table.module.css";

import { IPostResponse } from "@/utils/interfaces/postInterfaces";
import { formatDate } from "@/utils/functions/formatDate";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/contexts/ToastProvider";


export default function PostTable({ posts }: { posts: IPostResponse[] }) {

    const { showToastSuccess, showToastError } = useContext(ToastContext);
    const [postsInTable, setPostsInTable] = useState(posts);
    

    useEffect(() => {
        setPostsInTable(posts);
    }, [posts]);

    async function deletePost(slug: string) {
        try {
            const response = await fetch(`http://localhost:3000/api/post/${slug}`, {
                method: "DELETE"
            });

            const resJson = await response.json();
            showToastSuccess(resJson.message);
        }
        catch(err: any) {
            showToastError(`Ocorreu algum erro ao excluir o post: ${err.message}`);
        }
    }

    async function handleDeletePost(slug: string) {
        await deletePost(slug);
        setPostsInTable(prevPosts => prevPosts.filter(post => post.slug !== slug));
    }


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
                {postsInTable.map((post: IPostResponse) => (
                    <tr key={post._id} className={styles.tableLine}>
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>{formatDate(post.createdAt!)}</td>
                        <td>
                            <div className={styles.actionsContainer} >
                                <MdEdit className={styles.actionContainer} />
                                <MdDelete onClick={() => handleDeletePost(post.slug)} className={styles.actionContainer} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}