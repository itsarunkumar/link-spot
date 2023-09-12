"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { FormEventHandler } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrashIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";
import { formatDistance } from "date-fns";
import Link from "./link-card";

type Link = {
  id: string;
  url: string;
  title: string;
  createdAt: string;
};

function ListLinks() {
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      return (await axios.get("/api/all-links")).data;
    },
    onSuccess: (data) => {},
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["links"],
    mutationFn: async (id: string) => {
      return axios.post("/api/delete-link", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
      toast({
        title: "Link deleted successfully",
        variant: "destructive",
      });
    },
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading data....</div>;
  }

  function deleteLink(linkid: string) {
    mutation.mutate(linkid as string);
  }

  return (
    <ScrollArea className="lg:w-2/3 w-full h-[500px]  py-4 lg:px-10 flex justify-center">
      {data?.map((link: Link) => {
        return (
          <Link
            key={link.id}
            id={link.id}
            url={link.url}
            title={link.title}
            createdAt={link.createdAt}
            onDelete={deleteLink}
          />
        );
      })}
    </ScrollArea>
  );
}

export default ListLinks;

export function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="512"
      height="512"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fill-rule="evenodd">
        <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
        <path
          fill="#fff"
          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm1.482 14.94a18.214 18.214 0 0 1-2.964 0c.093.397.197.765.31 1.102c.251.755.53 1.293.79 1.622c.127.162.23.248.3.29l.051.028l.03.008l.032-.008l.051-.027a1.21 1.21 0 0 0 .3-.29c.26-.33.539-.868.79-1.623c.113-.337.217-.705.31-1.102Zm-8.675-1.435a8.026 8.026 0 0 0 4.441 4.01a10.52 10.52 0 0 1-.318-.84a15.818 15.818 0 0 1-.52-2.033a17.87 17.87 0 0 1-3.603-1.137Zm14.386 0c-1.144.5-2.35.883-3.604 1.137a15.63 15.63 0 0 1-.52 2.034c-.096.29-.202.572-.318.838a8.027 8.027 0 0 0 4.443-4.01Zm-5.217-4.634a15.119 15.119 0 0 1-3.952 0a26.02 26.02 0 0 0 .141 4.025a16.195 16.195 0 0 0 3.67 0A25.04 25.04 0 0 0 14 12c0-.384-.008-.76-.024-1.13ZM4.568 9.032a7.978 7.978 0 0 0-.52 3.856a15.893 15.893 0 0 0 4.067 1.637a27.889 27.889 0 0 1-.074-4.053a14.915 14.915 0 0 1-3.473-1.44Zm14.864 0a14.916 14.916 0 0 1-3.473 1.44a27.879 27.879 0 0 1-.074 4.053a15.892 15.892 0 0 0 4.066-1.637a7.978 7.978 0 0 0-.52-3.855Zm-7.416-5.02l-.011-.002l-.02.003l-.038.015a1.233 1.233 0 0 0-.33.307c-.26.33-.538.868-.79 1.622c-.27.808-.488 1.8-.633 2.919a13.123 13.123 0 0 0 3.612 0c-.145-1.12-.364-2.111-.633-2.919c-.252-.754-.53-1.293-.79-1.622a1.233 1.233 0 0 0-.3-.29l-.067-.032Zm-2.768.474a8.022 8.022 0 0 0-3.71 2.797c.843.484 1.746.876 2.695 1.163c.16-1.164.397-2.223.697-3.122c.097-.291.203-.572.318-.838Zm5.504 0c.115.266.22.547.318.838c.3.9.537 1.958.697 3.122a12.927 12.927 0 0 0 2.695-1.163a8.021 8.021 0 0 0-3.71-2.797Z"
        />
      </g>
    </svg>
  );
}

// <Card
//             key={link.id}
//             className=" lg:w-full sm:w-[250px] px-2 py-1 rounded-sm flex justify-center items-center  my-5 shadow-md border-opacity-20"
//           >
//             <CardHeader className="px-1 py-1 flex justify-center items-center ">
//               <CardTitle className="w-full flex justify-center items-center">
//                 <GlobeIcon className="w-9 h-9 flex justify-center items-center text-slate-50" />
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="px-1 py-1 flex justify-center items-center">
//               <CardDescription className="truncate text-ellipsis overflow-hidden flex flex-col">
//                 <h5 className="font-bold text-white">{link.title}</h5>
//                 <span className="text-xs">{link.url}</span>
//                 <span className="text-xs">
//                   {formatDistance(new Date(link.createdAt), new Date(), {
//                     addSuffix: true,
//                   })}
//                 </span>
//               </CardDescription>
//             </CardContent>
//             <CardFooter className=" flex justify-center items-center">
//               <TrashIcon
//                 className="text-red-500 cursor-pointer w-6 h-6 flex self-center justify-center items-center "
//                 //@ts-ignore
//                 onClick={(e) => deleteLink(e, link.id)}
//               />
//             </CardFooter>
//           </Card>
