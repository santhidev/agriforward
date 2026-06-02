import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function PageContainer({ children, className, noPadding = false }: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-5xl pb-16 md:pb-0",
        !noPadding && "px-4 py-6",
        className
      )}
    >
      {children}
    </div>
  );
}
