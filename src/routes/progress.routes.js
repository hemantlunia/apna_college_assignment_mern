import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserProgress, getUserStats, toggleProgress } from "../controllers/progress.controller.js";

const progressRouter = express.Router();


progressRouter.post("/",authMiddleware,toggleProgress) //ok
progressRouter.get("/",authMiddleware,getUserProgress) //ok
progressRouter.get("/stats",authMiddleware,getUserStats) //ok

export default progressRouter;