import SplashFeatures from "@/components/sections/splash-features";
import SplashHeader from "@/components/sections/splash-header";
import React from "react";

const Page = () => {
  return (
    <main className="h-[calc(100dvh-9rem)] w-full overflow-auto">
      <SplashHeader />
      <SplashFeatures />
    </main>
  );
};

export default Page;
