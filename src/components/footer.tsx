"use client";

import { useRouterState } from "@tanstack/react-router";
import { PageContainer } from "./page-container";

export const Footer = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname === "/") {
    return null;
  }

  return (
    <footer>
      <PageContainer className="flex justify-between">
        <span className="text-sm leading-loose text-muted-foreground text-balance">
          michaelignat.
        </span>

        <img
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
