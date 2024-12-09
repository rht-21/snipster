import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getAllSnippets");
        if (!response.ok) {
          throw new Error("Failed to fetch snippets");
        }
        const data = await response.json();
        setSnippets(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

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
        case "likes":
          return b.likes - a.likes;
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-xs">
        {filteredAndSortedSnippets.length > 0 ? (
          filteredAndSortedSnippets.map((snippet) => (
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
