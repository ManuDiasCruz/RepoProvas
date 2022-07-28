import { Request, Response } from "express";
import * as service from "./../services/testService.js";

export async function insert(req: Request, res: Response) {
    await service.insert(req.body);
    res.sendStatus(201);
}

export async function find(req: Request, res: Response) {
    const { groupBy, teacher, discipline } = req.query as { groupBy: string; teacher: string; discipline: string };
    
    if (groupBy !== "disciplines" && groupBy !== "teachers")
        return res.sendStatus(400);

    const tests = await service.find({ groupBy, teacher, discipline });
    res.send({ tests });
}

export async function view(req: Request, res: Response) {
    const { id } = req.params;

    await service.view(+id);
    res.sendStatus(200);
}