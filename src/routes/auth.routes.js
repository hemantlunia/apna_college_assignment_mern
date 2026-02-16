import express from "express"
import { login, register } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { validateMiddlewareResult } from "../middleware/validate.middleware.js";

const authRouter = express.Router();


authRouter.post("/register",registerValidator,validateMiddlewareResult,register)
authRouter.post("/login",loginValidator,validateMiddlewareResult,login);


export default authRouter;