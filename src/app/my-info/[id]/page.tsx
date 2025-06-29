"use client"

import { Header } from "@/components/header/index";

import styles from "./myInfo.module.css";
import { IUserResponse } from "@/utils/interfaces/userInterfaces";

import { MdDelete } from "react-icons/md";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/contexts/ToastProvider";
import { ImSpinner8 } from "react-icons/im";
import { signOut } from "next-auth/react";

export default function MyInfo() {

    const params = useParams();
    const { id } = params;

    const [user, setUser] = useState<IUserResponse>();
    const { showToastSuccess, showToastError } = useContext(ToastContext);


    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch(`http://localhost:3000/api/user/${id}`, {
                method: "GET",
                cache: "no-store"
            });

            const userResp: IUserResponse = await response.json();
            setUser(userResp);
        }

        fetchUserData();
    }, []);

    
    function formatISODate(birthDate: Date) {
        const dateStr = birthDate.toString();
        const [year, month, day] = dateStr.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    }

    async function deleteCount() {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${id}`, {
                method: "DELETE",
                cache: "no-store"
            });

            const result = await response.json();

            if(!response.ok) {
                showToastError(result.error);
            }
            else {
                showToastSuccess("Conta deletada com sucesso");
                signOut({ callbackUrl: "/" });
            }
            
        }
        catch(err: any) {
            showToastError("Erro ao deletar usuário: " + err.message);
        }
    }

    if(!user) {
        return (
            <main className={styles.loadContainer}>
                <ImSpinner8 className={styles.spinnerIcon} />
            </main>
        )
    }

    return (
        <>
            <Header />

            <main className={styles.mainContainer}>
                <h2 className={styles.subtitle}>Seus dados:</h2>

                <div className={styles.dataUserContainer}>

                    <p className={styles.paragraphInfo}>
                        <span>Nome:</span> {user.name}
                    </p>

                    <p className={styles.paragraphInfo}>
                        <span>Email:</span> {user.email}
                    </p>

                    <p className={styles.paragraphInfo}>
                       <span>Username:</span> {user.username} 
                    </p>

                    <p className={styles.paragraphInfo}>
                        <span>Data de aniversário:</span> {user.birthdate ? formatISODate(user.birthdate) : "Sem data de aniversário informada"}
                    </p>

                    <p className={styles.paragraphInfo}>
                        <span>Telefone:</span> {user.phone ? user.phone : "Sem telefone informado"}
                    </p>
                </div>

                <button className={styles.deleteCountButton} onClick={deleteCount}>
                    Deletar conta <MdDelete className={styles.deleteIcon} />
                </button>
            </main>
        </>
    )
}