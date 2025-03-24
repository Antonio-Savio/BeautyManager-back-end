import { Request, Response } from "express";
import { UpdateCustomerService } from "../../services/customers/UpdateCustomerService";

class UpdateCustomerController{
    async handle(req: Request, res: Response){
        const customer_id = req.query.customer_id as string;
        const { name, phone } = req.body;

        const updateCustomer = new UpdateCustomerService();
        const customer = await updateCustomer.execute({ customer_id, name, phone })

        res.json(customer);
        return;
    }
}

export { UpdateCustomerController }