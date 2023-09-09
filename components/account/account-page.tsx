import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@clerk/nextjs";

import AccountForm, { CopyProfileUrl, UpdateName } from "./account-form";
import AccountSocialLink from "./account-social-links";
import prisma from "@/prisma/db";
import AccountName from "./account-name";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil2Icon } from "@radix-ui/react-icons";

async function AccountPage() {
  const user = await currentUser();

  const userindb = await prisma.user.findUnique({
    where: {
      id: user?.id as string,
    },
  });

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className=" lg:w-1/2 w-full lg:h-[100px] dark:bg-slate-900 border border-slate-900 border-opacity-20 shadow-lg rounded-md lg:px-2 py-1 flex lg:flex-row flex-col justify-center items-center gap-5 flex-wrap">
        <Avatar className="">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.firstName}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ">
          <span className="text-slate-500 text-xs ">username:</span>
          <span>{user?.username}</span>
        </div>
        <AccountName />
        <Popover>
          <PopoverTrigger className="text-xs dark:text-slate-100 items-center flex gap-1">
            <Pencil2Icon className="w-4 h-4" /> edit name
          </PopoverTrigger>
          <PopoverContent>
            <UpdateName />
          </PopoverContent>
        </Popover>
        <CopyProfileUrl username={user?.username as string} />
      </div>
      {/* social links */}
      <div className="lg:w-1/2 w-full my-5 lg:px-2 py-5 dark:bg-slate-900 border border-slate-900 border-opacity-20 shadow-lg rounded-md   flex justify-center items-center gap-5 flex-col">
        <h1>social links</h1>
        <AccountSocialLink />
        <AccountForm />
      </div>
    </div>
  );
}

export default AccountPage;
