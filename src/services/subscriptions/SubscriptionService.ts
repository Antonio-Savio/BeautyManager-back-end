import prismaClient from "../../prisma";
import Stripe from "stripe";

export class SubscriptionService{
    async execute(user_id: string){
        
        const stripe = new Stripe(
            process.env.STRIPE_API_KEY as string,
            {
                apiVersion: "2025-02-24.acacia",
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

        let customerId = user?.stripe_customer_id;

        if(!customerId){
            const stripeCustomer = await stripe.customers.create({
                email: user?.email
            })

            await prismaClient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    stripe_customer_id: stripeCustomer.id
                }
            })

            customerId = stripeCustomer.id;
        }

        // Checkout
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { 
                    price: process.env.STRIPE_PRICE,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            allow_promotion_codes: false,
            success_url: process.env.STRIPE_REDIRECT_URL,
            cancel_url: process.env.STRIPE_REDIRECT_URL,
        })

        return { sessionId: stripeCheckoutSession.id }
    }
}