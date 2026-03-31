"use client";

import { Form, SearchField } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useAtom } from "jotai";
import { booksAtom } from "@/atoms/books";
import { searchQueryAtom } from "@/atoms/search";
import { searchBooks } from "@/services/books";

const Search = () => {
   const [query, setQuery] = useAtom(searchQueryAtom);
   const [results, setResults] = useAtom(booksAtom);

   const handleSearch = async (value: string) => {
      const results = await searchBooks(value);
      setResults(results);
   };

   const searchFieldStyle = style({
      width: "100%",
   });

   return (
      <Form id="search" styles={style({ marginX: "auto", width: 320 })}>
         <SearchField
            size="L"
            styles={searchFieldStyle}
            enterKeyHint="search"
            form="search"
            inputMode="search"
            onSubmit={handleSearch}
            placeholder="Search books, authors, or titles..."
            name="search"
            type="search"
         />
      </Form>
   );
};

export default Search;
