import prismaClient from "../../prisma";

export class DetailUserService{
    async execute(user_id: string){ 
        const user = await prismaClient.user.findFirst({ // Aqui busca o usuário no banco de dados.
            where: { // Aqui faz a comparação do id do usuário com o id do usuário que está logado.
                id: user_id
            },
            select: { // Aqui seleciona os dados que serão retornados.
                id: true,
                name: true,
                email: true,
            }
        });

        return user;
    }
}