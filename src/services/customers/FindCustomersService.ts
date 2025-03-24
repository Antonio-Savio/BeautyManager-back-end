import prismaClient from "../../prisma";

interface FindRequest{
    name: string;
    user_id: string;
    phone: string;
}

class FindCustomersService{
    async execute({ user_id, name, phone }: FindRequest){
        if (name.length <= 2 && phone.length <= 2){
            throw new Error("Dados inválidos")
        }

        const whereClause: any = {
            user_id,
            OR: []
        }

        if(name && name.length > 2){
            whereClause.OR.push(
                {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            )
        }

        if(phone && phone.length > 2){
            whereClause.OR.push(
                {
                    phone: {
                        contains: phone,
                    }
                }
            )
        }

        const customers = await prismaClient.customer.findMany({
            where: whereClause
        })

        return customers;
    }
}

export { FindCustomersService }