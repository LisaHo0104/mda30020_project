"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

import styles from "./masonry.module.css";

const COLUMN_QUERIES = [
  "(min-width:1500px)",
  "(min-width:1000px)",
  "(min-width:600px)",
  "(min-width:400px)",
];
const COLUMN_VALUES = [5, 4, 3, 2];
const TILE_GAP = 12;

const useMedia = (queries, values, defaultValue) => {
  const getMediaValue = useCallback(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return defaultValue;
    }

    const queryIndex = queries.findIndex((q) => window.matchMedia(q).matches);
    return values[queryIndex] ?? defaultValue;
  }, [defaultValue, queries, values]);

  const [value, setValue] = useState(getMediaValue);

  useEffect(() => {
    const handler = () => setValue(getMediaValue());
    const mediaQueries = queries.map((q) => window.matchMedia(q));
    const timeout = window.setTimeout(handler, 0);

    mediaQueries.forEach((query) => {
      query.addEventListener("change", handler);
    });

    return () => {
      window.clearTimeout(timeout);
      mediaQueries.forEach((query) => {
        query.removeEventListener("change", handler);
      });
    };
  }, [getMediaValue, queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
};

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  maxColumns = Infinity,
}) => {
  const responsiveColumns = useMedia(COLUMN_QUERIES, COLUMN_VALUES, 1);
  const columns = Math.max(1, Math.min(responsiveColumns, maxColumns));
  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  const getInitialPosition = useCallback(
    (item) => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return { x: item.x, y: item.y };

      let direction = animateFrom;

      if (animateFrom === "random") {
        const directions = ["top", "bottom", "left", "right"];
        direction = directions[Math.floor(Math.random() * directions.length)];
      }

      switch (direction) {
        case "top":
          return { x: item.x, y: -200 };
        case "bottom":
          return { x: item.x, y: window.innerHeight + 200 };
        case "left":
          return { x: -200, y: item.y };
        case "right":
          return { x: window.innerWidth + 200, y: item.y };
        case "center":
          return {
            x: containerRect.width / 2 - item.w / 2,
            y: containerRect.height / 2 - item.h / 2,
          };
        default:
          return { x: item.x, y: item.y + 100 };
      }
    },
    [animateFrom, containerRef],
  );

  useEffect(() => {
    hasMounted.current = false;
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const aspectHeight =
        child.width && child.height
          ? (columnWidth - TILE_GAP) * (child.height / child.width) + TILE_GAP
          : child.height / 2;
      const height = Math.max(160, aspectHeight);
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const containerHeight = useMemo(
    () =>
      grid.reduce((height, item) => Math.max(height, item.y + item.h), 0),
    [grid],
  );

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        height: item.h,
        width: item.w,
        x: item.x,
        y: item.y,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          height: item.h,
          opacity: 0,
          width: item.w,
          x: initialPos.x,
          y: initialPos.y,
          ...(blurToFocus && { filter: "blur(10px)" }),
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [
    grid,
    imagesReady,
    stagger,
    animateFrom,
    blurToFocus,
    duration,
    ease,
    getInitialPosition,
  ]);

  const handleMouseEnter = (event, item) => {
    const element = event.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(`.${styles.colorOverlay}`);
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (event, item) => {
    const element = event.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(`.${styles.colorOverlay}`);
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.list}
      style={{ height: containerHeight || undefined }}
    >
      {grid.map((item) => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className={styles.itemWrapper}
            onClick={() => {
              if (item.url) window.open(item.url, "_blank", "noopener");
            }}
            onMouseEnter={(event) => handleMouseEnter(event, item)}
            onMouseLeave={(event) => handleMouseLeave(event, item)}
          >
            <div
              aria-label={item.alt}
              className={styles.itemImg}
              role="img"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {colorShiftOnHover && <div className={styles.colorOverlay} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
