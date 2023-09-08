import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/prisma/db";

export async function PUT(req: NextRequest) {
  const { userId } = await getAuth(req);
  const data = await req.json();

  const updateUser = await prisma.user.update({
    where: {
      id: userId as string,
    },
    data: {
      name: data.name,
    },
  });

  return new Response(JSON.stringify(updateUser), {
    status: 200,
  });
}

export async function GET(req: NextRequest) {
  const { userId } = await getAuth(req);

  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
  });

  return new Response(JSON.stringify(user), {
    status: 200,
  });
}
