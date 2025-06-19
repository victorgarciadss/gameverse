import styles from "./table.module.css";
import { IUserResponse } from "@/utils/interfaces/userInterfaces";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function UserTable({users} : {users: IUserResponse[]}) {
    
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
                                <MdEdit className={styles.actionContainer} />
                                <MdDelete className={styles.actionContainer} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}