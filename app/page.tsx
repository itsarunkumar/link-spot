import Box from "@/components/box-svg";
import { currentUser, auth } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const user: User | null = await currentUser();
  const { userId } = await auth();
  console.log(userId);

  return (
    <>
      <Box className="fixed w-full h-screen opacity-30" />
      <div className="relative">
        <h1 className="text-9xl">Linkspot</h1>
      </div>
    </>
  );
}
