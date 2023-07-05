/* eslint-disable no-unused-vars */

class Task {
  async fetchTasks(req, res, next) {
    const sortField = req.query.sortField || 'dueDate';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const tasks = await req.context.models.Task.find().sort({ [sortField]: sortOrder });
    return res.status(200).json(tasks);
  }

  async fetchTask(req, res, next) {
    const task = await req.context.models.Task.findById(req.params.taskId)
    return res.status(200).json(task);
  }

  async createTask(req, res, next) {
    if (!req.context.me) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const task = await req.context.models.Task.create({
      text: req.body.text,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      user: req.context.me._id,
    })

    return res.status(200).json(task);
  }
  
    
  async updateTask(req, res, next) {
    const task = await req.context.models.Task.findByIdAndUpdate(
      req.params.taskId,
      { text: req.body.text,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate },
      { new: true }
    );
    return res.status(200).json(task);
  }


  async deleteTask(req, res, next) {
    const task = await req.context.models.Task.findById(req.params.taskId);
    
    if(task) {
      await task.deleteOne();
    }

    return res.status(200).json(task);
  }

}

export default Task