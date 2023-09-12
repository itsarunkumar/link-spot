"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Link2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

function page({ params }: { params: { pageid: string } }) {
  const { data } = useQuery({
    queryKey: ["public", params.pageid],
    queryFn: async () => {
      return await axios.get(`/api/public-view/page/${params.pageid}`);
    },
  });

  return (
    <div className="lg:w-1/2 md:w-2/3 w-full bg-neutral-200  flex justify-center items-center flex-col rounded-xl text-slate-900">
      <h2 className=" my-3 text-3xl capitalize font-bold font-philosopher">
        {data?.data.page.title}
      </h2>

      <div className=" w-full  h-screen">
        <ScrollArea className=" w-full h-full  py-4 lg:px-10 flex justify-center ">
          {data?.data.page.link.map(
            (link: { id: string; title: string; url: string }) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                className="px-5 py-3 my-5 w-full rounded-md bg-gray-200 border border-gray-300 border-opacity-5 shadow-lg flex  justify-between items-center self-center font-montserrat font-semibold  "
              >
                <Link2Icon />
                {link.title}
                <PaperPlaneIcon />
              </Link>
            )
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

export default page;
