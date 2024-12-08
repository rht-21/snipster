import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NavItems = {
  home: "/",
  explore: "/explore",
  snippets: "/snippets",
};
