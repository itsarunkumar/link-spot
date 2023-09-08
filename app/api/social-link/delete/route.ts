import prisma from "@/prisma/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { userId } = await getAuth(req);

  if (!userId) {
    return new Response(null, {
      status: 404,
    });
  }

  try {
    await prisma.socialLink.delete({
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
