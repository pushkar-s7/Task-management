import { Request, Response } from 'express';
import Task from '../entities/task';
import AppDataSource from "../dataBase/config";

const addTask = async (req: Request, res: Response) => {
  const { task, id } = req.body;
  try {
    if (!task) return res.status(400).send('Please enter the task');
    if (task.length < 4) return res.status(400).send('Add minimum 10 characters');

    const taskRepository = AppDataSource.getRepository(Task);
    const taskDetail = taskRepository.create({
      task,
      userId: id,
    });
    console.log(taskDetail);
    await taskRepository.save(taskDetail);
    return res.status(200).send(taskDetail);
  } catch (error) {
    console.error(error);
    return res.status(400).send('Task addition failed');
  }
};
const getAllTasks = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    if (!id) return res.status(400).send('User ID is required');
    const taskRepository = AppDataSource.getRepository(Task);
    const taskList = await taskRepository.find({ where: { userId: { id: id } } });
    return res.status(200).send(taskList);
  } catch (error: any) {
    console.error(error);
    return res.status(400).send(error.message || 'Failed to fetch tasks');
  }
};


const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const taskRepository = AppDataSource.getRepository(Task);
    const taskToRemove = await taskRepository.findOne({ where: { id: id } });

    if (!taskToRemove) {
      return res.status(404).send('Task not found');
    }

    await taskRepository.remove(taskToRemove);
    return res.status(200).send('Task deleted successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
};


module.exports = { addTask, getAllTasks, deleteTask };
