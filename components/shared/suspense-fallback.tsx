"use client";

import React from "react";

function SuspenseFallback() {
  return (
    <div className="w-full h-screen justify-center items-center flex">
      <div id="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  );
}

export default SuspenseFallback;
