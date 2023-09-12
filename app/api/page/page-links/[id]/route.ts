import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/prisma/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // const data = await req.json();
  const { userId } = await getAuth(req);
  const { id } = params;

  const pagelinks = await prisma.link.findMany({
    where: {
      pageId: id,
      AND: {
        userId: userId,
      },
    },
  });

  return new Response(JSON.stringify(pagelinks), {
    status: 200,
  });
}
