import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Input = {
  title: string;
  url: string;
};

export default function ModalS() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm<Input>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["addlink"],
    mutationFn: async (data: Input) => {
      return axios.post("/api/addlink", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["addlink"]);
    },
  });

  const submitHandler = (data: Input) => {
    console.log(data);

    mutation.mutate(data);

    reset();
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit bg-blue-600">
        add link
      </Button>

      <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Link
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col gap-4 w-full h-full"
                >
                  <Label className="py-3">
                    Title:
                    <Input
                      defaultValue={""}
                      placeholder="Enter Title"
                      className="mt-2"
                      {...register("title", { required: true })}
                    />
                  </Label>
                  <Label className="py-3">
                    Url:
                    <Input
                      defaultValue={""}
                      placeholder="Enter Url"
                      className="mt-2"
                      {...register("url", { required: true })}
                    />
                  </Label>

                  <div className="flex gap-5 mt-3 justify-end">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" onPress={onClose}>
                      Save
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
