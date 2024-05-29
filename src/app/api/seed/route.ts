import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  // Crear un solo dato con la funcion crear
  //   const todo1 = await prisma.todo.create({
  //     data: {
  //       description: "Piedra del alma",
  //     },
  //   });

  await prisma.todo.deleteMany()

  const todo1 = await prisma.todo.createMany({
    data: [
      { description: "piedra del alma" },
      { description: "piedra del mente" },
      { description: "piedra del espacio", complete: true },
      { description: "piedra del poder" },
      { description: "piedra del tiempo" },
      { description: "piedra del realidad" },
    ],
  });

  console.log({ todo1 });

  return NextResponse.json({
    message: "Semillas creadas",
  });
}

