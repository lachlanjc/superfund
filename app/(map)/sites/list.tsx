import { nplStatuses, SiteNPLStatus, SupabaseSite } from "@/lib/data/site";
import { categories } from "@/lib/data/site-categories";
import clsx from "clsx";
import { Link } from "next-view-transitions";

export type SiteListSite = Pick<
  SupabaseSite,
  "id" | "name" | "npl" | "city" | "stateCode"
> & { category?: SupabaseSite["category"] };

export function SiteNPLStatusIcon({
  status,
  className,
}: {
  status: SiteNPLStatus;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={status}
      className={clsx(
        "inline-block w-2 h-2 rounded-full shrink-0 bg-current",
        nplStatuses[status].color,
        className,
      )}
    />
  );
}

export function SiteList({
  sites,
  ...props
}: {
  sites: Array<SiteListSite>;
} & React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul {...props}>
      {sites.map((result) => (
        <li key={result.id}>
          <Link
            href={`/sites/${result.id}`}
            className="py-1 text-left transition-colors text-black hover:text-neutral-600 w-full grid grid-cols-[8px_1fr] pl-1 gap-x-2 gap-y-1.5 items-center"
            prefetch={false}
          >
            {result.npl ? <SiteNPLStatusIcon status={result.npl} /> : <span />}
            <strong
              className="font-sans text-base font-normal leading-tight"
              style={{ viewTransitionName: result.id }}
            >
              {result.name}
            </strong>
            <small className="text-neutral-600 font-mono block text-xs col-start-2">
              {result.category ? (
                <>
                  {categories[result.category as keyof typeof categories].name}{" "}
                  &middot;{" "}
                </>
              ) : (
                ""
              )}
              {result.city}, {result.stateCode}
            </small>
          </Link>
        </li>
      ))}
    </ul>
  );
}
