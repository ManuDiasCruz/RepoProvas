import { Request, Response } from "express";
import * as service from "./../services/teacherService.js";

export async function get(req: Request, res: Response) {
  const { discipline } = req.params;

  const teachers = await service.getByDiscipline(+discipline);
  res.send(teachers);
}