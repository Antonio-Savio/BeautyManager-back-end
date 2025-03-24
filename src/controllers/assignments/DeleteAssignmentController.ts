import { Request, Response } from "express";
import { DeleteAssignmentService } from "../../services/assignments/DeleteAssignmentService";

class DeleteAssignmentController{
    async handle(req: Request, res: Response){
        const assignment_id = req.query.assignment_id as string;

        const deleteAssignmentService = new DeleteAssignmentService();
        const assigment = await deleteAssignmentService.execute(assignment_id);

        res.json(assigment);
        return;
    }
}

export { DeleteAssignmentController }