import prisma from "@/prisma/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await getAuth(req);
  const data = await req.json();

  try {
    const newPageLink = await prisma.link.create({
      data: {
        title: data.title,
        url: data.url,
        userId: userId,
        pageId: data.pageid,
      },
    });

    return new Response(JSON.stringify(newPageLink), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }

  return new Response(null, {
    status: 404,
  });
}
