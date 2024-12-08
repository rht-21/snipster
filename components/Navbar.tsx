"use client";

import { NavItems } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Loader from "./Loader";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { IconMenu } from "@tabler/icons-react";
import Logo from "./ui/logo";
import { DialogTitle } from "@radix-ui/react-dialog";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user) {
    return <Loader />;
  }

  return (
    <nav className="h-24 w-full flex items-center justify-between px-m">
      <div className="flex-1 hidden lg:flex items-center justify-start">
        <p>
          Welcome,{" "}
          <span className="text-red">
            {user?.fullName || user?.firstName || user?.username}
          </span>{" "}
        </p>
      </div>
      <Logo />

      {/* Desktop Nav */}
      <div className="flex-1 hidden sm:flex items-center justify-end gap-xxs">
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

      {/* Mobile Nav */}
      <Sheet>
        <div className="flex-1 sm:hidden flex items-center justify-end gap-s">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SheetTrigger>
            <IconMenu stroke={1.5} />
          </SheetTrigger>
        </div>
        <SheetContent
          side="top"
          className="border-none bg-background shadow-foreground/10 shadow-xl py-l px-m flex sm:hidden flex-col items-start justify-start gap-m"
        >
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
          {Object.keys(NavItems).map((key) => {
            const path = NavItems[key as keyof typeof NavItems];
            const isActive =
              pathname === path || (pathname === "/" && key === "home");

            return (
              <Link
                key={key}
                href={path}
                className={`capitalize duration-200 text-h4 ${
                  isActive
                    ? "active-page hover:text-red hover:bg-transparent"
                    : ""
                }`}
              >
                {key}
              </Link>
            );
          })}
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
