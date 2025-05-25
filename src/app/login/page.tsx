import Link from "next/link";
import styles from "./login.module.css";

export default function Login() {
    return (
        <main className={styles.loginContainer}>
            <h1 className={styles.titleContainer}>Realize seu login inserindo as credenciais</h1>

            <form className={styles.formContainer} >
                <div className={styles.inputContainer}>
                    <label htmlFor="">Insira seu nome de usuário:</label>
                    <input type="text" name="username" placeholder="Username..." />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="">Insira sua senha:</label>
                    <input type="password" name="password" placeholder="Senha..." />
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