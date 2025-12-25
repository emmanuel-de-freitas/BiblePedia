import { atom } from "jotai";
import myStore from "./store";

const sidebarOpenAtom = atom(false);
myStore.set(sidebarOpenAtom, false);

export { sidebarOpenAtom };
