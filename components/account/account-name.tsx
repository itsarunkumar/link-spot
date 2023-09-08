"use client";

import React from "react";
import { UpdateName } from "./account-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function AccountName() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return (await axios.get("/api/user")).data;
    },
  });

  return (
    <>
      {data?.name === null ? (
        <UpdateName />
      ) : (
        <>
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs ">public-name:</span>
            <span>{data?.name}</span>
          </div>
        </>
      )}
    </>
  );
}

export default AccountName;
