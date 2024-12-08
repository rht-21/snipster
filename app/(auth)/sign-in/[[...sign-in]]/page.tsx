import Logo from "@/components/ui/logo";
import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <main className="h-[100dvh] w-full flex flex-col px-s sm:px-m py-s bg-wavy-line-svg bg-cover bg-no-repeat bg-center">
      <Logo />
      <div className="flex-1 flex items-center justify-center">
        <SignIn />
      </div>
    </main>
  );
};

export default SignInPage;
