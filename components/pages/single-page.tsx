"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileTextIcon, TrashIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

type SinglePageProps = {
  title: string;
  id: string;
};

export default function SinglePage({ title, id }: SinglePageProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="flex items-center justify-center gap-2 text-center w-full mt-2">
          view page <FileTextIcon />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <Form pageid={id} />
            <div className="w-full">
              <PageLinks id={id} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

type Form = {
  title: string;
  url: string;
};

function Form({ pageid }: { pageid: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["page-links", "page"],
    mutationFn: async (data: Form) => {
      return await axios.post("/api/page/add-link", { ...data, pageid });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["page-links", "page"]);
      reset();
    },
  });

  const onSubmit: SubmitHandler<Form> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap justify-center items-center gap-5"
    >
      <Input
        placeholder="enter a title"
        {...register("title", { required: true })}
      />
      <Input
        placeholder="paste the url"
        {...register("url", { required: true })}
      />
      {errors.title && errors.url && (
        <span className="text-red-500 text-sm">fill all the fields</span>
      )}
      <Button className="w-full">add</Button>
    </form>
  );
}

function PageLinks({ id }: { id: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["page-links", "page"],
    queryFn: async () => {
      return await axios.get(`/api/page/page-links/${id}`);
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["page-links", "page"],
    mutationFn: async (id: string) => {
      return axios.post("/api/delete-link", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["page-links", "page"]);
    },
  });

  if (isError) {
    <p>unable to get links</p>;
  }

  function deleteLink(linkid: string) {
    mutation.mutate(linkid as string);
  }

  return (
    <ScrollArea className="w-full h-80 mt-5">
      {isLoading && (
        <div id="load">
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
      )}
      {data?.data.map((link: any) => (
        <div
          key={link.id}
          className="w-full px-3 py-2 border border-slate-400 border-opacity-20 shadow-md rounded-xl my-2 flex justify-around items-center"
        >
          <div className="flex flex-col">
            <p className="font-bold">{link.title}</p>
            <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
              {link.url}
            </p>
          </div>
          <TrashIcon
            className=" text-red-500 w-6 h-6 cursor-pointer flex self-center align-middle rounded-md "
            onClick={(e) => {
              e.stopPropagation();
              deleteLink(link.id);
            }}
          />
        </div>
      ))}
    </ScrollArea>
  );
}
