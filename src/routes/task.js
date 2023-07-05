import express from 'express'
import Task from '../controllers/task';
const router = express.Router()

const taskController = new Task();

router.get('/', (req, res, next) => taskController.fetchTasks(req, res, next))
  
router.get('/:taskId', (req, res, next) => taskController.fetchTask(req, res, next))

router.post('/', (req, res, next) => taskController.createTask(req, res, next))

router.put('/:taskId', (req, res, next) => taskController.updateTask(req, res, next))

router.delete('/:taskId', (req, res, next) => taskController.deleteTask(req, res, next));


export default router
