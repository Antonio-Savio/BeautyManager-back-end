import { stripe } from './stripe'
import prismaClient from '../prisma'

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,
    deleteAction = false
){

    const user = await prismaClient.user.findFirst({
        where: {
            stripe_customer_id: customerId
        },
        include: {
            subscription: true
        }
    })

    if(!user){
        throw new Error("Falha ao buscar usuário");
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: user.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id
    }

    if(createAction){
        console.log(subscriptionData);
        
        try{

            await prismaClient.subscription.create({
                data: subscriptionData
            })

        } catch(err){
            console.log(err)
        }
    } else {

        if(deleteAction){
            await prismaClient.subscription.delete({
                where: {
                    id: subscriptionData.id
                }
            })

            return
        }

        try{

            await prismaClient.subscription.update({
                where: {
                    id: subscriptionId
                },
                data: {
                    status: subscription.status,
                    priceId: subscription.items.data[0].price.id
                }
            })

        } catch(err){
            console.log("Erro ao atualizar: ", err);
        }
    }
}