import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@clerk/nextjs";
import AccountForm, { CopyProfileUrl, UpdateName } from "./account-form";
import AccountSocialLink from "./account-social-links";
import AccountName from "./account-name";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import QRmodal from "./qr-cardmodal";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import CopyButton from "../shared/copy-button";
import { getUrl } from "@/lib/getUrl";

async function AccountPage() {
  const user = await currentUser();

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className=" lg:w-1/2 md:w-2/3 w-full lg:h-[100px] dark:bg-slate-900 border border-slate-900 border-opacity-20 shadow-lg rounded-md lg:px-2 py-1 flex lg:flex-row flex-col justify-center items-center gap-5 flex-wrap">
        <Avatar className="">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.firstName}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ">
          <span className="text-slate-500 text-xs ">username:</span>
          <span>{user?.username}</span>
        </div>
        <AccountName />
        <QRmodal
          username={user?.username as string}
          imageurl={user?.imageUrl as string}
        />
        <div className="flex items-center flex-col justify-center">
          <Popover>
            <PopoverTrigger className="text-normal dark:text-slate-100 items-center justify-center flex gap-1">
              options <DotsVerticalIcon className="w-4 h-4" />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center justify-center gap-2">
              <UpdateName />
              <Separator />
              <CopyProfileUrl username={user?.username as string} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* social links */}
      <div className="lg:w-1/2 md:w-2/3 w-full my-5 lg:px-2 py-5 dark:bg-slate-900 border border-slate-900 border-opacity-20 shadow-lg rounded-md   flex justify-center items-center gap-5 flex-col">
        <h1>social links</h1>
        <AccountSocialLink />
        <AccountForm />
      </div>
    </div>
  );
}

export default AccountPage;
