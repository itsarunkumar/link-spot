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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

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

  return (
    <div className="lg:w-1/2 md:w-2/3 w-full   flex justify-center items-center flex-col  ">
      <h2 className=" my-3 text-3xl capitalize font-bold font-philosopher">
        {data?.user.name}
      </h2>
      <Tabs defaultValue="account" className="w-3/4">
        <TabsList className="w-full flex justify-center items-center">
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
        </TabsList>

        <TabsContent value="social">
          <div className="flex gap-5 my-5 ">
            {data?.user.socialLinks.map(
              (link: { id: string; title: string; url: string }) => (
                <motion.div
                  animate={{ scale: [0, 1], rotate: [10, 0] }}
                  whileHover={{
                    y: [0, -10],
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ delay: 0.1 }}
                  key={link.id}
                >
                  <Link
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    className="w-32 h-32 border shadow-md rounded-md grid place-content-center place-items-center gap-5 cursor-pointer"
                  >
                    <motion.span animate={{ x: [100, 0] }}>
                      {
                        sociallogo.find((logo) => logo.title === link.title)
                          ?.icon
                      }
                    </motion.span>
                    <motion.span animate={{ x: [-100, 0] }}>
                      {link.title}
                    </motion.span>
                  </Link>
                </motion.div>
              )
            )}
          </div>
        </TabsContent>

        <TabsContent value="links">
          <div className=" w-full  h-screen">
            <motion.div
              animate={{ x: [100, 0] }}
              transition={{ staggerChildren: 0.5, delay: 0.1 }}
              className=" "
            >
              {data?.user.links.map(
                (link: { id: string; title: string; url: string }) => (
                  <motion.div
                    whileFocus={{ scaleY: 1.1 }}
                    whileTap={{ y: [0, -10, 0] }}
                    key={link.id}
                  >
                    <Link
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      className="px-5 py-3 my-5 w-full rounded-md border  border-opacity-5 shadow-lg flex  justify-between items-center self-center font-montserrat font-semibold  "
                    >
                      <Link2Icon />
                      {link.title}
                      <PaperPlaneIcon />
                    </Link>
                  </motion.div>
                )
              )}
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Public;
