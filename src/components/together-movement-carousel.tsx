"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BookOpenCheck,
  CalendarHeart,
  HeartHandshake,
  MapPin,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
  Users,
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
    title: "Campaign banner",
    eyebrow: "Campaign identity",
    summary:
      "The Together Movement frames HPV prevention as something friends, couples, and peers can do together.",
    alt: "Love Shield The Together Movement campaign banner with a group of young adults",
    height: 360,
    src: "/together-movement/slides/01-campaign-banner.png",
    width: 1086,
  },
  {
    title: "Protect yourself, protect your people",
    eyebrow: "Instagram carousel / TikTok concept 1",
    summary:
      "The first concept slide introduces shared protection as a simple social action.",
    alt: "Together Movement carousel slide about protecting yourself and people you care about",
    height: 428,
    src: "/together-movement/slides/02-carousel-protect-people.png",
    width: 254,
  },
  {
    title: "How to join",
    eyebrow: "Instagram carousel / TikTok concept 2",
    summary:
      "A step-by-step card turns the movement into clear actions: learn, book, go together, and share.",
    alt: "Together Movement carousel slide listing how to join the campaign",
    height: 428,
    src: "/together-movement/slides/03-carousel-how-to-join.png",
    width: 236,
  },
  {
    title: "Join The Together Movement",
    eyebrow: "Instagram carousel / TikTok concept 3",
    summary:
      "The final concept card gives the movement a shareable hashtag and VNVC information pathway.",
    alt: "Together Movement carousel slide with hashtags and VNVC center call to action",
    height: 428,
    src: "/together-movement/slides/04-carousel-join-movement.png",
    width: 216,
  },
  {
    title: "TikTok / Instagram challenge post",
    eyebrow: "Challenge post",
    summary:
      "The phone mockup shows the movement as a short-form social challenge audiences can join.",
    alt: "Phone mockup for The Together Movement TikTok and Instagram challenge post",
    height: 620,
    src: "/together-movement/slides/05-challenge-post-phone.png",
    width: 312,
  },
  {
    title: "We came in together",
    eyebrow: "UGC / story template 1",
    summary:
      "A story template encourages people to share that they learned, consulted, and protected together.",
    alt: "Together Movement story template saying we came in together and we protect together",
    height: 430,
    src: "/together-movement/slides/06-story-template-together.png",
    width: 204,
  },
  {
    title: "Date check-in",
    eyebrow: "UGC / story template 2",
    summary:
      "A couple-focused template makes HPV facts and consultation part of a caring relationship moment.",
    alt: "Together Movement date check-in story template about HPV facts and consultation",
    height: 430,
    src: "/together-movement/slides/07-story-template-date-checkin.png",
    width: 202,
  },
  {
    title: "Our crew chose care",
    eyebrow: "UGC / story template 3",
    summary:
      "A group template encourages friends to show learning and protection as a shared choice.",
    alt: "Together Movement story template with friends holding learn together and protect together signs",
    height: 430,
    src: "/together-movement/slides/08-story-template-crew.png",
    width: 192,
  },
  {
    title: "Your story can inspire someone else",
    eyebrow: "Story prompt card",
    summary:
      "The prompt card invites audiences to share facts, take action with someone, and inspire others.",
    alt: "Together Movement prompt card saying your story can inspire someone else to act",
    height: 282,
    src: "/together-movement/slides/09-story-inspire-card.png",
    width: 389,
  },
  {
    title: "You do not have to do prevention alone",
    eyebrow: "TikTok / Reels scene 1",
    summary:
      "The first storyboard scene anchors the campaign in friendship and shared support.",
    alt: "TikTok Reels storyboard scene saying you do not have to do prevention alone",
    height: 555,
    src: "/together-movement/slides/10-reels-prevention-alone.png",
    width: 264,
  },
  {
    title: "Learn together. Ask together.",
    eyebrow: "TikTok / Reels scene 2",
    summary:
      "The second scene shows HPV facts as something young people can learn and ask about together.",
    alt: "TikTok Reels storyboard scene saying learn together and ask together",
    height: 555,
    src: "/together-movement/slides/11-reels-learn-together.png",
    width: 264,
  },
  {
    title: "Book it. Go together.",
    eyebrow: "TikTok / Reels scene 3",
    summary:
      "The third scene moves from awareness into action through booking and visiting VNVC together.",
    alt: "TikTok Reels storyboard scene about booking and going to VNVC together",
    height: 555,
    src: "/together-movement/slides/12-reels-book-together.png",
    width: 264,
  },
  {
    title: "Protect the people you care about",
    eyebrow: "TikTok / Reels scene 4",
    summary:
      "The final storyboard scene closes with a green-flag call to join the movement.",
    alt: "TikTok Reels storyboard scene about protecting people you care about",
    height: 555,
    src: "/together-movement/slides/13-reels-protect-people.png",
    width: 251,
  },
  {
    title: "Instagram story launch",
    eyebrow: "Story poll",
    summary:
      "The launch story turns participation into a direct question about who the audience would go with.",
    alt: "Together Movement Instagram story launch poll asking who would you go with",
    height: 617,
    src: "/together-movement/slides/14-instagram-story-launch.png",
    width: 264,
  },
  {
    title: "Facebook educational post",
    eyebrow: "Shareable post",
    summary:
      "The Facebook post explains how learning, booking, and sharing can become a collective prevention action.",
    alt: "Together Movement Facebook educational post",
    height: 632,
    src: "/together-movement/slides/15-facebook-educational-post.png",
    width: 426,
  },
  {
    title: "Website / VNVC info card",
    eyebrow: "Action pathway",
    summary:
      "The VNVC card gives audiences a clear next step through trusted information and the center finder.",
    alt: "Together Movement website and VNVC information card",
    height: 632,
    src: "/together-movement/slides/16-vnvc-info-card.png",
    width: 336,
  },
];

const contentRows = [
  {
    icon: Users,
    term: "Campaign purpose",
    detail:
      "Promote HPV vaccination as a shared act of care among friends, couples, and peers.",
  },
  {
    icon: CalendarHeart,
    term: "Participation flow",
    detail:
      "Learn an HPV fact, book a consultation, go with someone, and share the journey.",
  },
  {
    icon: ShieldCheck,
    term: "Key message",
    detail: "Protect yourself, protect the people you care about.",
  },
  {
    icon: BookOpenCheck,
    term: "Campaign behaviour",
    detail:
      "Turn prevention from a private worry into a visible, supportive, youth-friendly movement.",
  },
];

const outputChips = [
  {
    icon: MessageCircle,
    label: "TikTok challenge launch",
  },
  {
    icon: MessagesSquare,
    label: "Facebook and Instagram posts",
  },
  {
    icon: HeartHandshake,
    label: "3-5 Story templates",
  },
  {
    icon: MapPin,
    label: "VNVC booking pathway",
  },
];

export function TogetherMovementCarousel() {
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
    <ScrollFloatItem className="scroll-mt-40" id="together-movement">
      <section
        aria-labelledby="together-movement-title"
        className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-[0_20px_48px_rgba(10,35,109,0.14)]"
      >
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.24fr)_minmax(21rem,0.76fr)]">
          <div className="min-w-0 bg-[linear-gradient(135deg,rgba(255,248,243,0.74),rgba(202,218,234,0.62))] p-3 sm:p-4">
            <Carousel
              aria-label="The Together Movement campaign visuals"
              className="mx-auto w-full"
              opts={{ align: "start" }}
              setApi={setApi}
            >
              <CarouselContent className="!ml-0">
                {slides.map((slide) => {
                  const isWide = slide.width > slide.height;

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
                id="together-movement-title"
              >
                The Together Movement
              </h3>
              <p className="mt-4 text-base leading-7 text-card-foreground/75">
                A participatory challenge that makes HPV prevention feel social,
                supportive, and easier to start with the people you trust.
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
