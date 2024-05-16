import { Request, Response } from "express"
import Task from "../entities/task"
import AppDataSource from "../dataBase/config"

const addTask = async (req: Request, res: Response) => {
  const { task, id } = req.body
  try {
    const taskRepository = AppDataSource.getRepository(Task)
    const taskDetail = taskRepository.create({
      task,
      userId: id,
    })
    await taskRepository.save(taskDetail)
    return res.status(200).send(taskDetail)
  } catch (error) {
    console.error(error)
    return res.status(400).send("Task addition failed")
  }
}
const getAllTasks = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const taskRepository = AppDataSource.getRepository(Task)
    const taskList = await taskRepository.find({
      where: { userId: { id: id } },
    })
    if (taskList.length === 0) {
      return res.status(400).send("Please provide valid Id")
    }
    return res.status(200).send(taskList)
  } catch (error: any) {
    console.error(error)
    return res.status(400).send(error.message || "Failed to fetch tasks")
  }
}

const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const taskRepository = AppDataSource.getRepository(Task)
    const taskToRemove = await taskRepository.findOne({ where: { id: id } })

    if (!taskToRemove) {
      return res.status(404).send("Task not found")
    }

    await taskRepository.remove(taskToRemove)
    return res.status(200).send("Task deleted successfully")
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
}

module.exports = { addTask, getAllTasks, deleteTask }
