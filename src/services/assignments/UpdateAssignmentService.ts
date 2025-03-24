import prismaClient from "../../prisma";

interface UpdateRequest{
    assignment_id: string;
    name: string;
    price: number;
}

export class UpdateAssignmentService{
    async execute({ assignment_id, name, price }: UpdateRequest){
        await prismaClient.scheduling.deleteMany({
            where: {
                assignment_id
            }
        })

        const assignment = await prismaClient.assignment.update({
            where: {
                id: assignment_id
            },
            data: {
                name,
                price
            }
        })

        return assignment;
    }
}