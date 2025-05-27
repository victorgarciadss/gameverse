"use client"

import Link from 'next/link';
import styles from './header.module.css';

import { useSession } from "next-auth/react";

export function Header() {

    const { data: session, status } = useSession();

    return (
        status === "loading" ?
            (<p>Carregando...</p>)
            : 
            status !== "unauthenticated" ? (   
                <header className={styles.headerContainer}>
                    <h1>GameVerse</h1>
                    <nav>
                        <ul className={styles.navListContainer}>
                            <p>Bem vindo {session?.user.name || "Usuário"}</p>
                        </ul>
                    </nav>
                </header>    
            )
            :
            (
                <header className={styles.headerContainer}>
                    <h1>GameVerse</h1>

                    <nav>
                        <ul className={styles.navListContainer}>
                            <Link href={"/login"}>
                                <li>Login</li>
                            </Link>
                            
                            <Link href={"/register"}>
                                <li>Cadastro</li>
                            </Link>
                            
                        </ul>
                    </nav>
                </header>
                    
            )
            
    )
}