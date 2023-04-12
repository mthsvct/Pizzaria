import prismaClient from "../../prisma";

interface ItemRequest {
    item_id: string;
}


export class RemoveItemService {
    async execute({item_id}:ItemRequest){
        const order = await prismaClient.item.delete({
            where: {
                id: item_id
            }
        });

        return order;
    }
}


