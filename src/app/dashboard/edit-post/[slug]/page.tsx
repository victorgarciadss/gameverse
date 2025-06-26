"use client"

import { useContext, useEffect, useRef, useState } from "react";
import styles from "./editPost.module.css";

import { Header } from "@/components/header";
import { ToastContext } from "@/contexts/ToastProvider";
import { useParams } from "next/navigation";

import { ImSpinner8 } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { IPostResponse } from "@/utils/interfaces/postInterfaces";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EditPost() {

    const params = useParams();
    const slug = params.slug;

    const router = useRouter();

    const { data } = useSession();
    const [post, setPost] = useState<IPostResponse>();
    const [titleInput, setTitleInput] = useState<string>("");
    const [contentTextArea, setContentTextArea] = useState<string>("");
    const { showToastSuccess, showToastError } = useContext(ToastContext);
    const [files, setFiles] = useState<File[]>([]);
    const [existingFiles, setExistingFiles] = useState<string[]>([]);
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
        setExistingFiles([]);

        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    async function handleUpdatePost(e: React.FormEvent, slug: string) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", titleInput);
        formData.append("content", contentTextArea);
        formData.append("author", data?.user.name || "Desconhecido");

        files.forEach((file) => {
            formData.append("files", file);
        })

        existingFiles.forEach(fileUrl => {
            formData.append("existingFiles", fileUrl);
        })

        try{
            setLoading(true);

            const response = await fetch(`http://localhost:3000/api/post/${slug}`, {
                method: "PUT",
                body: formData
            });

            const result = await response.json();
            
            if(!response.ok) {
                showToastError(result.error);
            }
            else {
                showToastSuccess(result.message);
                router.push("/posts/" + result.post.slug);
            }
        }
        catch(err: any) {
            showToastError("Erro ao atualizar o post: " + err);
        }
        finally {
            setLoading(false);
        }
        
    }

    useEffect(() => {
        async function fetchPost() {
            const response = await fetch(`http://localhost:3000/api/post/${slug}`, {
                method: "GET",
                cache: "no-store"
            });

            const postResp = await response.json();
            setPost(postResp);

            setTitleInput(postResp.title);
            setContentTextArea(postResp.content);
            setExistingFiles(postResp.images || []);
            
        }

        fetchPost();
        
    }, []);
    
    if(!post) {
        return (
            <>
                <Header />
                <main className={styles.iconContainer}>
                    <ImSpinner8 className={styles.spinnerIcon} style={{ fontSize: '2.5rem' }}/>
                </main>
            </>
        )
    }

    return (
        <>
            <Header />

            <main className={styles.mainContainer}>
                <h1 className={styles.title}>Editar Post</h1>

                <form className={styles.formContainer} onSubmit={(e) => handleUpdatePost(e, post.slug)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Título</label>
                        <input
                            className={styles.inputTitle}
                            type="text"
                            name="title"
                            value={titleInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="content">Edite o texto da sua publicação:</label>
                        <textarea
                            className={styles.inputContent}
                            name="content"
                            value={contentTextArea}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContentTextArea(e.target.value)}
                            required
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

                    {existingFiles.length > 0 && (
                        <div className={styles.formGroup}>
                            <h3 className={styles.filesSelectedTitle}>Arquivos já enviados:</h3>
                            <ul className={styles.imagesExistingList}>
                                {existingFiles.map((fileUrl, index) => (
                                    <li key={index} className={styles.itemList}>
                                        <Image src={fileUrl} alt="Imagem do post" width={100} height={60} />
                                        <TiDelete className={styles.removeIcon} onClick={() => setExistingFiles((prev) => prev.filter((_, i) => i !== index))} />
                                        
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

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
                                    <span>Atualizando...</span>
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