"use client"

import { useContext, useEffect, useRef, useState } from "react";
import styles from "./editPost.module.css";

import { Header } from "@/components/header";
import { ToastContext } from "@/contexts/ToastProvider";
import { useParams } from "next/navigation";

import { ImSpinner8 } from "react-icons/im";
import { IPostResponse } from "@/utils/interfaces/postInterfaces";

export default function EditPost() {

    const params = useParams();
    const slug = params.slug;

    const [post, setPost] = useState<IPostResponse>();
    const [titleInput, setTitleInput] = useState<string>("");
    const [contentTextArea, setContentTextArea] = useState<string>("");
    const { showToastSuccess, showToastError } = useContext(ToastContext);
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newFile = event.target.files;
        if(!newFile) {
            setFiles([]);
            return;
        }
        setFiles((prevFiles) => [...prevFiles, ...Array.from(newFile)]);
    }


    function clearFiles(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setFiles([]);

        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    async function handleUpdatePost() {

    }

    useEffect(() => {
        console.log("use effect chamado")
        async function fetchPost() {
            const response = await fetch(`http://localhost:3000/api/post/${slug}`, {
                method: "GET",
                cache: "no-store"
            });

            const postResp = await response.json();
            setPost(postResp);
            
        }

        fetchPost();
        
    }, []);
    
    if(!post) {
        return (
            <>
                <Header />
                <main className={styles.mainContainer}>Carregando post</main>
            </>
        )
    }

    return (
        <>
            <Header />

            <main className={styles.mainContainer}>
                <h1 className={styles.title}>Editar Post</h1>

                <form className={styles.formContainer} onSubmit={handleUpdatePost}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Título</label>
                        <input
                            className={styles.inputTitle}
                            type="text"
                            name="title"
                            value={post.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="content">Edite o texto da sua publicação:</label>
                        <textarea
                            className={styles.inputContent}
                            name="content"
                            value={post.content}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContentTextArea(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="files">Anexe novos arquivos (opcional):</label>
                        <input
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className={styles.inputFiles}
                            type="file"
                            name="files"
                            multiple
                        />
                        <button
                            className={styles.clearFilesButton}
                            onClick={clearFiles}
                            type="button"
                        >
                            Limpar arquivos anexados
                        </button>
                    </div>

                    {files.length > 0 && (
                        <div className={styles.formGroup}>
                            <h3 className={styles.filesSelectedTitle}>Arquivos selecionados:</h3>
                            <ul className={styles.filesList}>
                                {Array.from(files).map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <button type="submit" className={styles.postButton}>
                            {loading ? (
                                <>
                                    <span>Salvando...</span>
                                    <ImSpinner8 className={styles.spinnerIcon} />
                                </>
                            ) : (
                                "Salvar Alterações"
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}