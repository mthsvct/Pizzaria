import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;

}

export class CreateCategoryService{
    async execute({name}: CategoryRequest) {
        if(name === ""){ // Verifico se a string passada está vazia.
            throw new Error("Name is required");
        } 

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select:{
                id: true,
                name: true,
            }
        });

        return category;
    };
};


