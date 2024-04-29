"use client";
import Image from "next/image";
import trash from "@/public/trash.png";
import edit from "@/public/edit.png";
import { Types } from "@/types/types";
import EditModal from "./EditModal";
import useTodo from "@/hooks/useTodo";
import { motion } from "framer-motion";

const AddTodo = ({ sessionId }: { sessionId: string }) => {
  const {
    handleEditTodo,
    handleAddTodo,
    handleDeleteTodo,
    newTodo,
    setNewTodo,
    todos,
    show,
    setShow,
    setEditedTodo,
    editedTodo,
    setTodos,
  } = useTodo(sessionId);

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
          placeholder="Enter new todo..."
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
        {todos.length === 0 ? (
          <li className="text-gray-500 text-2xl mt-10">
            You have not got notes yet...
          </li>
        ) : (
          todos.map((item: Types, index: number) => (
            <motion.li
              initial={{ opacity: 0, y: -150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              key={index}
              className="text-lg p-8 bg-yellow-600 text-white flex flex-col gap-16 w-[350px] rounded-lg justify-between"
            >
              <span className="text-center text-2xl">
                {item.todo.split(" ").slice(0, 2).join(" ")}
              </span>
              <span>{item.todo}</span>
              <span className="flex justify-between items-center text-base">
                {item.createdAt
                  ? item.createdAt?.toString()
                  : "Refresh for new notes edit"}
                <button onClick={() => handleDeleteTodo(item._id ?? "")}>
                  <Image src={trash} alt="Trash Icon" width={25} height={25} />
                </button>
                <button onClick={() => handleEditTodo(item._id ?? "")}>
                  <Image src={edit} alt="Edit Icon" width={20} height={20} />
                </button>
              </span>
            </motion.li>
          ))
        )}
      </ul>

      {show && (
        <EditModal
          setShow={setShow}
          editedTodo={editedTodo}
          setEditedTodo={setEditedTodo}
          setTodos={setTodos}
          todos={todos}
        />
      )}
    </main>
  );
};

export default AddTodo;
