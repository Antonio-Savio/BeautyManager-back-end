import prismaClient from "../../prisma";

class ListCustomersService{
    async execute(user_id: string){
        
        const customers = await prismaClient.customer.findMany({
            where: {
                user_id
            },
            orderBy: [ 
                {
                    schedules_count: "desc"
                },
                {
                    total_spent: "desc"
                },
                {
                    created_at: "desc"
                }
            ]
        })

        return customers;
    }
}

export { ListCustomersService }