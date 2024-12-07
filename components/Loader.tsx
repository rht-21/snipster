import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <section className="absolute overflow-hidden top-0 left-0 h-[100dvh] w-full flex items-center justify-center z-50 bg-black">
      <div className="flex flex-col items-center justify-center gap-xs">
        <Image src="/logo.png" alt="Snipster" width={64} height={64} />
        <svg
          className="loader-container"
          x="0px"
          y="0px"
          viewBox="0 0 50 31.25"
          height="31.25"
          width="50"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            className="loader-track"
            strokeWidth="4"
            fill="none"
            pathLength="100"
            d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
          />
          <path
            className="loader-car"
            strokeWidth="4"
            fill="none"
            pathLength="100"
            d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
          />
        </svg>
      </div>
    </section>
  );
};

export default Loader;

<style></style>;
