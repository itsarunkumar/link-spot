import {
  DotsVerticalIcon,
  EyeOpenIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import SinglePage from "./single-page";
import { getUrl } from "@/lib/getUrl";
import { useState } from "react";
import { Copy, Tick } from "@/components/shared/icons";
import { toast } from "sonner";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
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

type PageCard = {
  title: string;
  count: number;
  onDelete: (id: string) => void;
  id: string;
};

function PageCard({ title, count, onDelete, id }: PageCard) {
  return (
    <div className="w-full flex justify-between items-center px-5 py-4 border border-slate-700 border-opacity-10 rounded-lg dark:bg-slate-900 bg-slate-100  shadow-md ">
      <h1>{title}</h1>
      <div className="flex items-center gap-3">
        <span className="px-2 py-1 bg-primary rounded-md text-center text-sm text-white">
          Total Links : {count}
        </span>

        <Popover>
          <PopoverTrigger>
            <DotsVerticalIcon className="w-6 h-6" />
          </PopoverTrigger>
          <PopoverContent className="w-36 text-center">
            <SinglePage title={title} id={id} />

            <button className="mt-2 bg-transparent">
              <CopyButton url={getUrl(`/pv/pg/${title}`)} />
            </button>

            <QRmodal title={title} url={getUrl(`/pv/pg/${title}`)} />

            <Separator className="mt-2" />
            <button
              className=" text-red-500 mt-2 cursor-pointer flex justify-center items-center w-full self-center align-middle rounded-md "
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              delete
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default PageCard;

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
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
      className="group  flex items-center px-1 rounded-md transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
    >
      <span className="sr-only">Copy</span>
      copy link{" "}
      {copied ? (
        <Tick className="text-gray-100 transition-all group-hover:text-blue-800" />
      ) : (
        <Copy className="text-gray-800 transition-all group-hover:text-blue-800" />
      )}
    </button>
  );
}

type ModalProps = {
  title: string;
  url: string;
};

function QRmodal({ title, url }: ModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className=" p-0 m-0 bg-transparent text-foreground"
        color="primary"
      >
        show QR
        <QRIcon className="w-2 h-2 text-white " />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="qrcode">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {title.toLocaleUpperCase()} QR Code
              </ModalHeader>
              <ModalBody>
                <QRCodeCard title={title} url={url} />
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

function QRCodeCard({ title, url }: ModalProps) {
  return (
    <Card className="dark:bg-slate-50 text-slate-950 py-4 flex justify-center items-center">
      <CardHeader className="flex justify-center items-center flex-col">
        <span className="py-2 w-2/3 text-center font-semibold">
          scan the QR code to see links {title} page
        </span>
      </CardHeader>
      <CardBody className="overflow-visible py-2 w-full flex justify-center items-center">
        <QRCode
          // value={`${location.origin}/pv/${username}`}
          value={getUrl(`/pv/pg/${title}`)}
          className="object-center w-28 h-28"
        />
      </CardBody>
    </Card>
  );
}
