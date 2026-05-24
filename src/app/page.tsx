import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BookOpenCheck,
  CalendarHeart,
  ChevronDown,
  Flag,
  HeartHandshake,
  Menu,
  MessagesSquare,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HpvFactsQuiz } from "@/components/hpv-facts-quiz";
import { ScrollFloat, ScrollFloatItem } from "@/components/scroll-float";
import { SharedStoriesGallery } from "@/components/shared-stories-gallery";
import { ShinyText } from "@/components/shiny-text";
import { VietnamVaccineMap } from "@/components/vietnam-vaccine-map";
import { vaccineMapRegions, vnvcCenterCount } from "@/data/vnvc-centers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const aboutSections = [
  {
    id: "hpv-context-vietnam",
    eyebrow: "Situational Analysis",
    title: "HPV Context in Vietnam",
    paragraphs: [
      "Human papillomavirus (HPV) refers to more than 200 related viruses. While many infections clear naturally, some HPV types can cause genital warts, and persistent high-risk infections can lead to cancers of the cervix, vulva, vagina, penis, anus, and mouth or throat.",
      "In Vietnam, 39.1 million women aged 15 and above are at risk of cervical cancer, with approximately 4,132 new cases and 2,223 deaths each year. Cervical cancer is also the fifth most common female cancer among women aged 15-44.",
      "HPV should not be framed only as a women's health issue. Many young adults were not fully aware that HPV can cause diseases in both genders, leading many male participants to pay less attention to HPV vaccination.",
    ],
  },
  {
    id: "existing-landscape",
    eyebrow: "Situational Analysis",
    title: "Existing HPV Campaign Landscape",
    paragraphs: [
      "Vietnam's HPV communication landscape is increasingly shaped by national, institution-led awareness campaigns, including the nationwide campaign 'For a Vietnam Free from the Burden of HPV'.",
      "Existing campaigns have strong credibility, national reach, government authority, medical expertise, and healthcare partnerships. However, messaging centred on cancer, disease burden, and prevention warnings may feel formal, heavy, or distant for younger audiences.",
      "There is room for a more youth-specific, peer-led, relationship-relevant approach that makes HPV prevention more relatable, gender-inclusive, and easier for young people to discuss.",
    ],
  },
  {
    id: "digital-media-context",
    eyebrow: "Situational Analysis",
    title: "Digital & Media Context",
    paragraphs: [
      "Vietnam has 85.6 million internet users and 79.0 million social media user identities, with 92.3% of internet users using at least one social media platform.",
      "Vietnamese youth are highly active online. A study of 1,477 youths aged 14-24 reported an average of 4.1 hours per day on social networking sites.",
      "TikTok, Facebook, and Instagram are key platforms for the campaign. Social media is not only a distribution channel, but also a space where HPV prevention can become more accessible, credible, and easier for young people to discuss.",
    ],
  },
  {
    id: "vnvc",
    eyebrow: "Health Partner",
    title: "About the VNVC Vaccination Centre",
    paragraphs: [
      "VNVC Vaccination Centre is a nationwide vaccination system for children and adults in Vietnam. Established in 2017, VNVC has expanded into a large private vaccination network with more than 260 modern centres across the country.",
      "VNVC provides HPV vaccination services, including Gardasil 9, for both males and females within the recommended age range.",
      "As a proposed health partner, VNVC would provide medical credibility, reliable HPV vaccination information, and a clear pathway for audiences seeking further advice or considering vaccination.",
    ],
  },
  {
    id: "campaign-overview",
    eyebrow: "Campaign Overview",
    title: "Campaign Overview",
    paragraphs: [
      "Love Shield responds to three key communication gaps in Vietnam's HPV landscape: low prevention engagement, gendered misconceptions, and the need for youth-friendly digital health communication.",
      "Love Shield is a proposed social media campaign designed to raise HPV awareness and encourage vaccine consideration among Vietnamese Gen Z aged 18-29.",
      "The campaign focuses on TikTok, Instagram, and Facebook, using short-form videos, Reels, carousel posts, Stories, and shareable educational content. It will be developed across a 10-week timeline, with a three-week public launch timed around Vietnamese Women's Day on 20 October.",
    ],
  },
];

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

const platformContent = [
  {
    title: "TikTok",
    role: "Primary awareness and engagement platform",
    focus:
      "Short-form videos, trends, myth-busting clips, creator-led storytelling, TikTok challenges, and green flag relationship scenarios.",
  },
  {
    title: "Instagram",
    role: "Visual education and savable content",
    focus:
      "Reels, carousel explainers, Stories, polls, Q&A stickers, infographics, and campaign visuals.",
  },
  {
    title: "Facebook",
    role: "Broader reach and information reinforcement",
    focus:
      "Educational posts, VNVC-linked information, campaign updates, announcements, and shareable infographics.",
  },
];

const socialSubtabs = [
  {
    id: "why-men-vaccine",
    title: "Why Do Men Need the HPV Vaccine?",
    description:
      "A male-focused short-form series challenging the misconception that HPV only affects women.",
    execution:
      "Uses male KOLs, male students, or young professionals to explain why HPV prevention matters for men: protecting themselves, reducing HPV-related cancer risks, and caring for partners.",
    outputs:
      "2 TikTok/Reels videos, 1 Facebook educational post, and 2-3 Story Q&A prompts.",
    message: "HPV doesn't choose a gender. Real men. Real care.",
    audience: "Young men/male partners",
  },
  {
    id: "green-flag-vaccine",
    title: "The Green Flag Vaccine",
    description:
      "Main campaign idea that reframes HPV prevention as a modern green flag in dating, self-care, and responsible relationships.",
    execution:
      "Shows green flag behaviours such as learning about HPV, talking about prevention, supporting vaccination, and respecting health choices.",
    outputs:
      "2 TikTok/Reels videos, 2 Instagram carousel posts, and 3-4 Story posts.",
    message: "Being informed about HPV is a green flag.",
    audience: "Gen Z aged 18-29",
  },
];

const heroActivities = [
  {
    id: "together-movement",
    title: "The Together Movement",
    icon: CalendarHeart,
    description:
      "A TikTok challenge that promotes HPV vaccination as a shared act of care among friends, couples, and peers.",
    execution:
      "Encourages users to film their HPV vaccination journey together, including learning HPV facts, booking a consultation, visiting VNVC, supporting each other before vaccination, or sharing why prevention matters.",
    outputs:
      "1 challenge launch video, Facebook and Instagram announcement posts, 1 reminder video, 3-5 Story templates, and UGC using #LoveShield, #HPVGreenFlag, and #TogetherAgainstHPV.",
    message: "Protect yourself, protect the people you care about.",
    audience: "Gen Z aged 18-29",
  },
  {
    id: "shield-stories",
    title: '"Shield Stories" interview',
    icon: MessagesSquare,
    description:
      "A short interview/storytelling series making HPV prevention feel personal and emotionally safe.",
    execution:
      "Shares real or anonymised youth stories about HPV-related experiences, focusing on what they learned, what they wish they had known earlier, and how prevention can reduce fear, shame, and regret.",
    outputs: "2 short interview videos and 1 quote carousel.",
    message: "Your health, your power. No labels. No shame. Just protection.",
    audience: "Gen Z aged 18-29, especially young women",
  },
  {
    id: "v-shield-booth",
    title: "V-Shield Booth",
    icon: Sparkles,
    description:
      "A pop-up activation at major universities that turns HPV education into an interactive offline experience.",
    execution:
      "Students complete HPV quizzes, scan QR codes, submit anonymous questions, take instant photos, and receive VNVC information or discount vouchers.",
    outputs:
      "1 booth activation, 1 promotional video, 1 recap video, 3-4 Story updates, booth QR/printed materials, and UGC content.",
    message: "Ask now. Stress less later.",
    audience: "Gen Z aged 18-29, especially university students",
  },
  {
    id: "shield-badge",
    title: "Shield Badge Dating-App Integration",
    icon: BadgeCheck,
    description:
      "A dating-app awareness feature connecting HPV prevention with modern dating responsibility.",
    execution:
      "Uses an optional Shield Badge to normalise HPV prevention as part of modern dating responsibility.",
    outputs: "1 Shield Badge concept and 1-2 social announcement posts.",
    message: "Green flag partners talk about prevention.",
    audience: "Gen Z aged 18-29, especially dating-app users",
  },
];

const objectives = [
  "Increase baseline HPV awareness among Vietnamese Gen Z aged 18-29 by 30% within six months.",
  "Reduce belief in key HPV misconceptions by 20% within six months.",
  "Increase intention to seek HPV vaccine information or consultation by 25% within six months.",
  "Achieve at least 500,000 total impressions across TikTok, Instagram, and Facebook by the end of the three-week launch phase.",
  "Generate at least 1,000 social participation actions using #LoveShield, #HPVGreenFlag, and #TogetherAgainstHPV.",
  "Engage at least 300 students during the V-Shield Booth university activation.",
];

const aboutNavItems = aboutSections.map((section) => ({
  href: `#${section.id}`,
  label: section.title,
}));

const socialNavItems = socialSubtabs.map((item) => ({
  href: `#${item.id}`,
  label: item.title,
}));

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent px-3 pt-3 sm:px-5">
        <nav
          aria-label="Main navigation"
          className="site-nav mx-auto max-w-7xl"
        >
          <div className="site-nav-shell flex flex-col gap-2 px-3 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            <div className="flex items-center justify-between gap-4">
              <a className="site-brand flex items-center gap-2 text-lg font-semibold" href="#home">
                <span className="site-brand-mark grid size-9 place-items-center bg-primary text-primary-foreground">
                  <ShieldCheck aria-hidden="true" size={18} />
                </span>
                <span className="brand-lockup">
                  <span className="brand-script">Love</span>
                  {" "}
                  <span className="brand-serif">Shield</span>
                </span>
              </a>
              <MobileNav />
            </div>

            <div className="site-nav-links hidden flex-wrap items-center gap-1 lg:flex lg:justify-end">
              <NavDropdown label="About Campaign" items={aboutNavItems} />
              <Button asChild className="site-nav-button h-9" variant="ghost">
                <a href="#hpv-facts">HPV Facts</a>
              </Button>
              <Button asChild className="site-nav-button h-9" variant="ghost">
                <a href="#vaccine-map">Vaccine map</a>
              </Button>
              <NavDropdown label="Social media content" items={socialNavItems} />
              {heroActivities.map((activity) => (
                <Button
                  asChild
                  className="site-nav-button h-9 px-2.5 text-[0.8rem]"
                  key={activity.id}
                  variant="ghost"
                >
                  <a href={`#${activity.id}`}>{activity.title}</a>
                </Button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <section
        className="hero-scene relative isolate overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8"
        id="home"
      >
        <DecorativeHeroCards />
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 max-w-2xl py-4 sm:py-8">
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
            <p className="mt-5 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg">
              Love Shield is a proposed social media campaign designed to raise
              HPV awareness and encourage vaccine consideration among Vietnamese
              Gen Z aged 18-29.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-card px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 text-sm font-medium text-muted-foreground sm:grid-cols-3">
          <SignalItem icon={MonitorSmartphone} text="TikTok, Instagram, and Facebook" />
          <SignalItem icon={Users} text="Urban and semi-urban Gen Z" />
          <SignalItem icon={Stethoscope} text="VNVC as proposed health partner" />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8" id="about-campaign">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="About Campaign"
            title="Situational analysis and campaign overview"
            text="Love Shield responds to low prevention engagement, gendered misconceptions, and the need for youth-friendly digital health communication."
          />
          <div className="mt-8 grid gap-5">
            {aboutSections.map((section) => (
              <DocumentSection key={section.id} {...section} />
            ))}
          </div>
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

      <section className="px-4 py-16 sm:px-6 lg:px-8" id="social-media-content">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Social media content"
            title="Platform ecosystem and hero content"
            text="The campaign focuses on short-form videos, Reels, carousel posts, Stories, and shareable educational content."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {platformContent.map((platform) => (
              <ScrollFloatItem className="h-full" key={platform.title}>
                <Card className="h-full border-border/80 bg-card">
                  <CardHeader>
                    <Badge className="w-fit" variant="secondary">
                      {platform.title}
                    </Badge>
                    <CardTitle>{platform.role}</CardTitle>
                    <CardDescription className="leading-6">
                      {platform.focus}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollFloatItem>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {socialSubtabs.map((item) => (
              <HeroContentCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Hero Content"
            title="Campaign activations"
            text="The campaign uses short-form, visual, participatory, and relationship-based storytelling."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {heroActivities.map((activity) => (
              <ActivitySection key={activity.id} {...activity} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="SMART Objectives"
            title="Measurement goals"
            text="The performance of Love Shield is guided by long-term communication outcomes and short-term campaign performance metrics."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {objectives.map((objective, index) => (
              <ScrollFloatItem className="h-full" key={objective}>
                <Card className="h-full border-border/80 bg-card">
                  <CardHeader>
                    <Badge className="w-fit" variant="secondary">
                      Objective {index + 1}
                    </Badge>
                    <CardDescription className="text-sm font-medium leading-6 text-foreground">
                      {objective}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollFloatItem>
            ))}
          </div>
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

function NavDropdown({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <details className="group relative">
      <summary className="site-nav-trigger flex h-9 cursor-pointer list-none items-center gap-1.5 px-2.5 text-sm font-medium transition [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          aria-hidden="true"
          className="transition group-open:rotate-180"
          size={14}
        />
      </summary>
      <div className="site-nav-popover absolute left-0 top-11 z-50 grid w-72 gap-1 bg-popover p-2 text-popover-foreground">
        <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
          {label}
        </p>
        <Separator />
        {items.map((item) => (
          <a
            className="rounded-md px-2 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </div>
    </details>
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

function MobileNav() {
  return (
    <details className="group relative lg:hidden">
      <summary className="site-mobile-trigger grid size-9 cursor-pointer list-none place-items-center bg-background transition [&::-webkit-details-marker]:hidden">
        <Menu aria-hidden="true" size={18} />
        <span className="sr-only">Open navigation</span>
      </summary>
      <div className="site-nav-popover absolute right-0 top-12 z-50 grid max-h-[75vh] w-[min(22rem,calc(100vw-2rem))] gap-1 overflow-y-auto bg-popover p-2 text-popover-foreground">
        <MobileNavGroup items={aboutNavItems} label="About Campaign" />
        <Separator />
        <a
          className="rounded-md px-2 py-2 text-sm font-medium transition hover:bg-muted"
          href="#hpv-facts"
        >
          HPV Facts
        </a>
        <a
          className="rounded-md px-2 py-2 text-sm font-medium transition hover:bg-muted"
          href="#vaccine-map"
        >
          Vaccine map
        </a>
        <Separator />
        <MobileNavGroup items={socialNavItems} label="Social media content" />
        <Separator />
        {heroActivities.map((activity) => (
          <a
            className="rounded-md px-2 py-2 text-sm font-medium transition hover:bg-muted"
            href={`#${activity.id}`}
            key={activity.id}
          >
            {activity.title}
          </a>
        ))}
      </div>
    </details>
  );
}

function MobileNavGroup({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <div className="grid gap-1">
      <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
        {label}
      </p>
      {items.map((item) => (
        <a
          className="rounded-md px-2 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
          href={item.href}
          key={item.href}
        >
          {item.label}
        </a>
      ))}
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

function DocumentSection({
  id,
  eyebrow,
  title,
  paragraphs,
}: {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <ScrollFloatItem className="scroll-mt-40" id={id}>
      <Card className="border-border/80 bg-card">
        <CardHeader>
          <Badge className="w-fit" variant="outline">
            {eyebrow}
          </Badge>
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-sm leading-6 text-card-foreground/75 lg:grid-cols-3">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
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

function HeroContentCard({
  id,
  title,
  description,
  execution,
  outputs,
  message,
  audience,
}: {
  id: string;
  title: string;
  description: string;
  execution: string;
  outputs: string;
  message: string;
  audience: string;
}) {
  return (
    <ScrollFloatItem className="scroll-mt-40" id={id}>
      <Card className="border-border/80 bg-card">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge className="w-fit" variant="secondary">
                Social media content
              </Badge>
              <CardTitle className="mt-3 text-2xl font-semibold">
                {title}
              </CardTitle>
            </div>
            <HeartHandshake aria-hidden="true" className="text-chart-3" />
          </div>
        </CardHeader>
        <CardContent>
          <DefinitionList
            rows={[
              ["Description", description],
              ["Content execution", execution],
              ["Content outputs", outputs],
              ["Key message", message],
              ["Target audience", audience],
            ]}
          />
        </CardContent>
      </Card>
    </ScrollFloatItem>
  );
}

function ActivitySection({
  id,
  title,
  icon: Icon,
  description,
  execution,
  outputs,
  message,
  audience,
}: {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  execution: string;
  outputs: string;
  message: string;
  audience: string;
}) {
  return (
    <ScrollFloatItem className="scroll-mt-40" id={id}>
      <Card className="border-border/80 bg-card">
        <CardHeader>
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
              <Icon aria-hidden="true" />
            </span>
            <div>
              <Badge className="w-fit bg-secondary text-secondary-foreground">
                Hero content
              </Badge>
              <CardTitle className="mt-3 text-2xl font-semibold">
                {title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DefinitionList
            rows={[
              ["Description", description],
              ["Content execution", execution],
              ["Content outputs", outputs],
              ["Key message", message],
              ["Target audience", audience],
            ]}
          />
        </CardContent>
      </Card>
    </ScrollFloatItem>
  );
}

function DefinitionList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid gap-3">
      {rows.map(([term, detail]) => (
        <ScrollFloatItem key={term} y={10}>
          <Separator className="mb-3" />
          <dt className="text-xs font-semibold uppercase text-card-foreground/70">
            {term}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-card-foreground/75">
            {detail}
          </dd>
        </ScrollFloatItem>
      ))}
    </dl>
  );
}

function SignalItem({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <ScrollFloatItem className="flex items-center gap-3" y={10}>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon aria-hidden="true" size={18} />
      </span>
      {text}
    </ScrollFloatItem>
  );
}

type NavItem = {
  href: string;
  label: string;
};
