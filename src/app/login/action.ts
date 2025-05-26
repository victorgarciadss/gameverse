import { signIn } from "next-auth/react";

export async function loginAction(prevState: any, formData: FormData) {

    const username = formData.get("username");
    const password = formData.get("password");

    try {
        const response = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        });

        if(!response?.ok) {
            return { error: "Usuário ou senha incorretos!!" }
        }

        console.log(response);
        return { success: true };

    }
    catch (err: any) {
        return { error: `Ocorreu o seguinte erro ao fazer login: ${err.message}` }
    }
}