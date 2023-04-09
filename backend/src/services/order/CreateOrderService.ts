import prismaClient from "../../prisma";

interface OrderReq {
    table: number;
    name: string;
}

export class CreateOrderService {
    async execute({ table, name }: OrderReq) {

        const order = await prismaClient.order.create({
            data:{
                table: table,
                name: name
            }
        });

        return order;

    }
}




