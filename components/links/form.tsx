"use client";

import React, { use } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  url: string;
};

function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["links"],
    mutationFn: async (data: Inputs) => {
      return axios.post("/api/addlink", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);

      reset();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center gap-5 flex-col"
    >
      <Label htmlFor="title" className="w-full flex flex-col gap-2">
        <span>Title:</span>
        <Input
          placeholder="Enter a title"
          defaultValue=""
          {...register("title", { required: true })}
        />
      </Label>
      <Label htmlFor="url" className="w-full flex flex-col gap-2">
        <span>Destination URL:</span>
        <Input
          placeholder="Enter the destination URL"
          defaultValue=""
          {...register("url", { required: true })}
        />
      </Label>
      {errors.url && errors.title && (
        <span className="text-destructive">This field is required</span>
      )}
      <Button className=" flex self-end">Save</Button>
    </form>
  );
}

export default Form;
