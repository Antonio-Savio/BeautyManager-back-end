import { Request, Response } from "express"
import { DeleteScheduleService } from "../../services/schedulings/DeleteScheduleService"

class DeleteScheduleController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;
        const schedule_id = req.query.schedule_id as string;

        const deleteScheduleService = new DeleteScheduleService();
        const deletedSchedule = await deleteScheduleService.execute({ user_id, schedule_id })

        res.json(deletedSchedule);
        return;
    }
}

export { DeleteScheduleController }