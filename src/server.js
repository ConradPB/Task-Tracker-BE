/* eslint-disable no-undef */
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { v4 as uuidv4 } from 'uuid'


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.me = users[1];
  next();
  
});

app.use(cors())


let users = {
  1: {
    id: '1',
    username: 'Conrad P B',
  },
  2: {
    id: '2',
    username: 'Ray Davis',
  },
};

let tasks = {
  1: {
    id: '1',
    text: 'Shopping',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'Swimming',
    userId: '2',
  },
};

app.get('/users', (req, res) => {
  return res.json(Object.values({users}));
});

app.get('/users/:userId', (req, res) => {
  return res.json(users[req.params.userId]);
});



app.get('/tasks', (req, res) => {
  return res.send(Object.values(tasks));
});

app.get('/tasks/:tasksId', (req, res) => {
  return res.send(tasks[req.params.tasksId]);
});

app.post('/tasks', (req, res) => {
  const id = uuidv4();
  const task = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  tasks[id] = task;

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
  } = tasks;

  tasks = otherTasks;

  return res.json({task});
});


app.listen(process.env.PORT, () =>
  console.log(`App is hot and listening on port ${process.env.PORT}!`),
);