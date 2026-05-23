"use client";

import type { LayerSpecification, Map as MapLibreMap } from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MarkerTooltip,
  useMap,
} from "@/components/ui/map";
import { vietnamBoundary } from "@/data/vietnam-boundary";

export type VaccineCenter = {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  mapUrl: string;
};

export type VaccineMapRegion = {
  id: string;
  city: string;
  label: string;
  coordinates: [number, number];
  zoom: number;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
  centers: VaccineCenter[];
};

type VietnamVaccineMapProps = {
  regions: VaccineMapRegion[];
  bookingUrl: string;
};

type VaccineCenterMarker = VaccineCenter & {
  centerIndex: number;
  region: VaccineMapRegion;
};

type NearestCenter = VaccineCenterMarker & {
  distanceKm: number;
};

type NearestCenterHighlight = {
  distanceKm: number;
  rank: number;
};

type SearchStatus = "idle" | "loading" | "ready" | "error";

const VIETNAM_BOUNDARY_SOURCE_ID = "love-shield-vietnam-boundary";
const VNVC_POPUP_IMAGE_URL =
  "https://vnvc.vn/wp-content/uploads/2026/04/more-than-260-centers-mb.jpg";
const VNVC_OFFICIAL_HOURS = "7:30 AM - 5:00 PM";
const VNVC_QUALITY_LABEL = "Best quality in Vietnam";
const NEAREST_MARKER_COLOR = "#ef233c";

const VIETNAM_HIGHLIGHT_LAYERS: LayerSpecification[] = [
  {
    id: "love-shield-vietnam-fill",
    source: VIETNAM_BOUNDARY_SOURCE_ID,
    type: "fill",
    paint: {
      "fill-color": "#ffccf2",
      "fill-opacity": 0.36,
    },
  },
  {
    id: "love-shield-vietnam-glow",
    source: VIETNAM_BOUNDARY_SOURCE_ID,
    type: "line",
    paint: {
      "line-blur": 8,
      "line-color": "#977dff",
      "line-opacity": 0.5,
      "line-width": 9,
    },
  },
  {
    id: "love-shield-vietnam-outline",
    source: VIETNAM_BOUNDARY_SOURCE_ID,
    type: "line",
    paint: {
      "line-color": "#0033ff",
      "line-opacity": 0.85,
      "line-width": 2.4,
    },
  },
];

export function VietnamVaccineMap({
  regions,
  bookingUrl,
}: VietnamVaccineMapProps) {
  const allCenters = useMemo<VaccineCenterMarker[]>(
    () =>
      regions.flatMap((region) =>
        region.centers.map((center, centerIndex) => ({
          ...center,
          centerIndex,
          region,
        })),
      ),
    [regions],
  );
  const [activeCenterId, setActiveCenterId] = useState(
    allCenters[0]?.id ?? "",
  );
  const mapRef = useRef<MapLibreMap | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState(
    regions[0]?.id ?? "",
  );
  const [locationQuery, setLocationQuery] = useState("");
  const [nearestCenters, setNearestCenters] = useState<NearestCenter[]>([]);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
  const [searchMessage, setSearchMessage] = useState("");
  const nearestCenterLookup = useMemo(
    () =>
      new globalThis.Map<string, NearestCenterHighlight>(
        nearestCenters.map((center, index) => [
          center.id,
          {
            distanceKm: center.distanceKm,
            rank: index + 1,
          },
        ]),
      ),
    [nearestCenters],
  );

  const activeCenter =
    allCenters.find((center) => center.id === activeCenterId) ?? allCenters[0];
  const activeRegion = activeCenter?.region ?? regions[0];

  if (!activeRegion || !activeCenter) {
    return null;
  }

  const focusMapOnCenter = (center: VaccineCenterMarker) => {
    mapRef.current?.easeTo({
      center: toLngLat(center.coordinates),
      duration: 650,
      essential: true,
      zoom: Math.max(center.region.zoom, 11),
    });
  };

  const selectCenter = (center: VaccineCenterMarker) => {
    setActiveCenterId(center.id);
    setSelectedRegionId(center.region.id);
    focusMapOnCenter(center);
  };

  const searchNearestCenters = async () => {
    setSearchStatus("loading");
    setSearchMessage("");

    const typedLocation = locationQuery.trim();
    const selectedRegion =
      regions.find((region) => region.id === selectedRegionId) ?? activeRegion;
    const origin = typedLocation
      ? await geocodeVietnamLocation(typedLocation)
      : selectedRegion.coordinates;

    if (!origin) {
      setNearestCenters([]);
      setSearchStatus("error");
      setSearchMessage(
        "Location not found. Try a city, district, university, or street in Vietnam.",
      );
      return;
    }

    const nearest = getNearestCenters(allCenters, origin, 5);

    setNearestCenters(nearest);
    setSearchStatus("ready");
    setSearchMessage(
      `Showing the 5 nearest VNVC centres to ${typedLocation || selectedRegion.city}.`,
    );

    if (!nearest[0]) {
      return;
    }

    setActiveCenterId(nearest[0].id);
    setSelectedRegionId(nearest[0].region.id);
    focusMapOnCenter(nearest[0]);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:items-start">
      <div className="rounded-3xl border border-border/70 bg-card p-4 shadow-sm lg:col-span-2">
        <form
          className="grid gap-3 lg:grid-cols-[minmax(12rem,0.8fr)_minmax(16rem,1fr)_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            void searchNearestCenters();
          }}
        >
          <label className="grid gap-1.5 text-sm font-semibold">
            City / province
            <select
              className="h-11 rounded-2xl border border-border/70 bg-background px-3 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
              onChange={(event) => setSelectedRegionId(event.target.value)}
              value={selectedRegionId}
            >
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.city} ({region.centers.length})
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5 text-sm font-semibold">
            Enter location
            <input
              className="h-11 rounded-2xl border border-border/70 bg-background px-3 text-sm font-medium text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25"
              onChange={(event) => setLocationQuery(event.target.value)}
              placeholder="District, street, campus, or city"
              type="search"
              value={locationQuery}
            />
          </label>

          <Button
            className="self-end"
            disabled={searchStatus === "loading"}
            type="submit"
          >
            <Search aria-hidden="true" />
            {searchStatus === "loading" ? "Searching" : "Search nearest"}
          </Button>
        </form>

        <div aria-live="polite" className="mt-4">
          {searchMessage ? (
            <p
              className={`text-sm font-medium ${
                searchStatus === "error"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {searchMessage}
            </p>
          ) : (
            <p className="text-sm font-medium text-muted-foreground">
              Choose a city or enter a Vietnam location to filter the nearest
              VNVC centres.
            </p>
          )}
        </div>

        {nearestCenters.length > 0 && (
          <div className="mt-4 grid gap-2 md:grid-cols-5">
            {nearestCenters.map((center, index) => (
              <a
                className={`rounded-2xl border p-3 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/50 ${
                  activeCenter.id === center.id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border/70 bg-card text-card-foreground hover:border-primary/50"
                }`}
                href={center.mapUrl}
                key={center.id}
                onClick={() => selectCenter(center)}
                rel="noreferrer"
                target="_blank"
              >
                <span
                  className={`mb-2 inline-flex size-7 items-center justify-center rounded-full text-xs ${
                    activeCenter.id === center.id
                      ? "bg-primary-foreground/20"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="block leading-5">{center.name}</span>
                <span
                  className={`mt-1 block text-xs font-medium leading-5 ${
                    activeCenter.id === center.id
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {formatDistance(center.distanceKm)} away - {center.region.city}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="min-h-[24rem] overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm sm:min-h-[30rem] lg:h-[44rem]">
        <div
          aria-label="Map of official VNVC vaccination centres in Vietnam"
          className="h-full min-h-[24rem] w-full sm:min-h-[30rem]"
          role="application"
        >
          <Map
            ref={mapRef}
            center={[107.7, 16.1]}
            className="h-full w-full"
            dragRotate={false}
            scrollZoom
            theme="light"
            zoom={5}
          >
            <MapControls position="top-right" showFullscreen showZoom />
            <VietnamBoundaryHighlight />
            {allCenters.map((center) => {
              const selected = activeCenter.id === center.id;
              const nearestHighlight = nearestCenterLookup.get(center.id);
              const [longitude, latitude] = toLngLat(center.coordinates);
              const color = nearestHighlight
                ? NEAREST_MARKER_COLOR
                : getMarkerColor(center.region.id);

              return (
                <MapMarker
                  key={center.id}
                  latitude={latitude}
                  longitude={longitude}
                  offset={getCenterOffset(
                    center.centerIndex,
                    center.region.centers.length,
                  )}
                  onClick={() => selectCenter(center)}
                >
                  <MarkerContent>
                    <button
                      aria-label={`Show ${center.name}`}
                      className={`grid cursor-pointer place-items-center rounded-full border-2 border-white shadow-lg transition hover:scale-125 ${
                        selected || nearestHighlight ? "size-5" : "size-3"
                      } ${
                        selected
                          ? "ring-4 ring-white/70"
                          : nearestHighlight
                            ? "ring-4 ring-red-100/80"
                            : ""
                      }`}
                      onClick={() => selectCenter(center)}
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 10px 24px ${color}55`,
                      }}
                      type="button"
                    >
                      <span className="sr-only">{center.name}</span>
                    </button>
                    {(nearestHighlight || selected) && (
                      <MarkerLabel
                        className={
                          nearestHighlight
                            ? "rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm"
                            : "rounded-full bg-background/95 px-2 py-0.5 text-[10px] font-semibold shadow-sm"
                        }
                        position="bottom"
                      >
                        {nearestHighlight
                          ? `#${nearestHighlight.rank} nearest`
                          : center.region.city}
                      </MarkerLabel>
                    )}
                  </MarkerContent>
                  <MarkerTooltip>
                    <span className="font-semibold">{center.name}</span>
                    <span className="block text-[10px] opacity-80">
                      {center.region.city}
                    </span>
                    {nearestHighlight && (
                      <span className="block text-[10px] font-semibold opacity-90">
                        #{nearestHighlight.rank} nearest -{" "}
                        {formatDistance(nearestHighlight.distanceKm)} away
                      </span>
                    )}
                  </MarkerTooltip>
                  <VaccineCenterRichPopup
                    bookingUrl={bookingUrl}
                    center={center}
                    nearest={nearestHighlight}
                  />
                </MapMarker>
              );
            })}
          </Map>
        </div>
      </div>

      <div className="rounded-3xl border border-border/70 bg-card p-4 shadow-sm lg:max-h-[44rem] lg:overflow-y-auto">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge className="gap-1.5 bg-secondary text-secondary-foreground">
                <MapPin aria-hidden="true" size={14} />
                Selected centre
              </Badge>
              <Badge
                className="bg-background/70 text-card-foreground"
                variant="outline"
              >
                {allCenters.length} official centres
              </Badge>
            </div>
            <h3 className="mt-3 text-2xl font-semibold leading-tight">
              {activeCenter.name}
            </h3>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              {activeRegion.city} - {activeRegion.label}
            </p>
          </div>
          <Button asChild size="sm" variant="outline">
            <a
              aria-label={activeRegion.sourceLabel}
              href={activeRegion.sourceUrl}
              rel="noreferrer"
              target="_blank"
              title={activeRegion.sourceLabel}
            >
              Source
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        </div>

        <p className="mt-4 text-sm leading-6 text-card-foreground/75">
          {activeRegion.summary}
        </p>

        <div className="mt-5 grid max-h-[24rem] gap-2 overflow-y-auto pr-1">
          {activeRegion.centers.map((center) => (
            <a
              className={`group rounded-2xl border p-3 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm ${
                activeCenter.id === center.id
                  ? "border-primary bg-background/90 shadow-sm"
                  : "border-border/70 bg-background/70"
              }`}
              href={center.mapUrl}
              key={center.name}
              rel="noreferrer"
              target="_blank"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Navigation aria-hidden="true" size={15} />
                </span>
                <span>
                  <span className="block font-semibold">{center.name}</span>
                  <span className="mt-1 block text-sm leading-5 text-card-foreground/70">
                    {center.address}
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-5 grid gap-2 rounded-2xl bg-muted/60 p-3 text-sm leading-6 text-card-foreground/75">
          <p className="flex items-start gap-2">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-primary"
              size={16}
            />
            Use the dots as visual starting points. Vaccine availability,
            pricing, eligibility, and exact entrance locations can change, so
            confirm directly with the clinic before visiting.
          </p>
          <p className="flex items-start gap-2">
            <Phone
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-primary"
              size={16}
            />
            VNVC hotline shown on their official site: 028 7102 6595.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild>
            <a href={bookingUrl} rel="noreferrer" target="_blank">
              Book / register with VNVC
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://vnvc.vn/en/vaccination-centers/"
              rel="noreferrer"
              target="_blank"
            >
              Full centre finder
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function VaccineCenterRichPopup({
  bookingUrl,
  center,
  nearest,
}: {
  bookingUrl: string;
  center: VaccineCenterMarker;
  nearest?: NearestCenterHighlight;
}) {
  return (
    <MarkerPopup
      className="w-[15.5rem] max-w-[calc(100vw-2rem)] overflow-hidden p-0 text-xs"
      closeButton
    >
      <div
        aria-label="VNVC vaccination centre system"
        className="relative h-20 overflow-hidden rounded-t-md bg-secondary bg-cover bg-center"
        role="img"
        style={{ backgroundImage: `url(${VNVC_POPUP_IMAGE_URL})` }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            nearest
              ? "from-red-700/85 via-red-500/20 to-transparent"
              : "from-primary/75 via-primary/10 to-transparent"
          }`}
        />
        <Badge
          className={
            nearest
              ? "absolute bottom-2 left-2 bg-red-600 px-2 py-0.5 text-[10px] text-white"
              : "absolute bottom-2 left-2 bg-background/95 px-2 py-0.5 text-[10px] text-foreground"
          }
        >
          {nearest ? `#${nearest.rank} nearest` : center.region.city}
        </Badge>
      </div>

      <div className="space-y-2 p-2.5">
        <div>
          <p className="pb-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            VNVC vaccination centre
          </p>
          <h3 className="text-sm leading-tight font-semibold text-foreground">
            {center.name}
          </h3>
          {nearest && (
            <p className="mt-0.5 text-[11px] font-semibold text-red-600">
              {formatDistance(nearest.distanceKm)} from your search origin
            </p>
          )}
          <p className="mt-1 line-clamp-1 text-[11px] leading-4 text-muted-foreground">
            {center.address}
          </p>
        </div>

        <div className="grid gap-1.5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Star
              aria-hidden="true"
              className="size-3 fill-amber-400 text-amber-400"
            />
            <span className="font-medium">{VNVC_QUALITY_LABEL}</span>
            <span className="text-muted-foreground">(2025)</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock aria-hidden="true" className="size-3" />
            <span>{VNVC_OFFICIAL_HOURS}, no lunch break</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin aria-hidden="true" className="size-3" />
            <span>{center.region.label} in this province</span>
          </div>
        </div>

        <div className="flex gap-1.5 pt-0.5">
          <Button asChild className="flex-1" size="xs">
            <a href={center.mapUrl} rel="noreferrer" target="_blank">
              <Navigation aria-hidden="true" className="size-3" />
              Directions
            </a>
          </Button>
          <Button asChild className="flex-1" size="xs" variant="outline">
            <a href={bookingUrl} rel="noreferrer" target="_blank">
              Register
              <ExternalLink aria-hidden="true" className="size-3" />
            </a>
          </Button>
        </div>
      </div>
    </MarkerPopup>
  );
}

function toLngLat([latitude, longitude]: [number, number]): [number, number] {
  return [longitude, latitude];
}

function VietnamBoundaryHighlight() {
  const { isLoaded, map } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) {
      return;
    }

    addVietnamHighlight(map);

    return () => removeVietnamHighlight(map);
  }, [isLoaded, map]);

  return null;
}

function addVietnamHighlight(map: MapLibreMap) {
  const beforeId = getFirstSymbolLayerId(map);

  if (!map.getSource(VIETNAM_BOUNDARY_SOURCE_ID)) {
    map.addSource(VIETNAM_BOUNDARY_SOURCE_ID, {
      type: "geojson",
      data: vietnamBoundary,
    });
  }

  for (const layer of VIETNAM_HIGHLIGHT_LAYERS) {
    if (!map.getLayer(layer.id)) {
      map.addLayer(layer, beforeId);
    }
  }
}

function removeVietnamHighlight(map: MapLibreMap) {
  const style = map.getStyle();

  if (!style?.layers || !style.sources) {
    return;
  }

  for (const layer of [...VIETNAM_HIGHLIGHT_LAYERS].reverse()) {
    if (style.layers.some((styleLayer) => styleLayer.id === layer.id)) {
      map.removeLayer(layer.id);
    }
  }

  if (style.sources[VIETNAM_BOUNDARY_SOURCE_ID]) {
    map.removeSource(VIETNAM_BOUNDARY_SOURCE_ID);
  }
}

function getFirstSymbolLayerId(map: MapLibreMap) {
  return map.getStyle().layers?.find((layer) => layer.type === "symbol")?.id;
}

async function geocodeVietnamLocation(
  query: string,
): Promise<[number, number] | null> {
  for (const variant of getVietnamLocationSearchVariants(query)) {
    const endpoint = new URL("https://nominatim.openstreetmap.org/search");
    endpoint.searchParams.set("format", "jsonv2");
    endpoint.searchParams.set("limit", "1");
    endpoint.searchParams.set("countrycodes", "vn");
    endpoint.searchParams.set("q", variant);

    try {
      const response = await fetch(endpoint, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        continue;
      }

      const places = (await response.json()) as Array<{
        lat: string;
        lon: string;
      }>;
      const place = places[0];

      if (place) {
        return [Number(place.lat), Number(place.lon)];
      }
    } catch {
      continue;
    }
  }

  return null;
}

function getVietnamLocationSearchVariants(query: string) {
  const normalized = normalizeVietnamLocationQuery(query);
  const withoutStreetAddress = normalized
    .replace(/^\d+\s*[a-z]?\s+/i, "")
    .replace(
      /^(?:đường|duong|street|đ\.?)\s*(?:số|so|no\.?)?\s*\d+[a-z]?\s*,?\s*/i,
      "",
    )
    .trim();
  const commaParts = normalized
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const suffixes = commaParts
    .slice(1)
    .map((_, index) => commaParts.slice(index + 1).join(", "));
  const withoutUrbanAreaLabel = [
    normalized,
    withoutStreetAddress,
    ...suffixes,
  ].map((variant) =>
    variant
      .replace(/khu đô thị/gi, "")
      .replace(/\s+/g, " ")
      .trim(),
  );

  return [
    query.trim(),
    normalized,
    withoutStreetAddress,
    ...suffixes,
    ...withoutUrbanAreaLabel,
  ]
    .map((variant) => variant.replace(/\s+/g, " ").replace(/,\s*$/, "").trim())
    .filter((variant) => variant.length >= 3)
    .filter((variant, index, variants) => variants.indexOf(variant) === index);
}

function normalizeVietnamLocationQuery(query: string) {
  return query
    .replace(/\b(?:việt nam|viet nam|vietnam)\b/gi, "")
    .replace(/\b\d{5,6}\b/g, "")
    .replace(/\btp\.?\s*hcm\b/gi, "Hồ Chí Minh")
    .replace(/\btp\.?\s*hồ chí minh\b/gi, "Hồ Chí Minh")
    .replace(/\bhcm\b/gi, "Hồ Chí Minh")
    .replace(/(^|[\s,])đ\.\s*/gi, "$1Đường ")
    .replace(/(^|[\s,])p\.\s*/gi, "$1Phường ")
    .replace(/(^|[\s,])q\.\s*/gi, "$1Quận ")
    .replace(/,+/g, ",")
    .replace(/\s+,/g, ",")
    .replace(/,\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getNearestCenters(
  centers: VaccineCenterMarker[],
  origin: [number, number],
  limit: number,
): NearestCenter[] {
  return centers
    .map((center) => ({
      ...center,
      distanceKm: getDistanceKm(origin, center.coordinates),
    }))
    .sort((first, second) => first.distanceKm - second.distanceKm)
    .slice(0, limit);
}

function getDistanceKm(
  [originLatitude, originLongitude]: [number, number],
  [destinationLatitude, destinationLongitude]: [number, number],
) {
  const earthRadiusKm = 6371;
  const latitudeDelta = toRadians(destinationLatitude - originLatitude);
  const longitudeDelta = toRadians(destinationLongitude - originLongitude);
  const originLat = toRadians(originLatitude);
  const destinationLat = toRadians(destinationLatitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLat) *
      Math.cos(destinationLat) *
      Math.sin(longitudeDelta / 2) ** 2;

  return (
    2 *
    earthRadiusKm *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function formatDistance(distanceKm: number) {
  if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)} km`;
  }

  return `${Math.round(distanceKm)} km`;
}

function getMarkerColor(regionId: string) {
  const exactColors: Record<string, string> = {
    "can-tho": "#ff8a3d",
    "da-nang": "#25c887",
    "hai-phong": "#9b7dff",
    "ha-noi": "#ff6faf",
    "khanh-hoa": "#2dc5d3",
    "tp-ho-chi-minh": "#4e7dff",
  };
  const markerPalette = [
    "#0033ff",
    "#977dff",
    "#ffccf2",
    "#25c887",
    "#ff8a3d",
    "#2dc5d3",
    "#ff6faf",
    "#5c8dff",
    "#9b7dff",
    "#18a886",
  ];

  if (exactColors[regionId]) {
    return exactColors[regionId];
  }

  let hash = 0;

  for (const char of regionId) {
    hash = (hash * 31 + char.charCodeAt(0)) % markerPalette.length;
  }

  return markerPalette[hash];
}

function getCenterOffset(index: number, total: number): [number, number] {
  if (total <= 1) {
    return [0, 0];
  }

  const angle = index * 2.399963229728653;
  const maxRadius = total > 35 ? 42 : total > 10 ? 30 : 20;
  const radius = Math.min(maxRadius, 8 + Math.floor(index / 6) * 5);

  return [
    Math.round(Math.cos(angle) * radius),
    Math.round(Math.sin(angle) * radius),
  ];
}
