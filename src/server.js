/* eslint-disable no-undef */
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import models from './models'


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  }
  next();
  
});

app.use(cors())




app.get('/users', (req, res) => {
  return res.json(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
  return res.json(req.context.models.users[req.params.userId]);
});


app.get('/tasks', (req, res) => {
  return res.send(Object.values(req.context.models.tasks));
});

app.get('/tasks/:tasksId', (req, res) => {
  return res.send(req.context.models.tasks[req.params.tasksId]);
});

app.post('/tasks', (req, res) => {
  const id = uuidv4();
  const task = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  req.context.models.tasks[id] = task;

  return res.json({task});
});

app.put('/tasks/:taskId', (req, res) => {
  const { text } = req.body;
  const task = tasks[req.params.taskId];
  if (task) {
    task.text = text;
    return res.json({ task });
  } else {
    return res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:taskId', (req, res) => {
  const {
    [req.params.taskId]: task,
    ...otherTasks
  } = req.context.models.tasks;

  req.context.models.tasks = otherTasks;

  return res.json({task});
});


app.listen(process.env.PORT, () =>
  console.log(`App is hot and listening on port ${process.env.PORT}!`),
);