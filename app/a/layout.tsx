// Layout component code here (tsx)
import React from "react";

export default function appLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full lg:px-40 px-1">
      <h1>{children}</h1>
    </div>
  );
}
