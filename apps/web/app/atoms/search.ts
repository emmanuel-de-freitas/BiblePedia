
import { atom } from "jotai";
import myStore from "./store";

const searchQueryAtom = atom<string>("");
myStore.set(searchQueryAtom, "");
export { searchQueryAtom };
