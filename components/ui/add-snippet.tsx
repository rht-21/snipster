import { IconPlus } from "@tabler/icons-react";
import React from "react";

const AddSnippet = () => {
  return (
    <button className="flex items-center justify-between px-xs py-xxs gap-xxs rounded-full fixed sm:bottom-m sm:right-m right-s bottom-s bg-foreground text-background duration-200 hover:bg-foreground/70 active:bg-foreground/70">
      <IconPlus />
      Add Snippet
    </button>
  );
};

export default AddSnippet;
