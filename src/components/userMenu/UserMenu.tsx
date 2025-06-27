import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { FaUserCircle } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import styles from './userMenu.module.css';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function UserMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { data } = useSession();
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function redirectToEditUserData() {
        const userId = data?.user.id;
        router.push(`/edit-user/${userId}`);
    }

    function redirectToUserDataPage() {
        const userId = data?.user.id;
        router.push(`/my-info/${userId}`);
    }

    return (
        <div>
            <Button
                id="user-button"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={styles.userButton}
                disableRipple
            >
                <FaUserCircle className={styles.userIcon} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            padding: '0.75rem',
                            backgroundColor: 'var(--secondary)',
                        }
                    }
                }}   
            >
                <MenuItem 
                    sx={{
                        fontSize: "1.25rem",
                        display: "flex",
                        gap: "0.5rem"
                    }} 
                    onClick={redirectToUserDataPage}
                >
                    <FaUserLarge />
                    Minha conta
                </MenuItem>
                <MenuItem
                    sx={{
                        fontSize: "1.25rem",
                        display: "flex",
                        gap: "0.5rem"
                    }} 
                    onClick={redirectToEditUserData}
                >
                    <FaUserEdit />
                    Editar meus dados
                </MenuItem>
                <MenuItem 
                    sx={{
                        fontSize: "1.25rem",
                        display: "flex",
                        gap: "0.5rem"
                    }} 
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <MdLogout />
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}