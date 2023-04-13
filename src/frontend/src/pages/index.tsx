// import styles from "../../styles/Home.module.scss"
import Head from 'next/head';
import Image from 'next/image';

import logoImg from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';

import { Input, TextArea } from '../components/ui/input';
import { Button } from '../components/ui/button';

import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<>
			<Head>
				<title>Sujeito Pizza - Faça seu login;</title>
			</Head>

			<div className={styles.containerCenter}>
				<Image src={logoImg} alt='Logo Sujeito Pizzaria' />
				
				<div className={styles.login}>
					<form>
						<Input placeholder='Digite seu email: ' type='email' />
						<Input placeholder='Digite sua senha: ' type='password' />
						<Button type="submit" loading={false}>Fazer Login</Button>
					</form>
					
				</div>
			</div>
		</>
	)
}
