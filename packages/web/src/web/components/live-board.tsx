import { AlertTriangle, Check, MapPin, QrCode, X } from "lucide-react";
import { useEffect, useState } from "react";

type Status = "pending" | "active" | "rejected";
type Visit = {
  id: string;
  vendor: string;
  company: string;
  type: string;
  startedSec: number; // seconds elapsed at load
  status: Status;
  dist: number;
  qr: boolean;
  initials: string;
  hue: number;
};

const LIMIT = 60 * 60;

const seed: Visit[] = [
  { id: "V-1042", vendor: "Marcus T.", company: "Frito-Lay", type: "Restock", startedSec: 64 * 60 + 12, status: "active", dist: 22, qr: true, initials: "MT", hue: 18 },
  { id: "V-1043", vendor: "Alicia P.", company: "Coca-Cola", type: "Delivery", startedSec: 23 * 60 + 40, status: "active", dist: 41, qr: true, initials: "AP", hue: 0 },
  { id: "V-1044", vendor: "Devon K.", company: "Red Bull", type: "Merchandising", startedSec: 52 * 60 + 5, status: "active", dist: 17, qr: false, initials: "DK", hue: 210 },
  { id: "V-1045", vendor: "Sam O.", company: "Bimbo Bakeries", type: "Delivery", startedSec: 70, status: "pending", dist: 38, qr: true, initials: "SO", hue: 40 },
  { id: "V-1046", vendor: "Rita G.", company: "Hostess", type: "Audit", startedSec: 25, status: "pending", dist: 112, qr: false, initials: "RG", hue: 280 },
];

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export function LiveBoard() {
  const [visits, setVisits] = useState(seed);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const setStatus = (id: string, status: Status) =>
    setVisits((v) => v.map((x) => (x.id === id ? { ...x, status, startedSec: status === "active" ? -tick : x.startedSec } : x)));

  const active = visits.filter((v) => v.status === "active");
  const pending = visits.filter((v) => v.status === "pending");
  const overstays = active.filter((v) => v.startedSec + tick > LIMIT).length;

  return (
    <div className="overflow-hidden rounded-xl border border-curb bg-tarmac">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-curb px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-overstay/80" />
        <span className="h-3 w-3 rounded-full bg-pending/80" />
        <span className="h-3 w-3 rounded-full bg-onsite/80" />
        <span className="ml-3 font-mono text-[11px] text-concrete">routestamp.app/manager · Circle K #2741</span>
        <span className="ml-auto flex items-center gap-2 font-mono text-[11px] text-onsite">
          <span className="h-2 w-2 rounded-full bg-onsite blink" /> LIVE
        </span>
      </div>

      <div className="grid grid-cols-3 border-b border-curb">
        {[
          { k: "On site", v: active.length, c: "text-onsite" },
          { k: "Awaiting approval", v: pending.length, c: "text-pending" },
          { k: "Overstay", v: overstays, c: "text-overstay" },
        ].map((s) => (
          <div key={s.k} className="border-r border-curb px-5 py-4 last:border-r-0">
            <div className="font-mono text-[10px] uppercase tracking-[.18em] text-concrete">{s.k}</div>
            <div className={`display mt-1 text-4xl ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr]">
        {/* live */}
        <div className="border-curb p-4 lg:border-r">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[.2em] text-concrete">In the store now</div>
          <div className="space-y-2">
            {active.map((v) => {
              const s = v.startedSec + tick;
              const over = s > LIMIT;
              const pct = Math.min(100, (s / LIMIT) * 100);
              return (
                <div key={v.id} className={`rounded-md border p-3 transition-colors ${over ? "border-overstay/60 bg-overstay/10" : "border-curb bg-asphalt/40"}`}>
                  <div className="flex items-center gap-3">
                    <Avatar v={v} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-sm font-bold">
                        {v.vendor} <span className="font-normal text-concrete">· {v.company}</span>
                      </div>
                      <div className="font-mono text-[10px] uppercase text-concrete">{v.type} · {v.id}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-mono text-lg font-semibold ${over ? "text-overstay" : "text-paper"}`}>{fmt(s)}</div>
                      {over && (
                        <div className="flex items-center justify-end gap-1 font-mono text-[10px] font-semibold text-overstay">
                          <AlertTriangle className="h-3 w-3" /> OVERSTAY +{fmt(s - LIMIT)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 h-1 overflow-hidden rounded bg-curb">
                    <div className={`h-full ${over ? "bg-overstay" : pct > 80 ? "bg-pending" : "bg-onsite"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* approvals */}
        <div className="p-4">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[.2em] text-concrete">Approval queue — try it</div>
          {pending.length === 0 && (
            <div className="rounded-md border border-dashed border-curb p-6 text-center text-sm text-concrete">
              Queue clear. Nice.
              <button onClick={() => setVisits(seed)} className="mt-3 block w-full font-mono text-[11px] uppercase text-hivis hover:underline">
                Reset demo
              </button>
            </div>
          )}
          <div className="space-y-2">
            {pending.map((v) => (
              <div key={v.id} className="rounded-md border border-pending/40 bg-pending/5 p-3">
                <div className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-gradient-to-b from-[#3a3f36] to-[#1b1e1b]">
                    <div className="absolute inset-x-1 top-2 h-1.5 bg-[#EE2A24]/80" />
                    <div className="absolute inset-x-1 bottom-1 top-5 bg-[linear-gradient(90deg,#4a4f46_0_45%,#2b2f2a_45%_55%,#4a4f46_55%)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold">{v.vendor}</div>
                    <div className="text-xs text-concrete">{v.company} · {v.type}</div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5 font-mono text-[10px]">
                      <span className={`flex items-center gap-1 rounded px-1.5 py-0.5 ${v.dist <= 150 ? "bg-onsite/15 text-onsite" : "bg-overstay/15 text-overstay"}`}>
                        <MapPin className="h-3 w-3" /> {v.dist} m
                      </span>
                      <span className={`flex items-center gap-1 rounded px-1.5 py-0.5 ${v.qr ? "bg-onsite/15 text-onsite" : "bg-curb text-concrete"}`}>
                        <QrCode className="h-3 w-3" /> {v.qr ? "QR ✓" : "no QR"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStatus(v.id, "active")}
                    className="flex h-9 items-center justify-center gap-1.5 rounded bg-hivis text-xs font-extrabold uppercase text-asphalt transition hover:brightness-110 active:scale-[.98]"
                  >
                    <Check className="h-4 w-4" strokeWidth={3} /> Approve
                  </button>
                  <button
                    onClick={() => setStatus(v.id, "rejected")}
                    className="flex h-9 items-center justify-center gap-1.5 rounded border border-curb text-xs font-bold uppercase transition hover:border-overstay hover:text-overstay"
                  >
                    <X className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ v }: { v: Visit }) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded font-mono text-xs font-semibold text-asphalt"
      style={{ background: `hsl(${v.hue} 70% 62%)` }}
    >
      {v.initials}
    </div>
  );
}
