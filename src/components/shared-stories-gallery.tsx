"use client";

import { useState } from "react";
import DomeGallery from "@/components/dome-gallery";

const storyImages = [
  {
    src: "/shared-stories/b1db4f50-0a04-4163-bfd1-1a02e9d42d53.png",
    alt: "Shared story poster 1",
  },
  {
    src: "/shared-stories/a35131e3-30b8-44f1-bc90-d42a4374e86f.png",
    alt: "Shared story poster 2",
  },
  {
    src: "/shared-stories/635b051e-79be-498a-8f7f-e08cab7ff2ed.png",
    alt: "Shared story poster 3",
  },
  {
    src: "/shared-stories/6f363f36-5c63-41e5-a209-28c49879e4ef.png",
    alt: "Shared story poster 4",
  },
];

export function SharedStoriesGallery() {
  const [hasSubmittedStory, setHasSubmittedStory] = useState(false);

  return (
    <div className="shared-stories-grid">
      <div className="story-dome-shell" aria-label="Shared story image gallery">
        <DomeGallery
          autoSpin
          autoSpinSpeed={1.8}
          dragDampening={2}
          fit={1}
          grayscale={false}
          images={storyImages}
          maxVerticalRotationDeg={0}
          minRadius={600}
          openedImageBorderRadius="30px"
          openedImageHeight="min(82dvh, calc(82vw * 1.2496), 50rem)"
          openedImageWidth="min(82vw, calc(82dvh * 0.8003), 40rem)"
          overlayBlurColor="#bac5dd"
          segments={20}
        />
      </div>

      <section className="share-story-box" aria-labelledby="share-story-title">
        <div className="share-story-copy">
          <span>Community voices</span>
          <h3 id="share-story-title">Share your own story with us</h3>
          <p>
            Add a moment, question, or conversation that changed how you think
            about HPV prevention.
          </p>
        </div>
        <form
          className="share-story-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.currentTarget.reset();
            setHasSubmittedStory(true);
          }}
        >
          <div className="share-story-fields">
            <label>
              <span>Name or initials</span>
              <input name="name" placeholder="Optional" type="text" />
            </label>
            <label>
              <span>Location</span>
              <input name="location" placeholder="City or campus" type="text" />
            </label>
          </div>
          <label>
            <span>Your story</span>
            <textarea
              name="story"
              placeholder="What helped you start the conversation?"
              required
              rows={4}
            />
          </label>
          <div className="share-story-submit-row">
            <button type="submit">Share story</button>
            {hasSubmittedStory ? (
              <p role="status">Thank you for sharing your voice.</p>
            ) : null}
          </div>
        </form>
      </section>
    </div>
  );
}
