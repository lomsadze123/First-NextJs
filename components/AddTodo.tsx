"use client";
import { useState } from "react";
import postTodo from "../_actions/postTodo";

interface Types {
  _id?: string;
  createdAt?: Date;
  todo: string;
  updatedAt?: Date;
}

const AddTodo = ({ data }: any) => {
  console.log("beka", data);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Types[]>(data);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      // Only add a new todo if it's not empty
      await postTodo({ todo: newTodo }); // Post the new todo to the server
      setTodos([...todos, { todo: newTodo }]); // Add the new todo to the list
      setNewTodo(""); // Clear the input field
    }
  };

  return (
    <div>
      <ul>
        {todos.map((item: any, index: number) => (
          <li key={index} className="text-3xl p-2 bg-red-500">
            {item.todo}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <input
          onChange={(e) => setNewTodo(e.target.value)}
          type="text"
          value={newTodo}
          placeholder="enter new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
