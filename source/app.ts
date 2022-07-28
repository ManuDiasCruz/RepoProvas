import express, { json, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";

import router from "./routes/index.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;