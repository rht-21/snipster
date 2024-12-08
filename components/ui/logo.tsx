import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center justify-start gap-xxs">
      <Image src="/logo.png" alt="Snipster" width={42} height={42} />
      <span className="hidden sm:flex text-h3 font-semibold">Snipster</span>
    </div>
  );
};

export default Logo;
