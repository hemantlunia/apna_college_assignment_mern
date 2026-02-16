import {body} from "express-validator"

export const registerValidator = [
    body("name").notEmpty().withMessage("Name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 characters"),
];

export const loginValidator = [
    body("email").isEmail(),
    body("password").notEmpty()
];