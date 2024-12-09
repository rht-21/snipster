"use client";

import {
  IconChevronRight,
  IconCopy,
  IconHeart,
  IconLock,
  IconWorld,
} from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import SnippetCategory from "./snippet-category";
import Image from "next/image";
import { SnippetProps } from "@/lib/utils";
import { Loader } from "lucide-react";

const SnippetCard = ({
  Snippet,
  isExplore,
}: {
  Snippet: SnippetProps;
  isExplore?: boolean;
}) => {
  const [copyText, setCopyText] = useState("Copy");

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLinkClick = () => {
    startTransition(() => {
      setIsLoading(true);
    });
    router.push(`/snippets/${Snippet._id}`);
  };

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

  if (isLoading) {
    return <Loader />;
  }

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
        {isExplore ? (
          <div className="flex items-center justify-start">
            <Image
              src={Snippet.userImage}
              alt="User Image"
              width={24}
              height={24}
              className="rounded-full"
            />
            <small className="ml-2 text-foreground/70">
              {Snippet.userName}
            </small>
          </div>
        ) : (
          <span className="text-sm text-foreground/60">
            {new Date(Snippet.createdAt).toLocaleString()}
          </span>
        )}
        <SnippetCategory category={Snippet.category} />
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
        <div className="flex items-center justify-start">
          {Snippet.isPublic ? (
            <IconWorld size={16} className="text-foreground/60" />
          ) : (
            <IconLock size={16} className="text-foreground/60" />
          )}
          <IconHeart size={16} className="text-red ml-xxs" />
          <small className="text-foreground/70 ml-1">{Snippet.likes}</small>
        </div>
        <div className="flex items-center justify-end gap-xs sm:gap-xxs">
          <span
            onClick={() => copyToClipboard(Snippet.codeSnippet)}
            className="flex items-center justify-end gap-1 text-xs text-green duration-200 sm:hover:text-green/60 active:text-green/60 cursor-pointer"
          >
            {copyText}
            <IconCopy stroke={1.5} size={16} />
          </span>
          <span
            onClick={handleLinkClick}
            className="flex items-center justify-end text-xs text-white duration-200 sm:hover:text-white/60 active:text-white/60 cursor-pointer"
          >
            View
            <IconChevronRight stroke={1.5} size={16} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
