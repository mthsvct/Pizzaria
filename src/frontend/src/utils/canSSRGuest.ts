// não logados

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// Função para páginas que só podem ser acessadas por visitantes.

export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx); // Pegando os cookies do usuário.
        
        
        
        // Se o cara tentar acessar a página porem tendo já um login salvo no cookie, ele será redirecionado para a página de dashboard.
        if(cookies['@nextauth.token']){
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false 
                }
            }
        }
        return await fn(ctx);
    }
}