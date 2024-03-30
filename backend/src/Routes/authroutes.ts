import express from 'express';
const User=require('../Controller/usercontroller')
const task=require('../Controller/taskcontroller')
const router=express.Router();


router.post('/signup',User.register)
router.post('/login',User.signin)
router.post('/add',task.addTask)
router.get('/task/:id',task.getAllTasks)
router.delete('/task/:id',task.deleteTask)
module.exports=router;

