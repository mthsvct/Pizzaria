import styles from './styles.module.scss';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '@/src/contexts/AuthContext';

export function Header(){

    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.svg" alt="logo" width={190} height={60}  />
                </Link>

                {/* <h1>{user?.name}</h1> // Coloca o ? para não causar erro enquanto aquela informação não chegar da API. */}

                <nav className={styles.menuNav}>
                    <Link href="/category" legacyBehavior >
                        <a>Categorias</a>
                    </Link>

                    <Link href="/products" legacyBehavior >
                        <a>Cardapio</a>
                    </Link>

                    <button onClick={signOut} >
                        <FiLogOut size={24} color="#fff" />
                    </button>

                </nav>

            </div>
        </header>
    )
}