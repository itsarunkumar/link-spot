import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center items-center  flex-col">
      {children}
    </div>
  );
}

export default layout;
