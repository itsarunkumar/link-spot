import prisma from "@/prisma/db";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { userId } = await getAuth(req);

  try {
    const slink = await prisma.socialLink.create({
      data: {
        title: data.title,
        url: data.url,
        userId: userId,
      },
    });

    return new Response(JSON.stringify(slink), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }

  return new Response(null, {
    status: 404,
  });
}

export async function GET(req: NextRequest) {
  const { userId } = await getAuth(req);

  try {
    const sociallinks = await prisma.socialLink.findMany({
      where: {
        userId: userId,
      },
    });

    return new Response(JSON.stringify(sociallinks), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }

  return new Response(null, {
    status: 404,
  });
}
