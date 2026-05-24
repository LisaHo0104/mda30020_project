"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BookOpenCheck,
  CalendarHeart,
  Gift,
  MapPin,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
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
    title: "V-Shield Booth hero",
    eyebrow: "Booth concept",
    summary:
      "The main booth visual introduces the Scan, Learn, Snap experience as an on-campus prevention touchpoint.",
    alt: "V-Shield Booth campaign hero showing students interacting with the booth",
    height: 610,
    src: "/v-shield-booth/slides/01-booth-hero.png",
    width: 1122,
  },
  {
    title: "Booth journey actions",
    eyebrow: "Experience flow",
    summary:
      "The booth turns HPV learning into five quick actions: quiz, anonymous question, photo, voucher, and share.",
    alt: "V-Shield Booth action strip listing quiz, anonymous questions, photos, vouchers, and sharing",
    height: 150,
    src: "/v-shield-booth/slides/02-booth-journey-actions.png",
    width: 1054,
  },
  {
    title: "Photo booth experience",
    eyebrow: "On-site activation",
    summary:
      "Students can take instant photos in a branded booth environment designed for approachable participation.",
    alt: "Students posing at the V-Shield photo booth experience",
    height: 436,
    src: "/v-shield-booth/slides/03-photo-booth-experience.png",
    width: 442,
  },
  {
    title: "Scan and start",
    eyebrow: "QR entry point",
    summary:
      "A QR screen makes the first step fast and clear for students walking by the booth.",
    alt: "V-Shield Booth scan and start QR screen",
    height: 211,
    src: "/v-shield-booth/slides/04-scan-start.png",
    width: 298,
  },
  {
    title: "Quiz screen",
    eyebrow: "Interactive quiz",
    summary:
      "The quiz screen turns HPV facts into a low-pressure, anonymous learning moment.",
    alt: "V-Shield Booth HPV quiz screen",
    height: 211,
    src: "/v-shield-booth/slides/05-quiz-screen.png",
    width: 296,
  },
  {
    title: "Photo strip",
    eyebrow: "Takeaway item",
    summary:
      "Instant photo strips give students a physical reminder of the campaign and the booth experience.",
    alt: "Printed Love Shield photo strip from the booth",
    height: 216,
    src: "/v-shield-booth/slides/06-photo-strip.png",
    width: 298,
  },
  {
    title: "Voucher redemption",
    eyebrow: "Action incentive",
    summary:
      "VNVC vouchers connect the activation to a practical next step after the booth.",
    alt: "V-Shield Booth VNVC voucher redemption visual",
    height: 216,
    src: "/v-shield-booth/slides/07-voucher-redemption.png",
    width: 296,
  },
  {
    title: "V-Shield Booth features",
    eyebrow: "Feature system",
    summary:
      "The booth is framed as sleek, interactive, branded, private, and meaningful.",
    alt: "V-Shield Booth feature strip",
    height: 90,
    src: "/v-shield-booth/slides/08-booth-features.png",
    width: 1054,
  },
  {
    title: "Information today",
    eyebrow: "Footer message",
    summary:
      "The footer line ties information today to protection tomorrow and the campaign's care message.",
    alt: "V-Shield Booth footer saying information today protection tomorrow love always",
    height: 66,
    src: "/v-shield-booth/slides/09-footer-message.png",
    width: 1122,
  },
  {
    title: "What happens at the booth?",
    eyebrow: "Step-by-step explainer",
    summary:
      "The process panel explains how students move from scanning a QR code to receiving VNVC information or a voucher.",
    alt: "What happens at the booth step-by-step explainer",
    height: 470,
    src: "/v-shield-booth/slides/10-what-happens-at-booth.png",
    width: 704,
  },
  {
    title: "Instagram story phone",
    eyebrow: "Story example",
    summary:
      "A phone mockup shows how the booth can be promoted through an Instagram Story format.",
    alt: "V-Shield Booth Instagram story shown in a phone mockup",
    height: 432,
    src: "/v-shield-booth/slides/11-instagram-story-phone.png",
    width: 220,
  },
  {
    title: "Protect your love story card",
    eyebrow: "Story / post example",
    summary:
      "A vertical social graphic turns the booth message into a clean, shareable post.",
    alt: "Protect your love protect yourself social story example",
    height: 432,
    src: "/v-shield-booth/slides/12-story-post-example.png",
    width: 197,
  },
  {
    title: "Instagram post example",
    eyebrow: "Feed post",
    summary:
      "The feed post shows students engaging with the booth and links the message to the campus activation.",
    alt: "Instagram post example for the V-Shield Booth campus activation",
    height: 432,
    src: "/v-shield-booth/slides/13-instagram-post-example.png",
    width: 245,
  },
  {
    title: "Branded materials",
    eyebrow: "Print assets",
    summary:
      "Posters, pass cards, tote bags, standees, and info cards extend the booth identity offline.",
    alt: "V-Shield Booth branded materials including poster pass card tote bag standee and info card",
    height: 468,
    src: "/v-shield-booth/slides/14-branded-materials.png",
    width: 753,
  },
  {
    title: "UGC / booth recap",
    eyebrow: "Recap content",
    summary:
      "The recap content shows students sharing signs, booth moments, printed materials, and group photos.",
    alt: "V-Shield Booth UGC and booth recap collage",
    height: 468,
    src: "/v-shield-booth/slides/15-ugc-booth-recap.png",
    width: 638,
  },
  {
    title: "Protection tomorrow",
    eyebrow: "Closing strip",
    summary:
      "The closing strip repeats the campaign line as a polished end-card asset.",
    alt: "V-Shield Booth closing strip saying information today protection tomorrow love always",
    height: 81,
    src: "/v-shield-booth/slides/16-footer-strip.png",
    width: 1448,
  },
];

const contentRows = [
  {
    icon: Sparkles,
    term: "Campaign purpose",
    detail:
      "Turn HPV education into an interactive university pop-up experience.",
  },
  {
    icon: BookOpenCheck,
    term: "Booth flow",
    detail:
      "Students scan QR codes, answer quizzes, ask anonymously, take photos, and receive VNVC information or vouchers.",
  },
  {
    icon: ShieldCheck,
    term: "Key message",
    detail: "Ask now. Stress less later.",
  },
  {
    icon: Gift,
    term: "Action pathway",
    detail:
      "Make prevention feel immediate by linking booth participation to practical VNVC next steps.",
  },
];

const outputChips = [
  {
    icon: CalendarHeart,
    label: "1 booth activation",
  },
  {
    icon: MessageCircle,
    label: "Promo and recap videos",
  },
  {
    icon: MessagesSquare,
    label: "3-4 Story updates",
  },
  {
    icon: MapPin,
    label: "QR and printed materials",
  },
];

export function VShieldBoothCarousel() {
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
    <ScrollFloatItem className="scroll-mt-40" id="v-shield-booth">
      <section
        aria-labelledby="v-shield-booth-title"
        className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-[0_20px_48px_rgba(10,35,109,0.14)]"
      >
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.24fr)_minmax(21rem,0.76fr)]">
          <div className="min-w-0 bg-[linear-gradient(135deg,rgba(255,248,243,0.74),rgba(202,218,234,0.62))] p-3 sm:p-4">
            <Carousel
              aria-label="V-Shield Booth campaign visuals"
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
                id="v-shield-booth-title"
              >
                V-Shield Booth
              </h3>
              <p className="mt-4 text-base leading-7 text-card-foreground/75">
                A campus pop-up that makes HPV education interactive,
                photo-friendly, and connected to trusted next steps.
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
