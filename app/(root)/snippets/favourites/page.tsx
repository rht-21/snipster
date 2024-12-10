"use client";

import DesktopFilter from "@/components/sections/desktop-filter";
import LikedSnippets from "@/components/sections/liked-snippets";
import MobileFilter from "@/components/sections/mobile-filter";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SearchBar from "@/components/ui/search-bar";
import { IconFilter } from "@tabler/icons-react";
import React, { useState } from "react";

type FilterState = {
  category: string;
};

const Favourites = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({
    category: "",
  });
  const [sortBy, setSortBy] = useState<string>("name");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <main className="h-full w-full flex gap-xs pt-xs">
      <section className="flex flex-1">
        <div className="w-full">
          <SearchBar onSearch={handleSearch} />
          <Dialog>
            <div className="flex items-center justify-between my-xs">
              <h3 className="text-h3">Liked Snippets</h3>
              <DialogTrigger className="lg:hidden">
                <IconFilter stroke={1.5} size={20} />
              </DialogTrigger>
            </div>
            <MobileFilter
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </Dialog>
          <LikedSnippets
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

export default Favourites;
