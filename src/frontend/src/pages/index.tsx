// import styles from "../../styles/Home.module.scss"
import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<>
			<Head>
				<title>Sujeito Pizza - Faça seu login;</title>
			</Head>

			<div>
				<h1>Sujeito Pizza</h1>
			</div>
		</>
	)
}
