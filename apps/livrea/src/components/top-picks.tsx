"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { DocumentData, QuerySnapshot } from "firebase/firestore";
import { use } from "react";
import { Heading, Text } from "@/components/typography";

interface TopPicksProps {
   topPicksPromise: Promise<QuerySnapshot<DocumentData>>;
}

const TopPicks = ({ topPicksPromise }: TopPicksProps) => {
   const snapshot = use(topPicksPromise);
   const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   }));

   return (
      <div className={style({ marginTop: 24 })}>
         <Heading level={3}>Top Picks</Heading>
         <Text>Get started with one of the books below.</Text>
         {books.length === 0 && <Text textStyle={{ marginTop: 8, opacity: 0.6 }}>No top picks available yet.</Text>}
      </div>
   );
};

export default TopPicks;
