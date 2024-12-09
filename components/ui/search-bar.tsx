import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

const SearchBar = ({
  className,
  onSearch,
}: {
  className?: string;
  onSearch: (term: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <div
      className={`flex h-12 rounded-full items-center justify-between overflow-hidden bg-white/30 backdrop-blur-lg shadow-lg backdrop-filter ${className}`}
    >
      <IconSearch
        stroke={1.5}
        className="text-gray-500 sm:ml-xxs lg:flex hidden"
      />
      <input
        type="text"
        name="search"
        id="home-search"
        autoComplete="off"
        className="sm:flex-1 h-full text-sm sm:text-base bg-transparent focus:outline-none pl-xs lg:pl-xxs"
        placeholder="Search for snippets or keywords..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <IconX
          onClick={() => {
            setSearchTerm("");
            onSearch("");
          }}
          stroke={1.5}
          className="text-gray-400 hidden sm:flex sm:mr-xxs cursor-pointer"
        />
      )}
      <button
        className="bg-background/70 text-red hover:bg-background/80 duration-200 h-full px-xs flex gap-xxs items-center justify-center"
        onClick={handleSearchSubmit}
      >
        <IconSearch stroke={1.5} className="lg:hidden flex" />
        <span className="sm:flex hidden">Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
