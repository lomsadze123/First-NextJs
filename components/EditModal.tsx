import Image from "next/image";
import close from "@/public/close.png";
import mark from "@/public/mark.png";
import editTodo from "@/_actions/editTodo";
import { ModalTypes } from "@/types/types";

const EditModal = ({
  setShow,
  editedTodo,
  setEditedTodo,
  todos,
  setTodos,
}: ModalTypes) => {
  const handleEditTodo = async () => {
    editedTodo?._id && (await editTodo(editedTodo._id, editedTodo.todo));

    const updateTodoText = () => {
      const todoIndex = todos.findIndex((todo) => todo._id === editedTodo?._id);
      const updateTodos = [...todos];
      updateTodos[todoIndex] = {
        ...updateTodos[todoIndex],
        todo: editedTodo?.todo ?? "",
      };
      setTodos(updateTodos);
    };

    updateTodoText();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!(target.tagName === "TEXTAREA")) setShow(false);
      }}
      className="absolute top-0 bottom-0 left-0 right-0 text-white bg-black bg-opacity-50 flex flex-col items-center justify-center md:justify-start md:pt-20"
    >
      <div className="flex items-center gap-16 md:gap-64 mb-4">
        <h2 className="text-3xl font-bold">Edit Text</h2>
        <div className="flex gap-3 md:gap-6">
          <button onClick={handleEditTodo}>
            <Image src={mark} alt="Mark Icon" width={40} height={40} />
          </button>
          <button onClick={() => setShow(false)}>
            <Image src={close} alt="Close Icon" width={40} height={40} />
          </button>
        </div>
      </div>
      <textarea
        onChange={(e) =>
          setEditedTodo((prevTodo) => ({ ...prevTodo, todo: e.target.value }))
        }
        value={editedTodo?.todo}
        className="outline-none h-[300px] w-[300px] md:h-[500px] md:w-[500px] p-8 rounded-lg bg-yellow-600 text-wrap text-lg"
        name="editTodo"
      />
    </div>
  );
};

export default EditModal;
