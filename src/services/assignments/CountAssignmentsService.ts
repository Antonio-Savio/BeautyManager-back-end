import prismaClient from "../../prisma";

class CountAssignmentsService{
    async execute(user_id: string){
        const assignments = await prismaClient.assignment.count({
            where: {
                userId: user_id
            }
        })

        return assignments;
    }
}

export { CountAssignmentsService }