// Style utilities for common patterns
export const styleUtils = {
   // Reset button styles
   buttonReset: {
      background: "none",
      border: "none",
      cursor: "pointer",
      font: "inherit",
      outline: "inherit",
      padding: 0,
   },
   // Center content
   center: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
   },

   // Flex column
   flexCol: {
      display: "flex",
      flexDirection: "column" as const,
   },

   // Flex row
   flexRow: {
      display: "flex",
      flexDirection: "row" as const,
   },

   // Full width and height
   fullSize: {
      height: "100%",
      width: "100%",
   },

   // Truncate text
   truncate: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap" as const,
   },

   // Hidden but accessible
   visuallyHidden: {
      border: 0,
      clip: "rect(0, 0, 0, 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute" as const,
      whiteSpace: "nowrap" as const,
      width: 1,
   },
} as const;

// Common animation durations (in ms)
export const animations = {
   fast: 150,
   normal: 250,
   slow: 350,
   verySlow: 500,
} as const;

// Common z-index values
export const zIndex = {
   base: 0,
   dropdown: 1000,
   hide: -1,
   modal: 1300,
   overlay: 1200,
   popover: 1400,
   sticky: 1100,
   tooltip: 1500,
} as const;
