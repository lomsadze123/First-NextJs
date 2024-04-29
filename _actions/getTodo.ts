"use server";

import connectDB from "../config/database";
import TodoModel from "../models/todoModel";

const getTodo = async (userId: string) => {
  try {
    await connectDB();

    const data = JSON.parse(
      JSON.stringify(await TodoModel.find({ userId: userId }))
    );

    return { data };
  } catch (error: any) {
    return { errMsg: error.message };
  }
};

export default getTodo;
