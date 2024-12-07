"use client";

import { NavItems } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Loader from "./Loader";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user) {
    return <Loader />;
  }

  return (
    <nav className="h-24 w-full flex items-center justify-between px-m">
      <div className="flex-1 flex items-center justify-start">
        <p>
          Welcome,{" "}
          <span className="text-red">
            {user?.fullName || user?.firstName || user?.username}
          </span>{" "}
        </p>
      </div>
      <div className="flex items-center justify-center px-xxs gap-xxs">
        <Image src="/logo.png" alt="Snipster" width={42} height={42} />
        <span className="text-h3 font-semibold">Snipster</span>
      </div>
      <div className="flex-1 flex items-center justify-end gap-xxs">
        {Object.keys(NavItems).map((key) => {
          const path = NavItems[key as keyof typeof NavItems];
          const isActive =
            pathname === path || (pathname === "/" && key === "home");

          return (
            <Link
              key={key}
              href={path}
              className={`capitalize duration-200 px-4 py-1 hover:bg-foreground hover:text-background rounded-full ${
                isActive
                  ? "active-page hover:text-red hover:bg-transparent"
                  : ""
              }`}
            >
              {key}
            </Link>
          );
        })}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
