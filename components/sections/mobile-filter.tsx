import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/lib/utils";
import { DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface MobileFilterProps {
  filters: { category: string }; // The filters prop is expected to have a category field
  setFilters: React.Dispatch<React.SetStateAction<{ category: string }>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const MobileFilter = ({
  filters,
  setFilters,
  sortBy,
  setSortBy,
}: MobileFilterProps) => {
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <DialogContent className="flex flex-col max-w-[85%] rounded-lg gap-4 bg-background lg:hidden">
      <DialogTitle className="text-2xl">Filters</DialogTitle>

      {/* Category Filter */}
      <div className="flex flex-col gap-xxs">
        <div className="flex items-end justify-between">
          <label className="block">Category:</label>
          {filters.category && (
            <small
              onClick={() => setFilters({ category: "" })}
              className="text-foreground/70 cursor-pointer hover:text-foreground duration-200"
            >
              clear
            </small>
          )}
        </div>
        <Select
          onValueChange={(value) => handleFilterChange("category", value)} // Pass value directly
          value={filters.category}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-background border rounded-sm border-foreground/30">
            {Object.keys(Category).map((category) => (
              <SelectItem
                className="capitalize text-white"
                key={category}
                value={category}
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Options */}
      <div className="flex flex-col gap-xxs">
        <label className="block">Sort By:</label>
        <Select onValueChange={(value) => setSortBy(value)} value={sortBy}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-background border rounded-sm border-foreground/30 text-white">
            <SelectItem className="capitalize" value="name">
              Name
            </SelectItem>
            <SelectItem className="capitalize" value="earliest">
              Earliest
            </SelectItem>
            <SelectItem className="capitalize" value="oldest">
              Oldest
            </SelectItem>
            <SelectItem className="capitalize" value="category">
              Category
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </DialogContent>
  );
};

export default MobileFilter;
