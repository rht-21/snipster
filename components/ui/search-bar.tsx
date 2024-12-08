import { IconSearch } from "@tabler/icons-react";
import React from "react";

const SearchBar = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex w-full h-12 rounded-full items-center justify-center overflow-hidden bg-white/30 backdrop-blur-lg shadow-lg backdrop-filter ${className}`}
    >
      <IconSearch
        stroke={1.5}
        className="text-gray-500 ml-xxs lg:flex hidden"
      />
      <input
        type="text"
        name="search"
        id="home-search"
        className="flex-1 h-full bg-transparent focus:outline-none ml-xs lg:ml-xxs"
        placeholder="Search for snippets..."
      />
      <button className="bg-red text-foreground hover:bg-red/70 duration-200 h-full px-xs flex gap-xxs items-center justify-center">
        <IconSearch stroke={1.5} className="lg:hidden flex" />
        <span className="sm:flex hidden">Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
