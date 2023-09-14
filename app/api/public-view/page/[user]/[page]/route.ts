// route component code here (ts)

import prisma from "@/prisma/db";
import { NextResponse, NextRequest } from "next/server";

/**
 * Retrieves a specific page for a user.
 *
 * @param {NextRequest} request - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.user - The username of the user.
 * @param {string} params.page - The title of the page.
 * @returns {Promise<NextResponse>} The JSON response containing the page information.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { user: string; page: string } }
): Promise<NextResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: params.user as string,
      },
      select: {
        id: true,
      },
    });

    const page = await prisma.page.findUnique({
      where: {
        title_userId: {
          userId: user?.id as string,
          title: params.page,
        },
      },
      select: {
        title: true,
        link: true,
      },
    });

    return NextResponse.json({
      page,
    });
  } catch (error) {
    console.error(error);
    // @ts-ignore
    return NextResponse.error({
      status: 500,
    });
  }
}
