import { notFound } from "next/navigation";
import { SiteCard } from "./site";
import { allSites, findSiteById } from "@/lib/data/api";
import { MapZoom } from "../../zoom";
import { Nearby } from "./nearby";
import { Suspense } from "react";

export const generateStaticParams = async () => {
  return allSites.map(({ id }) => ({ site: id }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site: siteId } = await params;
  const site = findSiteById(siteId);
  if (!site) {
    return notFound();
  }
  return {
    title: `${site.name} Superfund Site`,
    // description: ,
  };
}

export const fetchCache = "force-cache";

export default async function Page({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site: siteId } = await params;
  const site = findSiteById(siteId);
  if (!site) {
    return notFound();
  }

  return (
    <>
      <MapZoom center={[site.lat, site.lng]} />
      <SiteCard site={site}>
        {site.id === "NYD000606947" ? (
          <section className="border border-black/10 rounded-lg bg-black/2 p-4 mt-4">
            <h2 className="text-lg text-center text-neutral-600 font-bold font-sans tracking-tight">
              This was the very first Superfund site!
            </h2>
          </section>
        ) : (
          <Suspense>
            <Nearby site={site} />
          </Suspense>
        )}
      </SiteCard>
    </>
  );
}
