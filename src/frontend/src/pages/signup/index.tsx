// import styles from "../../styles/Home.module.scss"
import { useState, FormEvent } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import logoImg from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';

import { Input, TextArea } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';

import Link from 'next/link';

import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [loading, setLoading] = useState(false);

	async function handleSignUp(event: FormEvent) {
		event.preventDefault();

		if (name === '' || email === '' || password === '') {
			alert('Preencha todos os campos!');
			return;
		}

		setLoading(true);


		
	}

	return (
		<>
			<Head>
				<title>Faça seu cadastro!</title>
			</Head>

			<div className={styles.containerCenter}>
				<Image src={logoImg} alt='Logo Sujeito Pizzaria' />
				
				<div className={styles.login}>
                    <h1>Criando sua conta</h1>
					<form onSubmit={handleSignUp}>
                        <Input 
							placeholder='Digite seu nome: ' 
							type='text' 
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<Input 
							placeholder='Digite seu email: ' 
							type='email' 
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input 
							placeholder='Digite sua senha: ' 
							type='password' 
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button type="submit" loading={loading}>Cadastrar</Button>
					</form>
					<Link href="/" legacyBehavior>
						<a className={styles.text}>Já possui uma conta? Faça login!</a>
					</Link>
				</div>
			</div>
		</>
	)
}