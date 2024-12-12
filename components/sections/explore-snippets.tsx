import React, { useEffect, useState, useMemo } from "react";
import SnippetCard from "../ui/snippet-card";
import Loader from "../Loader";
import { SnippetProps } from "@/lib/utils";

const ExploreSnippets = ({
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await fetch("/api/getAllSnippets");
        if (!response.ok) {
          throw new Error("Failed to fetch snippets");
        }
        const data = await response.json();
        setSnippets(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Failed to load snippets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  // Filter snippets by category
  const filterSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const categoryMatch =
        filters.category === "" || snippet.category === filters.category;
      return categoryMatch;
    });
  }, [snippets, filters.category]);

  // Sort snippets based on the selected sorting method
  const sortSnippets = useMemo(() => {
    return filterSnippets.sort((a, b) => {
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
  }, [filterSnippets, sortBy]);

  // Filter snippets by search term
  const searchSnippet = useMemo(() => {
    if (!searchTerm) return sortSnippets;
    const normalizedSearchTerm = searchTerm.toLowerCase();

    return sortSnippets.filter((snippet) => {
      const nameMatch = snippet.snippetName
        .toLowerCase()
        .includes(normalizedSearchTerm);
      const keywordsMatch = snippet.keywords?.some((keyword: string) =>
        keyword.toLowerCase().includes(normalizedSearchTerm)
      );
      return nameMatch || keywordsMatch;
    });
  }, [sortSnippets, searchTerm]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-xs">
      {/* Error Message */}
      {error && <p className="text-error text-sm mt-2">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-xs">
        {searchSnippet.length > 0 ? (
          searchSnippet.map((snippet) => (
            <SnippetCard key={snippet._id} Snippet={snippet} isExplore={true} />
          ))
        ) : (
          <p className="text-foreground/70">No snippets found.</p>
        )}
      </div>
    </section>
  );
};

export default ExploreSnippets;
