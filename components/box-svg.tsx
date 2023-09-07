import React from "react";

function Box({ className }: { className: string }) {
  return (
    <svg
      className={className}
      id="patternId"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="a"
          patternUnits="userSpaceOnUse"
          width="21"
          height="21"
          patternTransform="scale(1) rotate(0)"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="hsla(0, 0%, 100%, 0)"
          />
          <path
            d="M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z"
            transform="translate(0.5,0)"
            strokeWidth="0.5"
            stroke="hsla(259, 0%, 19%, 1)"
            fill="none"
          />
        </pattern>
      </defs>
      <rect
        width="800%"
        height="800%"
        transform="translate(-40,-40)"
        fill="url(#a)"
      />
    </svg>
  );
}

export default Box;
