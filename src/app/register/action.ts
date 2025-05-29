
import { signIn } from "next-auth/react";

export async function registerAction(prevState: any, formData: FormData) {

    const username = formData.get("username");
    const name = formData.get("name");
    const password = formData.get("password");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const birthdate = formData.get("birthdate");

    try {
        
        const response = await fetch("http://localhost:3000/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                name,
                password,
                email,
                phone,
                birthdate
            })
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error('Erro da API:', errorBody);
            return { error: errorBody.error || "Erro ao cadastrar usuário" };
        }

        const loggingIn = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false
        });

        if (!loggingIn?.ok) {
            console.error("Erro ao fazer login após cadastro:", loggingIn);
            return { error: "Erro ao fazer login após cadastro" };
        }

        return { success: "Usuário cadastrado com sucesso" };
    }
    catch (err: any) {
        console.error("Erro no processamento do cadastro: ", err);
        return { error: err.message || "Erro no servidor ao cadastrar usuário" };
    }
}