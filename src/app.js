import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import topicRouter from "./routes/topic.routes.js";
import problemRouter from "./routes/problem.routes.js";
import progressRouter from "./routes/progress.routes.js";


const app = express();

app.use(cors({
    credentials:true,
    origin:"*", // * for testing it allow all originn reques
    methods:['GET','POST','PUT','PATCH']
}));

app.use(express.json())

app.use("/api/auth",authRouter)
app.use("/api/topics",topicRouter) 
app.use("/api/problems",problemRouter)
app.use("/api/progress",progressRouter)



export default app;