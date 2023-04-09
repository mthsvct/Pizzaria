import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;   
}


export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    // Verificar se o usuário está realmente autenticado.

    const authToken = req.headers.authorization; // Aqui recebe o token do usuário.
    if(!authToken){
        return res.status(401).end(); // Barra o usuário não autorizado.
    }

    const [, token] = authToken.split(" "); // Aqui separa o token em duas partes, o Bearer e o token em si.

    try {
        // validar o token
        const {sub} = verify(token, process.env.JWT_SECRET) as Payload; // Aqui verifica se o token é válido.
        
        // Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req.
        req.user_id = sub; // Aqui adiciona o id do usuário na requisição
        
    } catch (error) {
        return res.status(401).end(); // algo deu errado.
    }

    return next(); // Aqui permite o usuário continuar.
    /* return next(); */
}