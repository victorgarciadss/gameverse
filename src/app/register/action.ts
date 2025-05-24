"use server"

export async function registerAction(formData: FormData) {
    try {
        const username = formData.get("username");
        const name = formData.get("name");
        const password = formData.get("password");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const birthDate = formData.get("birthDate");


        const response = await fetch("http://localhost:3000/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                name,
                password,
                email,
                phone,
                birthDate
            })
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error('Erro da API:', errorBody);
            throw new Error(errorBody.message || "Erro ao cadastrar usuário");
        }
    }
    catch (err: any) {
        console.error("Erro no processamento do cadastro: ", err);
    }
}