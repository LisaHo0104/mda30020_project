import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  Flag,
  MonitorSmartphone,
  Stethoscope,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GreenFlagVaccineCarousel } from "@/components/green-flag-vaccine-carousel";
import { HpvFactsQuiz } from "@/components/hpv-facts-quiz";
import { ScrollFloat, ScrollFloatItem } from "@/components/scroll-float";
import { SharedStoriesGallery } from "@/components/shared-stories-gallery";
import { ShinyText } from "@/components/shiny-text";
import { SiteHeader } from "@/components/site-header";
import { VietnamVaccineMap } from "@/components/vietnam-vaccine-map";
import { vaccineMapRegions, vnvcCenterCount } from "@/data/vnvc-centers";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const hpvFacts = [
  {
    title: "HPV is common",
    text: "HPV is one of the most common sexually transmitted infections worldwide and refers to more than 200 related viruses.",
  },
  {
    title: "Many infections clear naturally",
    text: "Many HPV infections clear naturally, but some high-risk types can lead to cancers of the cervix, vulva, vagina, penis, anus, and mouth or throat.",
  },
  {
    title: "Prevention is for all genders",
    text: "HPV should be treated as a broader public health concern affecting all genders, not only as a women's health issue.",
  },
  {
    title: "Vaccination and screening matter",
    text: "WHO identifies vaccination and screening as key prevention strategies.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section
        className="hero-scene relative isolate overflow-hidden px-4 pb-3 pt-32 sm:px-6 sm:pb-4 sm:pt-36 lg:px-8"
        id="home"
      >
        <DecorativeHeroCards />
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pb-0 pt-4 sm:pb-1 sm:pt-8">
            <div className="max-w-2xl">
              <Badge
                className="gap-2 border-border/80 bg-card px-3 py-1 text-card-foreground"
                variant="outline"
              >
                <Flag aria-hidden="true" size={14} />
                Vietnamese Gen Z aged 18-29
              </Badge>
              <h1 className="mt-5 text-6xl font-semibold text-foreground sm:text-7xl">
                <span className="brand-lockup">
                  <span className="brand-script">Love</span>
                  {" "}
                  <span className="brand-serif">Shield</span>
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-2xl font-medium leading-tight text-primary sm:text-3xl">
                <ShinyText>
                  Being informed about HPV is a green flag. Protect yourself,
                  protect the people you care about.
                </ShinyText>
              </p>
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg">
              Love Shield is a proposed social media campaign designed to raise
              HPV awareness and encourage vaccine consideration among Vietnamese
              Gen Z aged 18-29.
            </p>

            <div className="hero-signal-grid mt-6 grid max-w-5xl gap-3 text-sm font-medium text-muted-foreground sm:grid-cols-3">
              <SignalItem icon={MonitorSmartphone} text="TikTok, Instagram, and Facebook" />
              <SignalItem icon={Users} text="Urban and semi-urban Gen Z" />
              <SignalItem icon={Stethoscope} text="VNVC as proposed health partner" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <GreenFlagVaccineCarousel id="green-flag-vaccine" />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8" id="shared-stories">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Shared Stories"
            title="Stories that make prevention feel human"
            text="Anonymous-style peer stories show how HPV prevention can become easier to discuss through friendship, dating, family, campus life, and everyday fact checking."
          />
          <ScrollFloatItem className="mt-8">
            <SharedStoriesGallery />
          </ScrollFloatItem>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8" id="vaccine-map">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Take Action"
            title="Find HPV vaccination support in Vietnam"
            text={`Click any dot to view one of ${vnvcCenterCount} VNVC centres from the official centre finder, open directions, and register through VNVC channels. This supports the campaign goal of moving from awareness to credible next steps.`}
          />

          <ScrollFloatItem className="mt-8">
            <VietnamVaccineMap
              bookingUrl="https://vnvc.vn/dang-ky-tiem-chung/"
              regions={vaccineMapRegions}
            />
          </ScrollFloatItem>
        </div>
      </section>

      <section
        className="border-y bg-secondary px-4 py-16 sm:px-6 lg:px-8"
        id="hpv-facts"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="HPV Facts"
            title="Core HPV information used by the campaign"
            text="HPV is framed as a broader public health concern affecting all genders."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {hpvFacts.map((fact) => (
              <InfoCard
                icon={BookOpenCheck}
                key={fact.title}
                title={fact.title}
                text={fact.text}
              />
            ))}
          </div>
          <ScrollFloatItem className="mt-6">
            <HpvFactsQuiz />
          </ScrollFloatItem>
        </div>
      </section>

      <footer className="border-t bg-card px-4 py-8 sm:px-6 lg:px-8">
        <ScrollFloatItem className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="font-medium text-foreground">
            Love Shield: HPV awareness and vaccine consideration for Vietnamese
            Gen Z aged 18-29.
          </p>
          <p>#LoveShield #HPVGreenFlag #TogetherAgainstHPV</p>
        </ScrollFloatItem>
      </footer>
    </main>
  );
}

function DecorativeHeroCards() {
  return (
    <div aria-hidden="true" className="hero-card-field">
      <div className="hero-card hero-card--ink">
        <span className="hero-card__title">
          Love
          <span className="hero-card__script">Shield</span>
        </span>
        <span className="star-mark" />
      </div>
      <div className="hero-card hero-card--paper">
        <span className="hero-card__title">
          care
          <span className="hero-card__script">confidence</span>
        </span>
      </div>
      <div className="hero-card hero-card--gradient">
        <span className="qr-mark" />
        <span className="crescent-mark" />
        <span className="star-mark" />
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <ScrollFloatItem className="max-w-3xl">
      <Badge className="bg-secondary text-secondary-foreground">{eyebrow}</Badge>
      <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
        <ScrollFloat text={title} />
      </h2>
      <p className="mt-4 text-base leading-7 text-foreground/75">{text}</p>
    </ScrollFloatItem>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <ScrollFloatItem className="h-full">
      <Card className="h-full min-h-60 border-border/80 bg-card shadow-sm">
        <CardHeader>
          <div className="mb-2 grid size-11 place-items-center rounded-lg bg-accent text-accent-foreground">
            <Icon aria-hidden="true" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="leading-6">{text}</CardDescription>
        </CardHeader>
      </Card>
    </ScrollFloatItem>
  );
}

function SignalItem({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <ScrollFloatItem className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon aria-hidden="true" size={18} />
      </span>
      {text}
    </ScrollFloatItem>
  );
}
