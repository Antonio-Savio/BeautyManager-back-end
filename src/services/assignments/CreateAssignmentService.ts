import prismaClient from "../../prisma";

interface AssignmentRequest{
    user_id: string;
    name: string;
    price: number;
}

class CreateAssignmentService{
    async execute({ name, price, user_id }: AssignmentRequest){
        if(!name || !price){
            throw new Error("Faltando nome, ou preço.")
        }

        if(!user_id){
            throw new Error("Não autorizado.")
        }

        const countAssignments = await prismaClient.assignment.count({
            where: {
                userId: user_id
            }
        })

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                subscription: true
            }
        })

        if(countAssignments >= 5 && user?.subscription?.status !== 'active'){
            throw new Error("Limite atingido para o plano gratuito.")
        }

        const assignment = await prismaClient.assignment.create({
            data: {
                name,
                price,
                userId: user_id
            }
        })

        return assignment;

    }
}

export { CreateAssignmentService }