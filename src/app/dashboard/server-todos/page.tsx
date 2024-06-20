export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NewTodo, TodosGrid } from "@/Todos";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const GetData = async () => {
  const data = await prisma.todo.findMany({ orderBy: { createdAt: "asc" } });
  return data;
};

export const metadata: Metadata = {
  title: "ServerPage",
  description: "Pagina principal de serverTodos",
};

export default async function RestTodosPage() {
  const todos = await GetData();
  return (
    // TODO: Aqui se crea el formulario
    <>
      <h1 className="text-4xl font-semibold text-center my-4 ">
        Server Actions
      </h1>
      <div className="w-full my-3 mx-4 px-6">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
