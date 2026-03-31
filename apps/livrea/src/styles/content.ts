import { style } from "@react-spectrum/s2/style" with { type: "macro" };

const containerStyle = style({
   backgroundColor: "base",
   borderRadius: "xl",
   display: "flex",
   flexDirection: "column",
   height: "full",
   width: "full",
});

const contentStyle = style({
   flex: 1,
   overflowY: "auto",
   paddingX: 24,
   paddingY: 24,
});

const windowStyle = style({
   alignItems: "stretch",
   display: "grid",
   gridTemplateAreas: ["sidebar content"],
   gridTemplateColumns: "auto 1fr",
   gridTemplateRows: "auto",
   marginHorizontal: 32,
});

export { windowStyle, containerStyle, contentStyle };
