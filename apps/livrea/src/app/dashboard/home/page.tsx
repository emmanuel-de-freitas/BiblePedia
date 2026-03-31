"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Suspense } from "react";
import { Dropzone, TopPicks } from "@/components";
import { Heading, Text } from "@/components/typography";
import useBooks from "@/hooks/useBooks";

const dropzoneContainerStyle = style({
   alignItems: "center",
   background: "background",
   borderColor: "gray-300",
   borderRadius: "lg",
   borderStyle: "dashed",
   borderWidth: 2,
   display: "flex",
   flexDirection: "row",
   justifyContent: "space-evenly",
});

export default function HomePage() {
   const { topPicks } = useBooks();

   return (
      <div>
         <div className={dropzoneContainerStyle}>
            <Dropzone>
               <div>
                  <Heading level={4}>Getting Started</Heading>
                  <Text textStyle={{ opacity: 0.7, userSelect: "none" }}>
                     Get started with one of the books below <br /> or import your epub file using the import button.
                  </Text>
               </div>
            </Dropzone>
         </div>

         <Suspense fallback={<div>Loading...</div>}>
            <TopPicks topPicksPromise={topPicks} />
         </Suspense>
      </div>
   );
}
