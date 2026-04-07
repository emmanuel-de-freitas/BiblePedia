// "use client";

// import { useEffect, useState, useMemo } from "react";
// import type { DocumentData } from "firebase/firestore";

// const COLLECTIONS = {
//   BOOKS: "books",
// };

// interface Book {
//   id: string;
//   [key: string]: unknown;
// }

// interface UseBooksReturn {
//   books: Book[];
//   topPicks: Book[];
//   error: Error | null;
//   loading: boolean;
// }

// const useBooks = (): UseBooksReturn => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [topPicks, setTopPicks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     // Only run on client side
//     if (typeof window === "undefined") {
//       setLoading(false);
//       return;
//     }

//     let isMounted = true;

//     const fetchData = async () => {
//       try {
//         // const { getFirestore } = await import("@/services/firestore");
//         // const firestore = await getFirestore();

//         // if (!firestore) {
//         //   if (isMounted) {
//         //     setLoading(false);
//         //   }
//         //   return;
//         // }

//         const { collection, getDocs, query, where } = await import(
//           "firebase/firestore"
//         );

//         // const documents = collection(firestore, COLLECTIONS.BOOKS);

//         // // Fetch all books
//         // const booksSnapshot = await getDocs(documents);
//         // const booksData = booksSnapshot.docs.map((doc) => ({
//         //   id: doc.id,
//         //   ...doc.data(),
//         // }));

//         // Fetch top picks
//         const topPicksQuery = query(
//           documents,
//           where("published", "==", true),
//           where("top-picked", "==", true)
//         );
//         const topPicksSnapshot = await getDocs(topPicksQuery);
//         const topPicksData = topPicksSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         if (isMounted) {
//           setBooks(booksData);
//           setTopPicks(topPicksData);
//         }
//       } catch (err) {
//         console.error("Failed to fetch books:", err);
//         if (isMounted) {
//           setError(
//             err instanceof Error ? err : new Error("Failed to fetch books")
//           );
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return {
//     books,
//     topPicks,
//     error,
//     loading,
//   };
// };

// export default useBooks;
