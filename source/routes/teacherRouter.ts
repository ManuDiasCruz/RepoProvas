import { Router } from "express";
import * as controller from "./../controllers/teacherController.js";
import { validateTokenMiddleware } from "./../middlewares/validateTokenMiddleware.js";

const teacherRouter = Router();

teacherRouter.get(
    "/teacher/:discipline",
    validateTokenMiddleware,
    controller.get
);

export default teacherRouter;