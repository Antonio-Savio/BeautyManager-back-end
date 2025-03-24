import { Request, Response } from "express";
import { NewSchedulingService } from "../../services/schedulings/NewSchedulingService";

class NewSchedulingController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;
        const { time, customer_id, assignment_id } = req.body;

        const newSchedulingService = new NewSchedulingService();
        const schedule = await newSchedulingService.execute({
            assignment_id, 
            customer_id, 
            time,
            user_id
        })

        res.json(schedule)
        return;
    }

}

export { NewSchedulingController }