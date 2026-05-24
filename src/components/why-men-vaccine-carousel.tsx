"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  BookOpenCheck,
  HeartPulse,
  MapPin,
  MessageCircle,
  MessagesSquare,
  MonitorSmartphone,
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
    title: "Campaign cover",
    eyebrow: "Slide 1",
    summary:
      "The opening campaign visual introduces the core question and gender-inclusive message.",
    alt: "Love Shield cover asking why men need the HPV vaccine",
    height: 490,
    src: "/why-men-vaccine/slides/01-cover.png",
    width: 315,
  },
  {
    title: "Still think HPV is only a women's issue?",
    eyebrow: "TikTok / Reels scene 1",
    summary:
      "The first short-form scene opens with the misconception the campaign wants to challenge.",
    alt: "TikTok scene asking if HPV is only a women's issue",
    height: 490,
    src: "/why-men-vaccine/slides/02-still-think.png",
    width: 230,
  },
  {
    title: "Men can face HPV-related health risks too",
    eyebrow: "TikTok / Reels scene 2",
    summary:
      "The second scene makes male health risks visible through simple, scannable examples.",
    alt: "TikTok scene explaining HPV-related health risks for men",
    height: 490,
    src: "/why-men-vaccine/slides/03-health-risks.png",
    width: 267,
  },
  {
    title: "Real men. Real care.",
    eyebrow: "TikTok / Reels scene 3",
    summary:
      "The third scene reframes HPV prevention as mutual protection and care for the future.",
    alt: "TikTok scene saying HPV does not choose a gender and real men show real care",
    height: 490,
    src: "/why-men-vaccine/slides/04-real-men-real-care.png",
    width: 248,
  },
  {
    title: "Care starts with being informed",
    eyebrow: "TikTok / Reels scene 4",
    summary:
      "The final short-form scene connects the message to trusted, VNVC-backed information.",
    alt: "TikTok scene with a shield graphic and VNVC-backed information message",
    height: 490,
    src: "/why-men-vaccine/slides/05-vnvc-backed.png",
    width: 255,
  },
  {
    title: "Instagram Story",
    eyebrow: "Q&A / poll",
    summary:
      "The story format turns the misconception into an easy tap-to-answer prompt.",
    alt: "Instagram story quiz asking whether men need the HPV vaccine too",
    height: 527,
    src: "/why-men-vaccine/slides/06-instagram-story.png",
    width: 355,
  },
  {
    title: "Facebook educational post",
    eyebrow: "Shareable post",
    summary:
      "The Facebook post expands the message into a concise educational format with four quick reasons.",
    alt: "Facebook educational post about why men need the HPV vaccine",
    height: 527,
    src: "/why-men-vaccine/slides/07-facebook-post.png",
    width: 509,
  },
  {
    title: "Website / VNVC info card",
    eyebrow: "Action pathway",
    summary:
      "The info card gives the audience a practical next step through the VNVC centre finder.",
    alt: "Website and VNVC information card explaining why HPV vaccination matters for men",
    height: 527,
    src: "/why-men-vaccine/slides/08-vnvc-info-card.png",
    width: 416,
  },
];

const contentRows = [
  {
    icon: ShieldCheck,
    term: "Campaign purpose",
    detail:
      "Challenge the misconception that HPV vaccination is only relevant to women.",
  },
  {
    icon: HeartPulse,
    term: "Why it matters",
    detail:
      "Men can face HPV-related health risks too, including some cancers and genital warts.",
  },
  {
    icon: BadgeCheck,
    term: "Key message",
    detail: "HPV does not choose a gender. Real men. Real care.",
  },
  {
    icon: BookOpenCheck,
    term: "Content execution",
    detail:
      "Use male KOLs, students, or young professionals to explain protection for themselves and care for partners.",
  },
];

const outputChips = [
  {
    icon: MonitorSmartphone,
    label: "2 TikTok/Reels videos",
  },
  {
    icon: MessageCircle,
    label: "2-3 Story Q&A prompts",
  },
  {
    icon: MessagesSquare,
    label: "1 Facebook educational post",
  },
  {
    icon: MapPin,
    label: "VNVC info pathway",
  },
];

export function WhyMenVaccineCarousel() {
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
    <ScrollFloatItem className="scroll-mt-40" id="why-men-vaccine">
      <section
        aria-labelledby="why-men-vaccine-title"
        className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-[0_20px_48px_rgba(10,35,109,0.14)]"
      >
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.24fr)_minmax(21rem,0.76fr)]">
          <div className="min-w-0 bg-[linear-gradient(135deg,rgba(255,248,243,0.74),rgba(202,218,234,0.62))] p-3 sm:p-4">
            <Carousel
              aria-label="Why men need the HPV vaccine campaign visuals"
              className="mx-auto w-full"
              opts={{ align: "start" }}
              setApi={setApi}
            >
              <CarouselContent className="!ml-0">
                {slides.map((slide) => (
                  <CarouselItem className="!pl-0" key={slide.title}>
                    <article className="grid gap-3">
                      <div className="relative grid h-[min(66vh,36rem)] min-h-[25rem] place-items-center overflow-hidden rounded-lg border border-white/70 bg-white/75 shadow-[0_16px_36px_rgba(10,35,109,0.16)]">
                        <Image
                          alt={slide.alt}
                          className="h-[calc(100%-0.75rem)] w-auto max-w-[calc(100%-0.75rem)] rounded-lg object-contain shadow-[0_10px_22px_rgba(10,35,109,0.12)]"
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
                ))}
              </CarouselContent>

              <CarouselPrevious className="!left-2 z-20 border-0 bg-white/90 text-primary shadow-[0_6px_16px_rgba(10,35,109,0.18)] hover:bg-white max-sm:!hidden" />
              <CarouselNext className="!right-2 z-20 border-0 bg-white/90 text-primary shadow-[0_6px_16px_rgba(10,35,109,0.18)] hover:bg-white max-sm:!hidden" />
            </Carousel>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
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
              <Badge className="w-fit" variant="secondary">
                Social media content
              </Badge>
              <h3
                className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl"
                id="why-men-vaccine-title"
              >
                Why Do Men Need the HPV Vaccine?
              </h3>
              <p className="mt-4 text-base leading-7 text-card-foreground/75">
                A male-focused content set that makes HPV prevention feel
                relevant, responsible, and easy to share across short-form and
                social platforms.
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
