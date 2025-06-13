"use client";

import { Header } from "@/components/header";
import styles from "./createPost.module.css";
import { useState } from "react";

export default function CreatePost() {

    const [files, setFiles] = useState<File[]>([]);

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
    }


    return (
        <>
            <Header />
            
            <main className={styles.mainContainer}>
                <h1 className={styles.title}>Escreva seu Post</h1>
                
                <form className={styles.formContainer}>
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
                            onChange={handleFileChange}
                            className={styles.inputFiles}
                            type="file"
                            name="files"
                            multiple
                        />
                        <button
                            className={styles.clearFilesButton}
                            onClick={clearFiles}
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
                        <button type="submit" className={styles.postButton}>Publicar Post</button>
                    </div>
                </form>
            </main>
        </>
        
    )
}