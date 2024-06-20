"use client";
import { Todo } from "@prisma/client";
import { TodosItem } from "./TodosItem";
// import * as apiTodo from "@/Todos/helpers/todos";
import { useRouter } from "next/navigation";
import { ToggleTodo } from "../Actions/Todo-Actions";

interface Props {
  todos: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter();
  
  // const toogleTodo = async (id: string, complete: boolean) => {
  //   const updateTodo = await apiTodo.updateTodo(id, complete);
  //   router.refresh();
  //   return updateTodo;
  // };



  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodosItem key={todo.id} todo={todo} toggleTodo={ToggleTodo} />
      ))}
    </div>
  );
};
