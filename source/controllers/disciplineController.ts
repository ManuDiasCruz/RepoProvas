import { Request, Response } from "express";
import * as service from "./../services/disciplineService.js";

export async function get(req: Request, res: Response) {
    const { term } = req.params;
    const disciplines = await service.getByTerm(+term);

    res.send(disciplines);
}