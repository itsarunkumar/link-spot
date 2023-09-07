import Box from "@/components/box-svg";
import { ButtonBordered } from "@/components/ui/button";
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
      <div className=" relative w-full flex justify-center items-center flex-col">
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <h4 className="lg:text-9xl text-4xl">Linkspot</h4>
          <p className="text-2xl my-5">
            {user
              ? ` Welcome back to Linkspot - ${user?.username}`
              : "Welcome to Linkspot"}
          </p>

          <p className="hover:underline underline-offset-2 decoration-violet-600 transition-all ">
            Linkspot is an place where you can share all your links in single
            place , without any hassle of copying and pasting.
          </p>
          <ButtonBordered className="mt-5 hover:rounded-md transition-all">
            {userId ? (
              <Link href="/a">Go to app</Link>
            ) : (
              <Link href={"/sign-up"}>Sign Up</Link>
            )}
          </ButtonBordered>
        </div>
        <div className="w-full h-screen flex justify-center items-center flex-wrap ">
          <Image
            src={"./world.svg"}
            alt="svg phone"
            className="w-1/2 h-1/2 object-contain"
            width={100}
            height={100}
          />
          <p className="lg:text-7xl text-4xl">
            Linkspot is an opensource project.
          </p>
        </div>

        <div className="text-sm text-slate-400 underline decoration-slate-100 my-8">
          github contributions are welcomed
        </div>
      </div>
    </>
  );
}
