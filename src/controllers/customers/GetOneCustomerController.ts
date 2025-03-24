import { Request, Response } from "express";
import { GetOneCustomerService } from "../../services/customers/GetOneCustomerService";

class GetOneCustomerController{
    async handle(req: Request, res: Response){
        const customer_id = req.query.customer_id as string;
        const user_id = req.user_id;

        const getOneCustomerService = new GetOneCustomerService();
        const customer = await getOneCustomerService.execute({customer_id, user_id})

        res.json(customer);
        return;
    }
}

export { GetOneCustomerController }