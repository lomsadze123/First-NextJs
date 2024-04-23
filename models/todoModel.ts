import { Schema, model, models } from "mongoose";

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = models.todo || model("todo", todoSchema);

export default TodoModel;
