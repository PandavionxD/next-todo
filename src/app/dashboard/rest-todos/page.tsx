import prisma from "@/lib/prisma";

export const GetData = async () => {
  const data = await prisma.todo.findMany({ orderBy: { createdAt: "asc" } });
  return data;
};

export default async function RestTodosPage() {
  const data = await GetData();
  return (
    <div>
      <p>
        {JSON.stringify(data)}
      </p>
    </div>
  );
}
