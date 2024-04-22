"use server";

import connectDB from "../config/database";
import TodoModel from "../models/todoModel";

const postTodo = async (todoData: any) => {
  try {
    await connectDB();

    const newTodo = await TodoModel.create(todoData);

    return {
      success: true,
      message: "Todo created successfully",
      todo: newTodo,
    };
  } catch (error: any) {
    console.log(error);
    return { success: false, errMsg: error.message };
  }
};

export default postTodo;
