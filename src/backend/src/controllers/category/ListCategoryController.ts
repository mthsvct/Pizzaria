import { Response, Request } from "express";

import { ListCategoryService } from "../../services/category/ListCategoryService";

export class ListCategoryController {
    async handle(req:Request, res:Response){
        const listCategory = new ListCategoryService();
        const category = await listCategory.execute();
        return res.json(category);
    };
};