'use client';

import { SearchField, Form } from '@react-spectrum/s2';
import { booksAtom } from 'atoms/books';
import { searchQueryAtom } from 'atoms/search';
import { useAtom } from 'jotai';
import { searchBooks } from 'services/books';

const Search = () => {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [results, setResults] = useAtom(booksAtom);

  const handleSearch = async (value: string) => {
    const results = await searchBooks(value);
    setResults(results);
  };

  return (
    <Form id='search'>
      <SearchField
        label="Search"
        size="M"
        enterKeyHint="search"
        form='search'
        onSubmit={handleSearch}
        placeholder="Search books, authors, or titles..."
        name="search"
        type="search"
      />
    </Form>
  );
};

export default Search;
