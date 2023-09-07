// Page component code here (tsx)
import DashTab from "@/components/ui/tabs";
import React from "react";

export default function appPage() {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h4 className="text-xl my-5">DashBoard</h4>
      <div className="lg:w-1/2">
        <DashTab />
      </div>
    </div>
  );
}
