import React, { useEffect, useState, useMemo } from "react";
import SnippetCard from "../ui/snippet-card";
import Loader from "../Loader";
import { SnippetProps } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

const YourSnippets = ({
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
  const [error, setError] = useState<string | null>(null); // Track error state
  const { user } = useUser();

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!user?.id) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); // Reset error state before fetching

      const queryParams = new URLSearchParams({
        _id: user.id,
      }).toString();

      try {
        const response = await fetch(`/api/snippets?${queryParams}`, {
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
        setError("Failed to load snippets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, [user]);

  // Memoized function for filtering, sorting, and searching snippets
  const filteredAndSortedSnippets = useMemo(() => {
    let result = snippets;

    // Filter by category
    if (filters.category) {
      result = result.filter(
        (snippet) => snippet.category === filters.category
      );
    }

    // Sort snippets based on the selected option
    result = result.sort((a, b) => {
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

    // Search snippets by searchTerm
    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      result = result.filter((snippet) => {
        const nameMatch = snippet.snippetName
          .toLowerCase()
          .includes(normalizedSearchTerm);
        const keywordsMatch = snippet.keywords?.some((keyword: string) =>
          keyword.toLowerCase().includes(normalizedSearchTerm)
        );
        return nameMatch || keywordsMatch;
      });
    }

    return result;
  }, [snippets, filters, sortBy, searchTerm]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-xs">
      {/* Error Message */}
      {error && <p className="text-error text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-xs">
        {filteredAndSortedSnippets.length > 0 ? (
          filteredAndSortedSnippets.map((snippet) => (
            <SnippetCard key={snippet._id} Snippet={snippet} />
          ))
        ) : (
          <p className="text-foreground/70">No snippets found.</p>
        )}
      </div>
    </section>
  );
};

export default YourSnippets;
