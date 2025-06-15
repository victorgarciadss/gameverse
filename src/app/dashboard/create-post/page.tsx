"use client";

import { Header } from "@/components/header";
import styles from "./createPost.module.css";
import { useContext, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";
import { ToastContext } from "@/contexts/ToastProvider";

export default function CreatePost() {

    const { data } = useSession();
    const router = useRouter();
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

    async function handleSubmitPost(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        // para envio na requisição post
        const postData = new FormData();
        postData.append("title", formData.get("title") as string);
        postData.append("content", formData.get("content") as string);
        postData.append("author", data?.user.name || "Desconhecido");

        files.forEach(file => {
            postData.append("files", file);
        });

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/post", {
                method: "POST",
                body: postData
            });

            if (!response.ok) {
                const errorBody = await response.json();
                showToastError(errorBody.error);
                setLoading(false);
            }
            else {
                const responseData = await response.json();
                showToastSuccess("Post criado com sucesso!");
                router.push("/dashboard");
            }  
        }
        catch(err) {
            showToastError("Erro ao enviar o post: " + err);
            setLoading(false);
        }
    }


    return (
        <>
            <Header />
            
            <main className={styles.mainContainer}>
                <h1 className={styles.title}>Escreva seu Post</h1>
                
                <form className={styles.formContainer} onSubmit={handleSubmitPost}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Título</label>
                        <input className={styles.inputTitle} type="text" name="title" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="content">Escreva o texto da sua publicação:</label>
                        <textarea className={styles.inputContent} name="content" ></textarea>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="files">Anexe os arquivos desejados:</label>
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
                                    <span>Publicando...</span>
                                    <ImSpinner8 className={styles.spinnerIcon} />
                                </>
                            ) : (
                                "Publicar Post"
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </>
        
    )
}