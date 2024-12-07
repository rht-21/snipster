import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const SignInPage = () => {
  return (
    <main className="h-[100dvh] w-full flex flex-col px-s sm:px-m py-s bg-wavy-line-svg bg-cover bg-no-repeat bg-center">
      <div className="flex items-center justify-start gap-xxs">
        <Image src="/logo.png" alt="Snipster" width={42} height={42} />
        <span className="text-h3 font-semibold">Snipster</span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <SignIn />
      </div>
    </main>
  );
};

export default SignInPage;
