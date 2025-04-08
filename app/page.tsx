"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { SiteCard } from "@/app/sites/[site]/site";
import { Search } from "@/app/sites/search";
import SITES from "@/lib/data/sites.json" assert { type: "json" };
import { hasPlainSiteImage, Site } from "@/lib/data/site";

import "mapbox-gl/dist/mapbox-gl.css";

import Map, { MapRef, Marker } from "react-map-gl/mapbox";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFja2NsdWIiLCJhIjoiY2pscGI1eGdhMGRyNzN3bnZvbGY5NDBvZSJ9.Zm4Zduj94TrgU8h890M7gA";

function MainCard({
  title,
  children,
  ...props
}: PropsWithChildren<{ title: string }>) {
  return (
    <Drawer.Root dismissible={false} modal={false} open={true}>
      <Drawer.Portal>
        <Drawer.Content
          {...props}
          className="main-card backdrop-blur-lg backdrop-saturate-150 flex flex-col w-full md:max-w-xl p-6 mx-auto font-mono overflow-y-auto max-h-[80vh] fixed bottom-0 max-md:left-0 max-md:right-0 outline-none md:absolute md:top-8 md:left-8 rounded-t-2xl md:rounded-2xl"
        >
          <Drawer.Title className="text-balance font-bold font-sans text-3xl">
            {title}
          </Drawer.Title>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

const initialViewState = {
  latitude: SITES[0].lat,
  longitude: SITES[1].lng,
  zoom: 4,
  bearing: 0,
  pitch: 20,
};

export default function Page() {
  const mapRef = useRef<MapRef | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeSite, setActiveSite] = useState<Site | null>(null);

  useEffect(() => {
    if (!activeSite) return;
    mapRef.current?.flyTo({
      center: [activeSite.lng, activeSite.lat],
      zoom: 14,
      duration: 2000,
    });
  }, [activeSite?.id]);

  return (
    <div className="w-full h-full" ref={rootRef}>
      <style>{`.mapboxgl-canvas, .mapboxgl-marker { position: absolute !important; }`}</style>
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          inset: 0,
        }}
        cooperativeGestures
      >
        {SITES.sort((a, b) => b.lat - a.lat).map((marker, i) => (
          <Marker
            anchor="bottom"
            longitude={marker.lng}
            latitude={marker.lat}
            onClick={() => {
              setActiveSite(marker);
            }}
            key={marker.id}
            style={{ position: "relative" }}
          >
            <svg
              className={
                activeSite?.id === marker.id
                  ? "fill-primary-light"
                  : "fill-primary"
              }
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
              width={32}
              height={32}
              viewBox="0 0 24 24"
            >
              <title>{marker.name}</title>
              <path
                d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3 c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9 C20.1,15.8,20.2,15.8,20.2,15.7z`}
              />
            </svg>
          </Marker>
        ))}
      </Map>
      <MainCard title={activeSite ? activeSite.name : "Superfund sites"}>
        {activeSite ? (
          <>
            <button
              className="absolute top-6 right-6 rounded-full bg-black/10 w-8 h-8 text-center"
              onClick={() => {
                setActiveSite(null);
                mapRef.current?.flyTo({
                  zoom: Math.max(mapRef.current?.getZoom() - 2, 0),
                  duration: 1000,
                });
              }}
            >
              &times;
            </button>
            <SiteCard site={activeSite} />
          </>
        ) : (
          <>
            <Search sites={SITES} onSelect={setActiveSite} />
          </>
        )}
      </MainCard>
      {activeSite && hasPlainSiteImage(activeSite.id) && (
        <img
          src={`/plainsite/${activeSite.id}.`}
          width={1097 / 3}
          height={1080 / 3}
          alt={activeSite.name}
          className="floating-image"
        />
      )}
    </div>
  );
}
