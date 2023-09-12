// route component code here (ts)

import prisma from "@/prisma/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { page: string } }
) {
  try {
    const pagedetails = await prisma.page.findUnique({
      where: {
        title: params.page as string,
      },
      include: {
        link: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json({
      page: pagedetails,
    });
  } catch (error) {
    console.log("params", params.page);

    console.log(error);
  }

  return NextResponse.json({
    status: 404,
  });
}
