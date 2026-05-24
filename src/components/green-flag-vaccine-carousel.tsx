"use client";

import { useEffect, useId, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  Heart,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const panels = [
  {
    title: "Slide 1 of 5 - Cover",
  },
  {
    title: "Slide 2 of 5 - What is a Green Flag?",
  },
  {
    title: "Slide 3 of 5 - Why HPV Matters",
  },
  {
    title: "Slide 4 of 5 - Green Flag Checklist",
  },
  {
    title: "Slide 5 of 5 - End Card",
  },
];

const featurePills = [
  {
    icon: Heart,
    text: "Self-care for your future.",
    color: "bg-[#F4A5C8]/20 text-[#B84F82]",
  },
  {
    icon: Users,
    text: "A choice of love and respect.",
    color: "bg-[#C8A8F8]/20 text-[#7B6FE8]",
  },
  {
    icon: ShieldCheck,
    text: "HPV vaccine prevents cancer.",
    color: "bg-[#B8C6F6]/20 text-[#4B6DD6]",
  },
  {
    icon: Sparkles,
    text: "Small step. Stronger future.",
    color: "bg-[#7EC8A0]/20 text-[#3A8B62]",
  },
];

const flagCards = [
  {
    icon: MessageCircle,
    title: "Talks openly about health",
    text: "No shame, no judgment. Just honesty.",
    color: "bg-[#F4A5C8]/25 text-[#B84F82]",
  },
  {
    icon: ShieldCheck,
    title: "Knows about HPV prevention",
    text: "Informed about the vaccine for both genders.",
    color: "bg-[#C8A8F8]/25 text-[#7B6FE8]",
  },
  {
    icon: HeartHandshake,
    title: "Respects health choices",
    text: "Supports you with no pressure and no stigma.",
    color: "bg-[#7EC8A0]/25 text-[#3A8B62]",
  },
];

const statCards = [
  {
    value: "4,132",
    label: "new cervical cancer cases in Vietnam each year",
    color: "text-[#E878A8]",
  },
  {
    value: "12%",
    label: "of Vietnamese women aged 15-29 vaccinated in 2021",
    color: "text-[#7B6FE8]",
  },
  {
    value: "80%",
    label: "of sexually active people will encounter HPV",
    color: "text-[#4B6DD6]",
  },
  {
    value: "Gardasil 9",
    label: "prevents up to 9 cancer-causing HPV types",
    color: "text-[#3A8B62]",
    badge: "Available at VNVC",
  },
];

const checklist = [
  "Listens and remembers what matters to you",
  "Respects boundaries without question",
  "Checks in on you without being asked",
  "Shows up during health moments",
  "Knows about HPV prevention and the vaccine",
];

type GreenFlagVaccineCarouselProps = {
  id?: string;
};

export function GreenFlagVaccineCarousel({
  id,
}: GreenFlagVaccineCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
    <ScrollFloatItem className="scroll-mt-40" id={id}>
      <div className="green-flag-carousel-scale grid gap-4">
        <Carousel
          aria-label="The Green Flag Vaccine carousel"
          className="mx-auto w-full max-w-[31.25rem]"
          opts={{ align: "start" }}
          setApi={setApi}
        >
          <CarouselContent className="!ml-0">
            <CarouselItem className="!pl-0">
              <CoverSlide />
            </CarouselItem>
            <CarouselItem className="!pl-0">
              <GreenFlagSlide />
            </CarouselItem>
            <CarouselItem className="!pl-0">
              <HpvMattersSlide />
            </CarouselItem>
            <CarouselItem className="!pl-0">
              <ChecklistSlide />
            </CarouselItem>
            <CarouselItem className="!pl-0">
              <EndCardSlide />
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="!left-2 z-20 border-0 bg-white/90 text-[#4B6DD6] shadow-[0_4px_14px_rgba(75,109,214,0.2)] hover:bg-white max-sm:!hidden sm:!-left-5" />
          <CarouselNext className="!right-2 z-20 border-0 bg-white/90 text-[#4B6DD6] shadow-[0_4px_14px_rgba(75,109,214,0.2)] hover:bg-white max-sm:!hidden sm:!-right-5" />
        </Carousel>

        <div className="flex items-center justify-center gap-1.5">
          {panels.map((item, index) => (
            <Button
              aria-label={`Go to ${item.title}`}
              className={cn(
                "h-2 p-0 transition-all",
                index === current
                  ? "w-6 bg-[#4B6DD6] hover:bg-[#4B6DD6]"
                  : "w-2 bg-[#4B6DD6]/20 hover:bg-[#4B6DD6]/40",
              )}
              key={item.title}
              onClick={() => api?.scrollTo(index)}
              size="icon-xs"
              type="button"
            >
              <span className="sr-only">{item.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </ScrollFloatItem>
  );
}

function SlideShell({
  children,
  className,
  background,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  background: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "green-flag-slide-shell relative aspect-square w-full overflow-hidden shadow-[0_12px_48px_rgba(75,109,214,0.16)]",
        dark ? "text-white" : "text-[#2A3580]",
        className,
      )}
      style={{ background, borderRadius: "24px" }}
    >
      {children}
    </div>
  );
}

function CoverSlide() {
  return (
    <SlideShell background="linear-gradient(145deg,#fce8f0 0%,#ede0f8 40%,#d8d4f5 100%)">
      <SoftGlow />
      <div
        aria-hidden="true"
        className="absolute left-[35%] top-[-30%] z-[1] h-[140%] w-px rotate-[25deg] bg-gradient-to-b from-transparent via-white/50 to-transparent"
      />
      <Sparkle className="left-6 top-12 text-[#C8A8F8]" size="text-xl" />
      <Sparkle className="right-14 top-20 text-[#F4A5C8]" delay="0.9s" />
      <Sparkle
        className="bottom-24 left-5 text-[#B8C6F6]"
        delay="1.4s"
        size="text-base"
      />

      <HeroShield />

      <CardContent className="relative z-10 flex h-full flex-col px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-start justify-between gap-4">
          <LoveShieldLogo labelClassName="text-[#4B6DD6]" />
          <p className="font-[family-name:var(--font-dm-sans)] text-right text-[0.68rem] font-medium leading-5 text-[#5A5080] sm:text-xs">
            Protect your love.
            <br />
            Protect yourself.
          </p>
        </div>

        <div className="mt-auto max-w-[17rem] sm:max-w-[20rem]">
          <h3 className="font-[family-name:var(--font-playfair)] text-[2.3rem] font-bold leading-[1.04] text-[#2A3580] sm:text-[2.75rem]">
            The
            <br />
            <em className="block text-[#7B6FE8]">Green Flag</em>
            Vaccine
          </h3>
          <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-xs leading-5 text-[#3A5080] sm:text-sm">
            Being informed about HPV
            <br />
            is a <strong className="font-semibold text-[#3A8B62]">green flag.</strong>
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {featurePills.map((pill) => (
              <FeaturePill key={pill.text} {...pill} />
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-[12px] bg-[linear-gradient(90deg,#3A4DB0,#5B6FE0)] px-4 py-3 font-[family-name:var(--font-dm-sans)] text-white">
            <p className="text-[0.68rem] font-medium leading-4 sm:text-xs">
              Talk. Learn. Protect.
              <br />
              <span className="text-[0.62rem] opacity-80">
                Because real love looks out for each other.
              </span>
            </p>
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/20">
              <ArrowRight aria-hidden="true" size={14} />
            </span>
          </div>
        </div>
      </CardContent>
    </SlideShell>
  );
}

function GreenFlagSlide() {
  return (
    <SlideShell background="linear-gradient(150deg,#F5EFFE 0%,#EBE4F8 50%,#F0EAFF 100%)">
      <Sparkle className="right-6 top-9 text-[#C8A8F8]" delay="0.5s" />
      <Sparkle className="bottom-20 right-5 text-[#F4A5C8]" delay="1.4s" />
      <SlideCounter current={2} />

      <CardContent className="relative z-10 flex h-full flex-col px-5 py-5 sm:px-7 sm:py-6">
        <LoveShieldLogo compact labelClassName="text-[#4B6DD6]" />
        <SlideLabel className="mt-4">What&apos;s a green flag?</SlideLabel>
        <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.58rem] font-bold leading-tight text-[#2A3580] sm:text-[1.75rem]">
          Signs someone actually cares - including about{" "}
          <em className="text-[#7B6FE8]">your health.</em>
        </h3>

        <div className="mt-4 grid flex-1 content-start gap-2">
          {flagCards.map((card) => (
            <FlagCard key={card.title} {...card} />
          ))}
        </div>

        <p className="mt-3 text-center font-[family-name:var(--font-dm-sans)] text-[0.68rem] italic leading-5 text-[#7060A0] sm:text-xs">
          HPV does not choose a gender. Prevention is for everyone.
        </p>
      </CardContent>
    </SlideShell>
  );
}

function HpvMattersSlide() {
  return (
    <SlideShell background="linear-gradient(150deg,#EAE0F8 0%,#F2E8F5 50%,#EEE4F8 100%)">
      <Sparkle className="right-6 top-10 text-[#C8A8F8]" delay="0.6s" />
      <Sparkle
        className="bottom-24 left-4 text-[#B8C6F6]"
        delay="1.1s"
        size="text-xl"
      />
      <SlideCounter current={3} />

      <CardContent className="relative z-10 flex h-full flex-col px-5 py-5 sm:px-7 sm:py-6">
        <LoveShieldLogo compact labelClassName="text-[#4B6DD6]" />
        <SlideLabel className="mt-4">Why HPV matters</SlideLabel>
        <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.7rem] font-bold leading-tight text-[#2A3580] sm:text-[1.9rem]">
          The numbers are <em className="text-[#E878A8]">real.</em>
        </h3>
        <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-xs leading-5 text-[#6050A0] sm:text-sm">
          HPV affects all genders, and most people never know they have it.
        </p>

        <div className="mt-4 grid flex-1 grid-cols-2 gap-2">
          {statCards.map((stat) => (
            <Card
              className="!rounded-[16px] border border-[#9B7FE8]/15 bg-white/70 !px-0 !py-0"
              key={stat.value}
            >
              <CardContent className="grid h-full content-start gap-1 px-3 py-3">
                <p
                  className={cn(
                    "font-[family-name:var(--font-playfair)] text-[1.55rem] font-bold leading-none",
                    stat.value === "Gardasil 9" && "text-lg",
                    stat.color,
                  )}
                >
                  {stat.value}
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-[0.68rem] leading-4 text-[#6050A0]">
                  {stat.label}
                </p>
                {stat.badge ? (
                  <Badge className="mt-1 w-fit bg-[#7EC8A0]/20 text-[0.55rem] text-[#3A8B62]">
                    {stat.badge}
                  </Badge>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-[14px] bg-[linear-gradient(135deg,#4B6DD6_0%,#7B6FE8_50%,#9B7FD8_100%)] px-4 py-3 text-white">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#7EC8A0]/35">
            <BookOpenCheck aria-hidden="true" size={16} />
          </span>
          <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium leading-5">
            Knowing this is a green flag. Small step. Stronger future.
          </p>
        </div>
      </CardContent>
    </SlideShell>
  );
}

function ChecklistSlide() {
  return (
    <SlideShell background="linear-gradient(150deg,#F0E8FF 0%,#EAE0F8 50%,#F5F0FF 100%)">
      <Sparkle className="right-5 top-9 text-[#F4A5C8]" delay="0.7s" />
      <Sparkle className="bottom-28 left-4 text-[#C8A8F8]" delay="1.5s" />
      <SlideCounter current={4} />

      <CardContent className="relative z-10 flex h-full flex-col px-5 py-5 sm:px-7 sm:py-6">
        <LoveShieldLogo compact labelClassName="text-[#4B6DD6]" />
        <SlideLabel className="mt-4">Green Flag Checklist</SlideLabel>
        <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.7rem] font-bold leading-tight text-[#2A3580] sm:text-[1.9rem]">
          Does your partner pass all five?
        </h3>
        <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-[0.72rem] leading-5 text-[#7060A0]">
          Save this. Share it with someone you love.
        </p>

        <div className="mt-3 grid flex-1 content-start gap-2">
          {checklist.map((item, index) => {
            const highlighted = index === checklist.length - 1;

            return (
              <div
                className={cn(
                  "flex min-h-11 items-center gap-2.5 rounded-[12px] border border-[#9B7FE8]/15 bg-white/70 px-3 py-2 font-[family-name:var(--font-dm-sans)]",
                  highlighted && "border-[#7EC8A0]/35 bg-[#7EC8A0]/15",
                )}
                key={item}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-[6px] text-white",
                    highlighted
                      ? "bg-[linear-gradient(135deg,#9B7FE8,#C8A8F8)]"
                      : "bg-[linear-gradient(135deg,#7EC8A0,#5BB890)]",
                  )}
                >
                  {highlighted ? (
                    <Star aria-hidden="true" size={13} />
                  ) : (
                    <Check aria-hidden="true" size={13} />
                  )}
                </span>
                <p
                  className={cn(
                    "flex-1 text-xs font-medium leading-4 text-[#3C1E6E]",
                    highlighted && "font-semibold text-[#2A6B4A]",
                  )}
                >
                  {item}
                </p>
                {highlighted ? (
                  <Badge className="bg-[linear-gradient(90deg,#9B7FE8,#F4A5C8)] px-2 text-[0.55rem] text-white">
                    New
                  </Badge>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-3 rounded-[14px] bg-[linear-gradient(135deg,#4B6DD6_0%,#7B6FE8_50%,#9B7FD8_100%)] px-4 py-3 text-center text-white">
          <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium leading-5">
            All five = the real green flag.
            <br />
            <span className="text-[0.65rem] opacity-80">
              Share with someone you care about
            </span>
          </p>
        </div>
      </CardContent>
    </SlideShell>
  );
}

function EndCardSlide() {
  return (
    <SlideShell
      background="linear-gradient(150deg,#2A3580 0%,#4B5ED8 50%,#7B6FE8 100%)"
      dark
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(244,165,200,0.38)_0%,transparent_55%),radial-gradient(ellipse_at_10%_85%,rgba(200,168,248,0.28)_0%,transparent_50%)]"
      />
      <Sparkle className="left-6 top-11 text-[#F4A5C8]" delay="0.4s" />
      <Sparkle
        className="right-7 top-14 text-white/45"
        delay="1s"
        size="text-2xl"
      />
      <Sparkle
        className="bottom-28 left-7 text-[#C8A8F8]"
        delay="1.7s"
        size="text-sm"
      />
      <SlideCounter current={5} dark />

      <CardContent className="relative z-10 grid h-full place-items-center px-6 py-8 text-center">
        <div className="grid justify-items-center gap-3">
          <LoveShieldLogo dark />
          <h3 className="font-[family-name:var(--font-playfair)] text-[1.6rem] font-bold leading-tight text-white">
            Being informed about HPV
            <br />
            is a <em className="text-[#F4A5C8]">green flag.</em>
          </h3>
          <span className="h-0.5 w-12 rounded-full bg-[linear-gradient(90deg,#F4A5C8,#C8A8F8)]" />
          <p className="font-[family-name:var(--font-dm-sans)] text-sm leading-6 text-white/80">
            Protect your love. Protect yourself.
            <br />
            <span className="text-xs opacity-70">
              Real love looks out for each other.
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {[
              "#HPVGreenFlag",
              "#LoveShield",
              "#GreenFlag",
              "#TogetherAgainstHPV",
            ].map((tag) => (
              <Badge
                className="border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] text-white/75"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Badge className="mt-1 border border-white/45 bg-white/15 px-5 py-2 text-xs font-semibold uppercase text-white">
            loveshield.vn
          </Badge>
          <p className="font-[family-name:var(--font-dm-sans)] text-[0.62rem] uppercase tracking-normal text-white/40">
            In partnership with VNVC Vaccination Centre
          </p>
        </div>
      </CardContent>
    </SlideShell>
  );
}

function FeaturePill({
  icon: Icon,
  text,
  color,
}: {
  icon: LucideIcon;
  text: string;
  color: string;
}) {
  return (
    <div className="flex min-h-12 items-center gap-2 rounded-[12px] border border-white/60 bg-white/70 px-2 py-2 font-[family-name:var(--font-dm-sans)] backdrop-blur">
      <span
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-[8px]",
          color,
        )}
      >
        <Icon aria-hidden="true" size={15} />
      </span>
      <p className="text-[0.62rem] font-medium leading-4 text-[#4A4070] sm:text-[0.68rem]">
        {text}
      </p>
    </div>
  );
}

function FlagCard({
  icon: Icon,
  title,
  text,
  color,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-[#9B7FE8]/15 bg-white/70 px-3 py-3 font-[family-name:var(--font-dm-sans)] transition hover:translate-x-1">
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-[10px]",
          color,
        )}
      >
        <Icon aria-hidden="true" size={18} />
      </span>
      <p className="text-xs leading-5 text-[#3C1E6E]">
        <strong className="block font-semibold text-[#2A3580]">{title}</strong>
        {text}
      </p>
    </div>
  );
}

function SlideLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-[family-name:var(--font-dm-sans)] text-[0.6rem] font-medium uppercase text-[#9B7FE8]",
        className,
      )}
    >
      {children}
    </p>
  );
}

function SlideCounter({
  current,
  dark = false,
}: {
  current: number;
  dark?: boolean;
}) {
  return (
    <Badge
      className={cn(
        "absolute right-4 top-4 z-20 bg-white/70 px-2.5 py-1 font-[family-name:var(--font-dm-sans)] text-[0.65rem] text-[#4B6DD6] backdrop-blur",
        dark && "bg-white/15 text-white",
      )}
    >
      {current} / 5
    </Badge>
  );
}

function Sparkle({
  className,
  delay = "0s",
  size = "text-base",
}: {
  className?: string;
  delay?: string;
  size?: string;
}) {
  return (
    <Sparkles
      aria-hidden="true"
      className={cn(
        "green-flag-spark absolute z-10 pointer-events-none",
        size,
        className,
      )}
      style={{ animationDelay: delay }}
    />
  );
}

function SoftGlow() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(244,165,200,0.55)_0%,transparent_55%),radial-gradient(ellipse_at_15%_80%,rgba(200,168,248,0.4)_0%,transparent_50%),radial-gradient(ellipse_at_60%_90%,rgba(184,198,246,0.3)_0%,transparent_45%)]"
    />
  );
}

function LoveShieldLogo({
  compact = false,
  dark = false,
  labelClassName,
}: {
  compact?: boolean;
  dark?: boolean;
  labelClassName?: string;
}) {
  const size = compact ? 22 : dark ? 40 : 30;
  const gradientId = useId().replace(/:/g, "");

  return (
    <div className="flex items-center gap-2">
      <svg
        aria-hidden="true"
        className="shrink-0"
        fill="none"
        height={size}
        viewBox="0 0 40 44"
        width={Math.round(size * 0.91)}
      >
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={gradientId}
            x1="0"
            x2="40"
            y1="0"
            y2="44"
          >
            <stop stopColor={dark ? "rgba(255,255,255,0.18)" : "#F4A5C8"} />
            <stop
              offset="1"
              stopColor={dark ? "rgba(255,255,255,0.18)" : "#4B6DD6"}
            />
          </linearGradient>
        </defs>
        <path
          d="M20 2 L37 8 L37 24 C37 34 29.5 40 20 43 C10.5 40 3 34 3 24 L3 8 Z"
          fill={`url(#${gradientId})`}
          stroke={dark ? "rgba(255,255,255,0.6)" : "none"}
          strokeWidth={dark ? 1.5 : 0}
        />
        <path
          d="M12 24 Q12 18 16 14 Q18.5 12 20 15 Q21.5 12 24 14 Q28 18 28 24 Q28 29.5 20 33 Q12 29.5 12 24Z"
          fill="white"
          opacity=".9"
        />
      </svg>
      <span
        className={cn(
          "font-[family-name:var(--font-playfair)] text-xs font-bold leading-tight",
          dark ? "text-white" : labelClassName,
        )}
      >
        Love
        <br />
        Shield
      </span>
    </div>
  );
}

function HeroShield() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -right-4 top-6 z-[2] w-[12rem] sm:w-[15rem]"
      fill="none"
      viewBox="0 0 260 290"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="green-flag-shield-main"
          x1="0"
          x2="260"
          y1="0"
          y2="290"
        >
          <stop offset="0%" stopColor="#F4A5C8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#C8A8F8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#4B6DD6" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="green-flag-shield-ring"
          x1="0"
          x2="260"
          y1="0"
          y2="290"
        >
          <stop offset="0%" stopColor="#F9D0E4" />
          <stop offset="100%" stopColor="#8090E0" />
        </linearGradient>
        <linearGradient id="green-flag-shield-shine" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="green-flag-shield-shadow">
          <feDropShadow
            dx="0"
            dy="8"
            floodColor="#6B5FD0"
            floodOpacity="0.35"
            stdDeviation="16"
          />
        </filter>
      </defs>
      <ellipse cx="132" cy="265" fill="rgba(100,80,220,0.15)" rx="80" ry="14" />
      <ellipse cx="132" cy="262" fill="rgba(100,80,220,0.1)" rx="55" ry="8" />
      <ellipse
        cx="132"
        cy="220"
        opacity="0.4"
        rx="110"
        ry="22"
        stroke="url(#green-flag-shield-ring)"
        strokeDasharray="4 3"
        strokeWidth="1.5"
      />
      <path
        d="M132 16 L226 52 L226 138 C226 194 185 228 132 246 C79 228 38 194 38 138 L38 52 Z"
        fill="url(#green-flag-shield-main)"
        filter="url(#green-flag-shield-shadow)"
      />
      <path
        d="M132 28 L214 60 L214 136 C214 184 177 215 132 231 C87 215 50 184 50 136 L50 60 Z"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
      />
      <path
        d="M132 28 L214 60 L214 136 C214 184 177 215 132 231 C87 215 50 184 50 136 L50 60 Z"
        fill="url(#green-flag-shield-shine)"
        opacity="0.35"
      />
      <path
        d="M90 128 Q90 106 106 96 Q118 88 132 102 Q146 88 158 96 Q174 106 174 128 Q174 150 132 166 Q90 150 90 128Z"
        fill="white"
        opacity="0.88"
      />
      <path
        d="M226 52 L242 62 L242 148 C242 204 201 236 148 252 L132 246 C185 228 226 194 226 138 Z"
        fill="rgba(60,60,150,0.25)"
      />
    </svg>
  );
}
