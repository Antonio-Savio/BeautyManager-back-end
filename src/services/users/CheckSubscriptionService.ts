import prismaClient from "../../prisma";

class CheckSubscriptionService{
    async execute(user_id: string){
        const subscription = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                subscription: {
                    select: {
                        id: true,
                        status: true
                    }
                }
            }
        })

        return subscription;
    }
}

export { CheckSubscriptionService }