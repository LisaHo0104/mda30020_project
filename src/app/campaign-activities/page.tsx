import CircularGallery from "@/components/circular-gallery";
import Masonry from "@/components/masonry";
import ReactBitsCarousel from "@/components/react-bits-carousel";
import { SiteHeader } from "@/components/site-header";
import { VShieldBoothStack } from "@/components/v-shield-booth-stack";

const whyMenGalleryItems = [
  {
    image: "/why-men-vaccine/gallery/620f6050-9d27-492d-9989-da801c29338c.png",
    text: "Men need prevention",
  },
  {
    image: "/why-men-vaccine/gallery/7b1dedda-d91f-4e7d-8c28-d69f0d72f66d.png",
    text: "Shared responsibility",
  },
  {
    image: "/why-men-vaccine/gallery/06290dc2-eb72-418a-bee7-2f57d612f4c4.png",
    text: "HPV affects everyone",
  },
  {
    image: "/why-men-vaccine/gallery/228e37c1-aac3-4ef8-903b-80de38d9a732.png",
    text: "Talk about care",
  },
  {
    image: "/why-men-vaccine/gallery/65b413dc-6d4a-4db6-a521-269c40b293f7.png",
    text: "Know the facts",
  },
  {
    image: "/why-men-vaccine/gallery/b03e51f0-fcbf-4840-9e7c-a51d79fa25c2.png",
    text: "Protect partners",
  },
  {
    image: "/why-men-vaccine/gallery/b3c3a8e8-a3f9-4c62-b6e5-cb91c4a2de80.png",
    text: "Green flag care",
  },
  {
    image: "/why-men-vaccine/gallery/e7746a88-d25c-4336-a87b-80b715a72c21.png",
    text: "Ask early",
  },
];

const togetherMovementItems = [
  {
    id: "together-01",
    img: "/together-movement/gallery/18ba46e4-fb10-456c-b6ba-a1a725eab456.png",
    url: "/together-movement/gallery/18ba46e4-fb10-456c-b6ba-a1a725eab456.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 1",
  },
  {
    id: "together-02",
    img: "/together-movement/gallery/d150e84d-5d29-4b71-98f6-372d3fb927b5.png",
    url: "/together-movement/gallery/d150e84d-5d29-4b71-98f6-372d3fb927b5.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 2",
  },
  {
    id: "together-03",
    img: "/together-movement/gallery/aeafec96-a1d6-477f-8913-8ff1e39973cb.png",
    url: "/together-movement/gallery/aeafec96-a1d6-477f-8913-8ff1e39973cb.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 3",
  },
  {
    id: "together-04",
    img: "/together-movement/gallery/acee8c65-d6bf-443a-b52e-ee056806ad7b.png",
    url: "/together-movement/gallery/acee8c65-d6bf-443a-b52e-ee056806ad7b.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 4",
  },
  {
    id: "together-05",
    img: "/together-movement/gallery/64852489-cf0a-4549-9b72-d06cdb1a4fa9.png",
    url: "/together-movement/gallery/64852489-cf0a-4549-9b72-d06cdb1a4fa9.png",
    width: 1122,
    height: 1402,
    alt: "The Together Movement campaign visual 5",
  },
  {
    id: "together-06",
    img: "/together-movement/gallery/a8ed5cda-bb75-4bac-9156-4c5a5b196c9e.png",
    url: "/together-movement/gallery/a8ed5cda-bb75-4bac-9156-4c5a5b196c9e.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 6",
  },
  {
    id: "together-07",
    img: "/together-movement/gallery/1cd6543f-6008-46bd-b3f1-2699bd27d728.png",
    url: "/together-movement/gallery/1cd6543f-6008-46bd-b3f1-2699bd27d728.png",
    width: 1122,
    height: 1402,
    alt: "The Together Movement campaign visual 7",
  },
  {
    id: "together-08",
    img: "/together-movement/gallery/b2be5023-cb61-4ad6-8da1-98e88874a385.png",
    url: "/together-movement/gallery/b2be5023-cb61-4ad6-8da1-98e88874a385.png",
    width: 1122,
    height: 1402,
    alt: "The Together Movement campaign visual 8",
  },
  {
    id: "together-09",
    img: "/together-movement/gallery/33f1189a-9aaf-437c-8842-ae44e2bf1e26.png",
    url: "/together-movement/gallery/33f1189a-9aaf-437c-8842-ae44e2bf1e26.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 9",
  },
  {
    id: "together-10",
    img: "/together-movement/gallery/01b330b0-81e6-4cfd-914d-cc0dc50b59be.png",
    url: "/together-movement/gallery/01b330b0-81e6-4cfd-914d-cc0dc50b59be.png",
    width: 1122,
    height: 1402,
    alt: "The Together Movement campaign visual 10",
  },
  {
    id: "together-11",
    img: "/together-movement/gallery/325684e0-60fa-4e1d-8474-8c6dda6d3b0b.png",
    url: "/together-movement/gallery/325684e0-60fa-4e1d-8474-8c6dda6d3b0b.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 11",
  },
  {
    id: "together-12",
    img: "/together-movement/gallery/a758b877-f05d-419c-a4b2-080a7c892fce.png",
    url: "/together-movement/gallery/a758b877-f05d-419c-a4b2-080a7c892fce.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 12",
  },
  {
    id: "together-13",
    img: "/together-movement/gallery/f7cedac5-de1c-4252-8949-2966f06a494e.png",
    url: "/together-movement/gallery/f7cedac5-de1c-4252-8949-2966f06a494e.png",
    width: 1122,
    height: 1402,
    alt: "The Together Movement campaign visual 13",
  },
  {
    id: "together-14",
    img: "/together-movement/gallery/78b1e026-ca75-4b37-a8b7-3033e85a827d.png",
    url: "/together-movement/gallery/78b1e026-ca75-4b37-a8b7-3033e85a827d.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 14",
  },
  {
    id: "together-15",
    img: "/together-movement/gallery/ba07155d-0056-4d5c-a225-a0e1ac0c9afb.png",
    url: "/together-movement/gallery/ba07155d-0056-4d5c-a225-a0e1ac0c9afb.png",
    width: 941,
    height: 1672,
    alt: "The Together Movement campaign visual 15",
  },
];

const shieldStoriesItems = [
  {
    id: "shield-stories-01",
    img: "/shield-stories/gallery/32eeb073-3576-451c-bb95-0e0a75f5399a.png",
    url: "/shield-stories/gallery/32eeb073-3576-451c-bb95-0e0a75f5399a.png",
    width: 1254,
    height: 1254,
    alt: "Shield Stories Interview campaign visual 1",
  },
  {
    id: "shield-stories-02",
    img: "/shield-stories/gallery/4bb8c970-4cc6-4572-84bd-2a8bb566bc0b.png",
    url: "/shield-stories/gallery/4bb8c970-4cc6-4572-84bd-2a8bb566bc0b.png",
    width: 941,
    height: 1672,
    alt: "Shield Stories Interview campaign visual 2",
  },
  {
    id: "shield-stories-03",
    img: "/shield-stories/gallery/a007846f-59c3-47b1-abbb-244926385db8.png",
    url: "/shield-stories/gallery/a007846f-59c3-47b1-abbb-244926385db8.png",
    width: 941,
    height: 1672,
    alt: "Shield Stories Interview campaign visual 3",
  },
  {
    id: "shield-stories-04",
    img: "/shield-stories/gallery/91db7e03-b0c4-457a-9bb3-7cbd5509e941.png",
    url: "/shield-stories/gallery/91db7e03-b0c4-457a-9bb3-7cbd5509e941.png",
    width: 1672,
    height: 941,
    alt: "Shield Stories Interview campaign visual 4",
  },
];

const vShieldBoothItems = [
  {
    id: "v-shield-booth-01",
    src: "/v-shield-booth/gallery/7c33f644-1624-45d1-b581-f7bbb17878dd.png",
    alt: "V-Shield Booth campaign visual 1",
  },
  {
    id: "v-shield-booth-02",
    src: "/v-shield-booth/gallery/4b726223-d728-457d-a389-144ad8f53cfb.png",
    alt: "V-Shield Booth campaign visual 2",
  },
  {
    id: "v-shield-booth-03",
    src: "/v-shield-booth/gallery/322a7854-b2da-49aa-a22e-c3e4ec995223.png",
    alt: "V-Shield Booth campaign visual 3",
  },
  {
    id: "v-shield-booth-04",
    src: "/v-shield-booth/gallery/67bd0b63-ffae-482b-bf7c-23075a64912f.png",
    alt: "V-Shield Booth campaign visual 4",
  },
  {
    id: "v-shield-booth-05",
    src: "/v-shield-booth/gallery/3804483b-b0fe-4c1b-9fe3-2400c4209ccf.png",
    alt: "V-Shield Booth campaign visual 5",
  },
  {
    id: "v-shield-booth-06",
    src: "/v-shield-booth/gallery/4222444b-d4ac-474e-983c-2788e6e41bf1.png",
    alt: "V-Shield Booth campaign visual 6",
  },
  {
    id: "v-shield-booth-07",
    src: "/v-shield-booth/gallery/41c469d6-d18a-436c-8a9f-0a80401896e6.png",
    alt: "V-Shield Booth campaign visual 7",
  },
  {
    id: "v-shield-booth-08",
    src: "/v-shield-booth/gallery/ea4db624-13f2-4917-98a0-50d362dddc45.png",
    alt: "V-Shield Booth campaign visual 8",
  },
  {
    id: "v-shield-booth-09",
    src: "/v-shield-booth/gallery/1fa8cf6a-8e31-4cc4-bc95-ab8b93239e95.png",
    alt: "V-Shield Booth campaign visual 9",
  },
  {
    id: "v-shield-booth-10",
    src: "/v-shield-booth/gallery/bcf0f35d-ffb6-4fa0-b251-f3fbd9656b34.png",
    alt: "V-Shield Booth campaign visual 10",
  },
  {
    id: "v-shield-booth-11",
    src: "/v-shield-booth/gallery/d7640799-4a10-4986-9b08-265083bb8248.png",
    alt: "V-Shield Booth campaign visual 11",
  },
  {
    id: "v-shield-booth-12",
    src: "/v-shield-booth/gallery/2ff5ae74-c0a1-4e27-8906-d2f7087573b9.png",
    alt: "V-Shield Booth campaign visual 12",
  },
  {
    id: "v-shield-booth-13",
    src: "/v-shield-booth/gallery/14466ff8-a8e0-4de9-a728-7cb91cec0195.png",
    alt: "V-Shield Booth campaign visual 13",
  },
  {
    id: "v-shield-booth-14",
    src: "/v-shield-booth/gallery/7350ef41-cb51-43a1-985c-d49516046929.png",
    alt: "V-Shield Booth campaign visual 14",
  },
  {
    id: "v-shield-booth-15",
    src: "/v-shield-booth/gallery/d62f2827-b505-4946-8130-05ffdba381e7.png",
    alt: "V-Shield Booth campaign visual 15",
  },
  {
    id: "v-shield-booth-16",
    src: "/v-shield-booth/gallery/87ca9051-d345-4840-9033-f0fed7fd25cc.png",
    alt: "V-Shield Booth campaign visual 16",
  },
  {
    id: "v-shield-booth-17",
    src: "/v-shield-booth/gallery/40343a06-7b33-4b33-b4e8-16025f57e78a.png",
    alt: "V-Shield Booth campaign visual 17",
  },
  {
    id: "v-shield-booth-18",
    src: "/v-shield-booth/gallery/20b9919f-4e10-41de-8ff6-8f5976e82d22.png",
    alt: "V-Shield Booth campaign visual 18",
  },
];

const shieldBadgeItems = [
  {
    id: "shield-badge-01",
    img: "/shield-badge/gallery/c6fd6413-0481-4d64-aa01-a54fa94b3119.png",
    alt: "Shield Badge Dating-App Integration campaign visual 1",
  },
  {
    id: "shield-badge-02",
    img: "/shield-badge/gallery/67d9eb01-f15f-4536-9972-7a9c6753df52.png",
    alt: "Shield Badge Dating-App Integration campaign visual 2",
  },
  {
    id: "shield-badge-03",
    img: "/shield-badge/gallery/3be972bb-4e59-4de2-935f-ee3b4df09889.png",
    alt: "Shield Badge Dating-App Integration campaign visual 3",
  },
  {
    id: "shield-badge-04",
    img: "/shield-badge/gallery/b15582aa-fc08-4738-bc16-5c5d96d6bf09.png",
    alt: "Shield Badge Dating-App Integration campaign visual 4",
  },
  {
    id: "shield-badge-05",
    img: "/shield-badge/gallery/5abe4978-58d0-4dfd-9040-4a280f0f7fee.png",
    alt: "Shield Badge Dating-App Integration campaign visual 5",
  },
  {
    id: "shield-badge-06",
    img: "/shield-badge/gallery/35880fb5-866b-47ab-9f4e-09e0b5b0645d.png",
    alt: "Shield Badge Dating-App Integration campaign visual 6",
  },
  {
    id: "shield-badge-07",
    img: "/shield-badge/gallery/74b4dce0-9416-42ea-ba71-f3c4bbc494e3.png",
    alt: "Shield Badge Dating-App Integration campaign visual 7",
  },
  {
    id: "shield-badge-08",
    img: "/shield-badge/gallery/641bdf06-a1cf-4cc2-80fe-a0dbff28f5c8.png",
    alt: "Shield Badge Dating-App Integration campaign visual 8",
  },
  {
    id: "shield-badge-09",
    img: "/shield-badge/gallery/85ab9673-3616-41ec-bd27-f0c31fec9924.png",
    alt: "Shield Badge Dating-App Integration campaign visual 9",
  },
];

export default function CampaignActivitiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section
        className="mx-auto max-w-5xl scroll-mt-32 px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8"
        id="green-flag-vaccine"
      >
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          The Green Flag Vaccine
        </h1>
        <p className="mt-4 w-full text-base leading-7 text-foreground/75 sm:text-lg">
          Our lead short-form content series reframes HPV awareness as a modern
          “green flag” in dating, self-care and relationships.
        </p>
        <div className="mt-8 overflow-hidden rounded-lg border border-border/80 bg-card shadow-sm">
          <video
            className="aspect-video w-full bg-muted object-contain"
            controls
            muted
            playsInline
            preload="metadata"
            src="/green-flag-vaccine/green-flag-vaccine-pov-silent.mov"
          />
        </div>
      </section>
      <section
        aria-labelledby="why-men-vaccine"
        className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-8"
      >
        <h2
          className="scroll-mt-32 text-4xl font-semibold leading-tight sm:text-5xl"
          id="why-men-vaccine"
        >
          Why Do Men Need the HPV Vaccine?
        </h2>
        <p className="mt-4 w-full text-base leading-7 text-foreground/75 sm:text-lg">
          Our male-focused short-form series challenges the misconception that
          HPV only affects women.
        </p>
        <div className="mt-8 h-[30rem] overflow-hidden rounded-lg border border-border/80 bg-card/40 shadow-sm sm:h-[34rem]">
          <CircularGallery
            bend={2.4}
            borderRadius={0.04}
            items={whyMenGalleryItems}
            scrollEase={0.035}
            scrollSpeed={1.6}
            showControls
            textColor="#0b235f"
          />
        </div>
      </section>
      <section
        aria-labelledby="together-movement-title"
        className="mx-auto max-w-6xl scroll-mt-32 px-4 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        id="together-movement"
      >
        <h2
          className="scroll-mt-32 text-4xl font-semibold leading-tight sm:text-5xl"
          id="together-movement-title"
        >
          The Together Movement
        </h2>
        <p className="mt-4 w-full text-base leading-7 text-foreground/75 sm:text-lg">
          Our TikTok challenge promotes HPV vaccination as a shared act of care
          among friends, couples and peers.
        </p>
        <div className="mt-8 rounded-lg border border-border/80 bg-card/40 p-2 shadow-sm sm:p-3">
          <Masonry
            animateFrom="bottom"
            blurToFocus
            colorShiftOnHover={false}
            duration={0.6}
            ease="power3.out"
            hoverScale={0.97}
            items={togetherMovementItems}
            scaleOnHover
            stagger={0.05}
          />
        </div>
      </section>
      <section
        aria-labelledby="shield-stories-title"
        className="mx-auto max-w-6xl scroll-mt-32 px-4 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        id="shield-stories"
      >
        <h2
          className="scroll-mt-32 text-4xl font-semibold leading-tight sm:text-5xl"
          id="shield-stories-title"
        >
          Shield Stories Interview
        </h2>
        <p className="mt-4 w-full text-base leading-7 text-foreground/75 sm:text-lg">
          Our short interview/storytelling series makes HPV prevention feel
          personal and emotionally safe.
        </p>
        <div className="mt-8 rounded-lg border border-border/80 bg-card/40 p-2 shadow-sm sm:p-3">
          <Masonry
            animateFrom="bottom"
            blurToFocus
            colorShiftOnHover={false}
            duration={0.6}
            ease="power3.out"
            hoverScale={0.97}
            items={shieldStoriesItems}
            maxColumns={2}
            scaleOnHover
            stagger={0.05}
          />
        </div>
      </section>
      <section
        aria-labelledby="v-shield-booth-title"
        className="mx-auto max-w-6xl scroll-mt-32 px-4 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        id="v-shield-booth"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(20rem,1fr)]">
          <div>
            <h2
              className="scroll-mt-32 text-4xl font-semibold leading-tight sm:text-5xl"
              id="v-shield-booth-title"
            >
              V-Shield Booth
            </h2>
            <p className="mt-4 w-full text-base leading-7 text-foreground/75 sm:text-lg">
              Our pop-up activation at major universities turns HPV education
              into an interactive offline experience.
            </p>
          </div>
          <div className="grid justify-center rounded-lg border border-border/80 bg-card/40 p-6 shadow-sm sm:p-8">
            <VShieldBoothStack items={vShieldBoothItems} />
          </div>
        </div>
      </section>
      <section
        aria-labelledby="shield-badge-title"
        className="mx-auto max-w-6xl scroll-mt-32 px-4 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        id="shield-badge"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(20rem,1fr)]">
          <div>
            <h2
              className="scroll-mt-32 text-4xl font-semibold leading-tight sm:text-5xl"
              id="shield-badge-title"
            >
              Shield Badge Dating-App Integration
            </h2>
            <p className="mt-4 w-full text-base leading-7 text-foreground/75 sm:text-lg">
              Our dating-app awareness feature connects HPV prevention with
              modern dating responsibility.
            </p>
          </div>
          <div className="flex min-w-0 w-full justify-center rounded-lg border border-border/80 bg-card/40 p-4 shadow-sm sm:p-6">
            <ReactBitsCarousel
              autoplay
              autoplayDelay={6000}
              baseWidth={760}
              items={shieldBadgeItems}
              loop
              pauseOnHover
            />
          </div>
        </div>
      </section>
    </main>
  );
}
