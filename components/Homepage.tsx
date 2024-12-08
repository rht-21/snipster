import React from "react";
import RecentSnippets from "./sections/recent-snippets";
import HomeCardsLayout from "./sections/home-card-layout";
import AddSnippet from "./ui/add-snippet";

const Homepage = () => {
  return (
    <main className="flex flex-col gap-s w-full">
      <AddSnippet />
      <HomeCardsLayout />
      <RecentSnippets />
    </main>
  );
};

export default Homepage;
