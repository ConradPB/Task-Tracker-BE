/* eslint-disable no-undef */
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import models from './models'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  }
  next();
  
});

app.use('/users', routes.user)
app.use('/tasks', routes.task)


app.listen(process.env.PORT, () =>
  console.log(`App is hot and listening on port ${process.env.PORT}!`),
);