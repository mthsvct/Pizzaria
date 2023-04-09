import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import {sign} from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

export class AuthUserService{
    async execute({email, password}: AuthRequest){
        // Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(!user){
            throw new Error("Email/Password incorrect");
        };

        // Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password); // Só chega nessa linha se o usuario existir e for encontrado.

        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        };

        // Gerar o token JWT e devolver os dados do usuário;
        const token = sign({
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "30d"
        }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    };
};