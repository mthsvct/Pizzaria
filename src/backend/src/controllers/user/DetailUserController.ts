import {Request, Response} from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

export class DetailUserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;
        console.log(`user_id: ${user_id}`);
        const detailUserService = new DetailUserService();
        const user = await detailUserService.execute(user_id);
        return res.json(user);
    }
}



