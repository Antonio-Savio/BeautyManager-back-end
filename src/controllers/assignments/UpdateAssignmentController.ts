import { Request, Response } from "express";
import { UpdateAssignmentService } from "../../services/assignments/UpdateAssignmentService";

export class UpdateAssignmentController{
    async handle(req: Request, res: Response){
        const { name, price } = req.body;
        const assignment_id = req.query.assignment_id as string;
        
        const updateAssignmentService = new UpdateAssignmentService();
        const assigment = await updateAssignmentService.execute({ assignment_id, name, price });

        res.json(assigment);
        return;
    }
}