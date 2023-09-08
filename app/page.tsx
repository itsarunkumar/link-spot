import Box from "@/components/box-svg";
import { currentUser, auth } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user: User | null = await currentUser();
  const { userId } = await auth();
  console.log(userId);

  return (
    <>
      <Box className="fixed w-full h-screen opacity-30" />
      <div className="relative w-full flex justify-center items-center flex-col font-lato">
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <h1 className="lg:text-9xl font-bold text-7xl font-philosopher">
            Linkspot
          </h1>
          <p className="my-3 px-3  text-center decoration-slate-100 underline underline-offset-2">
            a place to share your links with the world , no more hassle of
            keeping separate links
          </p>
          <Button asChild variant={"outline"}>
            {user ? (
              <Link href={"/a"}>Go To App</Link>
            ) : (
              <Link href={"/sign-up"}>Sign Up</Link>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}