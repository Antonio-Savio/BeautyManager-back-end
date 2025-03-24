import prismaClient from "../../prisma";

export class AssignmentDetailService{
    async execute(assignment_id: string){
        const assignment = await prismaClient.assignment.findFirst({
            where: {
                id: assignment_id
            },
            include: {
                schedulings: true
            }
        })

        return assignment;
    }
}