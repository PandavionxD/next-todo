"use client"
import { Todo } from "@prisma/client";
import style from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  // TODO: Acciones que quiero llamar
  toggleTodo:(id:string, complete:boolean)=>Promise<Todo>
}

export const TodosItem = ({ todo , toggleTodo}: Props) => {
  return (
    <div className={todo.complete ? style.todoDone: style.todoPending}>
      <div className="flex sm-flex-grow justify-start items-center gap-4">
        <div
        onClick={()=>toggleTodo(todo.id,!todo.complete)}
          className={`
          ${todo.complete ? 'bg-blue-100' : 'bg-red-100'}
          flex p-2 rounded-sm cursor-pointer hover:bg-opacity-60 bg-blue-100      
        `}
        >
          {todo.complete ? (
            <IoCheckboxOutline size={20} />
          ) : (
            <IoSquareOutline size={20} />
          )}
        </div>
        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};
