
import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({ errors: messages });
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate key error' });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  return res.status(500).json({ error: 'Something went wrong' });
}

