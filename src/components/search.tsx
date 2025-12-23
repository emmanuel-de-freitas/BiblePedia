'use client';

import { SearchField, Form } from '@react-spectrum/s2';
import { booksAtom } from '@/atoms/books';
import { searchQueryAtom } from '@/atoms/search';
import { useAtom } from 'jotai';
import { searchBooks } from '@/services/books';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

const Search = () => {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [results, setResults] = useAtom(booksAtom);

  const handleSearch = async (value: string) => {
    const results = await searchBooks(value);
    setResults(results);
  };

  const searchFieldStyle = style({
    width: '100%',
  });

  return (
    <Form id='search' styles={style({ width: 320 })}>
      <SearchField
        size="L"
        styles={searchFieldStyle}
        enterKeyHint="search"
        form='search'
        inputMode='search'
        onSubmit={handleSearch}
        placeholder="Search books, authors, or titles..."
        name="search"
        type="search"
      />
    </Form>
  );
};

export default Search;
