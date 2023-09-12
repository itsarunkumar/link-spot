import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/prisma/db";

export async function GET(request: NextRequest) {
  const { userId } = await getAuth(request);

  try {
    const links = await prisma.link.findMany({
      where: {
        userId: userId,
        OR: [{ pageId: null }, { pageId: "" }],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(links), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }

  return new Response(null, {
    status: 404,
  });
}
