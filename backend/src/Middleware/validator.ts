import { param, body , validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

exports.validationRegister = [
  body("username").exists().withMessage("UserName is required"),
  body("email").exists().withMessage("Email is required"),
  body("email").isEmail().withMessage("Enter the valid Email"),
  body("password").exists().withMessage("Password is required"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password should be atleast 4 charcter long"),
]
exports.validationLogin = [
  body("email").exists().withMessage("Email is required"),
  body("email").isEmail().withMessage("Enter the valid Email"),
  body("password").exists().withMessage("Password is required"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password should be atleast 6 charcter long"),
]

exports.validationAddTask=[
    body("task").exists().withMessage("Please Enter the task"),
    body("task").isLength({min:8}).withMessage("Task Length should be minimum 8 character")
]
exports.validationGetAllTask=[
    param("id").exists().withMessage("UserId is required")
]
exports.checkValidationResult = (req:Request, resp:Response, next:NextFunction) => {
    const error=validationResult(req);
    if(!error.isEmpty()){
        return resp.status(400).json({error:error.array()});
    }
    next();
}
