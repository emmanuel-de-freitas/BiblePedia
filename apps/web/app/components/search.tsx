"use client";

import { Input } from "@heroui/react";
import { useAtom } from "jotai";
import { SearchNormal1 } from "iconsax-reactjs";
import { booksAtom } from "@/atoms/books";
import { searchQueryAtom } from "@/atoms/search";
import { searchBooks } from "../../../backend/services/books";

const Search = () => {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [, setResults] = useAtom(booksAtom);

  const handleSearch = async (value: string) => {
    const results = await searchBooks(value);
    setResults(results);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <form id="search" onSubmit={handleSubmit} className="mx-auto w-80">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400">
          <SearchNormal1 size={20} variant="Outline" />
        </div>
        <Input
          className="w-full pl-10"
          placeholder="Search books, authors, or titles..."
          name="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(query);
            }
          }}
        />
      </div>
    </form>
  );
};

export default Search;
