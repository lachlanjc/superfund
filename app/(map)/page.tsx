import { Search } from "@/app/(map)/sites/search";
import { nplStatuses } from "@/lib/data/site";
import { HeaderRoot, HeaderTitle } from "@/lib/ui/header";
import { GitHubIcon } from "@/lib/ui/icons";
import { Link } from "next-view-transitions";

export default function Page() {
  return (
    <>
      <HeaderRoot showClose={false}>
        <HeaderTitle>Superfund Sites</HeaderTitle>
        <a
          href="https://github.com/lachlanjc/superfund"
          className="opacity-40 transition-opacity hover:opacity-50 absolute top-0 right-0"
        >
          <GitHubIcon />
          <span className="sr-only">Open Source on GitHub</span>
        </a>
      </HeaderRoot>
      <div className="grid grid-cols-3 gap-4 w-full font-sans text-lg font-semibold tracking-tight text-neutral-800 leading-[1.125]">
        <Link
          href="/states"
          className="action-button flex flex-col items-start gap-3 p-4 pb-3.5"
        >
          <div className="flex -gap-3 h-4 fill-neutral-400">
            {/* via https://github.com/coryetzkorn/state-svg-defs */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 42 80"
            >
              <path d="M29.040 53.84l1.28-1.52h-1.28l-0.64 1.52-1.68-0.64 0.88 0.64h1.44zM31.92 49.6l2-2.88 0.72-2.96-3.52 6.48zM36.88 14.88l1.28-3.52 0.72-2.24-17.040-9.84-2 0.64-1.52 1.36-1.44 4.32-2 2.16-2.16 2 1.28 2.96-0.64 2.16h-1.28l-0.8 1.36v4.96l2.080 0.72 1.52 3.52h0.72l0.56 1.36 4.96 5.76-0.56 0.72-3.68 2-3.52 2.96h-0.64l0.64 1.36-1.28 1.44-3.76 0.72-2 0.64-2.8 5.68 0.56 1.52v1.36h-0.56v0.64l3.52 4.32 0.64-0.72 0.64 1.36h1.44l1.52 2.16 0.8 1.52 1.92-0.72 0.88 0.72h2l0.72 2.16-1.44 2.080v2.8l1.44-0.56 2.24-1.6v-0.64l2-2.080-1.28-0.72h1.28l0.72-2.16 2.080-2.16h-2.080l0.8-0.8h1.28l1.44-2v0.64l-0.64 1.36 2.96-1.36-0.8-1.36h-0.88v-1.52h1.68v-2.72h0.64l1.28 1.36-0.64-1.36 3.52-4.24v-2.24l1.44-3.52-0.72-0.72 0.72-0.64-0.72-0.72 1.28-0.64v-1.6l0.96 1.6-1.52 6.24h0.56l0.96-6.96v-1.52l1.28-5.6v-3.6l-0.56 0.64-2.96-1.36h-1.44l-1.36-0.64v-2.16l1.36-2.72 1.44-2.24v1.36l2.24-1.36z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="24"
              viewBox="0 0 78 80"
            >
              <path d="M73.52 27.28l-0.48-1.36-2.96-0.88-0.88-1.44-0.48-3.68-1.84-0.8-0.24-0.88-0.96-0.8h-51.76v-4.16l-4.24 2.16 0.56-0.8-1.68 1.28-3.52 1.52-1.040 35.6 57.44 0.24 0.8-1.36 1.28-0.64 2 0.4 3.52-1.44 0.24-1.12 4.48-3.36-3.040-3.68h-0.64l-0.64-2.24-1.36-0.16-0.080-1.92v-0.96l1.040-0.64 0.48-1.2-0.96-1.92 2.16-2.16 1.84-3.2z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 92 80"
            >
              <path d="M64.48 64.080l-1.2 0.16-0.72 1.84 1.92-1.2v-0.8zM73.44 63.68l-1.040 0.24-2.48 0.56 1.76-0.16zM74.4 63.92l3.92-1.84-5.44 2v0.16zM83.92 56.88l-1.040-0.16-2.96 2.4-5.28 0.32-1.12 0.8-2-0.56 0.4 0.72-0.8-0.72-0.4 0.8-1.44-0.080-0.32 1.12-0.72-0.88-0.16 1.040-0.24-0.24v0.64l-1.84 0.16-1.28 1.84 0.4 1.040 1.36-0.32-0.24-0.56 0.8-0.32 0.8 0.56-1.84 0.8 3.68-0.48-1.44-0.32 11.6-2.96-0.96 0.56 9.28-4.4-2.72 1.040-0.72-0.8-0.080 0.56-1.44-0.080-1.44 1.84h-1.84zM86.48 55.040h0.16l0.56-0.56-0.96 0.4zM13.92 28.88l-1.040-0.48-0.080 0.88 0.48 0.4zM42.080 16.16l0.16-0.080v-0.48l-0.72 1.040zM43.68 11.92l-0.56 0.16-0.16 0.24 0.96-0.24zM45.36 11.040l-1.28 0.4 0.16 0.64 0.64-0.64zM56.32 2.080l-4.080 2-4.56 3.84-1.6 2.96-5.2 3.44 0.56 1.36 0.96-0.64 0.88 0.4-0.88 1.040 1.52-0.32-1.68 2.16-0.16-0.72-0.64 0.72 0.8 2.96 0.24-0.24-0.080 1.040-0.88 0.96-1.6-0.16-3.040 2.64-2.32 0.4-0.32 0.8-4.080-0.88-2.32 0.56-1.68-1.44-6.48-0.96-7.36 1.28-0.080 2.56 1.84 0.8-0.56 1.040 0.4 2.8-1.68 0.88-1.28 1.92-6.72 4-0.24 3.76 46.88 1.84 0.88 1.76 1.92 0.8 0.080 3.040 0.72 1.52 2.64 1.040 0.48 0.96 8.48 5.12-0.8-3.84 0.56-0.72 0.64 4.16-1.36 4.4 0.88-1.44 1.28-0.16-0.16-0.64 1.84-1.76-0.88-1.44 2.64-1.68-0.8-0.96 0.48-11.44 2.48-9.36-0.24-11.36-0.4-1.040-1.12 0.72-0.16-0.56 0.56-2.48-0.8-3.92 1.12-2.56 0.4-2.96-0.8-2.4 0.080-4.8v-0.8h-15.2z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 67 80"
            >
              <path d="M38.72 63.76l-1.2-1.76h-0.24l0.8 1.68zM31.68 60.64h-0.32l0.8 0.32v-0.24zM38.72 59.6l-1.52-0.32 1.040 0.96h0.64zM28.48 55.52h-1.2l0.56 0.96 0.8-0.48zM26.88 55.36l-0.48-0.24-0.32 0.24 0.8 0.16v-0.16zM29.76 55.2l-0.72-0.080 0.88 0.72 1.52-0.48-0.16-0.24zM27.6 6.64l-0.080-7.68h-22.4l-0.080 1.44 0.4 0.72 0.56 1.76-0.96 4.8 0.48-0.56-0.96 0.96-0.56 1.92 0.080 1.36 2.080 1.76 0.96 2.080-0.32 2.24 0.56 1.92v1.2l3.28 3.44 1.52 2.48-0.8-0.72-0.16 1.68 0.4-0.64 2.32 1.76 0.4-0.4-0.4-1.76 0.72-0.080 1.28 0.8 0.8-0.72 0.64 0.72 1.28-0.72-0.4 0.72 0.88-0.64 0.96 0.72-1.2-0.72-0.24 0.72h-2.64l-0.4-0.080-0.8 0.080-0.16 0.32 0.48 1.2 0.72 0.56 0.88 1.92h-0.56l-1.44-1.040-0.080-1.44-0.72 0.24v1.84l1.2 2.8 1.040 1.2h1.28l0.8 0.88-0.4 1.44-0.64 0.16 0.48 2.24 2.080 2.080 1.36 2.32 2.24 1.68v1.44l1.52 0.4v4.32l0.8 0.48 5.2 0.32 1.92 0.96 1.040 1.2 1.92 0.64 1.76-0.16 0.72 1.92 1.52-0.080 3.76 2.56 1.44 1.92 0.48 2.88 0.72-0.32 0.16 0.48-0.64-0.16 0.64 0.96 15.52-2.72 0.080-1.68-1.2-0.56-0.72-2.4 1.2-0.96-0.16-2.96 2.24-2.72-1.52-0.96-2-3.52-31.92-26.72z" />
            </svg>
          </div>
          Explore
          <br />
          by State
        </Link>
        <Link
          href="/npl"
          className="action-button flex flex-col items-start gap-3 p-4 pb-3.5"
        >
          <div className="flex -gap-3">
            {Object.values(nplStatuses).map(({ color }) => (
              <div
                key={color}
                className={`w-4 h-4 ${color} bg-current rounded-full outline-2 outline-[#efeef0]`}
              />
            ))}
          </div>
          Explore
          <br />
          Cleanup Progress
        </Link>
        <Link href="/about" className="action-button flex items-end p-4">
          About
          <br />
          Superfund
        </Link>
      </div>
      <hr className="border-black/20 -mx-6 my-6" />
      <Search>
        <p className="text-neutral-700 text-balance mb-3">
          This is a map of places with significant amounts of dangerous
          toxic&nbsp;waste in the U.S.
        </p>
        <p className="text-neutral-700 text-balance">
          The Environment Protection Agency (EPA) designates them “Superfund
          sites,” and manages cleaning them up.
        </p>
      </Search>
    </>
  );
}
