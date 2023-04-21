import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";

import { AuthTokenError } from "../services/errors/AuthTokenErrors";

// Páginas que só podem ser acessadas por usuários logados.

export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx); // Pegando os cookies do usuário.
        const token = cookies['@nextauth.token']; // Pegando o token do usuário.
        if(!token){
            // Se o cara tentar acessar a página porem não tendo um login salvo no cookie, 
            // ele será redirecionado para a página de login.
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try {
            return await fn(ctx);
        } catch (error) {
            if(error instanceof AuthTokenError){
                destroyCookie(ctx, '@nextauth.token'); 

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}