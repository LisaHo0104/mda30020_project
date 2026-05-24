"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BookOpenCheck,
  HeartHandshake,
  MessageCircle,
  MessagesSquare,
  Mic,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollFloatItem } from "@/components/scroll-float";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Podcast cover / episode artwork",
    eyebrow: "Episode artwork",
    summary:
      "The cover positions Shield Stories as an intimate interview series with real voices and real lessons.",
    alt: "Shield Stories podcast cover and episode artwork",
    height: 535,
    src: "/shield-stories/slides/01-podcast-cover.png",
    width: 548,
  },
  {
    title: "Interview video / Reel teaser",
    eyebrow: "Short-form teaser",
    summary:
      "The reel teaser turns a personal reflection into a social video hook for the episode.",
    alt: "Shield Stories interview video reel teaser",
    height: 555,
    src: "/shield-stories/slides/02-reel-teaser.png",
    width: 504,
  },
  {
    title: "Podcast episode card / audio player",
    eyebrow: "Audio content",
    summary:
      "The audio player card gives the story a podcast-style format that feels private, calm, and credible.",
    alt: "Shield Stories podcast episode card and audio player",
    height: 306,
    src: "/shield-stories/slides/03-audio-player.png",
    width: 548,
  },
  {
    title: "Every story brings us closer",
    eyebrow: "Story lesson card",
    summary:
      "The lesson card turns the interview into practical reassurance: honest conversations, knowledge, and support.",
    alt: "Shield Stories lesson card about honest conversations and prevention",
    height: 190,
    src: "/shield-stories/slides/04-story-lessons-card.png",
    width: 548,
  },
  {
    title: "Instagram story / quote card teaser",
    eyebrow: "Quote card",
    summary:
      "The quote card makes one emotional insight easy to share through Stories.",
    alt: "Shield Stories Instagram quote card teaser",
    height: 484,
    src: "/shield-stories/slides/05-instagram-quote-card.png",
    width: 504,
  },
  {
    title: "Key message and design notes",
    eyebrow: "Campaign system",
    summary:
      "The supporting notes define the emotional tone, trust cues, and prevention message.",
    alt: "Shield Stories key message and design notes panel",
    height: 108,
    src: "/shield-stories/slides/06-key-message-design-notes.png",
    width: 1070,
  },
  {
    title: "VNVC-backed footer",
    eyebrow: "End card",
    summary:
      "The footer reinforces the campaign line with a VNVC-backed information cue.",
    alt: "Shield Stories footer banner saying protect your love and protect yourself",
    height: 74,
    src: "/shield-stories/slides/07-footer-banner.png",
    width: 1122,
  },
];

const contentRows = [
  {
    icon: Mic,
    term: "Campaign purpose",
    detail:
      "Make HPV prevention feel personal, emotionally safe, and easier to talk about.",
  },
  {
    icon: Quote,
    term: "Story angle",
    detail:
      "Share real or anonymised youth experiences, lessons learned, and what they wish they had known earlier.",
  },
  {
    icon: ShieldCheck,
    term: "Key message",
    detail: "Your health, your power. No labels. No shame. Just protection.",
  },
  {
    icon: BookOpenCheck,
    term: "Campaign behaviour",
    detail:
      "Reduce fear and stigma by showing that honest conversations and trusted facts can protect futures.",
  },
];

const outputChips = [
  {
    icon: MessageCircle,
    label: "Interview / Reel teaser",
  },
  {
    icon: Mic,
    label: "Podcast-style episode card",
  },
  {
    icon: MessagesSquare,
    label: "Quote carousel or Story",
  },
  {
    icon: HeartHandshake,
    label: "Peer support framing",
  },
];

export function ShieldStoriesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const activeSlide = slides[current] ?? slides[0];

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => setCurrent(api.selectedScrollSnap());

    updateCurrent();
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  return (
    <ScrollFloatItem className="scroll-mt-40" id="shield-stories">
      <section
        aria-labelledby="shield-stories-title"
        className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-[0_20px_48px_rgba(10,35,109,0.14)]"
      >
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.24fr)_minmax(21rem,0.76fr)]">
          <div className="min-w-0 bg-[linear-gradient(135deg,rgba(255,248,243,0.74),rgba(202,218,234,0.62))] p-3 sm:p-4">
            <Carousel
              aria-label="Shield Stories interview campaign visuals"
              className="mx-auto w-full"
              opts={{ align: "start" }}
              setApi={setApi}
            >
              <CarouselContent className="!ml-0">
                {slides.map((slide) => {
                  const isWide = slide.width / slide.height >= 1.45;

                  return (
                    <CarouselItem className="!pl-0" key={slide.title}>
                      <article className="grid gap-3">
                        <div className="relative grid h-[min(70vh,40rem)] min-h-[26rem] place-items-center overflow-hidden rounded-lg border border-white/70 bg-white/75 shadow-[0_16px_36px_rgba(10,35,109,0.16)]">
                          <Image
                            alt={slide.alt}
                            className={cn(
                              "max-h-[calc(100%-0.75rem)] max-w-[calc(100%-0.75rem)] rounded-lg object-contain shadow-[0_10px_22px_rgba(10,35,109,0.12)]",
                              isWide
                                ? "h-auto w-[calc(100%-0.75rem)]"
                                : "h-[calc(100%-0.75rem)] w-auto",
                            )}
                            height={slide.height}
                            sizes="(min-width: 1024px) 58vw, 92vw"
                            src={slide.src}
                            width={slide.width}
                          />
                        </div>

                        <div className="grid gap-1 rounded-lg border border-white/70 bg-white/70 px-4 py-3 text-[#0b235f] shadow-[0_8px_20px_rgba(10,35,109,0.08)]">
                          <p className="text-xs font-semibold uppercase text-[#57628b]">
                            {slide.eyebrow}
                          </p>
                          <h4 className="text-lg font-semibold leading-tight">
                            {slide.title}
                          </h4>
                          <p className="text-sm leading-6 text-[#0b235f]/75">
                            {slide.summary}
                          </p>
                        </div>
                      </article>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className="!left-2 z-20 border-0 bg-white/90 text-primary shadow-[0_6px_16px_rgba(10,35,109,0.18)] hover:bg-white max-sm:!hidden" />
              <CarouselNext className="!right-2 z-20 border-0 bg-white/90 text-primary shadow-[0_6px_16px_rgba(10,35,109,0.18)] hover:bg-white max-sm:!hidden" />
            </Carousel>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {slides.map((slide, index) => (
                  <Button
                    aria-label={`Go to ${slide.title}`}
                    className={cn(
                      "h-2 p-0 transition-all",
                      index === current
                        ? "w-6 bg-primary hover:bg-primary"
                        : "w-2 bg-primary/20 hover:bg-primary/40",
                    )}
                    key={slide.title}
                    onClick={() => api?.scrollTo(index)}
                    size="icon-xs"
                    type="button"
                  >
                    <span className="sr-only">{slide.title}</span>
                  </Button>
                ))}
              </div>
              <p className="text-sm font-semibold text-muted-foreground">
                {current + 1} / {slides.length} · {activeSlide.title}
              </p>
            </div>
          </div>

          <div className="grid content-between gap-7 p-5 sm:p-7">
            <div>
              <Badge className="w-fit bg-secondary text-secondary-foreground">
                Hero content
              </Badge>
              <h3
                className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl"
                id="shield-stories-title"
              >
                &quot;Shield Stories&quot; interview
              </h3>
              <p className="mt-4 text-base leading-7 text-card-foreground/75">
                A short interview and storytelling series that makes HPV
                prevention feel personal, human, and emotionally safe.
              </p>
            </div>

            <div className="grid gap-3">
              {contentRows.map(({ icon: Icon, term, detail }) => (
                <div
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 rounded-lg border border-border/70 bg-white/45 p-3"
                  key={term}
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Icon aria-hidden="true" size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase text-card-foreground/70">
                      {term}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-card-foreground/75">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-card-foreground/70">
                Planned outputs
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {outputChips.map(({ icon: Icon, label }) => (
                  <div
                    className="flex min-h-12 items-center gap-2 rounded-lg border border-border/70 bg-white/45 px-3 py-2 text-sm font-semibold leading-5 text-card-foreground"
                    key={label}
                  >
                    <Icon aria-hidden="true" className="shrink-0" size={17} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollFloatItem>
  );
}
