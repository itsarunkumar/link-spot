"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type Links = {
  id: string;
  title: string;
  url: string;
};

export default function TableLinks({ data }: { data: Links[] }) {
  return (
    <Table aria-label="links">
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Url</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {data.map((item: Links) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.url}</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
