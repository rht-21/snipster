import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NavItems = {
  home: "/dashboard",
  explore: "/explore",
  snippets: "/snippets",
};

export const Category: Record<string, string> = {
  JavaScript: "bg-[#EFD91B] text-black",
  TypeScript: "bg-[#2F73BF] text-white",
  Python: "bg-[#F7D451] text-[#346A9A]",
  Java: "bg-[#1F7DAE] text-white",
  C: "bg-[#014483] text-white",
  HTML: "bg-[#E44B21] text-white",
  CSS: "bg-[#214DE5] text-white",
  SQL: "bg-[#D97026] text-white",
  GO: "bg-[#037C9C] text-white",
  PHP: "bg-[#4F5B92] text-white",
};

export interface SnippetProps {
  _id: string;
  snippetName: string;
  category: string;
  codeSnippet: string;
  keywords: string[];
  isPublic: boolean;
  createdBy: string;
  likes: string[];
  createdAt: Date;
  userImage: string;
  userName: string;
}
export interface SnippetCardProps {
  Snippet: SnippetProps;
}
