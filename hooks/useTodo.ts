import deleteTodo from "@/_actions/deleteTodo";
import getTodo from "@/_actions/getTodo";
import postTodo from "@/_actions/postTodo";
import { Types } from "@/types/types";
import { useEffect, useState } from "react";

const useTodo = (sessionId: string) => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Types[]>([]);
  const [show, setShow] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Types | undefined>();

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await getTodo(sessionId);
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      const todoData = { todo: newTodo };
      await postTodo(todoData, sessionId);
      setTodos([...todos, todoData]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleEditTodo = async (id: string) => {
    setShow(true);
    const todo = todos.find((todo) => todo._id === id);
    setEditedTodo(todo);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return {
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    newTodo,
    setNewTodo,
    todos,
    show,
    setShow,
    setEditedTodo,
    editedTodo,
    setTodos,
  };
};

export default useTodo;
