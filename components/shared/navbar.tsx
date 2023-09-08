import { UserButton } from "@clerk/nextjs";
import React from "react";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./dark-mode";

async function Nav() {
  const { userId } = await auth();

  return (
    <nav className=" sticky top-0 z-10 lg:px-44 px-5 w-full flex justify-between items-center h-14 backdrop-blur-lg  shadow">
      <h1 className="lg:text-3xl  text-2xl">
        <Link href={"/"}>Linkspot</Link>
      </h1>
      <div className="w-full flex justify-end items-center gap-5 ">
        <ModeToggle />

        <Link href={"/#"} className="">
          features
        </Link>
        <Link href={"/a"} className="">
          app
        </Link>
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href={"/sign-in"} className="lg:block hidden text-xl">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
