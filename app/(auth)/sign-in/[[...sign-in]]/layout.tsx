import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}

export default layout;
