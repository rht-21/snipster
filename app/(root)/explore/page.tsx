import Explore from "@/components/Explore";
import React from "react";

const page = () => {
  return (
    <main className="h-full w-full flex gap-xs pt-xs">
      <section className="flex flex-1">
        <Explore />
      </section>
      <section className="hidden lg:flex flex-1 md:max-w-[380px] bg-red"></section>
    </main>
  );
};

export default page;
