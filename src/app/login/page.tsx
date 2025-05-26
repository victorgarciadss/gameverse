"use client"

import Link from "next/link";
import styles from "./login.module.css";
import { useActionState, useContext, useEffect } from "react";
import { loginAction } from "./action";
import { ToastContext } from "@/contexts/ToastProvider";
import { redirect } from "next/navigation";

const initialState = { error: "" };

export default function Login() {

    const [state, formAction] = useActionState(loginAction, initialState);
    const { showToastError } = useContext(ToastContext);

    useEffect(() => {
        if(state.error) {
            showToastError(state.error);
        }
        else if(state.success) {
            redirect("/");
        }
    }, [state]);
    
    return (
        <main className={styles.loginContainer}>
            <h1 className={styles.titleContainer}>Realize seu login inserindo as credenciais</h1>

            <form className={styles.formContainer} action={formAction}>
                <div className={styles.inputContainer}>
                    <label htmlFor="">Insira seu nome de usuário: <span>*</span></label>
                    <input type="text" name="username" placeholder="Username..." required />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="">Insira sua senha: <span>*</span></label>
                    <input type="password" name="password" placeholder="Senha..." required />
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.button}>Entrar</button>
                </div>

                <div className={styles.redirectToRegister}>
                    <Link href={"/register"}>
                        Não possui cadastro? <br /> Realize seu cadastro clicando aqui
                    </Link>
                </div>
            </form>
        </main>
    )
}