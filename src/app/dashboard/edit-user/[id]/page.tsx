"use client"

import { useContext, useEffect, useState } from "react";
import styles from "./editUser.module.css";

import { Header } from "@/components/header"
import { useParams, useRouter } from "next/navigation";
import { ToastContext } from "@/contexts/ToastProvider";
import { ImSpinner8 } from "react-icons/im";

export default function EditUser() {

    const params = useParams();
    const id = params.id;

    const router = useRouter();

    const [ user, setUser ] = useState({
        _id: "",
        name: "",
        email: "",
        phone: "",
        birthdate: ""
    });
    
    const { showToastSuccess, showToastError } = useContext(ToastContext);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch(`http://localhost:3000/api/user/${id}`, {
                method: "GET",
                cache: "no-store"
            });

            const user = await response.json();
            setUser(user);
            
        }

        fetchUser();
    }, []);

    async function handleUpdateUser(e: React.FormEvent, id: string) {
        e.preventDefault();

        try {

            setLoading(true);

            const response = await fetch(`http://localhost:3000/api/user/${id}`, {
                method: "PUT",
                body: JSON.stringify(user)
            });

            const userResp = await response.json();
            
            if(!response.ok) {
                showToastError(userResp.error);
            }
            else {
                showToastSuccess(userResp.message);
                router.push("/dashboard");
            }
        }
        catch(err: any) {
            throw new Error("Erro ao atualizar usuário: " + err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header />

            <main className={styles.mainContainer}>
                <h1 className={styles.editUserPageTitle}>Edite seus dados abaixo:</h1>
                
                <form className={styles.formContainer} onSubmit={(e) => handleUpdateUser(e, user._id)}>

                    <div className={styles.inputContainer}>
                        <label htmlFor="name">Nome completo: <span className={styles.requiredData}>*</span></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome completo..."
                            required
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="email">E-mail: <span className={styles.requiredData}>*</span></label>
                        <input
                            type="email" 
                            name="email" 
                            placeholder="Email..." 
                            required 
                            value={user?.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="phone">Telefone:</label>
                        <input 
                            type="text"
                            name="phone" 
                            placeholder="Telefone..." 
                            value={user?.phone} 
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="birthdate">Data de nascimento:</label>
                        <input 
                            type="date" 
                            name="birthdate" 
                            value={user?.birthdate?.toString().substring(0, 10)}
                            onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
                        />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button
                            type="submit"
                            className={styles.buttonUpdate}
                        >
                            {loading ? (
                                <>
                                    <span>Atualizando...</span>
                                    <ImSpinner8 className={styles.spinnerIcon} />
                                </>
                            ) : (
                                "Salvar alterações"
                            )}
                            
                        </button>
                    </div>
                </form>
                
            </main>
        </>
        
    )
}