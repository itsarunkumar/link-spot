// Layout component code here (tsx)
import React from "react";

export default function reLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
}
