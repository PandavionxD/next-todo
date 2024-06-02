import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = +(searchParams.get("take") ?? "10");
  const skip = +(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json({
      message: "Take tiene que ser un número",
      error: 404,
    });
  }

  if (isNaN(skip)) {
    return NextResponse.json({
      message: "Skip tiene que se un número",
      error: 404,
    });
  }
  const todo = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json({
    todo,
  });
}

const postScheme = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().default(false).optional(),
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postScheme.validate(await request.json());
    const todo = await prisma.todo.create({ data: { complete, description } });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({
      message: "Ups, Hubo un error 🐕",
      status: 400,
    });
  }
}


export async function DELETE(request: Request) {
  try {
    const todo = await prisma.todo.deleteMany({ where:{
      complete:true
    } });
    return NextResponse.json(
      {
        method:'Delete',
        message:'Éxito'
      }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Ups, Hubo un error 🐕",
      status: 400,
    });
  }
}





