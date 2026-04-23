"use client";

import { useRef, useCallback, useState } from "react";

const AUDIO_SRC = "/test.mp3";

const NODES = [
  {
    id: "distribution",
    label: "Distribution",
    x: 50, y: 9,
    style: "border-2 border-[#5bc8f5] text-[#f5e642] text-2xl font-bold px-5 py-2 uppercase tracking-wide",
  },
  {
    id: "capital",
    label: "💰 Capital",
    x: 11, y: 37,
    style: "text-[#f5e642] text-3xl font-bold",
    opensDialog: true,
  },
  {
    id: "talent",
    label: "Talent",
    x: 11, y: 74,
    style: "text-[#f5e642] text-3xl font-bold",
  },
  {
    id: "advertisers",
    label: "Advertisers",
    x: 88, y: 28,
    style: "text-[#f5e642] text-3xl font-bold text-right",
    sub: ["OpenAI", "A24", "Spotify"],
  },
  {
    id: "apps",
    label: "Apps",
    x: 88, y: 74,
    style: "text-[#f5e642] text-3xl font-bold text-right",
  },
  {
    id: "techceo",
    label: "Tech CEO",
    x: 88, y: 8,
    style: "text-[#f5e642] text-xl font-bold",
    audio: "/ceo.mp3",
    image: "/ceo.png",
  },
  {
    id: "marketingteam",
    label: "Marketing Team",
    x: 76, y: 21,
    style: "text-[#f5e642] text-xl font-bold",
    audio: "/marketing.mp3",
    image: "/marketing.png",
  },
];

const CENTER = { x: 50, y: 50 };

const LINES: { from: string; to: string; labelPos?: number[] }[] = [
  { from: "distribution",  to: "center",        labelPos: [50, 28] },
  { from: "capital",       to: "center",        labelPos: [29, 44] },
  { from: "talent",        to: "center",        labelPos: [29, 62] },
  { from: "advertisers",   to: "center",        labelPos: [71, 38] },
  { from: "apps",          to: "center",        labelPos: [71, 62] },
  { from: "techceo",       to: "marketingteam" },
  { from: "marketingteam", to: "advertisers" },
];

const DIALOG_SECTIONS = [
  {
    title: "ADVERTISERS",
    entries: [
      { name: "Tech CEO",        image: "/ceo.png",        audio: "/ceo.mp3" },
      { name: "Marketing Team",  image: "/marketing.png",  audio: "/marketing.mp3" },
      { name: "Danger Testing",  image: "/logo.jpg",       audio: null },
    ],
  },
  {
    title: "TALENT",
    entries: [
      { name: "Tech CEO",        image: "/ceo.png",        audio: "/talent.mp3" },
      { name: "Danger Testing",  image: "/logo.jpg",       audio: null },
    ],
  },
  {
    title: "APPS",
    entries: [
      {
        name: null, image: null, audio: null,
        quote: "If anyone can spin up google docs I will pay $50 for a henrik karlson substack skin",
      },
    ],
  },
];

function DialogSheet({ onClose, playSound }: { onClose: () => void; playSound: (src: string) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="relative w-full max-w-lg bg-black border-t border-[#f5e642] rounded-t-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="sticky top-0 bg-black pt-3 pb-2 flex justify-center border-b border-zinc-900 z-10">
          <div className="w-10 h-1 rounded-full bg-zinc-600 mb-2" />
          <button
            onClick={onClose}
            className="absolute right-4 top-3 text-zinc-500 hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-6 pb-10 pt-4 space-y-10">
          {DIALOG_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-[#f5e642] text-xs font-bold tracking-widest uppercase mb-4">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.entries.map((entry, i) => {
                  if (entry.quote) {
                    return (
                      <div key={i} className="bg-zinc-900 rounded-xl px-4 py-4">
                        <p className="text-white text-sm leading-relaxed italic">&ldquo;{entry.quote}&rdquo;</p>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-colors ${
                        entry.audio
                          ? "bg-zinc-900 hover:bg-zinc-800 cursor-pointer active:scale-[0.98]"
                          : "bg-zinc-950"
                      }`}
                      onClick={() => entry.audio && playSound(entry.audio)}
                    >
                      {entry.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={entry.image}
                          alt={entry.name ?? ""}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                      )}
                      <span className={`font-semibold text-sm ${entry.audio ? "text-white" : "text-[#f5e642]"}`}>
                        {entry.name}
                      </span>
                      {entry.audio && (
                        <span className="ml-auto text-zinc-500 text-lg">▶</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CanvasPage() {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const playSound = useCallback((src: string = AUDIO_SRC) => {
    if (currentAudio.current && currentAudio.current !== audioCache.current[src]) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
    }
    if (!audioCache.current[src]) {
      audioCache.current[src] = new Audio(src);
    }
    const el = audioCache.current[src];
    el.currentTime = 0;
    el.play().catch(() => {});
    currentAudio.current = el;
  }, []);

  const nodePos = Object.fromEntries(NODES.map((n) => [n.id, { x: n.x, y: n.y }]));

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden select-none">
      {/* SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {LINES.map(({ from, to, labelPos }, i) => {
          const p1 = nodePos[from];
          const p2 = to === "center" ? CENTER : nodePos[to];
          return (
            <g key={i}>
              <line
                x1={p1.x} y1={p1.y}
                x2={p2.x} y2={p2.y}
                stroke="#f5e642"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
              />
              {labelPos && (
                <text
                  x={labelPos[0]} y={labelPos[1]}
                  fill="#f5e642" fontSize="1.8"
                  textAnchor="middle" dominantBaseline="middle"
                  fontFamily="sans-serif" fontWeight="600"
                >
                  +10%
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Center yellow box */}
      <button
        onClick={() => playSound()}
        className="absolute bg-[#f5e642] text-black cursor-pointer hover:scale-[1.02] transition-transform active:scale-95"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "28%", padding: "2rem" }}
      >
        <h1 className="text-4xl font-black uppercase leading-tight mb-3">
          Warhol&apos;s<br />Factory
        </h1>
        <p className="text-xs font-normal leading-snug text-left">
          &ldquo;Keith Haring, Jean-Michel Basquiat, Julian Schnabel and Jeff Koons. What united them
          under Warhol&apos;s umbrella is that all of them understood{" "}
          <strong>the value of publicity, the necessity of wresting attention from the general media</strong>{" "}
          if they were to succeed as artists, the necessity, really,{" "}
          <strong>of making themselves into entertainment.&rdquo;</strong>
        </p>
      </button>

      {/* Outer nodes */}
      {NODES.map((node) => (
        <button
          key={node.id}
          onClick={() => node.opensDialog ? setDialogOpen(true) : playSound(node.audio)}
          className={`absolute cursor-pointer hover:opacity-80 transition-opacity active:scale-95 ${node.style}`}
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
        >
          {node.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={node.image} alt={node.label} className="w-16 h-16 object-cover rounded mb-1 mx-auto" />
          )}
          {node.label}
          {node.sub && (
            <div className="flex flex-col items-end gap-0.5 mt-1">
              {node.sub.map((s) => (
                <span key={s} className="text-white text-lg font-semibold">{s}</span>
              ))}
            </div>
          )}
        </button>
      ))}

      {/* Dialog sheet */}
      {dialogOpen && (
        <DialogSheet onClose={() => setDialogOpen(false)} playSound={playSound} />
      )}
    </div>
  );
}
