import { Router } from "express";
import * as controller from "./../controllers/categoryController.js";
import { validateTokenMiddleware } from "./../middlewares/validateTokenMiddleware.js";

const categoryRouter = Router();

categoryRouter.get(
    "/categories", 
    validateTokenMiddleware, 
    controller.findMany
);

export default categoryRouter;
