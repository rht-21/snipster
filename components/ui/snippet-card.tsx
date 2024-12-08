"use client";

import {
  IconArrowRight,
  IconCopy,
  IconEdit,
  IconLock,
  IconWorld,
} from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import React, { useState } from "react";

const SnippetCard = () => {
  const [copyText, setCopyText] = useState("Copy");

  const snippet = `import React from "react";
import RecentSnippets from "./sections/recent-snippets";
import HomeCardsLayout from "./sections/home-card-layout";
import AddSnippet from "./ui/add-snippet";
import { Toaster } from "./ui/toaster";

const Homepage = () => {
  return (
    <main className="flex flex-col gap-s w-full">
      <Toaster />
      <AddSnippet />
      <HomeCardsLayout />
      <RecentSnippets />
    </main>
  );
};

export default Homepage;
`;

  const copyToClipboard = (snippet: string) => {
    if (copy(snippet)) {
      setCopyText("Copied");
    }

    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  return (
    <div className="flex max-w-[540px] w-full bg-neutral-800 rounded-2xl flex-col gap-xxs p-xs sm:p-xxs text-base">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground/60">
          12th Feb, 2023 at 11:32 PM
        </span>
        <span className="text-sm bg-blue py-1 px-xxs rounded-full">React</span>
      </div>
      <p className="truncate">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>
      <div
        className="h-24 w-full bg-white/15 overflow-auto rounded-lg"
        id="code-snippet"
      >
        <pre className="text-xs p-2 overflow-auto whitespace-pre-wrap break-words">
          <code>{snippet}</code>
        </pre>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <IconLock size={16} className="text-foreground/60" />
          <IconWorld size={16} className="text-foreground/60" />
        </div>
        <div className="flex items-center justify-end gap-xs sm:gap-xxs">
          <span
            onClick={() => copyToClipboard(snippet)}
            className="flex items-center justify-end gap-1 text-xs text-green duration-200 sm:hover:text-green/60 active:text-green/60 cursor-pointer"
          >
            {copyText}
            <IconCopy stroke={1.5} size={16} />
          </span>
          <span className="flex items-center justify-end gap-1 text-xs text-red duration-200 sm:hover:text-red/60 active:text-red/60 cursor-pointer">
            Edit <IconEdit stroke={1.5} size={16} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
