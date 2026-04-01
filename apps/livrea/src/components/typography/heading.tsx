"use client";

import { useMemo } from "react";
import type { HeadingLevel } from "@/types";

interface HeadingProps<L extends HeadingLevel = HeadingLevel> {
  children: React.ReactNode;
  level: L;
  className?: string;
}

const Heading = ({ children, level, className }: HeadingProps) => {
  const styles = useMemo(
    () => ({
      1: "text-4xl font-sans font-bold my-2 capitalize select-none",
      2: "text-3xl font-serif font-semibold capitalize select-none",
      3: "text-2xl font-serif font-bold my-0 capitalize select-none",
      4: "text-xl font-serif font-normal my-1 capitalize select-none",
      5: "text-lg font-sans font-normal capitalize select-none",
      6: "text-base font-sans font-normal select-none",
    }),
    []
  );

  const elementStyle = useMemo(() => styles[level], [styles, level]);
  const combinedClassName = className
    ? `${elementStyle} ${className}`
    : elementStyle;

  const renderElement = () => {
    switch (level) {
      case 1:
        return <h1 className={combinedClassName}>{children}</h1>;
      case 2:
        return <h2 className={combinedClassName}>{children}</h2>;
      case 3:
        return <h3 className={combinedClassName}>{children}</h3>;
      case 4:
        return <h4 className={combinedClassName}>{children}</h4>;
      case 5:
        return <h5 className={combinedClassName}>{children}</h5>;
      default:
        return <h1 className={combinedClassName}>{children}</h1>;
    }
  };

  return renderElement();
};

export default Heading;
