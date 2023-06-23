import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import Task from '../controllers/task';
const router = express.Router()

const taskController = new Task();

router.get('/', taskController.fetchTasks)
  
router.get('/:taskId', taskController.fetchTask)

router.post('/', (req,res) => {
  const id = uuidv4();
  const task = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };
  
  req.context.models.tasks[id] = task;
  
  return res.send(task);
});

router.put('/:taskId', (req,res) => {
  const { text } = req.body;
  const task = req.context.models.tasks[req.params.taskId];
  if (task) {
    task.text = text;
    return res.send(task);
  } 
});

router.delete('/:taskId', (req,res) => {
  const {
    [req.params.taskId]: task,
    ...otherTasks
  } = req.context.models.tasks;
  
  req.context.models.tasks = otherTasks;
  
  return res.send(task);
});



export default router
