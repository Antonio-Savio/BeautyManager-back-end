import { Request, Response } from "express";
import { CheckSubscriptionService } from "../../services/users/CheckSubscriptionService";

class CheckSubscriptionController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;

        const checkSubscriptionService = new CheckSubscriptionService();
        const subscription = await checkSubscriptionService.execute(user_id);

        res.json(subscription);
    }
}

export { CheckSubscriptionController }