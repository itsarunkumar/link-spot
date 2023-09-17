import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center items-center lg:px-40 flex-col">
      {children}
    </div>
  );
}

export default Layout;
