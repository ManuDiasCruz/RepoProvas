import { NextFunction, Request, Response } from "express";
import { AppError, errorTypeToStatusCode, isAppError } from "../utils/errorUtils.js";

export function errorHandlerMiddleware(
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
){
    console.log(err);

    if (isAppError(err))
        return res.status(errorTypeToStatusCode(err.type)).send(err.message);
    
    return res.sendStatus(500);
}

//////////////////////
const errors = {
    "unauthorized": 401,
    "conflict": 409,
    "unprocessable": 422,
    "NotFound": 404,
}

export function errorHandler( err, _req: Request, res: Response, _next: NextFunction ) {
  const message = err.message || "Something went wrong";

  const status = errors[err.type] || 500;
  res.status(status).json({ message });
}