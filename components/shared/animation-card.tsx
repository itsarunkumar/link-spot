"use client";

import { getUrl } from "@/lib/getUrl";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import QRCode from "react-qr-code";

function AnimationCard() {
  const constraintRef = useRef(null);

  function randomCoordinates(max: number) {
    return Math.random() * max;
  }

  return (
    <div className="w-4/5 h-full  relative text-slate-50 flex justify-center ">
      <motion.div
        ref={constraintRef}
        className="w-full h-full absolute text-5xl text-slate-500 flex justify-center items-center"
      >
        Drag and play
      </motion.div>
      {[
        "Pages",
        "Profile Links",
        "Bio Links",
        "Instagram Links",
        "Twitter Links",
        "Facebook Links",
      ].map((text, index) => (
        <motion.span
          key={index}
          initial={{
            x: randomCoordinates(300), // Adjust this value as needed
            y: randomCoordinates(100), // Adjust this value as needed
          }}
          animate={{
            x: randomCoordinates(300), // Adjust this value as needed
            y: randomCoordinates(100), // Adjust this value as needed
          }}
          className={`absolute flex items-center gap-2 px-5 py-3 bg-slate-300 rounded-md text-center text-sm font-semibold text-slate-900`}
          drag
          dragConstraints={constraintRef}
          style={{ zIndex: index + 1 }} // Ensure elements have different z-index values
        >
          {text} <ArrowRightIcon />
        </motion.span>
      ))}
      <motion.div
        animate={{
          x: randomCoordinates(100), // Adjust this value as needed
          y: randomCoordinates(100), // Adjust this value as needed
        }}
        drag
        dragConstraints={constraintRef}
      >
        <QRCode
          value={getUrl(`/a`)}
          className="object-center w-28 h-28 bg-slate-50 p-2 rounded-md"
        />
      </motion.div>
    </div>
  );
}

export default AnimationCard;
