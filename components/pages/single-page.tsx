"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileTextIcon } from "@radix-ui/react-icons";
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
    console.log(data);
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
  //TODO : fetch the links for respective page
  const { data, isError, isLoading } = useQuery({
    queryKey: ["page-links", "page"],
    queryFn: async () => {
      return await axios.get(`/api/page/page-links/${id}`);
    },
  });

  if (isLoading) {
    <p>Loading page links...</p>;
  }

  if (isError) {
    <p>unable to get links</p>;
  }

  return (
    <ScrollArea className="w-full h-80 mt-5">
      {data?.data.map((link: any) => (
        <div className="w-full px-3 py-2 border border-slate-400 border-opacity-20 shadow-md rounded-xl my-2 flex flex-col items-center">
          <p className="font-bold">{link.title}</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            {link.url}
          </p>
        </div>
      ))}
    </ScrollArea>
  );
}
