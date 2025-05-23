import STATES from "@/lib/data/states.json" assert { type: "json" };
import {
  HeaderRoot,
  HeaderBreadcrumb,
  HeaderTitle,
  HeaderSubtitle,
} from "@/lib/ui/header";
// import { MapZoom } from "../../zoom";
import { SearchableSections } from "@/app/(map)/sites/search-sections";
import { notFound } from "next/navigation";
import { Count } from "@/lib/ui/count";
import { categories } from "@/lib/data/site-categories";
import { supabase } from "@/lib/supabaseClient";
import clsx from "clsx";
import { SiteListSite } from "../../sites/list";

export async function generateStaticParams() {
  return Object.keys(categories)
    .filter((key) => key !== "unknown")
    .map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryKey } = await params;
  const category = categories[categoryKey as keyof typeof categories];
  if (!category) {
    throw new Error(`Category not found: ${categoryKey}`);
  }

  return {
    title: `${category.name} Superfund Sites`,
    description: `List of contaminated toxic waste Superfund sites resulting from ${category.name.toLowerCase()}.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryKey } = await params;
  const category = categories[categoryKey as keyof typeof categories];
  const Icon = category.icon;
  const { data: sites = [], error } = await supabase
    .from("sites")
    .select("id, name, npl, city, stateCode")
    .eq("category", categoryKey);
  if (!category || !sites) {
    return notFound();
  }
  if (error) {
    console.error("Error fetching sites:", error);
  }
  // Prepare sections grouped by state
  const sections = STATES.map((state) => {
    const sectionSites = (sites as Array<SiteListSite>)
      .filter((site) => site.stateCode === state.abbrev)
      .sort((a, b) => a.name!.localeCompare(b.name!));
    return { key: state.abbrev, label: state.name, sites: sectionSites };
  }).filter((section) => section.sites.length > 0);

  return (
    <>
      {/* <MapZoom center={[state.lat, state.lng]} zoom={state.zoom + 2} /> */}
      <HeaderRoot>
        <HeaderBreadcrumb href="/categories">
          Superfund Sites by Category
        </HeaderBreadcrumb>
        <HeaderTitle style={{ viewTransitionName: categoryKey }}>
          <Icon
            className={clsx(category.color, "w-8 h-8 inline-block mr-1.5")}
          />
          {category.name} <Count value={sites.length} />
        </HeaderTitle>
        {category.desc && <HeaderSubtitle>{category.desc}</HeaderSubtitle>}
      </HeaderRoot>
      {/* @ts-expect-error category is intentionally omitted */}
      <SearchableSections sections={sections} />
    </>
  );
}
