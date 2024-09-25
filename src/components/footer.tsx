"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { PageContainer } from "./page-container";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer>
      <PageContainer className="flex justify-between">
        <span className="text-sm leading-loose text-muted-foreground text-balance">
          michaelignat.
        </span>

        <Image
          src="portfolio/images/cross.png"
          alt="Orthodox Cross"
          width={10}
          height={10}
          className="h-auto w-auto rounded-2xl dark:invert"
        />
      </PageContainer>
    </footer>
  );
};
