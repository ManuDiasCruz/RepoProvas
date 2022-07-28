import { Request, Response } from "express";
import * as service from "../services/categoryService.js";

export async function findMany(req: Request, res: Response) {
    const categories = await service.findMany();
    res.send({ categories });
}