import prismaClient from "../../prisma";

interface DetailReq {
    order_id: string;
}

export class DetailOrderService {
    async execute({order_id}: DetailReq){
        const orders = await prismaClient.item.findMany({
            where: {
                id: order_id
            },
            include:{
                product:true,
                order:true
            }
        });

        return orders;
    }

}
