export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NewTodo, TodosGrid } from "@/Todos";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata:Metadata = {
  title : 'RestTodosPage',
  description:'Pagina de restTodos'
}


export const GetData = async () => {
  const data = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return data;
};

export default async function RestTodosPage() {
  const todos = await GetData();
  return (
    // TODO: Aqui se crea el formulario
    <>
      <div className="w-full my-3 mx-4 px-6">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
