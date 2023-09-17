import Box from "@/components/box-svg";
import { currentUser, auth } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Suspense } from "react";
import SuspenseFallback from "@/components/shared/suspense-fallback";
import { motion } from "framer-motion";
import AnimationCard from "@/components/shared/animation-card";
import { Github } from "@/components/shared/icons";

export default async function Home() {
  // const user: User | null = await currentUser();
  const { userId } = await auth();

  return (
    <>
      <Box className="fixed w-full h-screen opacity-30" />
      <Suspense fallback={<SuspenseFallback />}>
        <div className="relative w-full flex justify-center items-center flex-col font-lato">
          <div className="w-full py-20 flex justify-center items-center flex-col">
            <h1 className="lg:text-9xl font-bold text-7xl font-philosopher">
              Linkspot
            </h1>
            <p className="my-3 px-3  text-center decoration-slate-100 underline underline-offset-2">
              a place to share your links with the world , no more hassle of
              keeping separate links
            </p>

            <Button
              className=" border-2 border-violet-500 rounded-sm px-4 py-2"
              variant="bordered"
            >
              {userId ? (
                <Link href={"/a"}>Go To App</Link>
              ) : (
                <Link href={"/sign-up"}>Sign Up</Link>
              )}
            </Button>
          </div>
          <div className="lg:w-1/2 w-full flex justify-center items-center  lg:text-5xl text-3xl  text-center ">
            <p>
              "Welcome to <span className="text-primary">LinkSpot</span> : The
              Open Source Oasis for Sharing Reliable and Community-Driven
              Links!"
            </p>
          </div>
          <div
            className="w-full flex justify-center items-center h-80 my-5
            overflow-hidden
          "
          >
            <AnimationCard />
          </div>
          <footer className="py-4 text-sm font-bold bottom-0 w-full flex justify-center">
            open source :{" "}
            <Link
              href="https://github.com/itsarunkumar/link-spot"
              target="_blank"
              className="flex gap-2 items-center px-1"
            >
              Github <Github />
            </Link>
          </footer>
        </div>
      </Suspense>
    </>
  );
}
