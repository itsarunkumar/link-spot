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
import {
  BarChartIcon,
  CardStackIcon,
  GlobeIcon,
  Link1Icon,
  Link2Icon,
  ListBulletIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import AccountPage from "@/components/account/account-page";
import { PersonIcon } from "@radix-ui/react-icons";
import PagesModal from "@/components/pages/page-modal";
import AllPages from "@/components/pages/all-pages";

export default function appPage() {
  // const queryClient = useQueryClient();

  return (
    <div className=" w-full flex justify-center items-center flex-col">
      <Tabs
        defaultValue="Account"
        className="w-full  min-h-screen flex justify-start items-center flex-col mt-10"
      >
        <TabsList className=" w-full flex justify-start items-center  gap-10 border-b-2 border-slate-100 border-opacity-10 overflow-x-auto overflow-y-hidden py-8">
          <TabsTrigger value="Account" className="flex">
            Account <PersonIcon />
          </TabsTrigger>
          <TabsTrigger value="Links" className="flex">
            Links <GlobeIcon />
          </TabsTrigger>
          <TabsTrigger value="Pages" className="flex">
            Pages <CardStackIcon />
          </TabsTrigger>
        </TabsList>

        {/* Account */}
        <TabsContent value="Account" className="w-full ">
          <AccountPage />
        </TabsContent>

        {/* Links */}
        <TabsContent value="Links" className="w-full relative ">
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

        {/* Pages */}
        <TabsContent value="Pages" className="w-full ">
          <div className="w-full flex justify-between items-center px-10 py-10 ">
            <h3 className="flex items-center gap-2 justify-center">My Pages</h3>
            <PagesModal />
          </div>
          <div className="w-full flex justify-center items-center flex-col">
            <AllPages />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
