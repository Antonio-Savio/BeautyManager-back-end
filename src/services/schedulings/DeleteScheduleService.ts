import prismaClient from "../../prisma";

interface DeleteRequest{
    user_id: string;
    schedule_id: string;
}

class DeleteScheduleService{
    async execute({ user_id, schedule_id }: DeleteRequest){
        if(!schedule_id || !user_id){
            throw new Error("Dados inválidos.")
        }

        const schedule = await prismaClient.scheduling.delete({
            where: {
                id: schedule_id,
                user_id
            }
        })

        return schedule;
    }
}

export { DeleteScheduleService }