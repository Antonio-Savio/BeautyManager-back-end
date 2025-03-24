import prismaClient from "../../prisma";

interface SchedulingProps{
    time: string;
    user_id: string;
    customer_id: string;
    assignment_id: string;
}

class NewSchedulingService{
    async execute({ time, user_id, customer_id, assignment_id }: SchedulingProps){
        if(!customer_id || !time || !assignment_id){
            throw new Error("Dados inválidos");
        }

        const schedule = await prismaClient.scheduling.create({
            data: {
                time,
                assignment_id,
                customer_id,
                user_id
            },
            include: {
                assignment: {
                    select: {
                        price: true
                    }
                }
            }
        })

        await prismaClient.customer.update({
            where: { id: customer_id },
            data: { 
                schedules_count: { increment: 1 },
                total_spent: { increment: schedule.assignment.price }
            }
        })

        return schedule;
    }
}

export { NewSchedulingService }