import React, { useEffect, useState } from "react";
import SnippetCard from "../ui/snippet-card";
import Loader from "../Loader";
import { SnippetProps } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

const LikedSnippets = ({
  searchTerm,
  filters,
  sortBy,
}: {
  searchTerm: string;
  filters: {
    category: string;
  };
  sortBy: string;
}) => {
  const [snippets, setSnippets] = useState<SnippetProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error tracking
  const { user } = useUser();

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      setError(null); // Reset the error state before fetching
      const queryParams = new URLSearchParams({
        _id: user?.id || "",
      }).toString();
      try {
        const response = await fetch(`/api/getLikedSnippets?${queryParams}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch snippets");
        }
        const data = await response.json();
        setSnippets(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError(
          "Something went wrong while fetching liked snippets. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSnippets();
    }
  }, [user]);

  const filterSnippets = (snippets: SnippetProps[]) => {
    return snippets.filter((snippet) => {
      const categoryMatch =
        filters.category === "" || snippet.category === filters.category;
      return categoryMatch;
    });
  };

  const sortSnippets = (snippets: SnippetProps[]) => {
    return snippets.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.snippetName.localeCompare(b.snippetName);
        case "earliest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  };

  const searchSnippet = (snippets: SnippetProps[]) => {
    if (!searchTerm) return snippets;
    const normalizedSearchTerm = searchTerm.toLowerCase();

    return snippets.filter((snippet) => {
      const nameMatch = snippet.snippetName
        .toLowerCase()
        .includes(normalizedSearchTerm);
      const keywordsMatch = snippet.keywords?.some((keyword: string) =>
        keyword.toLowerCase().includes(normalizedSearchTerm)
      );

      return nameMatch || keywordsMatch;
    });
  };

  const filteredAndSortedSnippets = searchSnippet(
    sortSnippets(filterSnippets(snippets))
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-xs">
      {error ? (
        <p className="text-red-500">{error}</p> // Display the error message if it exists
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-xs">
          {filteredAndSortedSnippets.length > 0 ? (
            filteredAndSortedSnippets.map((snippet) => (
              <SnippetCard key={snippet._id} Snippet={snippet} />
            ))
          ) : (
            <p className="text-foreground/70">
              No liked snippets? Explore them now!
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default LikedSnippets;
