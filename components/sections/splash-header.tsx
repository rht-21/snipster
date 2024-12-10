import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const SplashHeader = () => {
  return (
    <section className="min-h-[50dvh] sm:min-h-[60dvh] flex flex-col items-center justify-center pt-m">
      <h1 className="text-h1 sm:text-h1 max-w-6xl font-semibold tracking-wide text-left sm:text-center">
        Capture Ideas. Organize Snippets. Build Faster.
      </h1>
      <p className="text-base sm:text-body text-left sm:text-center max-w-3xl mt-m sm:mt-xs text-foreground/70 leading-relaxed">
        Store, Organize, and Effortlessly Access All Your Code Snippets -
        Anytime, Anywhere. Simplify Your Development Workflow!
      </p>
      <div className="flex item-center w-full sm:w-auto gap-xs mt-l">
        <Button className="w-full sm:w-auto flex-1" variant="outline">
          <Link href={"/explore"}>Explore Snippets</Link>
        </Button>
        <Button className="w-full sm:w-auto flex-1">
          <Link href={"/dashboard"}>Get Started</Link>
        </Button>
      </div>
    </section>
  );
};

export default SplashHeader;
