"use client";

import Loader from "@/components/Loader";
import DesktopFilter from "@/components/sections/desktop-filter";
import MobileFilter from "@/components/sections/mobile-filter";
import YourSnippets from "@/components/sections/your-snippets";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SearchBar from "@/components/ui/search-bar";
import { IconFilter, IconHeart } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";

type FilterState = {
  category: string;
};

const Snippets = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({
    category: "",
  });
  const [sortBy, setSortBy] = useState<string>("name");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="h-full w-full flex gap-xs pt-xs">
      <section className="flex flex-1">
        <div className="w-full">
          <SearchBar onSearch={handleSearch} />
          <Dialog>
            <div className="flex items-center justify-between my-xs">
              <h3 className="text-h3">Your Snippets</h3>
              <div className="flex items-center justify-end gap-xs">
                <Link
                  href="/snippets/favourites"
                  onClick={handleLinkClick}
                  className="text-sm text-red/70 flex items-center justify-end gap-1 hover:text-red duration-200 hover:underline"
                >
                  <span className="hidden lg:flex">View Liked Snippets</span>
                  <IconHeart size={20} stroke={1.5} />
                </Link>
                <DialogTrigger className="lg:hidden">
                  <IconFilter stroke={1.5} size={20} />
                </DialogTrigger>
              </div>
            </div>
            <MobileFilter
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </Dialog>
          <YourSnippets
            searchTerm={searchTerm}
            filters={filters}
            sortBy={sortBy}
          />
        </div>
      </section>
      <section className="hidden lg:flex flex-1 md:max-w-[320px] px-xxs w-full">
        <DesktopFilter
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </section>
    </main>
  );
};

export default Snippets;
