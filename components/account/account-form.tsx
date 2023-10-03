"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

type Inputs = {
  title: string;
  url: string;
};

const options = [
  { value: "FACEBOOK", label: "Facebook" },
  { value: "TWITTER", label: "Twitter" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "GITHUB", label: "Github" },
  { value: "LINKEDIN", label: "Linkedin" },
  { value: "EMAIL", label: "Email" },
];

export default function AccountForm() {
  const { register, handleSubmit, reset, watch } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["social-links"],
    mutationFn: async (data: Inputs) => {
      return axios.post("/api/social-link", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["social-links"]);

      reset();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center gap-2"
    >
      <select
        {...register("title", { required: true })}
        className="px-2 py-2 rounded-sm dark:bg-slate-800 bg-slate-100 border border-slate-200 border-opacity-20 outline-none "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Input type="text" {...register("url", { required: true })} />
      <Button>save</Button>
    </form>
  );
}

type Name = {
  name: string;
};
export function UpdateName() {
  const { register, reset, handleSubmit } = useForm<Name>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: Name) => {
      return axios.put("/api/user", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      reset();
    },
  });

  const onSubmit: SubmitHandler<Name> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 items-center justify-center"
    >
      <Input
        placeholder="Enter a Name or edit"
        type="text"
        {...register("name")}
      />
      <Button>save</Button>
    </form>
  );
}

export function CopyProfileUrl({ username }: { username: string }) {
  return (
    <>
      <h1 className="text-sm flex self-start">copy profile url</h1>
      <div className="flex items-center gap-2">
        <Input className="py-2" value={getUrl(`/${username}`)} readOnly />
        <CopyButton url={getUrl(`/${username}`)} />
      </div>
    </>
  );
}

import { Copy, Tick } from "@/components/shared/icons";
import { toast } from "sonner";
import { getUrl } from "@/lib/getUrl";

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setCopied(true);
        navigator.clipboard.writeText(url).then(() => {
          toast.success("Copied shortlink to clipboard!");
        });
        setTimeout(() => setCopied(false), 3000);
      }}
      className="group rounded-md bg-gray-700 px-4 py-2 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
    >
      <span className="sr-only">Copy</span>
      {copied ? (
        <Tick className="text-gray-100 transition-all group-hover:text-blue-800" />
      ) : (
        <span className="flex items-center text-white">
          copy
          <Copy className="text-gray-100 transition-all group-hover:text-blue-800" />
        </span>
      )}
    </button>
  );
}
