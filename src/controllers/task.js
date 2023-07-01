
class Task {
  async fetchTasks(req, res) {
    const tasks = await req.context.models.Task.find()

    return res.status(200).json(tasks);
  }

  async fetchTask(req, res) {
    const task = await req.context.models.Task.findById(req.params.taskId)
    return res.status(200).json(task);
  }

  async createTask(req, res) {
    const task = await req.context.models.Task.create({
      text: req.body.text,
      userId: req.context.me.id,})

    return res.status(200).json(task);
  }
  
    
  async updateTask(req, res) {
    const task = await req.context.models.Task.findByIdAndUpdate(
      req.params.taskId,
      { text: req.body.text },
      { new: true }
    );
    return res.status(200).json(task);
  }

  

  async deleteTask(req, res) {
    const task = req.context.models.Task.findById(req.params.taskId);
    
    if(task) {
      await task.remove();
    }

    return res.status(200).json(task);
  }

}

export default Task