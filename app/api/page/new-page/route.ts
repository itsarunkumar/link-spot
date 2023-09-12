import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { userId } = await getAuth(req);

  try {
    const newPage = await prisma.page.create({
      data: {
        title: data.title,
        userId: userId,
      },
    });

    return new Response(JSON.stringify(newPage), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }

  return new Response(
    JSON.stringify({
      message: "Page not created",
    }),
    {
      status: 404,
    }
  );
}
