import axios, { AxiosError } from 'axios';
import { error } from 'console';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenErrors';
import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}` // Para o axios enviar o token de autenticação
        }
    });


    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response.status === 401){
            // Qualquer erro 401 (não autorizado) devemos deslogar o usuário
            if(typeof window !== 'undefined'){
                // chamar a função para deslogar o usuário
                signOut();
            } else {
                // Executar no lado do servidor
                return Promise.reject(new AuthTokenError());
            }
        }
        return Promise.reject(error);
    });

    return api;
}