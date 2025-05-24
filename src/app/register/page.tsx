import Link from "next/link";
import styles from "./register.module.css";
import { registerAction } from "./action";

export default function Register() {
    return (
        <div className={styles.registerContainer}>
            <h1 className={styles.registerPageTitle}>Realize seu cadastro inserindo os dados abaixo:</h1>

            <form className={styles.formContainer} action={registerAction}>
                <div className={styles.inputContainer}>
                    <label htmlFor="">Digite seu nome de usuário: <span className={styles.requiredData}>*</span> </label>
                    <input type="text" name="username" placeholder="Username..." />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="">Digite seu nome e sobrenome: <span className={styles.requiredData}>*</span></label>
                    <input type="text" name="name" placeholder="Nome completo..."/>
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="">Digite sua senha: <span className={styles.requiredData}>*</span></label>
                    <input type="password" name="password" placeholder="Senha..." />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="">Digite seu e-mail: <span className={styles.requiredData}>*</span></label>
                    <input type="email" name="email" placeholder="Email..." />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="">Digite seu telefone: </label>
                    <input type="text" name="phone" placeholder="Telefone..." />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="">Insira sua data de nascimento</label>
                    <input type="date" name="birthDate" />
                </div>

                <div className={styles.buttonContainer}>
                    <button
                        type="submit"
                        className={styles.buttonRegister}
                    >
                        Cadastrar-se
                    </button>
                </div>

                <div className={styles.redirectToLogin}>
                    <Link href={"/login"}>
                        Já possui cadastro? <br /> Realize seu login clicando aqui
                    </Link>
                </div>
            </form>
        </div>
    )
}