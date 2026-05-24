import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ShinyTextStyle = CSSProperties & {
  "--shiny-base"?: string;
  "--shiny-highlight"?: string;
  "--shiny-speed"?: string;
  "--shiny-delay"?: string;
};

type ShinyTextProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  shineColor?: string;
  speed?: number;
  delay?: number;
  disabled?: boolean;
};

export function ShinyText({
  children,
  className,
  color = "var(--primary)",
  shineColor = "var(--ring)",
  speed = 4.8,
  delay = 0,
  disabled = false,
}: ShinyTextProps) {
  const style: ShinyTextStyle = {
    "--shiny-base": color,
    "--shiny-highlight": shineColor,
    "--shiny-speed": `${speed}s`,
    "--shiny-delay": `${delay}s`,
  };

  return (
    <span
      className={cn("shiny-text", disabled && "shiny-text--disabled", className)}
      style={style}
    >
      {children}
    </span>
  );
}
