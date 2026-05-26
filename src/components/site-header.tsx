import { ChevronDown, Menu, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const aboutCampaignNavItems = [
  { label: "Campaign Overview", href: "/about-campaign#campaign-overview" },
  {
    label: "About the VNVC Vaccination Centre",
    href: "/about-campaign#about-vnvc",
  },
  {
    label: "HPV Context in Vietnam",
    href: "/about-campaign#hpv-context-vietnam",
  },
  {
    label: "Existing HPV Campaign Landscape",
    href: "/about-campaign#existing-hpv-campaign-landscape",
  },
  {
    label: "Digital & Media Context",
    href: "/about-campaign#digital-media-context",
  },
];

const campaignActivityNavItems = [
  {
    label: "The Green Flag Vaccine",
    href: "/campaign-activities#green-flag-vaccine",
  },
  {
    label: "Why Do Men Need the HPV Vaccine?",
    href: "/campaign-activities#why-men-vaccine",
  },
  {
    label: "The Together Movement",
    href: "/campaign-activities#together-movement",
  },
  {
    label: "Shield Stories Interview",
    href: "/campaign-activities#shield-stories",
  },
  { label: "V-Shield Booth", href: "/campaign-activities#v-shield-booth" },
  {
    label: "Shield Badge Dating-App Integration",
    href: "/campaign-activities#shield-badge",
  },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent px-3 pt-3 sm:px-5">
      <nav aria-label="Main navigation" className="site-nav mx-auto max-w-7xl">
        <div className="site-nav-shell flex flex-col gap-2 px-3 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              className="site-brand flex items-center gap-2 text-lg font-semibold"
              href="/#home"
            >
              <span className="site-brand-mark grid size-9 place-items-center bg-primary text-primary-foreground">
                <ShieldCheck aria-hidden="true" size={18} />
              </span>
              <span className="brand-lockup">
                <span className="brand-script">Love</span>{" "}
                <span className="brand-serif">Shield</span>
              </span>
            </Link>
            <MobileNav />
          </div>

          <div className="site-nav-links hidden flex-wrap items-center gap-1 lg:flex lg:justify-end">
            <Button asChild className="site-nav-button h-9" variant="ghost">
              <Link href="/#home">Home</Link>
            </Button>
            <DesktopNavGroup
              label="About Campaign"
              items={aboutCampaignNavItems}
            />
            <DesktopNavGroup
              label="Campaign Activities"
              items={campaignActivityNavItems}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

function DesktopNavGroup({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  return (
    <details className="site-nav-group group relative" name="site-nav-groups">
      <summary className="site-nav-trigger flex h-9 cursor-pointer list-none items-center gap-1 px-3 text-sm font-medium transition [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          aria-hidden="true"
          className="transition group-open:rotate-180"
          size={15}
        />
      </summary>
      <div className="site-nav-menu absolute right-0 top-11 z-50 grid min-w-72 gap-1 bg-popover p-2 text-popover-foreground">
        {items.map((item) => (
          <Link
            className="rounded-md px-3 py-2 text-sm font-medium leading-snug transition hover:bg-muted"
            href={item.href}
            key={item.label}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

function MobileNav() {
  return (
    <details className="group relative lg:hidden">
      <summary className="site-mobile-trigger grid size-9 cursor-pointer list-none place-items-center bg-background transition [&::-webkit-details-marker]:hidden">
        <Menu aria-hidden="true" size={18} />
        <span className="sr-only">Open navigation</span>
      </summary>
      <div className="site-nav-popover absolute right-0 top-12 z-50 grid max-h-[75vh] w-[min(22rem,calc(100vw-2rem))] gap-2 overflow-y-auto bg-popover p-2 text-popover-foreground">
        <Link
          className="rounded-md px-2 py-2 text-sm font-medium transition hover:bg-muted"
          href="/#home"
        >
          Home
        </Link>
        <div className="grid gap-1">
          <p className="px-2 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            About Campaign
          </p>
          {aboutCampaignNavItems.map((item) => (
            <Link
              className="rounded-md px-2 py-2 text-sm font-medium transition hover:bg-muted"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="grid gap-1">
          <p className="px-2 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Campaign Activities
          </p>
          {campaignActivityNavItems.map((item) => (
            <Link
              className="rounded-md px-2 py-2 text-sm font-medium transition hover:bg-muted"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </details>
  );
}
