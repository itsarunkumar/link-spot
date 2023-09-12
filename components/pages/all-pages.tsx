"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import PageCard from "./page-card";

function AllPages() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["page", "page-links"],
    queryFn: async () => {
      return await axios.get(`/api/page`);
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["page", "page-links"],
    mutationFn: async (id: string) => {
      return await axios.post(`/api/page`, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["page", "page-links"]);
    },
  });

  if (isError) {
    return <div>Error</div>;
  }

  function deletePage(pageid: string) {
    mutation.mutate(pageid as string);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" lg:w-1/2 md:w-2/3 w-full flex flex-col gap-5">
      {data?.data.map((page: any) => (
        <PageCard
          title={page.title}
          count={page.link.length}
          onDelete={deletePage}
          key={page.id}
          id={page.id}
        />
      ))}
    </div>
  );
}

export default AllPages;
