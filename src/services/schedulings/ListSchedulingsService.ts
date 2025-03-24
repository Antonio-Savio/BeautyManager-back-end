import prismaClient from "../../prisma";

class ListSchedulingsService{
    async execute(user_id: string){
        const schedule = await prismaClient.scheduling.findMany({
            where: {
                user_id
            },
            select: {
                id: true,
                finished: true,
                time: true,
                assignment: true,
                customer: true,
            },
            orderBy: {
                created_at: "desc"
            }
        })

        return schedule;
    }
}

export { ListSchedulingsService }