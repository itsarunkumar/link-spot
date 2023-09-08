// Page component code here (tsx)
import React from "react";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";

const createUser = async () => {
  const user = await currentUser();

  const match = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        id: user?.id as string,
        username: user?.username as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }

  redirect("/");
};

export default async function rePage() {
  await createUser();

  return (
    <div>
      <h1 className="text-5xl">...Loading</h1>
    </div>
  );
}
