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
