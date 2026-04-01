"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavButtonProps } from "./types";
import { ALL_ICONS } from "@/components/icons/icons";

const NavButton = ({
  icon,
  href,
  label,
  isExpanded = true,
}: NavButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  const Icon = icon ? ALL_ICONS[icon] : null;

  return (
    <Link
      href={href}
      className={`
        flex w-full items-center gap-3 rounded-lg px-3 py-3
        transition-colors duration-200
        ${isActive
          ? "bg-primary/10 text-primary"
          : "text-default-600 hover:bg-default-100"
        }
      `}
    >
      {Icon && <Icon size={24} variant={isActive ? "Bold" : "Outline"} />}
      {isExpanded && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2 }}
          className="truncate text-sm font-medium"
        >
          {label}
        </motion.span>
      )}
    </Link>
  );
};

export default NavButton;
