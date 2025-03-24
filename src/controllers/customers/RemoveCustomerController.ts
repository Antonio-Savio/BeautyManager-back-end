import { Request, Response } from "express";
import { RemoveCustomerService } from "../../services/customers/RemoveCustomerService";

class RemoveCustomerController{
    async handle(req: Request, res: Response){
        const customer_id = req.query.customer_id as string;

        const removeCustomerService = new RemoveCustomerService();
        const customer = await removeCustomerService.execute(customer_id)

        res.json(customer);
        return;
    }
}

export { RemoveCustomerController }