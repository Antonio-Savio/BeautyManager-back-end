import { Request, Response } from "express";
import { FindCustomersService } from "../../services/customers/FindCustomersService";

type QueryRequest = {
    name: string;
    phone: string;
}

class FindCustomersController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;
        const { name, phone }= req.query as QueryRequest;

        const findCustomersService = new FindCustomersService();
        const customers = await findCustomersService.execute({ name, user_id, phone })

        res.json(customers);
        return;
    }
}

export { FindCustomersController }