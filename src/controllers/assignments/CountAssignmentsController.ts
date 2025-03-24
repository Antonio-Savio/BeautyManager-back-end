import { Request, Response } from "express";
import { CountAssignmentsService } from "../../services/assignments/CountAssignmentsService";

class CountAssignmentsController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;

        const countAssignmentsService = new CountAssignmentsService();
        const assignments = await countAssignmentsService.execute(user_id);

        res.json(assignments);
        return;
    }
}

export { CountAssignmentsController }