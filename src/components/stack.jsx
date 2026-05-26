"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./stack.module.css";

const getInitialOrder = (cards) =>
  cards.map((_, index) => cards.length - index - 1);

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className={styles.cardRotateDisabled} style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.cardRotate}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      style={{ x, y, rotateX, rotateY }}
      whileTap={{ cursor: "grabbing" }}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  showControls = false,
  controlsLabel = "Stack card",
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [order, setOrder] = useState(() => getInitialOrder(cards));

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  const randomRotations = useMemo(
    () =>
      cards.map((_, index) => (randomRotation ? ((index * 7) % 11) - 5 : 0)),
    [cards, randomRotation],
  );

  const normalizedOrder = useMemo(() => {
    const validOrder = order.filter((index) => index < cards.length);
    const missingOrder = cards
      .map((_, index) => index)
      .filter((index) => !validOrder.includes(index))
      .reverse();

    return [...validOrder, ...missingOrder];
  }, [cards, order]);

  const sendToBack = useCallback((cardIndex) => {
    setOrder((prev) => {
      const nextOrder = [...prev];
      const index = nextOrder.findIndex((item) => item === cardIndex);
      if (index < 0) return nextOrder;
      const [card] = nextOrder.splice(index, 1);
      nextOrder.unshift(card);
      return nextOrder;
    });
  }, []);

  const sendPreviousToFront = useCallback(() => {
    setOrder((prev) => {
      const validOrder = prev.filter((index) => index < cards.length);
      const missingOrder = cards
        .map((_, index) => index)
        .filter((index) => !validOrder.includes(index))
        .reverse();
      const nextOrder = [...validOrder, ...missingOrder];

      if (nextOrder.length <= 1) return nextOrder;

      const [card] = nextOrder.splice(0, 1);
      nextOrder.push(card);
      return nextOrder;
    });
  }, [cards]);

  useEffect(() => {
    if (!autoplay || normalizedOrder.length <= 1 || isPaused) return undefined;

    const interval = window.setInterval(() => {
      const topCardIndex = normalizedOrder[normalizedOrder.length - 1];
      sendToBack(topCardIndex);
    }, autoplayDelay);

    return () => window.clearInterval(interval);
  }, [autoplay, autoplayDelay, normalizedOrder, isPaused, sendToBack]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;
  const totalCards = cards.length;
  const currentCardIndex = normalizedOrder[normalizedOrder.length - 1] ?? 0;
  const currentPage = totalCards ? currentCardIndex + 1 : 0;

  const stopControlGesture = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={styles.stackContainer}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {normalizedOrder.map((cardIndex, index) => {
        const card = cards[cardIndex];
        const randomRotate = randomRotations[cardIndex] ?? 0;

        return (
          <CardRotate
            disableDrag={shouldDisableDrag}
            key={cardIndex}
            onSendToBack={() => sendToBack(cardIndex)}
            sensitivity={sensitivity}
          >
            <motion.div
              animate={{
                rotateZ: (normalizedOrder.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - normalizedOrder.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              className={styles.card}
              initial={false}
              onClick={() => shouldEnableClick && sendToBack(cardIndex)}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {card}
            </motion.div>
          </CardRotate>
        );
      })}
      {showControls && totalCards > 1 ? (
        <div
          className={styles.stackControls}
          onMouseDown={stopControlGesture}
          onPointerDown={stopControlGesture}
          onTouchStart={stopControlGesture}
        >
          <button
            aria-label={`Previous ${controlsLabel}`}
            className={styles.controlButton}
            onClick={sendPreviousToFront}
            type="button"
          >
            Prev
          </button>
          <span
            aria-label={`${controlsLabel} ${currentPage} of ${totalCards}`}
            aria-live="polite"
            className={styles.pageIndicator}
          >
            {currentPage}/{totalCards}
          </span>
          <button
            aria-label={`Next ${controlsLabel}`}
            className={styles.controlButton}
            onClick={() => sendToBack(currentCardIndex)}
            type="button"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
