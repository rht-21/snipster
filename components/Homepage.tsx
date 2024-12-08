"use client";

import React, { useState } from "react";
import RecentSnippets from "./sections/recent-snippets";
import HomeCardsLayout from "./sections/home-card-layout";
import AddSnippet from "./ui/add-snippet";
import { Dialog } from "./ui/dialog";
import AddSnippetDialog from "./sections/add-snippet-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

const Homepage = ({
  isChange,
  setIsChange,
}: {
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsChange(!isChange);
  };

  return (
    <main className="flex flex-col gap-s w-full">
      <HomeCardsLayout />
      <RecentSnippets isChange={isChange} setIsChange={setIsChange} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <AddSnippet />
        </DialogTrigger>
        <AddSnippetDialog closeDialog={handleDialogClose} />
      </Dialog>
    </main>
  );
};

export default Homepage;
