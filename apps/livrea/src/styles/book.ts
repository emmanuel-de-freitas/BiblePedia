import { style } from "@react-spectrum/s2/style" with { type: "macro" };

const bookTitleStyle = style({
   font: "heading",
   fontWeight: "bold",
});

const bookAuthorStyle = style({
   color: "gray-700",
   font: "body",
});

const bookMetaStyle = style({
   color: "gray-600",
   font: "body-sm",
});

export { bookTitleStyle, bookAuthorStyle, bookMetaStyle };
