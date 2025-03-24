import { Request, Response } from "express"
import { UpdateUserService } from "./UpdateUserService"

class UpdateUserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;
        const { name, address } = req.body;

        const updateUserService = new UpdateUserService()
        const updatedUser = await updateUserService.execute({ user_id, name, address })

        res.json(updatedUser);
        return;
    }
}

export { UpdateUserController }