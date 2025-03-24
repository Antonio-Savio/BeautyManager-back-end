import prismaClient from "../../prisma";

interface UpdateRequest{
    customer_id: string;
    name: string;
    phone: string;
}

class UpdateCustomerService{
    async execute({ customer_id, name, phone}: UpdateRequest){
        await prismaClient.scheduling.deleteMany({
            where: {
                customer_id
            }
        })

        const customer = await prismaClient.customer.update({
            where: {
                id: customer_id
            },
            data: {
                name,
                phone
            }
        })

        return customer;
    }
}

export { UpdateCustomerService }