import prisma from "@/prisma/db";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { userId } = await getAuth(request);

  if (!userId) {
    return new Response(null, {
      status: 404,
    });
  }

  try {
    const newLink = await prisma.link.create({
      data: {
        title: data.title,
        url: data.url,
        userId,
      },
    });

    return new Response(JSON.stringify(newLink), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }

  return new Response(null, {
    status: 404,
  });
}
