"use client";

import Homepage from "@/components/Homepage";
import React, { useState } from "react";

const Page = () => {
  const [isChange, setIsChange] = useState<boolean>(false);

  return (
    <main className="h-full w-full flex gap-xs pt-xs">
      <Homepage isChange={isChange} setIsChange={setIsChange} />
    </main>
  );
};

export default Page;
