import { Request, Response } from "express";
import { ListCustomersService } from "../../services/customers/ListCustomersService";

class ListCustomersController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;

        const listCustomersService = new ListCustomersService();
        const customers = await listCustomersService.execute(user_id);
    
        res.json(customers);
        return;
    }
}

export { ListCustomersController }