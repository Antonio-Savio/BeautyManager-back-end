import { Request, Response } from "express";
import { CreateAssignmentService } from "../../services/assignments/CreateAssignmentService";

class CreateAssignmentController{
    async handle(req: Request, res: Response){
        const { name, price } = req.body;
        const user_id = req.user_id;

        const createAssignment = new CreateAssignmentService();
        const assignment = await createAssignment.execute({ name, price, user_id });

        res.json(assignment);
        return;
    }
}

export { CreateAssignmentController }