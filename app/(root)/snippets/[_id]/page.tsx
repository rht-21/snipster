"use client";

import Loader from "@/components/Loader";
import EditSnippetDialog from "@/components/sections/edit-snippet-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SnippetCategory from "@/components/ui/snippet-category";
import { SnippetProps } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { IconCopy, IconEdit, IconLock, IconWorld } from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nnfxDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const SnippetPage = () => {
  const id = usePathname().split("/").pop();
  const { user } = useUser();
  const [snippet, setSnippet] = useState<SnippetProps>();
  const [loading, setLoading] = useState(true);
  const [isChange, setIsChange] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copyText, setCopyText] = useState("Copy");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error message

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        if (id) {
          const queryParams = new URLSearchParams({
            _id: id,
            userId: user?.id || "",
          }).toString();

          const response = await fetch(`/api/snippet?${queryParams}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch snippet. Please try again later.");
          }

          const data = await response.json();
          setSnippet(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          setErrorMessage(error.message || "An unexpected error occurred.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    };

    fetchSnippets();
  }, [isChange, id, user]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsChange(!isChange);
  };

  const copyToClipboard = (snippet: string) => {
    if (copy(snippet)) {
      setCopyText("Copied");
    }

    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {errorMessage ? (
        <section className="min-h-[calc(100dvh-9rem)] text-center w-full flex-col gap-xs flex items-center justify-center text-h3 text-error">
          {errorMessage}
        </section>
      ) : snippet ? (
        <section className="min-h-[calc(100dvh-9rem)] w-full flex flex-col gap-xxs py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Image
                src={snippet.userImage}
                alt="User Image"
                width={24}
                height={24}
                className="rounded-full"
              />
              <p className="ml-xxs">{snippet.userName}</p>
            </div>
            <small className="text-foreground/70">
              {new Date(snippet.createdAt).toLocaleString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </small>
          </div>
          <h2 className="text-h2 tracking-wide">{snippet.snippetName}</h2>
          <div className="flex justify-between items-center">
            <div className="flex gap-xxs items-center justify-center">
              {snippet.isPublic ? (
                <IconWorld className="text-foreground/60" />
              ) : (
                <IconLock className="text-foreground/60" />
              )}
              <SnippetCategory category={snippet.category} />
            </div>
            <div className="flex items-center justify-end gap-xs md:gap-xxs">
              {user?.id === snippet.createdBy && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger>
                    <span className="flex items-center justify-end gap-1 text-xs text-white duration-200 sm:hover:text-white/60 active:text-white/60 cursor-pointer">
                      Edit <IconEdit stroke={1.5} />
                    </span>
                  </DialogTrigger>
                  <EditSnippetDialog
                    closeDialog={handleDialogClose}
                    Snippet={snippet}
                  />
                </Dialog>
              )}
              <span
                onClick={() => copyToClipboard(snippet.codeSnippet)}
                className="flex items-center justify-end gap-1 text-xs text-green duration-200 sm:hover:text-green/60 active:text-green/60 cursor-pointer"
              >
                {copyText}
                <IconCopy stroke={1.5} size={16} />
              </span>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg mt-4">
            <SyntaxHighlighter
              language={snippet.category.toLowerCase()}
              style={nnfxDark}
            >
              {snippet.codeSnippet}
            </SyntaxHighlighter>
          </div>
        </section>
      ) : (
        <section className="min-h-[calc(100dvh-9rem)] text-center w-full flex-col gap-xs flex items-center justify-center text-h3 text-foreground/70">
          {`Oops, the snippet does not exist, might be private, or you don't have access. ${id} as ${user?.id}`}
        </section>
      )}
    </>
  );
};

export default SnippetPage;
