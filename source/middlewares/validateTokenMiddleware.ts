import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import * as userService from "./../services/userService.js";
import { unauthorizedError } from "../utils/errorUtils.js";

dotenv.config();

export async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    let authorization = req.headers["authorization"];
    if (!authorization) 
        throw unauthorizedError("Missing authorization header");

    const token = authorization.replace("Bearer ", "");
    if (!token) 
        throw unauthorizedError("Missing token");
        
    try {
        const { userId } = 
            jwt.verify(token, process.env.JWT_SECRET) as {
                userId: number;
            };
        const user = await userService.findById(userId);
        res.locals.user = user;
    
        next();
    } catch {
        throw unauthorizedError("Invalid token");
    }  
}
