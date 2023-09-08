// route component code here (ts)

import prisma from "@/prisma/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userdetails = await prisma.user.findUnique({
      where: {
        username: params.id as string,
      },
      include: {
        links: { orderBy: { createdAt: "desc" } },
        socialLinks: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json({
      user: userdetails,
    });
  } catch (error) {
    console.log("params", params.id);

    console.log(error);
  }

  return NextResponse.json({
    status: 404,
  });
}
