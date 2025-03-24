import { Response, Request } from "express";
import Stripe from "stripe";
import { stripe } from '../../utils/stripe'
import { saveSubscription } from '../../utils/manageSubscription'

export class WebhooksController{
    async handle(req: Request, res: Response){
        let event: Stripe.Event;

        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if(endpointSecret){
            try{
                const signature = req.headers['stripe-signature'] as string;

                event = stripe.webhooks.constructEvent(
                    req.body,
                    signature,
                    endpointSecret
                )

            } catch(err: any){
                console.log("Webhook signature failed ", err);
                res.status(400).send(`Webhook Error: ${err.message}`);
                return;
            }
        } else{
            event = req.body
        }

        switch(event.type){
            case 'customer.subscription.deleted':
                const payment = event.data.object;
                await saveSubscription(
                    payment.id,
                    payment.customer.toString(),
                    false,
                    true    //deleteAction = true
                )

                break;
            case 'customer.subscription.updated':
                const paymentIntent = event.data.object;
                await saveSubscription(
                    paymentIntent.id,
                    paymentIntent.customer.toString(),
                    false
                )

                break;
            case 'checkout.session.completed':
                const checkoutSession = event.data.object;
                await saveSubscription(
                    checkoutSession.subscription?.toString() ?? "",
                    checkoutSession.customer?.toString() ?? "",
                    true,    //createAction = true
                    false
                )

                break;
            default:
                console.log(`Evento não rastreado: ${event.type}`);
        }

        res.send();
    }
}