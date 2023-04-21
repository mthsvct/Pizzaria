import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>; 
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

type SignUpProps = {
    name: string;
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
        try {
            // Fazer a requisição para a API.
            const response = await api.post('/session', {
                email: email,
                password:password
            });

            //console.log(response.data);
            
            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 dias
                path: "/" // Quais caminhos terão acesso ao cookie.
            }); // Esta função eh para salvar o cookie no navegador.

            setUser({id, name, email});
        
            // Passar para as próximas requisições nosso token.
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Logado com Sucesso! :D");

            // Redirecionar o usuário para o dashboard (página de ultimos pedidos).
            Router.push('/dashboard');

        } catch(err) {
            // Caso de erro, não fazer nada.
            console.log('Erro ao fazer login.', err);
            toast.error("Erro ao acessar. :(");
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try {

            // Fazer a requisição para a API para criar o usuário.

            const response = await api.post('/users', {
                name: name,
                email: email,
                password: password
            });

            console.log("Cadastrado!");

            toast.success("Cadastrado com Sucesso! :D");

            // Redirecionar o usuário para a página de login.
            Router.push('/');

        } catch(err) {
            // Caso de erro, não fazer nada.
            console.log('Erro ao fazer cadastro.', err);
            toast.error("Erro ao cadastrar. :(");
        }
    }



    // O user no value tava dando erro, o que professor recomendou: Confira no seu arquivo tsconfig.json se a opção strict esta marcada como false; 

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}