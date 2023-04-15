// import styles from "../../styles/Home.module.scss"
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
	return (
		<>
			<Head>
				<title>Faça seu cadastro!</title>
			</Head>

			<div className={styles.containerCenter}>
				<Image src={logoImg} alt='Logo Sujeito Pizzaria' />
				
				<div className={styles.login}>
                    <h1>Criando sua conta</h1>
					<form>
                        <Input placeholder='Digite seu nome: ' type='text' />
						<Input placeholder='Digite seu email: ' type='email' />
						<Input placeholder='Digite sua senha: ' type='password' />
						<Button type="submit" loading={false}>Fazer Login</Button>
					</form>
					<Link href="/" legacyBehavior>
						<a className={styles.text}>Já possui uma conta? Faça login!</a>
					</Link>
				</div>
			</div>
		</>
	)
}