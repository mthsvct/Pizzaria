// import styles from "../../styles/Home.module.scss"
import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import logoImg from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';

import { Input, TextArea } from '../components/ui/input';
import { Button } from '../components/ui/button';

import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';

import { Inter } from 'next/font/google'
import { toast } from 'react-toastify';
import { canSSRGuest } from '../utils/canSSRGuest';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const { signIn } = useContext(AuthContext);

	const [email, setEmail] = useState(''); // é atribuido o valor inicial do estado
	const [password, setPassword] = useState('');

	const [loading, setLoading] = useState(false);

	async function handleLogin(event: FormEvent){
		event.preventDefault();

		if (email === '' || password === ''){
			toast.warning('Preencha todos os campos!');
			return 
		}

		setLoading(true);

		let data = {
			email,
			password
		}
		await signIn(data);
		setLoading(false);
	}

	return (
		<>
			<Head>
				<title>Sujeito Pizza - Faça seu login;</title>
			</Head>

			<div className={styles.containerCenter}>
				<Image src={logoImg} alt='Logo Sujeito Pizzaria' />
				
				<div className={styles.login}>
					<form onSubmit={handleLogin}>

						<Input 
							placeholder='Digite seu email: ' 
							type='email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							/>

						<Input 
							placeholder='Digite sua senha: ' 
							type='password'
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							/>

						<Button type="submit" loading={loading}>Fazer Login</Button>

					</form>

					<Link href="/signup" legacyBehavior>
						<a className={styles.text}>Não possui uma conta? Cadastre-se</a>
					</Link>

				</div>
			</div>
		</>
	)
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
	return {
		props: {}
	}
});

