import prismaClient from "../../prisma";

class DeleteAssignmentService{
    async execute(assignment_id: string){
        await prismaClient.scheduling.deleteMany({
            where: {
                assignment_id
            }
        })

        const assignment = await prismaClient.assignment.delete({
            where: {
                id: assignment_id
            }
        })

        return assignment;
    }
}

export { DeleteAssignmentService }