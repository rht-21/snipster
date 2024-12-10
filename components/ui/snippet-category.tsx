import { Category } from "@/lib/utils";
import React from "react";

const SnippetCategory = ({ category }: { category: string }) => {
  return (
    <span className={`text-sm py-1 px-2 rounded-full ${Category[category]}`}>
      {category}
    </span>
  );
};

export default SnippetCategory;
