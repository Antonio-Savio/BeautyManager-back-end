import prismaClient from "../../prisma";

interface CustomerProps{
    customer_id: string;
    user_id: string;
}

class GetOneCustomerService{
    async execute({ customer_id, user_id }: CustomerProps){
        const customer = await prismaClient.customer.findFirst({
            where: {
                id: customer_id,
                user_id
            },
            include: {
                schedulings: true
            }
        })

        return customer;
    }
}

export { GetOneCustomerService }