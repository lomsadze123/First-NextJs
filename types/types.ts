export interface Types {
  _id?: string;
  createdAt?: Date;
  todo: string;
  updatedAt?: Date;
}

export interface ModalTypes {
  setShow: (show: boolean) => void;
  editedTodo: Types | undefined;
  setEditedTodo: (
    newTodo: Types | ((prevTodo: Types | undefined) => Types | undefined)
  ) => void;
  setTodos: (todos: Types[]) => void;
  todos: Types[];
}
