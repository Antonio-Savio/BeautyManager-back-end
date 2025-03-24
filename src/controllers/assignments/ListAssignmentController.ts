import { Request, Response } from "express";
import { ListAssignmentService } from "../../services/assignments/ListAssignmentService";

class ListAssignmentController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;
        
        const listAssignmentService = new ListAssignmentService();
        const assignments = await listAssignmentService.execute(user_id);
    
        res.json(assignments);
        return;
    }
}

export { ListAssignmentController }