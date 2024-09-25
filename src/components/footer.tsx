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
          src="/images/cross.png"
          alt="Orthodox Cross"
          width={15}
          height={20}
          className="dark:invert"
        />
      </PageContainer>
    </footer>
  );
};
