// Page component code here (tsx)
import React, { use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "@/components/links/form";

import ListLinks from "@/components/links/list-links";
import { Link1Icon, Link2Icon, PlusIcon } from "@radix-ui/react-icons";
import AccountForm from "@/components/account/account-form";
import { Button } from "@/components/ui/button";
import AccountPage from "@/components/account/account-page";

export default function appPage() {
  // const queryClient = useQueryClient();

  return (
    <div className=" min-h-max w-full flex justify-center items-center flex-col">
      <Tabs
        defaultValue="Account"
        className="w-full flex justify-center items-center flex-col mt-10"
      >
        <TabsList className=" w-full flex justify-evenly items-center border-b-2 border-slate-100 border-opacity-10">
          <TabsTrigger value="Account">Account</TabsTrigger>
          <TabsTrigger value="Links">Links</TabsTrigger>
        </TabsList>
        <TabsContent value="Account" className="w-full">
          <AccountPage />
        </TabsContent>
        <TabsContent value="Links" className="w-full relative">
          <div className="w-full flex justify-between items-center px-10 py-10 ">
            <h3 className="flex items-center gap-2 justify-center">
              My Links <Link1Icon />
            </h3>
            <Dialog>
              <DialogTrigger className="  flex items-center justify-center gap-2">
                <Button>
                  <PlusIcon /> Add Link
                </Button>
              </DialogTrigger>
              <DialogContent className="  ">
                <DialogHeader>
                  <DialogTitle className="my-2 flex justify-center items-center gap-2">
                    <Link2Icon /> Create a new link
                  </DialogTitle>
                  <DialogDescription>
                    <Form />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full flex justify-center items-center flex-col">
            <ListLinks />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
