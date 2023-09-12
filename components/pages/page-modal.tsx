"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "../ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button as UIButton } from "../ui/button";

type PageInput = {
  title: string;
};

export default function PagesModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PageInput>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["page", "page-links"],
    mutationFn: async (data: PageInput) => {
      return await axios.post(`/api/page/new-page`, data);
    },
    onSuccess: () => {
      onClose();
      reset();

      queryClient.invalidateQueries(["page", "page-links"]);
    },
    onError: () => {
      alert("page title must be unique");
    },
  });

  const onSubmit: SubmitHandler<PageInput> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        add page
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-primary">Create a page</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    autoFocus
                    placeholder="Enter you page title"
                    {...register("title", { required: true })}
                  />

                  <div className="flex gap-5 justify-end my-3">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <UIButton>create page</UIButton>
                  </div>

                  {errors.title && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
