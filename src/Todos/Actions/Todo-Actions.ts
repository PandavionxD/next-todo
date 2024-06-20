"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const ToggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw new Error(`Todo con id: ${id}, no existe en la data 🥶`);
  }
  const UpdatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("dashboard/server-todos");

  return UpdatedTodo;
};

export const NewTodoActions = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath("dashboard/server-todos");
  } catch (error) {
    console.log(error);
  }
};

export const DeleteTodoComplete = async (): Promise<void> => {
  try {
    const TodoDelete = await prisma.todo.deleteMany({
      where: { complete: true },
    });
    revalidatePath("dashboard/server-todos");
  } catch (error) {
    console.log("Se eliminaron Todos Completados");
  }
};
