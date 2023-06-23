import { v4 as uuidv4 } from 'uuid'

class Task {
  fetchTasks(req, res) {
    return res.send(Object.values(req.context.models.tasks));
  }

  fetchTask(req, res) {
    return res.send(req.context.models.tasks[req.params.taskId]);
  }

  createTask(req, res) {
    const id = uuidv4();
    const task = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
  
    req.context.models.tasks[id] = task;
  
    return res.send(task);
  }

  updateTask(req, res) {
    const { text } = req.body;
    const task = req.context.models.tasks[req.params.taskId];
    if (task) {
      task.text = text;
      return res.send(task);
    } 
  }

  deleteTask(req, res) {
    const {
      [req.params.taskId]: task,
      ...otherTasks
    } = req.context.models.tasks;
    
    req.context.models.tasks = otherTasks;
    
    return res.send(task);
  }

}

export default Task