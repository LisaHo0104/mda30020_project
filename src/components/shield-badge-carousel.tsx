"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  HeartHandshake,
  LockKeyhole,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
  Smartphone,
  Sparkles,
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
    title: "Main campaign header",
    eyebrow: "Campaign identity",
    summary:
      "The campaign header introduces the Shield Badge as a green flag for care and a better way to connect.",
    alt: "Shield Badge Dating-App Integration campaign header",
    height: 670,
    src: "/shield-badge/slides/01-main-campaign-header.png",
    width: 360,
  },
  {
    title: "Dating-app profile with Shield Badge",
    eyebrow: "Profile concept",
    summary:
      "The badge appears as an optional awareness cue on a dating profile without making health disclosure feel heavy.",
    alt: "Dating-app profile with optional Shield Badge awareness badge",
    height: 650,
    src: "/shield-badge/slides/02-dating-profile-badge.png",
    width: 365,
  },
  {
    title: "In-app prompt / feature concept",
    eyebrow: "Feature prompt",
    summary:
      "The prompt explains that being informed about HPV is a green flag and offers a simple Learn more path.",
    alt: "In-app Shield Badge prompt explaining that being informed about HPV is a green flag",
    height: 640,
    src: "/shield-badge/slides/03-in-app-prompt-card.png",
    width: 318,
  },
  {
    title: "Match / chat conversation concept",
    eyebrow: "Conversation flow",
    summary:
      "The chat concept shows the badge helping partners move into healthier conversations about boundaries and prevention.",
    alt: "Dating app chat conversation concept about respect, boundaries, and prevention",
    height: 535,
    src: "/shield-badge/slides/04-match-chat-conversation.png",
    width: 314,
  },
  {
    title: "Social announcement post",
    eyebrow: "Instagram post",
    summary:
      "The announcement post introduces the Shield Badge as optional, private, respectful, and conversation-friendly.",
    alt: "Instagram announcement post introducing the Shield Badge",
    height: 535,
    src: "/shield-badge/slides/05-social-announcement-post.png",
    width: 386,
  },
  {
    title: "How it works",
    eyebrow: "Feature explainer",
    summary:
      "The explainer breaks the flow into seeing the badge, learning about HPV prevention, and following VNVC-backed information.",
    alt: "How it works panel for the Shield Badge feature",
    height: 535,
    src: "/shield-badge/slides/06-how-it-works.png",
    width: 319,
  },
  {
    title: "Shield Badge system strip",
    eyebrow: "Footer system",
    summary:
      "The footer connects the badge to trusted information, healthy relationships, self-care, and protection.",
    alt: "Shield Badge footer system strip with campaign values",
    height: 90,
    src: "/shield-badge/slides/07-footer-system-strip.png",
    width: 1045,
  },
  {
    title: "Landscape campaign header",
    eyebrow: "Campaign identity variation",
    summary:
      "The landscape version restates the main promise for wider social and presentation formats.",
    alt: "Landscape Shield Badge Dating-App Integration campaign header",
    height: 570,
    src: "/shield-badge/slides/08-landscape-header.png",
    width: 395,
  },
  {
    title: "Landscape profile concept",
    eyebrow: "Profile concept variation",
    summary:
      "The wider profile treatment shows the badge inside a familiar swipe-card interface.",
    alt: "Landscape dating app profile with Shield Badge",
    height: 570,
    src: "/shield-badge/slides/09-landscape-profile.png",
    width: 445,
  },
  {
    title: "Reel feature concept",
    eyebrow: "9:16 feature post",
    summary:
      "The vertical feature concept turns the green-flag message into a short-form video or Story asset.",
    alt: "Vertical social feature concept about HPV information being a green flag",
    height: 555,
    src: "/shield-badge/slides/10-reel-feature-concept.png",
    width: 420,
  },
  {
    title: "Landscape chat concept",
    eyebrow: "Conversation flow variation",
    summary:
      "The chat variation keeps the focus on respectful communication and prevention as shared values.",
    alt: "Landscape chat concept for Shield Badge dating app integration",
    height: 345,
    src: "/shield-badge/slides/11-landscape-chat.png",
    width: 370,
  },
  {
    title: "Landscape announcement post",
    eyebrow: "9:16 social post",
    summary:
      "The alternate announcement asset introduces the badge with stronger photo-led dating-app visuals.",
    alt: "Landscape board social announcement post for Shield Badge",
    height: 350,
    src: "/shield-badge/slides/12-landscape-announcement.png",
    width: 483,
  },
  {
    title: "Landscape how it works",
    eyebrow: "Feature explainer variation",
    summary:
      "The alternate explainer keeps the three-step badge education path clear and scannable.",
    alt: "Landscape board how it works panel for Shield Badge",
    height: 350,
    src: "/shield-badge/slides/13-landscape-how-it-works.png",
    width: 417,
  },
  {
    title: "Protect your love footer",
    eyebrow: "Closing strip",
    summary:
      "The closing strip reinforces trusted information, healthy relationships, self-care, and protection.",
    alt: "Shield Badge closing footer strip",
    height: 68,
    src: "/shield-badge/slides/14-landscape-footer-strip.png",
    width: 1360,
  },
];

const contentRows = [
  {
    icon: BadgeCheck,
    term: "Campaign purpose",
    detail:
      "Connect HPV prevention with modern dating responsibility through an optional awareness badge.",
  },
  {
    icon: LockKeyhole,
    term: "Privacy framing",
    detail:
      "Keep the badge optional, private, and respectful so it normalises care without pressure or stigma.",
  },
  {
    icon: ShieldCheck,
    term: "Key message",
    detail: "Green flag partners talk about prevention.",
  },
  {
    icon: HeartHandshake,
    term: "Conversation behaviour",
    detail:
      "Use the badge to invite better conversations about respect, boundaries, health, and shared care.",
  },
];

const outputChips = [
  {
    icon: Smartphone,
    label: "Shield Badge concept",
  },
  {
    icon: MessageCircle,
    label: "Match and chat screens",
  },
  {
    icon: MessagesSquare,
    label: "1-2 announcement posts",
  },
  {
    icon: Sparkles,
    label: "Green-flag prompt assets",
  },
];

export function ShieldBadgeCarousel() {
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
    <ScrollFloatItem className="scroll-mt-40" id="shield-badge">
      <section
        aria-labelledby="shield-badge-title"
        className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-[0_20px_48px_rgba(10,35,109,0.14)]"
      >
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.24fr)_minmax(21rem,0.76fr)]">
          <div className="min-w-0 bg-[linear-gradient(135deg,rgba(255,248,243,0.74),rgba(202,218,234,0.62))] p-3 sm:p-4">
            <Carousel
              aria-label="Shield Badge dating app integration visuals"
              className="mx-auto w-full"
              opts={{ align: "start" }}
              setApi={setApi}
            >
              <CarouselContent className="!ml-0">
                {slides.map((slide) => {
                  const aspectRatio = slide.width / slide.height;
                  const isStrip = aspectRatio >= 6;
                  const isWide = aspectRatio >= 1.45;

                  return (
                    <CarouselItem className="!pl-0" key={slide.title}>
                      <article className="grid gap-3">
                        <div
                          className={cn(
                            "relative grid place-items-center overflow-hidden rounded-lg border border-white/70 bg-white/75 shadow-[0_16px_36px_rgba(10,35,109,0.16)]",
                            isStrip
                              ? "min-h-0 px-2 py-7 sm:py-9"
                              : "h-[min(70vh,40rem)] min-h-[26rem]",
                          )}
                        >
                          <Image
                            alt={slide.alt}
                            className={cn(
                              "max-w-[calc(100%-0.75rem)] rounded-lg object-contain shadow-[0_10px_22px_rgba(10,35,109,0.12)]",
                              isStrip
                                ? "h-auto w-[calc(100%-0.75rem)]"
                                : cn(
                                    "max-h-[calc(100%-0.75rem)]",
                                    isWide
                                      ? "h-auto w-[calc(100%-0.75rem)]"
                                      : "h-[calc(100%-0.75rem)] w-auto",
                                  ),
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
                id="shield-badge-title"
              >
                Shield Badge Dating-App Integration
              </h3>
              <p className="mt-4 text-base leading-7 text-card-foreground/75">
                A dating-app awareness feature that makes HPV prevention part of
                modern dating responsibility and healthier conversations.
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
