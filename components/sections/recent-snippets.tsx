import React, { useEffect, useState, useTransition } from "react";
import SnippetCard from "../ui/snippet-card";
import Loader from "../Loader";
import { useUser } from "@clerk/nextjs";
import { SnippetProps } from "@/lib/utils";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";

const RecentSnippets = ({ isChange }: { isChange: boolean }) => {
  const { user } = useUser();
  const [snippets, setSnippets] = useState<SnippetProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null); // Track error state

  const handleLinkClick = () => {
    startTransition(() => {
      setLoading(true);
    });
  };

  useEffect(() => {
    if (!isPending) {
      setLoading(false);
    }
  }, [isPending]);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
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
        setSnippets(data.slice(0, 3));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Failed to load recent snippets. Please try again later."); // Set error message
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
      <div className="flex items-center justify-between">
        <h3 className="text-h3">Recent Snippets</h3>
        <Link
          href="/snippets"
          onClick={handleLinkClick}
          className="text-sm text-foreground/70 flex items-center justify-end gap-1 hover:text-foreground duration-200 hover:underline"
        >
          View All
          <IconChevronRight size={16} stroke={1.5} />
        </Link>
      </div>

      {/* Error Message */}
      {error && <p className="text-error text-sm mt-2"></p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-xs">
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
