"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { FormEventHandler } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrashIcon } from "@radix-ui/react-icons";
import { useToast } from "./ui/use-toast";

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

  function deleteLink(e: MouseEvent, linkid: string) {
    e.preventDefault();
    mutation.mutate(linkid as string);
  }

  return (
    <div>
      <ScrollArea className="w-full h-[500px]  py-4 lg:px-10">
        {data?.map((link: { id: string; url: string; title: string }) => (
          <Card
            key={link.id}
            className=" lg:w-[450px] w-[250px] px-2 py-1 rounded-sm flex justify-center items-center flex-col my-5"
          >
            <CardHeader className="px-1 py-1 w-full flex justify-center items-center self-start">
              <CardTitle className="w-full flex justify-between items-center">
                {link.title}{" "}
                <TrashIcon
                  className="text-red-500 cursor-pointer "
                  //@ts-ignore
                  onClick={(e) => deleteLink(e, link.id)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="px-1 py-1 flex justify-center items-center">
              <CardDescription className="truncate text-ellipsis">
                <code>{link.url}</code>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}

export default ListLinks;
