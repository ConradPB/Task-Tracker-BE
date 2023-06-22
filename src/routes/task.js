import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid';

const router = Router()


router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.tasks));
})
  
router.get('/:tasksId', (req, res) => {
  return res.send(req.context.models.tasks[req.params.tasksId]);
});
  
router.post('/', (req, res) => {
  const id = uuidv4();
  const task = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };
  
  req.context.models.tasks[id] = task;
  
  return res.json({task});
})
  
router.put('/:taskId', (req, res) => {
  const { text } = req.body;
  const task = req.context.models.tasks[req.params.taskId];
  if (task) {
    task.text = text;
    return res.json({ task });
  } else {
    return res.status(404).json({ error: 'Task not found' });
  }
})
  
router.delete('/:taskId', (req, res) => {
  const {
    [req.params.taskId]: task,
    ...otherTasks
  } = req.context.models.tasks;
  
  req.context.models.tasks = otherTasks;
  
  return res.json({task});
})

export default router