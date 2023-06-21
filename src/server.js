/* eslint-disable no-undef */
import 'dotenv/config'

import express from 'express';

const app = express();

app.listen(3000, () =>
  console.log('App is hot and listening on port 3000!'),
);