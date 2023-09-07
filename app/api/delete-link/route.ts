import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    await prisma.link.delete({
      where: {
        id: data.id,
      },
    });

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }

  return new Response(null, {
    status: 404,
  });
}
