import React from "react";
import CopyButton from "../shared/copy-button";
import { formatDistance } from "date-fns";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

type LinkProps = {
  id: string;
  url: string;
  title: string;
  createdAt: string;
  onDelete: (id: string) => void;
};

function Link({ id, url, title, createdAt, onDelete }: LinkProps) {
  return (
    <div
      className={`mt-4 relative rounded-sm bg-background dark:bg-slate-900 border border-slate-950 border-opacity-20 px-2 py-2 pr-1 shadow-lg transition-all hover:shadow-md sm:p-4`}
    >
      <li className="relative flex items-center justify-between ">
        <div className="relative flex shrink items-center w-full">
          <div className="ml-2 sm:ml-4 flex items-center justify-between w-full">
            <div className="flex max-w-fit items-center space-x-2 gap-2 font-semibold">
              {title}
              <CopyButton url={url} />
            </div>
            <div className="flex max-w-fit flex-col-reverse items-center space-x-1">
              <div className="flex items-center justify-center ">
                <p className="whitespace-nowrap text-[10px] text-gray-500">
                  {formatDistance(new Date(createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="flex items-center  ">
                <a
                  onClick={(e) => {
                    e.stopPropagation(); // to avoid selecting the link card
                  }}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="max-w-[150px] truncate text-sm font-medium text-gray-500 underline-offset-2 hover:underline sm:max-w-[300px] md:max-w-[360px] xl:max-w-[440px]"
                >
                  {url}
                </a>
              </div>
            </div>
            <div>
              <TrashIcon
                className=" text-red-500 w-6 h-6 cursor-pointer flex self-center align-middle rounded-md "
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
              />
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Link;
