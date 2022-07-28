import { Router } from "express";

import userRouter from "./userRouter.js";
import teacherRouter from "./teacherRouter.js";
import disciplineRouter from "./disciplineRouter.js";
import categoryRouter from "./categoryRouter.js";
import testRouter from "./testRouter.js";

const router = Router();
router.use(userRouter);
router.use(teacherRouter);
router.use(disciplineRouter);
router.use(categoryRouter);
router.use(testRouter);

export default router;