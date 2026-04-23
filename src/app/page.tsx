"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

const PDF_URL = "/Danger%20Testing%20Drops/danger-testing-deck.pdf";

// ─── Vibes — add YouTube IDs or local filenames here ─────────────────────────
const VIBES: {
  id: string;
  title: string;
  src: { type: "youtube"; videoId: string } | { type: "local"; file: string } | { type: "link"; url: string; thumb?: string };
}[] = [
  { id: "v3", title: "screenshot moment", src: { type: "local", file: "/3.mp4" } },
  { id: "v1", title: "us before our pre-seed", src: { type: "local", file: "/1.mp4" } },
  { id: "v2", title: "appstar launch", src: { type: "local", file: "/2.mp4" } },
  { id: "v6", title: "los on stage", src: { type: "local", file: "/chapelle.webm" } },
  { id: "v4", title: "writing: creation becomes consumption", src: { type: "link", url: "https://marcgmbh.substack.com/p/creation-becomes-consumption", thumb: "/splash1.jpeg" } },
  { id: "v5", title: "writing: aspirational software", src: { type: "link", url: "https://marcgmbh.substack.com/p/aspirational-software", thumb: "/aspirational.jpg" } },
];
// ─────────────────────────────────────────────────────────────────────────────

function usePdfPages(url: string) {
  const [pages, setPages] = useState<string[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const pdf = await pdfjsLib.getDocument(url).promise;
        if (cancelled) return;
        setNumPages(pdf.numPages);
        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvas, viewport }).promise;
          if (cancelled) return;
          setPages((p) => [...p, canvas.toDataURL("image/jpeg", 0.88)]);
        }
        setLoading(false);
      } catch (e) {
        console.error("PDF render error:", e);
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { pages, numPages, loading };
}

type AppEntry = {
  id: number;
  name: string;
  desc: string;
  url: string | null;
  tweet?: string;
  img: string;
  bg?: string;
  content?: ReactNode;
};

// ─── Social proof line under Fund button ──────────────────────────────────────
const BACKED_BY = [
  {
    name: "Ravi Nandan",
    role: "Head of TV @ A24",
    initials: "RN",
    color: "#fe2c55",
    img: "/ravi.jpg",
  },
  {
    name: "Andy Weissman",
    role: "USV",
    initials: "AW",
    color: "#25f4ee",
    img: "/andy.jpeg",
  },
  {
    name: "Gabe Whaley",
    role: "MSCHF",
    initials: "GW",
    color: "#a855f7",
    img: "/gabe.jpg",
  },
];

// ─── Team ─────────────────────────────────────────────────────────────────────
const TEAM = [
  { name: "Los",     title: "Co-founder / Appstar",                                                                                                                                      initials: "LO", color: "#fe2c55", link: "https://x.com/downloadlos",              img: "/team/los.png" },
  { name: "Marc",    title: "Co-founder / Appstar",                                                                                                                                      initials: "MA", color: "#25f4ee", link: "https://x.com/marcgmbh",                 img: "/team/marc.png" },
  { name: "Cecilia", title: "Creative Director — Past Spotify / Cash App / Apple. Artist collabs include Rosalía, Jaden Smith, Gunna, Billie Eilish, Prada",                             initials: "CE", color: "#a855f7", link: "https://ceciliaazcarate.com/",            img: "/team/ceci.png" },
  { name: "Helene",  title: "Creative Operations — 20 years of experience fostering talent communities and developing services for the creative industries",                              initials: "HE", color: "#f97316", link: "https://www.linkedin.com/in/helenehermes", img: "/team/helene.png" },
  { name: "Mike",    title: "Talent / First Appstar we signed",                                                                                                                          initials: "MI", color: "#3b82f6", link: "https://x.com/immike_wing",              img: "/team/mike.jpg" },
  { name: "Max",     title: "Talent / Building Newspeak",                                                                                                                                initials: "MX", color: "#10b981", link: "https://www.tiktok.com/@newspeakmedia",  img: "/team/max.jpeg" },
];

// ─── Edit your backers here ───────────────────────────────────────────────────
const BACKERS = [
  {
    name: "Asylum Ventures",
    title: "Fund",
    initials: "AV",
    color: "#fe2c55",
    img: "/asylum.jpg",
  },
  {
    name: "Common Magic",
    title: "Fund",
    initials: "CM",
    color: "#25f4ee",
    img: "/mc.jpg",
  },
  {
    name: "Tiny VC",
    title: "Fund",
    initials: "TV",
    color: "#a855f7",
    img: "/tiny.jpeg",
  },
  {
    name: "Ravi Nandan",
    title: "Head of TV @ A24",
    initials: "RN",
    color: "#f97316",
    img: "/ravi.jpg",
  },
  {
    name: "Josh Miller",
    title: "Founder @ Browser Company",
    initials: "JM",
    color: "#3b82f6",
    img: "/josh.jpg",
  },
  {
    name: "Gabe Whaley",
    title: "Founder @ MSCHF",
    initials: "GW",
    color: "#10b981",
    img: "/gabe.jpg",
  },
  {
    name: "Sebastian Speier",
    title: "Design @ Perplexity",
    initials: "SS",
    color: "#eab308",
    img: "/seb.jpg",
  },
  {
    name: "Carly Ayres",
    title: "Content @ OpenAI",
    initials: "CA",
    color: "#ec4899",
    img: "/carly.jpg",
  },
  {
    name: "Andy Weissman",
    title: "USV",
    initials: "AW",
    color: "#25f4ee",
    img: "/andy.jpeg",
  },
];

// ─── Pitch deck slides ───────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 0,
    emoji: "🌍",
    label: "Why Now",
    bg: "from-slate-950 via-indigo-950 to-blue-950",
    title: "Why Now",
    body: "AI builds apps 10× faster.\nOne person. One week. One app.\n\n3.8B phones. One world.\nDistribution is free.\n\nCreator economy proven.\nSongs go viral. Apps can too.\n\n→ The music label for software.\n   The world is ready.",
  },
  {
    id: 1,
    emoji: "💸",
    label: "How do you make money?",
    bg: "from-slate-900 via-purple-950 to-slate-900",
    title: "How do you make money?",
    body: "Starter $499/mo\nGrowth $1,999/mo\nEnterprise Custom\n\n85% gross margins. Land & expand motion drives 40% of ARR.",
  },
  {
    id: 2,
    emoji: "⚡",
    label: "Our Solution",
    bg: "from-cyan-600 via-teal-500 to-emerald-500",
    title: "The Solution",
    body: "AI-powered chaos testing that thinks like a hacker, moves like a QA engineer, and reports like a CTO.",
  },
  {
    id: 3,
    emoji: "📈",
    label: "Market Size",
    bg: "from-violet-700 via-purple-600 to-fuchsia-600",
    title: "Market Size",
    body: "TAM $40B · SAM $12B · SOM $800M\n\nGrowing 12% YoY. Nobody owns the chaos segment yet.",
  },
  {
    id: 4,
    emoji: "🚀",
    label: "Traction",
    bg: "from-amber-500 via-orange-500 to-red-500",
    title: "Traction",
    body: "$2M ARR · 3× YoY Growth\n150+ Customers · 92% Retention\n\nNPS: 72.",
  },
  {
    id: 5,
    emoji: "💰",
    label: "Business Model",
    bg: "from-green-700 via-emerald-600 to-teal-600",
    title: "Business Model",
    body: "Starter $499/mo\nGrowth $1,999/mo\nEnterprise Custom\n\n85% gross margins.",
  },
  {
    id: 6,
    emoji: "👥",
    label: "The Team",
    bg: "from-blue-700 via-indigo-600 to-violet-600",
    title: "The Team",
    body: "Marc Mueller — CEO\nAlex Chen — CTO\nJordan Kim — Growth\n\nEx-Google, Netflix, Stripe.",
  },
  {
    id: 7,
    emoji: "🎯",
    label: "The Ask",
    bg: "from-[#fe2c55] via-rose-600 to-pink-700",
    title: "$5M Seed Round",
    body: "50% Engineering\n30% Sales & Marketing\n20% Ops & Infra\n\nmarc@dangertesting.com",
  },
];

// ─── App drops from Notion ────────────────────────────────────────────────────
const D = "/danger%20testing%20drops/";
const APPS = [
  { id: 0,  name: "BIEBERCHELLA",        desc: "We made a website to control the screen behind Bieber at Coachella.", url: "https://bieberchella.appstar.world/",   tweet: "https://x.com/immike_wing/status/2043507113159225835", img: `${D}Screenshot_2026-04-21_at_17.14.22.png` },
  { id: 1,  name: "Frutiger Zero",        desc: "Make frutiger aero websites.",                                         url: null,                                     tweet: "https://x.com/marcgmbh/status/2030025914378051892",   img: `${D}Screenshot_2026-04-21_at_18.54.52.png` },
  { id: 2,  name: "El Toro",              desc: "Track our friend riding from Tokyo to Osaka in 22h.",                  url: "https://eltoro.appstar.world/",           tweet: "https://x.com/marcgmbh/status/2042690499186729370",   img: `${D}Screenshot_2026-04-21_at_18.49.53.png` },
  { id: 3,  name: "MCGACHAPON",           desc: "Scraped every Happy Meal toy from the last 20 years. Collect them all.", url: "https://www.mcgachapon.com/",          tweet: "https://x.com/immike_wing/status/2037196888273740036", img: `${D}Screenshot_2026-04-21_at_17.09.21.png` },
  { id: 4,  name: "APPSTAR",              desc: "Our take on YouTube for apps.",                                         url: "https://www.appstar.world/",             tweet: "https://x.com/marcgmbh/status/2027153592465920511",   img: `${D}Screenshot_2026-04-21_at_17.48.42.png` },
  { id: 5,  name: "BTS",                  desc: "Made a Ticketmaster simulator to help people buy tickets in under a minute.", url: "https://btstrainer.com/",        tweet: "https://x.com/immike_wing/status/2013739057176617210", img: `${D}Screenshot_2026-04-21_at_16.51.26.png` },
  { id: 6,  name: "X RAGE ROOM",          desc: "We built a rage room to destroy tweets.",                               url: "https://www.xrageroom.com/x",           tweet: "https://x.com/marcgmbh/status/2024662344291250542",   img: `${D}1772068672175-nht8xco4z28.webp` },
  { id: 7,  name: "XBOX MIC SIMULATOR",   desc: "Microsoft killed Xbox 360 voice messages. We brought them back.",      url: "https://www.xboxchatting.com/",         tweet: "https://x.com/immike_wing/status/2039763553700237473", img: `${D}Screenshot_2026-04-21_at_17.10.17.png` },
  { id: 8,  name: "Link Bouquet",         desc: "Send your valentine a bouquet of links.",                               url: "https://www.linkbouquet.com/",          tweet: "https://x.com/marcgmbh/status/2022128880698765745",   img: `${D}1772040709924-f4hmtq48fw.webp` },
  { id: 9,  name: "NOSTALGIA CANADA",     desc: "A TV that only plays 2000s Canadian commercials and shows.",            url: "https://www.nostalgiacanada.com/",      tweet: "https://x.com/immike_wing/status/2024904637334142997", img: `${D}Screenshot_2026-04-21_at_17.00.19.png` },
  { id: 10, name: "Anatomy of a Lobster", desc: "Visualize and construct your openclaw agent.",                          url: "https://lobsteranatomy.com/",           tweet: "https://x.com/marcgmbh/status/2019596829177049510",   img: `${D}1772041875877-cn8yws4g1as.webp` },
  { id: 11, name: "BEEPLE DOG",           desc: "Nintendogs but replaced with @beeple robot dogs.",                      url: null,                                    tweet: "https://x.com/immike_wing/status/2027487533513216239", img: `${D}Screenshot_2026-04-21_at_17.02.14.png` },
  { id: 12, name: "GirlHinge",            desc: "See life from the other side.",                                         url: "https://www.girlhinge.com/",            tweet: "https://x.com/downloadlos/status/2018547194912194967", img: `${D}1772040609130-xq9wd4f8x2g.webp` },
  { id: 13, name: "ASSPIZZA",             desc: "We turned ASSPIZZA's art show into an app.",                            url: null,                                    tweet: "https://x.com/marcgmbh/status/2014485676985548876",   img: `${D}1772042656056-4ywac55x5x.webp` },
  { id: 14, name: "Kumo",                 desc: "A tamagotchi you keep alive by going offline.",                         url: "https://apps.apple.com/de/app/kumo-offline-friend/id6756067305?l=en-GB", tweet: "https://x.com/marcgmbh/status/2002033165636886946", img: `${D}1772041809714-tls23nsy1wc.webp` },
  { id: 15, name: "Mybrainrot",           desc: "Turn your camera roll into brainrot.",                                  url: "https://apps.apple.com/us/app/appstar-your-life/id6755724457",          tweet: "https://x.com/downloadlos/status/1999491759559311558", img: `${D}1772048874835-x1bur7f36es.webp` },
  { id: 16, name: "Criterion Wrapped",    desc: "Enter the criterion closet.",                                           url: "https://www.criterionwrapped.com/",     tweet: "https://x.com/marcgmbh/status/1998093778046050815",   img: `${D}CleanShot_2026-04-21_at_17.56.312x.png` },
  { id: 17, name: "Hardboiled",           desc: "Text your friends with animal memes.",                                  url: null,                                    img: `${D}1772055263295-bizg8dyqtz.webp` },
  { id: 18, name: "ZOOM TIMOTHEE",        desc: "Join a zoom call with Timothée Chalamet.",                              url: null,                                    tweet: "https://x.com/marcgmbh/status/1973853620547564031",   img: `${D}Screenshot_2026-04-21_at_18.16.51.png` },
  { id: 19, name: "vandalizefriend.com",  desc: "Graffiti any friend.com subway ad.",                                   url: "http://vandalizefriend.com",            tweet: "https://x.com/marcgmbh/status/1973853620547564031",   img: `${D}1775087705695-lutpvq51xhs.webp` },
  { id: 20, name: "Day of Generator",     desc: "Generate any day in the life of.",                                      url: "https://www.dayofgen.com/",             img: `${D}1772011496233-er1lqn527sq.webp` },
  { id: 21, name: "iChallengers",         desc: "Swing your phone and win.",                                             url: null,                                    img: `${D}challengers.png` },
  { id: 22, name: "Crowd Critic",         desc: "Get feedback from the crowd.",                                          url: "https://www.crowdcritic.app/",          tweet: "https://x.com/marcgmbh/status/1963719450525421855",   img: `${D}1772039755281-ehyfhmew2k9.webp` },
  { id: 23, name: "iMatcha",              desc: "iBeer but for Matcha.",                                                 url: null,                                    tweet: "https://x.com/downloadlos/status/1961209482941190586", img: `${D}1772040517690-4vn6jdk5tvn.webp` },
  { id: 24, name: "Mog Cam",              desc: "Mog your friends live.",                                                url: "https://www.mogcam.com/",              tweet: "https://x.com/dangertesting/status/1945973690190938544", img: `${D}Screenshot_2026-04-21_at_18.25.22.png` },
  { id: 25, name: "Powers of Ten",        desc: "Life is okay.",                                                         url: "https://www.powersoften.tv/",           img: `${D}Screenshot_2026-04-21_at_18.26.58.png` },
  { id: 26, name: "Iceberg Search",       desc: "Generate iceberg memes for deep research.",                             url: "https://www.icebergsearch.com/",        tweet: "https://x.com/marcgmbh/status/1941186148673737210",   img: `${D}Screenshot_2026-04-21_at_18.27.25.png` },
  { id: 27, name: "Yapwars",              desc: "Create characters and yap to win.",                                     url: "https://www.yapwars.com/browse",        tweet: "https://x.com/marcgmbh/status/1936095652980707475",   img: `${D}Screenshot_2026-04-21_at_18.28.58.png` },
  { id: 28, name: "Knowing Fun",          desc: "Go down the rabbit hole.",                                              url: "https://www.knowing.fun/",             tweet: "https://x.com/dangertesting/status/1930796120147468435", img: `${D}Screenshot_2026-04-21_at_18.31.05.png` },
  { id: 29, name: "Curate Curator",       desc: "Curate a curator.",                                                     url: "https://www.curatecurator.com/create",  tweet: "https://x.com/marcgmbh/status/1931066427349569613",   img: `${D}1772040307525-af8osc74qy.webp` },
  { id: 30, name: "Fake Until Real",      desc: "See what it's like to be successful.",                                  url: "https://www.fakeuntilreal.com/",        img: `${D}Screenshot_2026-04-21_at_18.44.29.png` },
  { id: 31, name: "Neue Blumen",          desc: "Art of arranging flowers.",                                             url: "https://www.neueblumen.com/",           tweet: "https://x.com/dangertesting/status/1940892511444119927", img: `${D}Screenshot_2026-04-21_at_18.39.01.png` },
  { id: 32, name: "MogOrNot",             desc: "Take a photo of you and your friend, see who mogs who.",               url: "https://www.mogornot.com/",             tweet: "https://x.com/downloadlos/status/1906768324861575367", img: `${D}Screenshot_2026-04-21_at_18.33.11.png` },
  { id: 33, name: "dangertesting.com",    desc: "The mothership.",                                                       url: "https://dangertesting.com",             img: `${D}image.png` },
];

export default function Home() {
  const [activeApp, setActiveApp] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showFund, setShowFund] = useState(false);
  const [showBelievers, setShowBelievers] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [activeTab, setActiveTab] = useState<"pitch" | "apps" | "vibes">(
    "pitch",
  );
  const [activeVibe, setActiveVibe] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const {
    pages: pdfPages,
    numPages,
    loading: pdfLoading,
  } = usePdfPages(PDF_URL);
  const slideCount = numPages || SLIDES.length;
  const slideCountRef = useRef(slideCount);
  slideCountRef.current = slideCount;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveApp(null);
        setActiveSlide(null);
        setActiveVibe(null);
        setShowBelievers(false);
        setShowHelp(false);
        setShowFund(false);
        setShowTeam(false);
      }
      if (activeApp !== null) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown")
          setActiveApp((p) => Math.min((p ?? 0) + 1, APPS.length - 1));
        if (e.key === "ArrowLeft" || e.key === "ArrowUp")
          setActiveApp((p) => Math.max((p ?? 0) - 1, 0));
      }
      if (activeSlide !== null) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown")
          setActiveSlide((p) =>
            Math.min((p ?? 0) + 1, slideCountRef.current - 1),
          );
        if (e.key === "ArrowLeft" || e.key === "ArrowUp")
          setActiveSlide((p) => Math.max((p ?? 0) - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeApp, activeSlide]);

  const app = activeApp !== null ? APPS[activeApp] : null;

  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center font-sans select-none">
      {/* ── Full-screen slide viewer ── */}
      {activeSlide !== null && (
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-black flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 pt-12 pb-3 shrink-0">
            <button
              onClick={() => setActiveSlide(null)}
              className="text-white/70 hover:text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
              </svg>
            </button>
            <span className="text-xs font-semibold text-white/50">
              {activeSlide + 1} / {slideCount}
            </span>
            <div className="w-6" />
          </div>
          {/* Slide image */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {pdfPages[activeSlide] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pdfPages[activeSlide]}
                alt={`Slide ${activeSlide + 1}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${SLIDES[activeSlide]?.bg ?? "from-slate-800 to-slate-900"}`}
              >
                <div className="flex flex-col items-center gap-4 text-white">
                  <div className="text-5xl">{SLIDES[activeSlide]?.emoji}</div>
                  <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                </div>
              </div>
            )}
            {/* Tap zones */}
            <button
              className="absolute left-0 inset-y-0 w-1/2 z-10"
              onClick={() => setActiveSlide((p) => Math.max((p ?? 0) - 1, 0))}
            />
            <button
              className="absolute right-0 inset-y-0 w-1/2 z-10"
              onClick={() =>
                setActiveSlide((p) => Math.min((p ?? 0) + 1, slideCount - 1))
              }
            />
          </div>
          {/* Progress bar */}
          <div className="flex gap-0.5 px-4 py-3 shrink-0">
            {Array.from({ length: slideCount }).map((_, i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-all ${i === activeSlide ? "bg-white" : "bg-white/25"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Full-screen app viewer ── */}
      {app !== null && (
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-black flex items-stretch">
          <div className="relative flex-1 overflow-hidden bg-black">
            {/* Progress dots */}
            <div className="absolute top-0 left-0 right-0 z-10 flex gap-0.5 px-3 pt-4">
              {APPS.map((a, i) => (
                <div
                  key={a.id}
                  className={`h-0.5 flex-1 rounded-full transition-all ${i === activeApp ? "bg-white" : "bg-white/25"}`}
                />
              ))}
            </div>

            {/* Top bar */}
            <div className="absolute top-6 left-0 right-0 z-10 flex items-center justify-between px-4 pt-2">
              <button
                onClick={() => setActiveApp(null)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
                </svg>
              </button>
              <span className="text-xs font-semibold text-white/60">
                {(activeApp ?? 0) + 1} / {APPS.length}
              </span>
              {app.url ? (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                  </svg>
                </a>
              ) : (
                <div className="w-6" />
              )}
            </div>

            {/* Screenshot */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={app.img}
              alt={app.name}
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* Fund overlay — shown when Like is tapped */}
            {showFund && (
              <div
                className="absolute inset-0 flex items-center justify-center z-20"
                onClick={() => setShowFund(false)}
              >
                <a
                  href="/wire.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#fe2c55] text-white font-black text-base px-8 py-4 rounded-full shadow-2xl"
                >
                  Invest ↗
                </a>
              </div>
            )}

            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-24 bg-gradient-to-t from-black/80 to-transparent z-10">
              <div className="flex items-center gap-2 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.jpg"
                  alt="Danger Testing"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-bold text-sm">@dangertesting</span>
                <span className="text-xs border border-white/40 rounded px-2 py-0.5 ml-1">
                  Follow
                </span>
              </div>
              <h3 className="text-lg font-black leading-tight">{app.name}</h3>
              <p className="text-sm opacity-80 mt-1 leading-relaxed">
                {app.desc}
              </p>
              {app.url && (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-white text-black px-4 py-2 rounded-full text-xs font-black"
                >
                  Open ↗
                </a>
              )}
            </div>

            {/* Tap zones */}
            <button
              className="absolute left-0 top-12 bottom-32 w-1/3 z-20"
              onClick={() => setActiveApp((p) => Math.max((p ?? 0) - 1, 0))}
            />
            <button
              className="absolute right-14 top-12 bottom-32 w-1/3 z-20"
              onClick={() =>
                setActiveApp((p) => Math.min((p ?? 0) + 1, APPS.length - 1))
              }
            />
          </div>

          {/* Right sidebar */}
          <div className="w-14 flex flex-col items-center justify-end gap-5 pb-8 bg-black">
            <div className="flex flex-col items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.jpg"
                alt="Danger Testing"
                className="w-10 h-10 rounded-full object-cover border-2 border-black"
              />
              <div className="w-5 h-5 rounded-full bg-[#fe2c55] flex items-center justify-center -mt-3">
                <span className="text-white text-xs font-black">+</span>
              </div>
            </div>
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => setShowFund((v) => !v)}
            >
              <div className="text-2xl transition-transform active:scale-125">❤️</div>
              <span className="text-xs text-white/70">Like</span>
            </button>
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => {
                const shareUrl = app.url ?? app.tweet ?? window.location.href;
                if (navigator.share) {
                  navigator.share({ title: app.name, text: app.desc, url: shareUrl }).catch(() => {});
                } else {
                  navigator.clipboard?.writeText(shareUrl).catch(() => {});
                }
              }}
            >
              <div className="text-2xl">💬</div>
              <span className="text-xs text-white/70">Share</span>
            </button>
            {app.tweet && (
              <button
                className="flex flex-col items-center gap-1"
                onClick={() => window.open(app.tweet, "_blank")}
              >
                <div className="text-2xl">𝕏</div>
                <span className="text-xs text-white/70">Tweet</span>
              </button>
            )}
            {app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1"
              >
                <div className="text-2xl">↗️</div>
                <span className="text-xs text-white/70">Open</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* ── Believers sheet ── */}
      {showBelievers && (
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-white/10 shrink-0">
            <button
              onClick={() => setShowBelievers(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
              </svg>
            </button>
            <span className="font-bold text-base text-white">Believers ($)</span>
            <div className="w-6" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {BACKERS.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-4 px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                {b.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={b.img}
                    alt={b.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm shrink-0 text-black"
                    style={{ backgroundColor: b.color }}
                  >
                    {b.initials}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-white truncate">
                    {b.name}
                  </div>
                  <div className="text-xs text-white/50 truncate">
                    {b.title}
                  </div>
                </div>
                <button className="shrink-0 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-white/10 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Team sheet ── */}
      {showTeam && (
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-white/10 shrink-0">
            <button
              onClick={() => setShowTeam(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
              </svg>
            </button>
            <span className="font-bold text-base text-white">Team</span>
            <div className="w-6" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {TEAM.map((b) => (
              <a
                key={b.name}
                href={b.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                {b.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.img} alt={b.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm shrink-0 text-black"
                    style={{ backgroundColor: b.color }}
                  >
                    {b.initials}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-white">{b.name}</div>
                  {b.title && <div className="text-xs text-white/50 leading-snug mt-0.5">{b.title}</div>}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/30 shrink-0"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Profile page ── */}
      <div className="w-full max-w-[430px] bg-black text-white min-h-screen flex flex-col">
        {/* Profile info */}
        <div className="px-4 pt-12 pb-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.jpg"
                alt="Danger Testing"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#fe2c55] flex items-center justify-center">
                <span className="text-white text-xs font-black">✓</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-black text-xl leading-tight">
                Danger Testing
              </h1>
              <p className="text-sm text-white/60">@dangertesting</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-5 mt-4 text-center">
            <div>
              <div className="font-black text-lg leading-tight">
                {APPS.length}
              </div>
              <div className="text-xs text-white/50">Apps</div>
            </div>
            <button
              onClick={() => setShowBelievers(true)}
              className="flex flex-col items-center hover:opacity-70 transition-opacity"
            >
              <div className="font-black text-lg leading-tight">
                {BACKERS.length}
              </div>
              <div className="text-xs text-white/50">Believers</div>
            </button>
            <button
              onClick={() => setShowTeam(true)}
              className="flex flex-col items-center hover:opacity-70 transition-opacity"
            >
              <div className="font-black text-lg leading-tight">{TEAM.length}</div>
              <div className="text-xs text-white/50">Team</div>
            </button>
          </div>

          {/* Bio */}
          <p className="text-sm mt-4 leading-relaxed">
            Dropping apps like songs.
            <br />
            47 apps. 60M+ views. 20k users.
            <br />
            <br />
            Started as band shipping one app a week.
            <br />
            Now becoming the label, compounding talent and distribution.
            <br />
            <br />
            Next is Appstar. Youtube for Apps.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => window.open("/wire.pdf", "_blank")}
              className="flex-1 bg-[#fe2c55] text-white font-bold py-2 rounded-md text-sm hover:bg-[#e0264c] transition-colors"
            >
              Invest
            </button>
            <button
              onClick={() => {
                window.location.href =
                  "mailto:marc@dangertesting.com?subject=Danger%20Testing%20-%20Seed%20Round";
              }}
              className="flex-1 border border-white/20 text-white font-bold py-2 rounded-md text-sm hover:bg-white/10 transition-colors"
            >
              Message
            </button>
            <button className="border border-white/20 text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </button>
          </div>

          {/* Backed by social proof */}
          <button onClick={() => setShowBelievers(true)} className="flex items-center gap-2 mt-3 text-left w-full">
            <div className="flex -space-x-2 shrink-0">
              {BACKED_BY.map((b) =>
                b.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={b.name}
                    src={b.img}
                    alt={b.name}
                    className="w-6 h-6 rounded-full object-cover border-2 border-black"
                  />
                ) : (
                  <div
                    key={b.name}
                    className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-black font-black"
                    style={{ backgroundColor: b.color, fontSize: "8px" }}
                  >
                    {b.initials}
                  </div>
                ),
              )}
            </div>
            <p className="text-xs text-white/50 leading-snug">
              Backed by{" "}
              {BACKED_BY.map((b, i) => (
                <span key={b.name}>
                  <span className="text-white/80 font-semibold">{b.name}</span>
                  <span className="text-white/40"> ({b.role})</span>
                  {i < BACKED_BY.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {(["pitch", "apps", "vibes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${activeTab === tab ? "border-b-2 border-white text-white" : "text-white/40"}`}
            >
              {tab === "pitch" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                </svg>
              )}
              {tab === "apps" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
                </svg>
              )}
              {tab === "vibes" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              )}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {activeTab === "pitch" ? (
          <div className="grid grid-cols-3 gap-0.5">
            {Array.from({ length: Math.max(slideCount, SLIDES.length) }).map(
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className="relative aspect-[9/16] overflow-hidden group bg-black"
                >
                  {pdfPages[i] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pdfPages[i]}
                      alt={`Slide ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-contain transition-transform group-hover:scale-105 duration-300"
                    />
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${SLIDES[i]?.bg ?? "from-slate-800 to-slate-900"} transition-transform group-hover:scale-105 duration-300`}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2">
                        {pdfLoading && (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
                        )}
                        {!pdfLoading && (
                          <span className="text-2xl">{SLIDES[i]?.emoji}</span>
                        )}
                        <span className="text-white text-xs font-bold text-center leading-tight drop-shadow-lg">
                          {SLIDES[i]?.label}
                        </span>
                      </div>
                    </>
                  )}
                </button>
              ),
            )}
          </div>
        ) : activeTab === "apps" ? (
          <div className="grid grid-cols-3 gap-0.5">
            {APPS.map((app, i) => (
              <button
                key={app.id}
                onClick={() => setActiveApp(i)}
                className="relative aspect-[9/16] overflow-hidden group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.img}
                  alt={app.name}
                  className="absolute inset-0 w-full h-full object-contain transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-white text-xs font-bold leading-tight line-clamp-1">
                    {app.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : activeTab === "vibes" ? (
          VIBES.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/30">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              <p className="text-sm text-center px-8">No vibes yet — add YouTube IDs or videos to public/</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-0.5">
              {VIBES.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => v.src.type === "link" ? window.open(v.src.url, "_blank") : setActiveVibe(i)}
                  className="relative aspect-[9/16] overflow-hidden group bg-neutral-900"
                >
                  {v.src.type === "youtube" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://img.youtube.com/vi/${v.src.videoId}/hqdefault.jpg`} alt={v.title} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                  ) : v.src.type === "local" ? (
                    <video src={v.src.file} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
                  ) : v.src.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.src.thumb} alt={v.title} className="absolute inset-0 w-full h-full object-contain transition-transform group-hover:scale-105 duration-300" />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center gap-3 px-4">
                      <span className="text-white/40 text-xs text-center leading-snug">writing</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute z-10 bg-white px-3 py-1.5 rounded" style={{ top: "5%", left: "15%", right: "15%", borderRadius: "12px" }}>
                    <span className="text-black text-sm font-bold" style={{ lineHeight: "9px" }}>{v.title}</span>
                  </div>
                  {v.src.type !== "link" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )
        ) : null}

        {/* Vibe full-screen viewer */}
        {activeVibe !== null && VIBES[activeVibe] && (
          <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-black flex flex-col">
            <div className="flex items-center justify-between px-4 pt-12 pb-3 shrink-0">
              <button onClick={() => setActiveVibe(null)} className="text-white/70 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
              </button>
              <span className="text-sm font-bold text-white">{VIBES[activeVibe].title}</span>
              <div className="w-6" />
            </div>
            <div className="flex-1 relative bg-black">
              {VIBES[activeVibe].src.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${(VIBES[activeVibe].src as { type: "youtube"; videoId: string }).videoId}?autoplay=1&rel=0&playsinline=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen"
                  style={{ border: "none" }}
                />
              ) : VIBES[activeVibe].src.type === "local" ? (
                <video
                  src={(VIBES[activeVibe].src as { type: "local"; file: string }).file}
                  className="absolute inset-0 w-full h-full object-contain"
                  controls autoPlay playsInline
                />
              ) : (
                <iframe
                  src={(VIBES[activeVibe].src as { type: "link"; url: string }).url}
                  className="absolute inset-0 w-full h-full bg-white"
                  style={{ border: "none" }}
                />
              )}
            </div>
          </div>
        )}

        {/* ? button — inside phone column, fixed within its width */}
        <button
          onClick={() => setShowHelp(true)}
          className="fixed bottom-6 right-[max(1rem,calc((100vw-430px)/2+1rem))] w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white font-black text-sm flex items-center justify-center hover:bg-white/20 transition-colors z-30"
        >
          ?
        </button>

        {/* Help popup */}
        {showHelp && (
          <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowHelp(false)}
            />
            <div className="relative bg-[#1c1c1e] rounded-t-3xl px-6 pt-5 pb-10">
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-6" />
              <p className="text-white text-lg font-semibold leading-relaxed mb-6">
                Need help convincing you partners to invest?
              </p>
              <button
                onClick={() => {
                  window.open("https://youtube.com", "_blank");
                  setShowHelp(false);
                }}
                className="w-full bg-[#fe2c55] text-white font-bold py-3.5 rounded-2xl text-sm hover:bg-[#e0264c] transition-colors"
              >
                Andy Weissman Calendly →
              </button>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-3 text-white/40 text-sm py-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
