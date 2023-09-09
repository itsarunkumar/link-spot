"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import QRCode from "react-qr-code";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import QRIcon from "../shared/icons/qr-icon";
import { Avatar } from "@nextui-org/avatar";

type ModalProps = {
  username: string;
  imageurl: string;
};

export default function QRmodal({ username, imageurl }: ModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="text-sm font-bold" color="primary">
        <QRIcon className="w-4 h-4 text-white " />
        show QR
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {username.toLocaleUpperCase()} QR Code
              </ModalHeader>
              <ModalBody>
                <QRCodeCard username={username} imageurl={imageurl} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function QRCodeCard({ username, imageurl }: ModalProps) {
  return (
    <Card className="dark:bg-slate-50 text-slate-950 py-4 flex justify-center items-center">
      <CardHeader className="flex justify-center items-center flex-col">
        <Avatar
          size="md"
          radius="md"
          color="warning"
          isBordered
          src={imageurl}
        />
        <span className="py-2 w-2/3 text-center font-semibold">
          scan the QR code to see {username} profile
        </span>
      </CardHeader>
      <CardBody className="overflow-visible py-2 w-full flex justify-center items-center">
        <QRCode
          value={`${location.origin}/pv/${username}`}
          className="object-center w-28 h-28"
        />
      </CardBody>
    </Card>
  );
}
