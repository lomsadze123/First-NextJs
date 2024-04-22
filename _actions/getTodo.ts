"use server";

import connectDB from "../config/database";
import TodoModel from "../models/todoModel";

export const getTodo = async () => {
  try {
    await connectDB();

    const data = JSON.parse(JSON.stringify(await TodoModel.find()));

    return { data };
  } catch (error: any) {
    return { errMsg: error.message };
  }
};
