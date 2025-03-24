import { Request, Response } from "express";
import { AssignmentDetailService } from "../../services/assignments/AssignmentDetailService";

export class AssignmentDetailController{
    async handle(req: Request, res: Response){
        const assignment_id = req.query.assignment_id as string;

        const assigmentDetailService = new AssignmentDetailService();
        const assigment = await assigmentDetailService.execute(assignment_id);

        res.json(assigment);
        return;
    }
}