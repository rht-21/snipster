import React from "react";
import SnippetCard from "../ui/snippet-card";

const RecentSnippets = () => {
  return (
    <section className="flex flex-col gap-xs">
      <h3 className="text-h3">Recent Snippets</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-xs">
        <SnippetCard />
        <SnippetCard />
        <SnippetCard />
      </div>
    </section>
  );
};

export default RecentSnippets;
