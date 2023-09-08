"use client";

import {
  Facebook,
  Instagram,
  TwitterOrX,
  Linkedin,
  Github,
  Email,
} from "@/components/shared/icons";
import { Link2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const sociallogo = [
  {
    title: "FACEBOOK",
    icon: <Facebook className="w-5 h-5 " />,
  },
  {
    title: "INSTAGRAM",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    title: "TWITTER",
    icon: <TwitterOrX className="w-5 h-5" />,
  },
  {
    title: "LINKEDIN",
    icon: <Linkedin className="w-5 h-5  " />,
  },
  { title: "EMAIL", icon: <Email className="w-5 h-5 " /> },
  { title: "GITHUB", icon: <Github className="w-5 h-5" /> },
];

function Public({ params }: { params: { id: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["public", params.id],
    queryFn: async () => {
      return (await axios.get(`/api/public-view/${params.id}`)).data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Getting User LInks....
      </div>
    );
  }

  return (
    <div className="lg:w-1/2 md:w-2/3 w-full bg-neutral-200  flex justify-center items-center flex-col rounded-xl text-slate-900">
      <h2 className=" my-3 text-3xl capitalize font-bold font-philosopher">
        {data?.user.name}
      </h2>
      <div className="flex gap-5 my-5">
        {data?.user.socialLinks.map(
          (link: { id: string; title: string; url: string }) => (
            <Link key={link.id} href={link.url} target="_blank">
              {sociallogo.find((logo) => logo.title === link.title)?.icon}
            </Link>
          )
        )}
      </div>

      <div className=" w-full  h-screen">
        <ScrollArea className=" w-full h-full  py-4 lg:px-10 flex justify-center ">
          {data?.user.links.map(
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

export default Public;
