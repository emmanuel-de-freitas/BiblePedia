"use client";

import { Dropzone, TopPicks } from "@/components";
import { Heading, Text } from "@/components/typography";
import useBooks from "@/hooks/useBooks";

export default function HomePage() {
  const { topPicks, loading } = useBooks();


  const renderDropzone = () => (
    <div className="flex flex-row items-center justify-evenly rounded-lg">
      <Dropzone>
        <div>
          <Heading level={4}>Getting Started</Heading>
          <Text textStyle={{ opacity: 0.7, userSelect: "none" }}>
            Get started with one of the books below <br /> or import your epub
            file using the import button.
          </Text>
        </div>
      </Dropzone>
    </div>
  );

  return (
    <div>
      <TopPicks books={topPicks} loading={loading} />
    </div>
  );
}
