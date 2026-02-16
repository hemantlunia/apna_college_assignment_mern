import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createProblem, getProblemsByTopic } from "../controllers/problem.controller.js";

const problemRouter = express.Router();


problemRouter.post("/",authMiddleware,createProblem) // for admin to crete problem
problemRouter.get("/:topicId",authMiddleware,getProblemsByTopic) //ok

export default problemRouter;