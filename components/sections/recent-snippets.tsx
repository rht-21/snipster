import React, { useEffect, useState } from "react";
import SnippetCard, { SnippetProps } from "../ui/snippet-card";
import Loader from "../Loader";
import { useUser } from "@clerk/nextjs";

const RecentSnippets = ({ isChange }: { isChange: boolean }) => {
  const { user } = useUser();
  const [snippets, setSnippets] = useState<SnippetProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);

      try {
        console.log("Frontend - ", user?.id);

        const queryParams = new URLSearchParams({
          _id: user?.id || "",
        }).toString();

        const response = await fetch(`/api/snippets?${queryParams}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch snippets");
        }
        const data = await response.json();

        console.log(data);
        setSnippets(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, [isChange, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-xs">
      <h3 className="text-h3">Recent Snippets</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xs">
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
            <SnippetCard key={snippet._id} Snippet={snippet} />
          ))
        ) : (
          <p className="text-foreground/70">
            No snippets found. Create one now.
          </p>
        )}
      </div>
    </section>
  );
};

export default RecentSnippets;
