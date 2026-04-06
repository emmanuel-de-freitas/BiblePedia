"use client";

import { Heading, Text } from "@/components/typography";

interface Book {
  id: string;
  [key: string]: unknown;
}

interface TopPicksProps {
  books: Book[];
  loading?: boolean;
}

const TopPicks = ({ books, loading = false }: TopPicksProps) => {
  if (loading) {
    return (
      <div>
        <Heading level={3}>Top Picks</Heading>
        <Text textStyle={{ marginTop: 8, opacity: 0.6 }}>
          Loading top picks...
        </Text>
      </div>
    );
  }

  return (
    <div>
      <Heading level={3}>Top Picks</Heading>
      <Text>Get started with one of the books below.</Text>
      {books.length === 0 && (
        <Text textStyle={{ marginTop: 8, opacity: 0.6 }}>
          No top picks available yet.
        </Text>
      )}
      {books.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {books.map((book) => (
            <div
              key={book.id}
              className="rounded-lg border border-default-200 bg-default-50 p-3 transition-colors hover:bg-default-100"
            >
              <Text className="line-clamp-2 font-medium">
                {(book.title as string) || "Untitled"}
              </Text>
              {typeof book.author === "string" && book.author && (
                <Text
                  variant="caption"
                  className="mt-1 text-default-500"
                >
                  {book.author}
                </Text>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopPicks;
