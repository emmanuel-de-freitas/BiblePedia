import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "@/services/firestore";

const COLLECTIONS = {
   BOOKS: "books",
};

const useBooks = () => {
   const documents = collection(firestore, COLLECTIONS.BOOKS);
   const top_picks_query = query(documents, where("published", "==", true), where("top-picked", "==", true));

   const topPicksPromise = getDocs(top_picks_query);

   return {
      books: [],
      error: null,
      loading: false,
      topPicks: topPicksPromise,
   };
};

export default useBooks;
