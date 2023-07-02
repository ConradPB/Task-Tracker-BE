import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['completed', 'in progress', 'not started'],
      default: 'not started',
    },
    dueDate: {
      type: Date,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true },
);


const Task = mongoose.model('Task', taskSchema);

Task.deleteMany = function (conditions) {
  return this.deleteOne(conditions);
};

export default Task;