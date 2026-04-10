import { SearchField } from "@react-spectrum/s2";
import { useAtom } from "jotai";
import { booksAtom } from "@/atoms/books";
import { searchQueryAtom } from "@/atoms/search";

//import { searchBooks } from "../../../backend/services/books";

const Search = () => {
	const [query, setQuery] = useAtom(searchQueryAtom);
	const [, setResults] = useAtom(booksAtom);

	const handleSearch = async (value: string) => {
		// const results = await searchBooks(value);
		// setResults(results);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSearch(query);
	};

	return <SearchField placeholder="Apologists, Bibles, Commentary..." size="L" />;
};

export default Search;
