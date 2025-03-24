import prismaClient from "../../prisma";

class ListAssignmentService{
    async execute(user_id: string){

        const assignments = await prismaClient.assignment.findMany({
            where: {
                userId: user_id
            },
            orderBy: {
                created_at: "desc"
            }

        })
        
        return assignments;
    }
}

export { ListAssignmentService }