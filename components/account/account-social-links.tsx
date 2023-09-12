"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  TwitterOrX,
  Email,
} from "../shared/icons";
import { TrashIcon } from "@radix-ui/react-icons";

const sociallogo = [
  {
    title: "FACEBOOK",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "INSTAGRAM",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    title: "TWITTER",
    icon: <TwitterOrX className="w-5 h-5" />,
  },
  {
    title: "LINKEDIN",
    icon: <Linkedin className="w-5 h-5  " />,
  },
  { title: "EMAIL", icon: <Email className="w-5 h-5" /> },
  { title: "GITHUB", icon: <Github className="w-5 h-5" /> },
];

function AccountSocialLink() {
  const { data, isLoading } = useQuery({
    queryKey: ["social-links"],
    queryFn: async () => {
      return axios.get("/api/social-link");
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["social-links"],
    mutationFn: async (id: string) => {
      return axios.post(`/api/social-link/delete`, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["social-links"]);
    },
  });

  function deleteSocialLink(id: string) {
    mutation.mutate(id);
  }

  if (isLoading) {
    return <div>getting your social links....</div>;
  }

  return (
    <div>
      {data?.data.map((link: { title: string; url: string; id: string }) => (
        <div
          className="w-full flex justify-evenly items-center gap-4 px-2 py-2 "
          key={link.id}
        >
          <Label className="w-24 flex items-center justify-center gap-2 self-center align-middle">
            {link.title.toLowerCase()}
            {sociallogo.find((s) => s.title === link.title)?.icon}
          </Label>
          <Input value={link.url} readOnly className="w-48" />

          <TrashIcon
            className="w-5 h-5 text-red-500 cursor-pointer"
            onClick={() => deleteSocialLink(link.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default AccountSocialLink;
