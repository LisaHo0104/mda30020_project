import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollFloatProps = {
  text: string;
  className?: string;
};

export function ScrollFloat({
  text,
  className,
}: ScrollFloatProps) {
  return <span className={className}>{text}</span>;
}

export function ScrollFloatItem({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { children: ReactNode }) {
  return (
    <div className={cn("scroll-float-item", className)} {...props}>
      {children}
    </div>
  );
}
