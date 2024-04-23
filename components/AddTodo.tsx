"use client";
import { useState } from "react";
import postTodo from "@/_actions/postTodo";
import Image from "next/image";
import trash from "@/public/trash.png";
import edit from "@/public/edit.png";
import deleteTodo from "@/_actions/deleteTodo";
import { Types } from "@/types/types";

const AddTodo = ({ data }: any) => {
  // console.log("beka", data);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Types[]>(data);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      await postTodo({ todo: newTodo });
      setTodos([...todos, { todo: newTodo }]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo({ id });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  // const handleEditTodo = async (id: string) => {
  //   // Call deleteTodo action to delete the todo
  //   await deleteTodo({ id });
  //   // Filter out the deleted todo from the todos array
  //   setTodos(todos.filter((todo) => todo._id !== id));
  // };

  return (
    <main className="flex flex-col items-center gap-10 mt-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
        className="flex items-center justify-center gap-8"
      >
        <input
          onChange={(e) => setNewTodo(e.target.value)}
          type="text"
          value={newTodo}
          placeholder="enter new todo..."
          className="border border-yellow-600 rounded-md p-2 outline-none w-[220px] md:w-[600px]"
        />
        <button
          type="submit"
          className="p-3 bg-yellow-700 rounded-md text-white md:w-1/4"
        >
          Add Todo
        </button>
      </form>
      <ul className="flex flex-wrap justify-center gap-8">
        {todos.map((item: any, index: number) => (
          <li
            key={index}
            className="text-lg p-8 bg-yellow-600 text-white flex flex-col gap-16 w-[350px] rounded-lg justify-between"
          >
            <span className="text-center text-2xl">
              {item.todo.split(" ").slice(0, 2).join(" ")}
            </span>
            <span>{item.todo}</span>
            <span className="flex justify-between items-center text-base">
              {item.createdAt}{" "}
              <button onClick={() => handleDeleteTodo(item._id)}>
                <Image src={trash} alt="Trash Icon" width={25} height={25} />{" "}
              </button>
              <button>
                <Image src={edit} alt="Edit Icon" width={20} height={20} />{" "}
              </button>
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AddTodo;
