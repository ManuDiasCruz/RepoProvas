import { Request, Response } from "express";
import * as userService from "./../services/userService.js";

export async function signUp(req: Request, res: Response) {
    const { email, password, confirmPassword } = req.body;
    const user = await userService.create({ email, password });
    res.status(201).send(user);
}

export async function signIn(req: Request, res: Response) {
    const token = await userService.signIn(req.body);
    res.send({ token });
}