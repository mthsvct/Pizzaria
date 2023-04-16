import { createContext, ReactNode, useState } from "react";

import { destroyCookie } from "nookies";
import Router from "next/router";


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try {
        // Limpar o token que tinha salvo.
        destroyCookie(undefined, 'nextauth.token');
        // Os dois parametros são: Qual o contexto que eu quero limpar o cookie e o nome do cookie que eu quero limpar.
        // O contexto é undefined porque eu quero limpar o cookie em todos os contextos.
        Router.push('/'); // Redirecionar para a página inicial.
    } catch {
        // Caso de erro, não fazer nada.
        console.log('Erro ao deslogar.');
    }
}


export function AuthProvider({children}:AuthProviderProps){

    const [user, setUser] = useState<UserProps>(); // Inicialmente o usuário não está logado, então não temos um usuário.
    const isAuthenticated = !!user; // Converter para booleano;

    async function signIn({email, password}: SignInProps){
        console.log(`email: ${email} \n password: ${password}`);
    }

    // O user no value tava dando erro, o que professor recomendou: Confira no seu arquivo tsconfig.json se a opção strict esta marcada como false; 

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}