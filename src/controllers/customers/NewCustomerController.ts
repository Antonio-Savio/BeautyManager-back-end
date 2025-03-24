import { Request, Response } from "express";
import { NewCustomerService } from "../../services/customers/NewCustomerService";

class NewCustomerController{
    async handle(req: Request, res: Response){
        const { name, phone } = req.body;
        const user_id = req.user_id;

        const newCustomerService = new NewCustomerService();
        const customer = await newCustomerService.execute({name, phone, user_id})

        res.json(customer);
        return;
    }
}

export { NewCustomerController }