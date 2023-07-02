import express from 'express'
import Task from '../controllers/task';
const router = express.Router()

const taskController = new Task();

router.get('/', taskController.fetchTasks)
  
router.get('/:taskId', taskController.fetchTask)

router.post('/', taskController.createTask)

router.put('/:taskId', taskController.updateTask)

router.delete('/:taskId', taskController.deleteTask);


export default router
