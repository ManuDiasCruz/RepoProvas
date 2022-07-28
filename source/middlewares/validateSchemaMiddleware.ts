import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export function validateSchemaMiddleware(schema: Joi.ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);
        if (validation.error) 
            return res.status(422).send({ error: validation.error.message });

        next();
    };
}