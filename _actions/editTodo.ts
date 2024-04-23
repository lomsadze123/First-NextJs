"use server";

import connectDB from "@/config/database";
import TodoModel from "@/models/todoModel";

const editTodo = async (id: string, updatedField: string) => {
  console.log(id);

  try {
    await connectDB();
    const editedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { todo: updatedField },
      { new: true }
    );
    if (!editedTodo) {
      return {
        success: false,
        message: "Todo not found",
      };
    }
    console.log("Todo Edited successfully");

    return {
      success: true,
      message: "Todo edited successfully",
      todo: editedTodo,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while edited todo",
    };
  }
};

export default editTodo;
