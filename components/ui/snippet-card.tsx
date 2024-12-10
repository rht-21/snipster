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
import { useUser } from "@clerk/nextjs";

const SnippetCard = ({
  Snippet,
  isExplore,
}: {
  Snippet: SnippetProps;
  isExplore?: boolean;
}) => {
  const [copyText, setCopyText] = useState("Copy");
  const [isLiked, setIsLiked] = useState(false); // Track like state
  const router = useRouter();
  const { user } = useUser();

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

  useEffect(() => {
    const userLikes = Array.isArray(Snippet.likes) ? Snippet.likes : [];

    const userId = user?.id;
    if (userId && userLikes.includes(userId)) {
      setIsLiked(true);
    }
  }, [Snippet.likes, user]);

  const copyToClipboard = (snippet: string) => {
    if (copy(snippet)) {
      setCopyText("Copied");
    }

    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  const handleLike = async () => {
    const userId = user?.id;

    const currentLikes = Array.isArray(Snippet.likes) ? Snippet.likes : [];

    const newLikes = isLiked
      ? currentLikes.filter((id) => id !== userId)
      : [...currentLikes, userId];

    try {
      const response = await fetch(`/api/snippet/like`, {
        method: "PUT",
        body: JSON.stringify({ _id: Snippet._id, likes: newLikes }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLiked(!isLiked); // Toggle like state
      } else {
        console.error("Failed to like snippet");
      }
    } catch (error) {
      console.error("Error liking snippet", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex max-w-[540px] w-full bg-gray-900 rounded-2xl flex-col gap-xxs p-xs sm:p-xxs text-base">
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
        </div>
        <div className="flex items-center justify-end gap-xs sm:gap-xxs">
          <span
            onClick={handleLike}
            className={`flex items-center justify-end gap-1 text-xs ${
              isLiked ? "text-red" : "text-foreground/60"
            } duration-200 sm:hover:text-foreground/80 active:text-foreground/80 cursor-pointer`}
          >
            <IconHeart size={17} fill={isLiked ? "#FF7474" : ""} />
          </span>
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
