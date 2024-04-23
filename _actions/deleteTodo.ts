"use server";

import connectDB from "@/config/database";
import TodoModel from "@/models/todoModel";

const deleteTodo = async ({ id }: { id: string }) => {
  try {
    await connectDB();

    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return {
        success: false,
        message: "Todo not found",
      };
    }

    console.log("Todo deleted successfully");

    return {
      success: true,
      message: "Todo deleted successfully",
      todo: deletedTodo,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while deleting todo",
    };
  }
};

export default deleteTodo;
