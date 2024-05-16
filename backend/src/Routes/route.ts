import express from "express"
const User = require("../Controller/usercontroller")
const task = require("../Controller/taskcontroller")
const router = express.Router()

const {validationRegister,checkValidationResult,validationLogin,validationAddTask,validationGetAllTask}=require('../Middleware/validator')
import { Auth } from "../Middleware/auth"

router.post("/signup", validationRegister,checkValidationResult, User.register)
router.post("/login",validationLogin,checkValidationResult, User.signin)

router.post("/add",validationAddTask,checkValidationResult,Auth, task.addTask)
router.get("/task/:id",validationGetAllTask,checkValidationResult, Auth, task.getAllTasks)
router.delete("/task/:id", Auth, task.deleteTask)
module.exports = router
