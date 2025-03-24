import { Request, Response } from "express";
import { ListSchedulingsService } from "../../services/schedulings/ListSchedulingsService";

class ListSchedulingsController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;

        const listSchedulingsService = new ListSchedulingsService();
        const schedule = await listSchedulingsService.execute(user_id);

        res.json(schedule);
        return;
    }
}

export { ListSchedulingsController }