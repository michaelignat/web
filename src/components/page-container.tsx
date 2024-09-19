import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

interface PageContainerProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

export const PageContainer = ({
  children,
  className,
  ...props
}: PageContainerProps) => (
  <div
    className={cn(
      "container py-8 px-4 md:py-12 md:pb-8 lg:py-12 lg:pb-10",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
