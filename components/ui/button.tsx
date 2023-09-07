"use client";

import React from "react";
import { Button as Btn } from "@nextui-org/react";

export function ButtonBordered({
  children,
  className,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Btn color="primary" variant="bordered" className={className}>
      {children}
    </Btn>
  );
}
