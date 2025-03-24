import prismaClient from "../../prisma";
import Stripe from "stripe";

interface CreatePortalRequest{
    user_id: string;
}

export class CreatePortalService{
    async execute({ user_id }: CreatePortalRequest){
        const stripe = new Stripe(
            process.env.STRIPE_API_KEY as string,
            {
                apiVersion: '2025-02-24.acacia',
                appInfo: {
                    name: "BeautyManager",
                    version: '1'
                }
            }
        )

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })

        let sessionId = user?.stripe_customer_id;

        if(!sessionId){
            return { message: 'Usuário não encontrado' }
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: sessionId,
            return_url: process.env.STRIPE_REDIRECT_URL
        })

        return { sessionId: portalSession.url }
    }
}