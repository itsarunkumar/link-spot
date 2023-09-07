"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function Public({ params }: { params: { id: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["public", params.id],
    queryFn: async () => {
      return (await axios.get(`/api/public-view/${params.id}`)).data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Loading data....
      </div>
    );
  }

  return (
    <div>
      {data?.user.links.length > 0 ? data?.user.links[0].url : "No links"}
    </div>
  );
}

export default Public;
