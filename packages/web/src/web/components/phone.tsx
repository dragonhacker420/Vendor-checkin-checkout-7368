import { Camera, Check, ChevronRight, Clock, LocateFixed, MapPin, QrCode, ShieldCheck, Truck } from "lucide-react";
import type { ReactNode } from "react";

export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-[290px] h-[600px] rounded-[44px] border border-curb bg-[#0b0c0d] p-[10px] shadow-[0_40px_120px_-30px_rgba(230,255,43,.25)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-asphalt">
        <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center justify-between px-6 pt-3 font-mono text-[10px] text-concrete">
          <span>5:42</span>
          <span>LTE ▮▮▮</span>
        </div>
        <div className="h-[calc(100%-28px)]">{children}</div>
      </div>
    </div>
  );
}

function Header({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="px-5 pt-6">
      <div className="font-mono text-[10px] uppercase tracking-[.2em] text-hivis">{eyebrow}</div>
      <div className="display mt-1 text-[22px]">{title}</div>
    </div>
  );
}

function BigButton({ children, tone = "hivis" }: { children: ReactNode; tone?: "hivis" | "ghost" }) {
  return (
    <div
      className={`mx-5 flex h-14 items-center justify-center gap-2 rounded-md text-sm font-extrabold uppercase tracking-wide ${
        tone === "hivis" ? "bg-hivis text-asphalt" : "border border-curb text-paper"
      }`}
    >
      {children}
    </div>
  );
}

const stores = [
  { brand: "Circle K", name: "#2741 · Route 9", dist: "0.1 mi", color: "#EE2A24" },
  { brand: "Wawa", name: "#8112 · Baltimore Pike", dist: "1.4 mi", color: "#F6A21A" },
  { brand: "Walmart", name: "Supercenter #1903", dist: "3.2 mi", color: "#2C7BE5" },
  { brand: "Sheetz", name: "#455 · Market St", dist: "4.0 mi", color: "#D7262B" },
];

export function ScreenStores() {
  return (
    <div className="flex h-full flex-col">
      <Header eyebrow="Today · 6 stops" title="Nearby stores" />
      <div className="mx-5 mt-4 flex rounded-md border border-curb p-1 text-[11px] font-bold uppercase">
        <div className="flex-1 rounded bg-curb py-1.5 text-center">List</div>
        <div className="flex-1 py-1.5 text-center text-concrete">Map</div>
      </div>
      <div className="mt-3 flex-1 space-y-2 px-5">
        {stores.map((s, i) => (
          <div key={s.name} className={`flex items-center gap-3 rounded-md border p-3 ${i === 0 ? "border-hivis bg-hivis/5" : "border-curb"}`}>
            <div className="h-9 w-9 shrink-0 rounded" style={{ background: s.color }} />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold">{s.brand}</div>
              <div className="truncate font-mono text-[10px] text-concrete">{s.name}</div>
            </div>
            <div className="font-mono text-[11px] text-concrete">{s.dist}</div>
            <ChevronRight className="h-4 w-4 text-concrete" />
          </div>
        ))}
      </div>
      <div className="pb-6">
        <BigButton>
          <QrCode className="h-5 w-5" /> Scan store QR
        </BigButton>
      </div>
    </div>
  );
}

export function ScreenScan() {
  return (
    <div className="flex h-full flex-col">
      <Header eyebrow="Step 1 · Identify" title="Scan the door code" />
      <div className="relative mx-5 mt-5 aspect-square overflow-hidden rounded-lg bg-[#1f2326]">
        <div className="absolute inset-0 road-grid opacity-60" />
        <div className="absolute inset-8 grid grid-cols-7 grid-rows-7 gap-[3px] opacity-90">
          {Array.from({ length: 49 }).map((_, i) => (
            <div key={i} className={((i * 7) % 5 < 2 || [0, 1, 7, 8, 5, 6, 12, 13, 35, 36, 42, 43].includes(i)) ? "bg-paper" : ""} />
          ))}
        </div>
        {["left-3 top-3 border-l-4 border-t-4", "right-3 top-3 border-r-4 border-t-4", "left-3 bottom-3 border-l-4 border-b-4", "right-3 bottom-3 border-r-4 border-b-4"].map((c) => (
          <div key={c} className={`absolute h-8 w-8 border-hivis ${c}`} />
        ))}
        <div className="scanline absolute left-4 right-4 h-[2px] bg-hivis shadow-[0_0_20px_4px_rgba(230,255,43,.6)]" />
      </div>
      <div className="mx-5 mt-4 flex items-center gap-2 rounded-md border border-onsite/40 bg-onsite/10 p-3 text-xs">
        <ShieldCheck className="h-4 w-4 text-onsite" />
        <span>
          <b>Circle K #2741</b> · QR verified
        </span>
      </div>
      <div className="mt-auto pb-6">
        <BigButton tone="ghost">Pick from list instead</BigButton>
      </div>
    </div>
  );
}

export function ScreenGps() {
  return (
    <div className="flex h-full flex-col">
      <Header eyebrow="Step 2 · Location" title="You're on site" />
      <div className="relative mx-5 mt-5 h-60 overflow-hidden rounded-lg border border-curb bg-[#16191b]">
        <div className="absolute inset-0 road-grid" />
        <div className="absolute left-0 right-0 top-[45%] h-6 bg-[#24282c]" />
        <div className="absolute bottom-0 top-0 left-[38%] w-6 bg-[#24282c]" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-hivis/60 bg-hivis/5" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <MapPin className="h-7 w-7 -translate-y-3 fill-overstay text-asphalt" />
        </div>
        <div className="absolute left-[58%] top-[56%]">
          <span className="pulse-ring absolute -inset-2 rounded-full bg-[#4aa3ff]/50" />
          <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-white bg-[#4aa3ff]" />
        </div>
        <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 font-mono text-[10px]">radius 150 m</div>
      </div>
      <div className="mx-5 mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-md border border-curb p-3">
          <div className="font-mono text-[10px] text-concrete">DISTANCE</div>
          <div className="display mt-1 text-2xl text-onsite">38 m</div>
        </div>
        <div className="rounded-md border border-curb p-3">
          <div className="font-mono text-[10px] text-concrete">ACCURACY</div>
          <div className="display mt-1 text-2xl">±6 m</div>
        </div>
      </div>
      <div className="mt-auto pb-6">
        <BigButton>
          <LocateFixed className="h-5 w-5" /> Location locked
        </BigButton>
      </div>
    </div>
  );
}

export function ScreenPhoto() {
  return (
    <div className="flex h-full flex-col">
      <Header eyebrow="Step 3 · Proof" title="Snap a photo" />
      <div className="relative mx-5 mt-5 flex-1 overflow-hidden rounded-lg bg-gradient-to-b from-[#2b2f2a] to-[#121414]">
        <div className="absolute inset-x-6 bottom-10 top-16 rounded-sm border border-white/10 bg-[linear-gradient(90deg,#3a3f36_0_30%,#2b2f2a_30%_33%,#3a3f36_33%_63%,#2b2f2a_63%_66%,#3a3f36_66%)]" />
        <div className="absolute inset-x-6 top-10 h-4 rounded-sm bg-[#EE2A24]/80" />
        <div className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 font-mono text-[9px] leading-tight">
          CIRCLE K #2741
          <br />
          39.9526,-75.1652 · 05:42:18
        </div>
        <div className="absolute bottom-4 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white/90">
          <div className="h-12 w-12 rounded-full bg-white" />
        </div>
      </div>
      <div className="py-5">
        <BigButton>
          <Camera className="h-5 w-5" /> Use photo
        </BigButton>
      </div>
    </div>
  );
}

const types = ["Delivery", "Restock", "Merchandising", "Service", "Audit", "Other"];
export function ScreenType() {
  return (
    <div className="flex h-full flex-col">
      <Header eyebrow="Step 4 · Purpose" title="What's the visit?" />
      <div className="mt-5 grid grid-cols-2 gap-2 px-5">
        {types.map((t, i) => (
          <div
            key={t}
            className={`flex h-20 flex-col justify-between rounded-md border p-3 text-sm font-bold ${
              i === 0 ? "border-hivis bg-hivis text-asphalt" : "border-curb"
            }`}
          >
            {i === 0 ? <Truck className="h-4 w-4" /> : <span className="font-mono text-[10px] text-concrete">0{i + 1}</span>}
            {t}
          </div>
        ))}
      </div>
      <div className="mx-5 mt-4 rounded-md border border-curb p-3 font-mono text-[10px] leading-relaxed text-concrete">
        QR ✓ · GPS 38 m ✓ · Photo ✓
      </div>
      <div className="mt-auto pb-6">
        <BigButton>Request check-in</BigButton>
      </div>
    </div>
  );
}

export function ScreenPending() {
  return (
    <div className="flex h-full flex-col items-center px-5 pt-14 text-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="pulse-ring absolute inset-4 rounded-full bg-pending/40" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-pending">
          <Clock className="h-9 w-9 text-pending" />
        </div>
      </div>
      <div className="mt-6 font-mono text-[10px] uppercase tracking-[.2em] text-pending">Pending approval</div>
      <div className="display mt-2 text-[24px]">Waiting on the store manager</div>
      <p className="mt-3 text-xs text-concrete">Dana R. at Circle K #2741 has been notified. Hang tight — usually under 2 minutes.</p>
      <div className="mt-6 w-full rounded-md border border-curb p-3 text-left font-mono text-[11px]">
        <div className="flex justify-between"><span className="text-concrete">REQUESTED</span><span>05:42:31</span></div>
        <div className="mt-1 flex justify-between"><span className="text-concrete">TYPE</span><span>DELIVERY</span></div>
      </div>
    </div>
  );
}

export function ScreenActive({ elapsed }: { elapsed: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="bg-onsite px-5 pb-5 pt-6 text-asphalt">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[.2em]">
          <span className="h-2 w-2 rounded-full bg-asphalt blink" /> On site · approved
        </div>
        <div className="display mt-2 text-[20px]">Circle K #2741</div>
        <div className="mt-4 font-mono text-5xl font-semibold tracking-tight">{elapsed}</div>
        <div className="mt-1 font-mono text-[10px]">LIMIT 60:00 · DELIVERY</div>
      </div>
      <div className="flex-1 space-y-2 px-5 pt-4">
        <div className="font-mono text-[10px] uppercase tracking-[.2em] text-concrete">What did you service?</div>
        {["Dropped 14 cases", "Rotated stock", "Pulled expired", "Set endcap display"].map((t, i) => (
          <div key={t} className="flex items-center gap-3 rounded-md border border-curb p-3 text-sm">
            <div className={`flex h-5 w-5 items-center justify-center rounded ${i < 2 ? "bg-hivis text-asphalt" : "border border-curb"}`}>
              {i < 2 && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
            </div>
            {t}
          </div>
        ))}
      </div>
      <div className="pb-6 pt-3">
        <BigButton>Check out</BigButton>
      </div>
    </div>
  );
}
