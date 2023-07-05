/* eslint-disable no-undef */
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import models, { connectDb } from './models'
import routes from './routes'
import errorHandler from './middleware/errorHandler'

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async(req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('Phil'),
  }
  next();
  
});

app.use('/users', routes.user)
app.use('/tasks', routes.task)
app.use(errorHandler)

const eraseDatabaseOnSync = true;
connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Task.deleteMany({}),
    ]);
  }

  app.listen(process.env.PORT, () =>
    console.log(`App is hot and listening on port ${process.env.PORT}!`),
  );
})

