import { Router } from "express";
import * as controller from "../controllers/testController.js";
import { validateTokenMiddleware } from "./../middlewares/validateTokenMiddleware.js";

const testRouter = Router();

testRouter.get(
    "/tests", 
    validateTokenMiddleware, 
    controller.find
);
testRouter.post(
    "/tests", 
    validateTokenMiddleware, 
    controller.insert
);
testRouter.post(
    "/tests/:id/view", 
    validateTokenMiddleware, 
    controller.view
);

export default testRouter;