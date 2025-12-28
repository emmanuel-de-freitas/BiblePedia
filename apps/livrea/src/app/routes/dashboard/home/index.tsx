import {Heading, Text} from "@philagora/ui";
import {style} from "@react-spectrum/s2/style" with {type: "macro"};
import React from "react";
import {Await} from "react-router";
import {Dropzone, TopPicks} from "@/components";
import useBooks from "@/hooks/useBooks";

export default function Index() {
   const { topPicks } = useBooks();

   return (
      <div>
         <div
            className={style({
               alignItems: "center",
               backgroundColor: "Background",
               borderColor: "Field",
               borderRadius: "lg",
               borderStyle: "dashed",
               borderWidth: 2,
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-evenly",
            })}>
            <Dropzone>
               <div>
                  <Heading level={4}>Getting Started</Heading>
                  <Text textStyle={{ opacity: 0.7, userSelect: "none" }}>
                     Get started with one of the books below <br /> or import your epub file using the import button.
                  </Text>
               </div>
            </Dropzone>
         </div>

         <React.Suspense fallback={<div>Loading...</div>}>
            <Await resolve={topPicks}>
               <TopPicks />
            </Await>
         </React.Suspense>
      </div>
   );
}
