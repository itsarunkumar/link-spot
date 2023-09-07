"use client";

import React from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import Form from "./hook-form";
import ModalS from "./modal";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import TableLinks from "./table-links";

export default function DashTab() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["addlink"],
    queryFn: async () => {
      return axios.get("/api/all-links");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["addlink"]);
    },
  });

  console.log(data);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]",
        }}
      >
        <Tab
          key="Account"
          title={
            <div className="flex items-center space-x-2">
              <span>Account</span>
              <Chip size="sm" variant="faded">
                9
              </Chip>
            </div>
          }
        />
        <Tab
          key="shortened-links"
          title={
            <div className="flex items-center space-x-2">
              <span>shortened links</span>
              <Chip size="sm" variant="faded">
                3
              </Chip>
            </div>
          }
        />
        <Tab
          key="Links"
          title={
            <div className="flex items-center space-x-2">
              <span>Links</span>
              <Chip size="sm" variant="faded">
                {data?.data.length}
              </Chip>
            </div>
          }
        >
          <div className="w-full ">
            <ModalS />
          </div>

          <div>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <TableLinks data={data?.data} />
              </>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
