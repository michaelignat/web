"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navbar";

export const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <span className="font-semibold">michaelignat</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {navItems.map((item) => (
          <Link
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60",
            )}
            key={item.name}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};
