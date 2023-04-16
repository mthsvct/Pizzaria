import { createContext, ReactNode, useState } from "react";


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
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

export function AuthProvider({children}:AuthProviderProps){

    const [user, setUser] = useState<UserProps>(); // Inicialmente o usuário não está logado, então não temos um usuário.
    const isAuthenticated = !!user; // Converter para booleano;

    async function signIn({email, password}: SignInProps){
        console.log(`email: ${email} \n password: ${password}`);
    }

    // O user no value tava dando erro, o que professor recomendou: Confira no seu arquivo tsconfig.json se a opção strict esta marcada como false; 

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}