import prismaClient from "../../prisma";

class RemoveCustomerService{
    async execute(customer_id: string){
        await prismaClient.scheduling.deleteMany({
            where: {
                customer_id
            }
        })

        const customer = await prismaClient.customer.delete({
            where: {
                id: customer_id
            }
        })

        return customer;
    }
}

export { RemoveCustomerService }