"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type ScrollFloatProps = {
  text: string;
  className?: string;
  animationDuration?: number;
  stagger?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
};

type ScrollFloatItemProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  animationDuration?: number;
  blur?: number;
  scale?: number;
  scrollStart?: string;
  scrollEnd?: string;
  y?: number;
};

gsap.registerPlugin(ScrollTrigger);

export function ScrollFloat({
  text,
  className,
  animationDuration = 0.9,
  stagger = 0.018,
  ease = "back.out(1.8)",
  scrollStart = "top 88%",
  scrollEnd = "center 52%",
}: ScrollFloatProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const chars = Array.from(
        root.querySelectorAll<HTMLElement>("[data-scroll-float-char]"),
      );

      gsap.set(chars, {
        filter: "blur(4px)",
        opacity: 0.18,
        rotateX: -64,
        transformOrigin: "50% 100%",
        yPercent: 120,
      });

      gsap.to(chars, {
        filter: "blur(0px)",
        opacity: 1,
        rotateX: 0,
        yPercent: 0,
        duration: animationDuration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: root,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      });
    }, root);

    return () => context.revert();
  }, [animationDuration, ease, scrollEnd, scrollStart, stagger]);

  return (
    <span aria-label={text} className={cn("scroll-float", className)} ref={rootRef}>
      <span aria-hidden="true">
        {text.split(" ").map((word, wordIndex, words) => (
          <span className="scroll-float-word" key={`${word}-${wordIndex}`}>
            {Array.from(word).map((char, charIndex) => (
              <span
                className="scroll-float-char"
                data-scroll-float-char
                key={`${char}-${charIndex}`}
              >
                {char}
              </span>
            ))}
            {wordIndex < words.length - 1 ? (
              <span className="scroll-float-space"> </span>
            ) : null}
          </span>
        ))}
      </span>
    </span>
  );
}

export function ScrollFloatItem({
  children,
  className,
  animationDuration = 0.55,
  blur = 0,
  scale = 1,
  scrollStart = "top 96%",
  scrollEnd = "top 80%",
  y = 18,
  ...props
}: ScrollFloatItemProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        root,
        {
          filter: `blur(${blur}px)`,
          opacity: 0.72,
          scale,
          y,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          y: 0,
          duration: animationDuration,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: scrollStart,
            end: scrollEnd,
            scrub: 0.65,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, [animationDuration, blur, scale, scrollEnd, scrollStart, y]);

  return (
    <div className={cn("scroll-float-item", className)} ref={rootRef} {...props}>
      {children}
    </div>
  );
}
