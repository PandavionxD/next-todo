import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

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
      message: "Skipe tiene que se un número",
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
