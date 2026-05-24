"use client";

import { useMemo, useState } from "react";
import DomeGallery from "@/components/dome-gallery";

type StoryScene = "friends" | "couple" | "phone" | "booth" | "siblings" | "campus";

type SharedStory = {
  id: string;
  name: string;
  location: string;
  title: string;
  prompt: string;
  story: string;
  takeaway: string;
  scene: StoryScene;
};

const sharedStories: SharedStory[] = [
  {
    id: "minh",
    name: "Minh, 22",
    location: "Da Nang",
    title: "I thought HPV was not my issue",
    prompt: "A friend’s carousel post changed how he saw prevention.",
    story:
      "Minh used to scroll past HPV posts because he thought they were only for women. After seeing a short myth-busting Reel from a male creator, he realised HPV can affect all genders and that learning about vaccination was a way to care for future partners too. He saved the VNVC link and sent it to two friends with a simple message: 'We should know this stuff.'",
    takeaway: "Real care starts with not leaving prevention to someone else.",
    scene: "friends",
  },
  {
    id: "linh-an",
    name: "Linh & An, 21",
    location: "Ha Noi",
    title: "The awkward talk became easier",
    prompt: "A couple used the campaign’s green-flag idea to start a health conversation.",
    story:
      "Linh wanted to ask An what he knew about HPV, but she worried the topic would sound too serious. They watched a 'green flag' video together and used it as a soft opening. The conversation became less about fear and more about respect: checking facts, asking questions, and agreeing that prevention should feel normal in a relationship.",
    takeaway: "Green flag partners make health conversations safer.",
    scene: "couple",
  },
  {
    id: "bao",
    name: "Bao, 24",
    location: "Ho Chi Minh City",
    title: "A dating profile made him curious",
    prompt: "The Shield Badge concept turned prevention into a modern dating cue.",
    story:
      "Bao first noticed HPV prevention through a mock Shield Badge post. It made him think about how dating apps already show music taste, hobbies, and lifestyle, but rarely show whether someone is willing to talk about health. He did not book immediately, but he did read the vaccine information and started seeing prevention as confidence, not pressure.",
    takeaway: "Being informed can be part of modern dating confidence.",
    scene: "phone",
  },
  {
    id: "trang",
    name: "Trang, 20",
    location: "Can Tho",
    title: "Anonymous questions helped",
    prompt: "A university booth made HPV education feel private and approachable.",
    story:
      "Trang had questions about HPV but did not want to ask them out loud. At a campus booth, she scanned a QR code and submitted her question anonymously. Seeing other students ask similar questions made her feel less embarrassed. The booth did not force a decision; it gave her credible information and a next step when she was ready.",
    takeaway: "Low-pressure education can reduce shame.",
    scene: "booth",
  },
  {
    id: "nhi",
    name: "Nhi, 23",
    location: "Hai Phong",
    title: "I sent it to my younger brother",
    prompt: "Gender-inclusive messaging helped one family talk differently.",
    story:
      "Nhi always heard HPV discussed as a women’s health topic. When she saw a post explaining that prevention matters for men too, she sent it to her younger brother before sending it to her friends. It was the first time they had talked about sexual health without joking it away. The post gave them shared language.",
    takeaway: "Inclusive messages help prevention travel through families and friend groups.",
    scene: "siblings",
  },
  {
    id: "quang",
    name: "Quang, 26",
    location: "Khanh Hoa",
    title: "A lunch break became a fact check",
    prompt: "Peer discussion turned misinformation into curiosity.",
    story:
      "Quang heard a coworker say the HPV vaccine was only useful before adulthood. He was not sure, so he opened a campaign post and checked VNVC information during lunch. The group did not solve everything in one conversation, but the tone changed from teasing to fact checking. That felt like progress.",
    takeaway: "A small fact check can change the direction of a conversation.",
    scene: "campus",
  },
];

export function SharedStoriesGallery() {
  const [hasSubmittedStory, setHasSubmittedStory] = useState(false);
  const storyImages = useMemo(
    () =>
      sharedStories.map((story) => ({
        src: createStoryImage(story),
        alt: `${story.name}: ${story.title}`,
        storyId: story.id,
      })),
    [],
  );

  return (
    <div className="shared-stories-grid">
      <div className="story-dome-shell" aria-label="Shared story image gallery">
        <DomeGallery
          dragDampening={2}
          fit={1}
          grayscale={false}
          images={storyImages}
          maxVerticalRotationDeg={0}
          minRadius={600}
          openedImageBorderRadius="30px"
          openedImageHeight="min(72dvh, 44rem)"
          openedImageWidth="min(88vw, 52rem)"
          overlayBlurColor="#bac5dd"
          segments={20}
          renderOpenedContent={(image) => {
            const storyId =
              typeof image?.storyId === "string" ? image.storyId : undefined;
            const imageSrc = typeof image?.src === "string" ? image.src : storyImages[0].src;
            const story =
              sharedStories.find((sharedStory) => sharedStory.id === storyId) ??
              sharedStories[0];

            return createStoryOverlayElement(story, imageSrc);
          }}
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

function createStoryOverlayElement(story: SharedStory, imageSrc: string) {
  const card = document.createElement("article");
  card.className = "story-open-card";
  card.setAttribute("aria-label", story.title);

  const closeButton = document.createElement("button");
  closeButton.className = "story-open-card__close";
  closeButton.dataset.dgClose = "true";
  closeButton.setAttribute("aria-label", "Close story");
  closeButton.type = "button";
  closeButton.textContent = "×";

  const imageWrap = document.createElement("div");
  imageWrap.className = "story-open-card__image";
  const image = document.createElement("img");
  image.alt = story.title;
  image.src = imageSrc;
  imageWrap.appendChild(image);

  const copy = document.createElement("div");
  copy.className = "story-open-card__copy";

  const badges = document.createElement("div");
  badges.className = "story-open-card__badges";
  badges.append(
    createStoryBadge("Shared story"),
    createStoryBadge(story.location),
  );

  const title = document.createElement("h3");
  title.textContent = story.title;

  const prompt = document.createElement("p");
  prompt.className = "story-open-card__prompt";
  prompt.textContent = story.prompt;

  const body = document.createElement("p");
  body.className = "story-open-card__body";
  body.textContent = story.story;

  const takeaway = document.createElement("div");
  takeaway.className = "story-open-card__takeaway";
  const takeawayIcon = document.createElement("span");
  takeawayIcon.setAttribute("aria-hidden", "true");
  takeawayIcon.textContent = "✓";
  const takeawayText = document.createElement("span");
  takeawayText.textContent = story.takeaway;
  takeaway.append(takeawayIcon, takeawayText);

  copy.append(badges, title, prompt, body, takeaway);
  card.append(closeButton, imageWrap, copy);

  return card;
}

function createStoryBadge(label: string) {
  const badge = document.createElement("span");
  badge.className = "story-open-card__badge";
  badge.textContent = label;
  return badge;
}

function createStoryImage(story: SharedStory) {
  const secondary = story.scene === "booth" || story.scene === "siblings" ? "#a8ccd2" : "#f0d6d2";
  const accent = story.scene === "phone" || story.scene === "campus" ? "#102f86" : "#7288bd";
  const label = escapeXml(story.name.replace(/,\s*\d+$/, ""));
  const location = escapeXml(story.location);
  const drawing = getSceneDrawing(story.scene, accent);
  const svg = `
    <svg aria-label="${escapeXml(story.title)}" viewBox="0 0 320 420" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#fff8f3"/>
          <stop offset="48%" stop-color="${secondary}" stop-opacity="0.68"/>
          <stop offset="100%" stop-color="#c9d5e7"/>
        </linearGradient>
        <pattern id="paper" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0H8M0 4H8" stroke="#102f86" stroke-opacity="0.045" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="320" height="420" rx="26" fill="url(#bg)"/>
      <rect width="320" height="420" rx="26" fill="url(#paper)"/>
      <path d="M26 100C61 78 88 77 123 96M211 91C239 77 268 82 295 102" fill="none" stroke="#102f86" stroke-linecap="round" stroke-opacity="0.15" stroke-width="3"/>
      <path d="M20 286C56 261 89 264 122 285C160 309 198 306 238 281C265 264 288 266 307 283" fill="none" stroke="#102f86" stroke-linecap="round" stroke-opacity="0.18" stroke-width="3"/>
      ${drawing}
      <circle cx="262" cy="76" r="18" fill="#fff8f3" opacity="0.72"/>
      <path d="M262 53V99M239 76H285M246 60L278 92M278 60L246 92" stroke="#102f86" stroke-linecap="round" stroke-opacity="0.72" stroke-width="2"/>
      <path d="M61 251C49 236 25 247 47 273L80 307L113 273C135 247 111 236 99 251L80 270L61 251Z" fill="none" stroke="#fff8f3" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
      <rect y="330" width="320" height="90" fill="#102f86" opacity="0.94"/>
      <path d="M41 363C35 356 22 361 33 374L53 394L73 374C84 361 71 356 65 363L53 376L41 363Z" fill="none" stroke="#fff8f3" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
      <text x="91" y="368" fill="#fff8f3" font-family="Georgia, serif" font-size="23" font-weight="700">${label}</text>
      <text x="91" y="394" fill="#fff8f3" font-family="Georgia, serif" font-size="17" font-weight="600" opacity="0.84">${location}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getSceneDrawing(scene: StoryScene, accent: string) {
  const stroke = `fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"`;

  if (scene === "phone") {
    return `
      <g>
        <rect ${stroke} x="118" y="120" width="84" height="138" rx="19"/>
        <path ${stroke} d="M139 151H181M139 183H181M139 215H168"/>
        <circle cx="160" cy="238" r="4" fill="${accent}"/>
        <path ${stroke} d="M226 141L242 158L280 116"/>
      </g>
    `;
  }

  if (scene === "booth") {
    return `
      <g>
        <path ${stroke} d="M68 136H252V248H68Z"/>
        <path ${stroke} d="M94 136V248M226 136V248M107 177H206M107 210H184"/>
        <circle ${stroke} cx="252" cy="105" r="18"/>
        <path ${stroke} d="M252 95V115M242 105H262"/>
      </g>
    `;
  }

  if (scene === "campus") {
    return `
      <g>
        <path ${stroke} d="M51 251H269M82 251V160L160 112L238 160V251"/>
        <path ${stroke} d="M112 251V187H208V251M138 251V187M182 251V187"/>
        <circle ${stroke} cx="160" cy="146" r="12"/>
      </g>
    `;
  }

  if (scene === "siblings" || scene === "friends") {
    return `
      <g>
        <circle ${stroke} cx="122" cy="132" r="30"/>
        <circle ${stroke} cx="199" cy="129" r="32"/>
        <path ${stroke} d="M86 250C92 203 109 172 134 174C156 176 165 207 169 250"/>
        <path ${stroke} d="M170 250C176 201 191 169 216 174C240 178 253 207 258 250"/>
        <path ${stroke} d="M139 190C154 207 176 207 190 188"/>
        <path ${stroke} d="M110 111C128 94 148 100 156 119M185 105C204 87 229 98 238 122"/>
      </g>
    `;
  }

  return `
    <g>
      <circle ${stroke} cx="119" cy="132" r="30"/>
      <circle ${stroke} cx="200" cy="132" r="30"/>
      <path ${stroke} d="M83 250C91 205 106 174 131 174C154 174 165 207 169 250"/>
      <path ${stroke} d="M171 250C178 207 192 174 216 174C239 174 253 207 258 250"/>
      <path ${stroke} d="M145 193C158 207 177 207 190 193"/>
      <path ${stroke} d="M114 104C134 90 153 101 158 122M181 112C200 90 226 101 232 124"/>
    </g>
  `;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
