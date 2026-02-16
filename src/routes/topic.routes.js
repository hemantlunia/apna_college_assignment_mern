import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createTopic, getAllTopics, getTopicsWithProgress } from "../controllers/topic.controller.js";

const topicRouter = express.Router();

topicRouter.post("/",authMiddleware,createTopic) //for admin to crete topic

topicRouter.get("/",authMiddleware,getAllTopics) //ok
topicRouter.get("/with-progress",authMiddleware,getTopicsWithProgress)


export default topicRouter;