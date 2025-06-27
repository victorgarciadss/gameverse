import { ToastContext } from "@/contexts/ToastProvider";
import styles from "./table.module.css";
import { IUserResponse } from "@/utils/interfaces/userInterfaces";
import { useContext } from "react";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { DashboardContext } from "@/contexts/DashboardProvider";

import Link from "next/link";

export default function UserTable({users} : {users: IUserResponse[]}) {

    const { showToastSuccess, showToastError } = useContext(ToastContext);
    const { adjustUserDataInterface } = useContext(DashboardContext);

    async function deleteUser(id: string) {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${id}`, {
                method: "DELETE"
            });

            const resJson = await response.json();
            showToastSuccess(resJson.message);
        }
        catch(err: any) {
            showToastError(`Ocorreu algum erro ao excluir o usuário: ${err.message}`);
        }
    }

    async function handleDeleteUser(id: string) {
        await deleteUser(id);
        adjustUserDataInterface(id);
    }
    
    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.tableLine}>
                    <th>Username</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Role</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: IUserResponse) => (
                    <tr key={user._id} className={styles.tableLine}>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.phone}</td>
                        <td>
                            <div className={styles.actionsContainer} >
                                <Link href={`/edit-user/${user._id}`}>
                                    <MdEdit className={styles.actionContainer} />
                                </Link>
                                
                                <MdDelete
                                    onClick={() => handleDeleteUser(user._id)}
                                    className={styles.actionContainer}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}