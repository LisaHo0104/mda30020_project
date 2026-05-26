"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./react-bits-carousel.module.css";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const CONTAINER_PADDING = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

function useMeasureWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return undefined;

    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, width];
}

function CarouselItem({
  item,
  index,
  itemWidth,
  trackItemOffset,
  x,
  transition,
}) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const rotateY = useTransform(x, range, [90, 0, -90], { clamp: false });

  return (
    <motion.div
      className={styles.carouselItem}
      key={`${item?.id ?? index}-${index}`}
      style={{
        width: itemWidth,
        rotateY,
      }}
      transition={transition}
    >
      <div className={styles.imageFrame}>
        <Image
          alt={item.alt}
          className={styles.carouselImage}
          fill
          sizes="(min-width: 1024px) 44rem, 88vw"
          src={item.img}
        />
      </div>
    </motion.div>
  );
}

export default function ReactBitsCarousel({
  items,
  baseWidth = 720,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}) {
  const [containerRef, measuredWidth] = useMeasureWidth();
  const effectiveWidth = Math.max(
    1,
    Math.min(baseWidth, measuredWidth || baseWidth),
  );
  const itemWidth = Math.max(1, effectiveWidth - CONTAINER_PADDING * 2);
  const trackItemOffset = itemWidth + GAP;
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(-(loop ? 1 : 0) * trackItemOffset);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = window.setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }

    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      setPosition(1);
      x.set(-trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const goToPrevious = () => {
    setPosition((prev) => {
      const next = prev - 1;
      if (loop) return Math.max(0, next);
      return Math.max(0, next);
    });
  };

  const goToNext = () => {
    setPosition((prev) => {
      const next = prev + 1;
      const max = itemsForRender.length - 1;
      if (loop) return Math.min(next, max);
      return Math.min(next, max);
    });
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  return (
    <div
      className={styles.carouselShell}
      style={{ "--carousel-max-width": `${baseWidth}px` }}
    >
      <div
        className={styles.carouselContainer}
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
        ref={containerRef}
      >
        <motion.div
          animate={{ x: -(position * trackItemOffset) }}
          className={styles.carouselTrack}
          drag={isAnimating ? false : "x"}
          onAnimationComplete={handleAnimationComplete}
          onAnimationStart={handleAnimationStart}
          onDragEnd={handleDragEnd}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 1000,
            perspectiveOrigin: `${
              position * trackItemOffset + itemWidth / 2
            }px 50%`,
            x,
          }}
          transition={effectiveTransition}
          {...dragProps}
        >
          {itemsForRender.map((item, index) => (
            <CarouselItem
              index={index}
              item={item}
              itemWidth={itemWidth}
              key={`${item?.id ?? index}-${index}`}
              trackItemOffset={trackItemOffset}
              transition={effectiveTransition}
              x={x}
            />
          ))}
        </motion.div>

        <div className={styles.carouselControls}>
          <button
            aria-label="Previous Shield Badge card"
            className={styles.controlButton}
            onClick={goToPrevious}
            type="button"
          >
            Prev
          </button>
          <span
            aria-label={`Shield Badge card ${activeIndex + 1} of ${items.length}`}
            aria-live="polite"
            className={styles.pageIndicator}
          >
            {activeIndex + 1}/{items.length}
          </span>
          <button
            aria-label="Next Shield Badge card"
            className={styles.controlButton}
            onClick={goToNext}
            type="button"
          >
            Next
          </button>
        </div>
      </div>

      <div className={styles.carouselIndicators} aria-label="Shield Badge pages">
        {items.map((item, index) => (
          <button
            aria-label={`Go to Shield Badge card ${index + 1}`}
            className={
              activeIndex === index
                ? styles.carouselIndicatorActive
                : styles.carouselIndicator
            }
            key={item.id}
            onClick={() => setPosition(loop ? index + 1 : index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
