import prismaClient from "../../prisma";

interface OrderReq {
    order_id: string;
}

export class RemoveOrderService {
    async execute({ order_id }: OrderReq){
        return await prismaClient.order.delete({
            where:{
                id: order_id
            }
        });
    }
}