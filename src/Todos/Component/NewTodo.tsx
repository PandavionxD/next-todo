"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { apiTodo } from "@/Todos";

export const NewTodo = () => {
  const router = useRouter();
  const [value, setvalue] = useState("");
  
  const newTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().length === 0) return;
    console.log(" evento enviado: ", value);
    const todo = await apiTodo.newTodo(value);
    setvalue("");
    router.refresh();
  };

  const deleteTodo = async () => {
    await apiTodo.deleteTodo();
    console.log("Todos completados borrados");
    router.refresh();
  };

  return (
    <form onSubmit={newTodo} className="flex w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        //TODO: onClick={ () => deleteCompleted() }
        onClick={deleteTodo}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ms-1">Borrar completados</span>
      </button>
    </form>
  );
};
