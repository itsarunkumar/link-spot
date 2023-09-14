import prisma from "@/prisma/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId, user } = await getAuth(req);

  if (!userId) {
    return new Response(null, {
      status: 404,
    });
  }

  const pages = await prisma.page.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      link: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return new Response(JSON.stringify(pages), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const { userId } = await getAuth(req);
  const data = await req.json();

  await prisma.page.delete({
    where: {
      id: data.id,
    },
  });

  return new Response(null, {
    status: 200,
  });
}
