// Layout component code here (tsx)
import React from "react";

export default function reLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
