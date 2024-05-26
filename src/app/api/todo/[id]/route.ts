import prisma from "@/lib/prisma";
import next from "next";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export interface segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    return NextResponse.json({
      message: `Todo con ${id} no existe`,
      error: 404,
    });
  }

  return NextResponse.json({
    todo,
  });
}

const PutScheme = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    return NextResponse.json({
      message: `Todo con ${id} no existe 🐼`,
      error: 404,
    });
  }

  try {
    const { complete, description, ...rest } = await PutScheme.validate(
      await request.json()
    );

    const data = await prisma.todo.update({
      where: { id },
      data: {
        complete,
        description,
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({
      error,
      message: "Ups algo salio mal 🐧",
    });
  }
}

const deleteScheme = yup.object({
  id: yup.string(),
});

export async function DELETE(request: Request, segments: segments) {
  const { id } = segments.params;
  try {
    const {count} :any = await deleteScheme.validate(
      await prisma.todo.deleteMany({ where: { id } })
    );
    console.log({count})
    if (count===0) {
      return NextResponse.json({
        message: `Todo con ${id} no existe 🐼`,
        error: 404,
      });
    }
    console.log(`Todo borrado es ${todo}`);
    return NextResponse.json({
      message: "Todo borrado con éxito 🥶",
      code: "ok",
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      message: "Ups algo salio mal, intentalo de nuevo 🐧",
      error,
    });
  }
}
