"use client";

import Image from "next/image";
import { useMemo } from "react";
import Stack from "@/components/stack";

import styles from "./v-shield-booth-stack.module.css";

export function VShieldBoothStack({ items }) {
  const cards = useMemo(
    () =>
      items.map((item) => (
        <div className={styles.cardMedia} key={item.id}>
          <Image
            alt={item.alt}
            className={styles.cardImage}
            fill
            sizes="(min-width: 1024px) 34rem, 86vw"
            src={item.src}
          />
        </div>
      )),
    [items],
  );

  return (
    <div className={styles.stackFrame}>
      <Stack
        animationConfig={{ stiffness: 260, damping: 22 }}
        autoplay
        autoplayDelay={3200}
        cards={cards}
        mobileClickOnly
        pauseOnHover
        randomRotation
        sendToBackOnClick
        showControls
        sensitivity={180}
        controlsLabel="V-Shield Booth card"
      />
    </div>
  );
}
