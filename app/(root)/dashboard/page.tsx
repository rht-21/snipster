"use client";

import Dashboard from "@/components/Dashboard";
import React, { useState } from "react";

const Page = () => {
  const [isChange, setIsChange] = useState<boolean>(false);

  return (
    <main className="h-full w-full flex gap-xs pt-xs">
      <Dashboard isChange={isChange} setIsChange={setIsChange} />
    </main>
  );
};

export default Page;
