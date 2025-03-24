import prismaClient from "../../prisma";

interface NewCustomerRequest{
    name: string;
    phone: string;
    user_id: string;
}

class NewCustomerService{
    async execute({ name, phone, user_id }: NewCustomerRequest){
        if(!name || !phone){
            throw new Error("Dados inválidos")
        }

        const phoneRegistered = await prismaClient.customer.count({
            where: {
                phone,
                user_id
            }
        })

        if(phoneRegistered > 0){
            throw new Error("Telefone já cadastrado.")
        }

        const customer = await prismaClient.customer.create({
            data: {
                name,
                phone,
                user_id
            }
        })

        return customer;
    }
}

export { NewCustomerService }