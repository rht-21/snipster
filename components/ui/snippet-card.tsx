"use client";

import { IconCopy, IconEdit, IconLock, IconWorld } from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import React, { useState } from "react";
import { Dialog } from "./dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import EditSnippetDialog from "../sections/edit-snippet-dialog";

export interface SnippetProps {
  _id: string;
  snippetName: string;
  category: string;
  codeSnippet: string;
  keywords: string[];
  isPublic: boolean;
  createdBy: string;
  likes: number;
  createdAt: Date;
}
export interface SnippetCardProps {
  Snippet: {
    _id: string;
    snippetName: string;
    category: string;
    codeSnippet: string;
    keywords: string[];
    isPublic: boolean;
    createdBy: string;
    likes: number;
    createdAt: Date;
  };
}

const SnippetCard = ({
  Snippet,
  isChange,
  setIsChange,
}: {
  Snippet: SnippetProps;
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [copyText, setCopyText] = useState("Copy");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const copyToClipboard = (snippet: string) => {
    if (copy(snippet)) {
      setCopyText("Copied");
    }

    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsChange(!isChange);
  };

  return (
    <div className="flex max-w-[540px] w-full bg-neutral-800 rounded-2xl flex-col gap-xxs p-xs sm:p-xxs text-base">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground/60">
          {new Date(Snippet.createdAt).toLocaleString()}
        </span>
        <span className="text-sm bg-blue py-1 px-xxs rounded-full">
          {Snippet.category}
        </span>
      </div>
      <p className="truncate">{Snippet.snippetName}</p>
      <div
        className="h-24 w-full bg-white/15 overflow-auto rounded-lg"
        id="code-snippet"
      >
        <pre className="text-xs p-2 overflow-auto whitespace-pre-wrap break-words">
          <code>{Snippet.codeSnippet}</code>
        </pre>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          {Snippet.isPublic ? (
            <IconWorld size={16} className="text-foreground/60" />
          ) : (
            <IconLock size={16} className="text-foreground/60" />
          )}
        </div>
        <div className="flex items-center justify-end gap-xs sm:gap-xxs">
          <span
            onClick={() => copyToClipboard(Snippet.codeSnippet)}
            className="flex items-center justify-end gap-1 text-xs text-green duration-200 sm:hover:text-green/60 active:text-green/60 cursor-pointer"
          >
            {copyText}
            <IconCopy stroke={1.5} size={16} />
          </span>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <span className="flex items-center justify-end gap-1 text-xs text-red duration-200 sm:hover:text-red/60 active:text-red/60 cursor-pointer">
                Edit <IconEdit stroke={1.5} size={16} />
              </span>
            </DialogTrigger>
            <EditSnippetDialog
              closeDialog={handleDialogClose}
              Snippet={Snippet}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
