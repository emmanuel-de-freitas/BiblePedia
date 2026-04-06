import type { LIIconName } from "@biblepedia/ui";

export const links: { icon: LIIconName, label: string, route: string }[] = [
  { icon: "Home2", label: "Home", route: "/dashboard/home" },
  { icon: "Book1", label: "Library", route: "/dashboard/library" },
  { icon: "Stickynote", label: "My Notes", route: "/dashboard/citations" },
  { icon: "People", label: "Community", route: "/dashboard/community" }
];
