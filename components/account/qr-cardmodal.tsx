"use client";

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
import QRCodeCard from "../shared/qr-card";

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="qrcode">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {username.toLocaleUpperCase()} QR Code
              </ModalHeader>
              <ModalBody>
                <QRCodeCard title={username} url={username} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
