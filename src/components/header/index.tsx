import Link from 'next/link';
import styles from './header.module.css';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <h1>GameVerse</h1>

            <nav>
                <ul className={styles.navListContainer}>
                    <Link href={"/"}>
                        <li>Login</li>
                    </Link>
                    
                    <Link href={"/"}>
                        <li>Cadastro</li>
                    </Link>
                    
                </ul>
            </nav>
        </header>
    )
}