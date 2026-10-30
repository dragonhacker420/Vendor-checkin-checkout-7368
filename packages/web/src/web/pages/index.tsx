import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bell,
  Camera,
  CheckCircle2,
  Database,
  LocateFixed,
  Monitor,
  QrCode,
  ShieldCheck,
  Smartphone,
  Store,
  Timer,
  Truck,
  Globe,
} from "lucide-react";
import { Phone, ScreenActive, ScreenGps, ScreenPending, ScreenPhoto, ScreenScan, ScreenStores, ScreenType } from "../components/phone";
import { LiveBoard } from "../components/live-board";

function useElapsed(startSec: number) {
  const [s, setS] = useState(startSec);
  useEffect(() => {
    const t = setInterval(() => setS((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

const steps = [
  { n: "01", title: "Find the store", body: "Directory sorted by distance, with a map toggle. Or skip straight ahead by scanning the QR at the door.", icon: Store, screen: "stores" },
  { n: "02", title: "Scan the QR", body: "Each store gets a printable QR poster. A scan opens that exact store and stamps the visit QR-verified.", icon: QrCode, screen: "scan" },
  { n: "03", title: "GPS geofence", body: "Phone location is checked against the store radius (default 150 m) — on the server, not just the app. Too far? Blocked, with the distance shown.", icon: LocateFixed, screen: "gps" },
  { n: "04", title: "Photo proof", body: "A required camera photo, stamped with store, coordinates, and time. No gallery uploads.", icon: Camera, screen: "photo" },
  { n: "05", title: "Pick visit type", body: "Delivery, restock, merchandising, service, audit, or other — one tap, big targets.", icon: Truck, screen: "type" },
  { n: "06", title: "Manager approves", body: "The visit lands in the store manager's queue with photo, distance, and QR badge. Approve or reject with a reason.", icon: ShieldCheck, screen: "pending" },
  { n: "07", title: "On site → check out", body: "A live timer runs against the store's limit. Check out with what was serviced, notes, and an optional after photo.", icon: Timer, screen: "active" },
] as const;

const brands = ["Circle K", "Wawa", "Walmart", "7-Eleven", "Sheetz", "QuikTrip", "Speedway", "Casey's", "Target", "Kroger"];

function Index() {
  const [step, setStep] = useState(0);
  const elapsed = useElapsed(18 * 60 + 4);
  const heroElapsed = useElapsed(41 * 60 + 27);

  const screen = (() => {
    switch (steps[step].screen) {
      case "stores": return <ScreenStores />;
      case "scan": return <ScreenScan />;
      case "gps": return <ScreenGps />;
      case "photo": return <ScreenPhoto />;
      case "type": return <ScreenType />;
      case "pending": return <ScreenPending />;
      default: return <ScreenActive elapsed={elapsed} />;
    }
  })();

  return (
    <div className="grain min-h-screen overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-curb/70 bg-asphalt/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-8 px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-hivis text-asphalt">
              <CheckCircle2 className="h-4 w-4" strokeWidth={3} />
            </span>
            <span className="display text-base">RouteStamp</span>
          </a>
          <div className="hidden gap-6 font-mono text-[11px] uppercase tracking-[.15em] text-concrete md:flex">
            <a href="#flow" className="hover:text-paper">Check-in flow</a>
            <a href="#manager" className="hover:text-paper">Manager board</a>
            <a href="#platforms" className="hover:text-paper">Platforms</a>
            <a href="#build" className="hover:text-paper">Build spec</a>
            <a href="#decide" className="hover:text-paper">Decisions</a>
          </div>
          <span className="ml-auto hidden rounded-sm border border-hivis/40 px-2 py-1 sm:inline-block font-mono text-[10px] uppercase tracking-[.15em] text-hivis">Plan preview · v0.1</span>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="road-grid relative pt-14">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.25fr_1fr] lg:pt-24">
          <div>
            <div className="rise flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.25em] text-hivis" style={{ animationDelay: ".05s" }}>
              <span className="h-px w-10 bg-hivis" /> Vendor check-in for retail stores
            </div>
            <h1 className="display rise mt-6 text-[clamp(3.2rem,8.5vw,7.5rem)]" style={{ animationDelay: ".15s" }}>
              Every stop,
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-asphalt">stamped.</span>
                <span className="absolute -inset-x-3 bottom-[6%] top-[8%] -skew-x-6 bg-hivis" />
              </span>
            </h1>
            <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-concrete" style={{ animationDelay: ".3s" }}>
              Vendors and reps check in and out at Circle K, Wawa, Walmart and every store on the route — verified by <b className="text-paper">GPS</b>, a{" "}
              <b className="text-paper">door QR code</b>, a <b className="text-paper">photo</b>, and the <b className="text-paper">store manager's sign-off</b>.
              Managers see exactly who's in the building, and get flagged when someone overstays.
            </p>
            <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: ".45s" }}>
              <a href="#flow" className="group flex h-12 items-center gap-2 rounded-sm bg-hivis px-6 text-sm font-extrabold uppercase tracking-wide text-asphalt">
                Walk the check-in <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </a>
              <a href="#manager" className="flex h-12 items-center gap-2 rounded-sm border border-curb px-6 text-sm font-bold uppercase tracking-wide hover:border-paper">
                Try the manager board
              </a>
            </div>
            <div className="rise mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-sm border border-curb bg-curb" style={{ animationDelay: ".6s" }}>
              {[
                ["4", "proofs per visit"],
                ["3", "platforms, 1 backend"],
                ["2", "roles"],
              ].map(([v, k]) => (
                <div key={k} className="bg-asphalt px-4 py-3">
                  <div className="display text-3xl text-hivis">{v}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-concrete">{k}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rise relative mx-auto" style={{ animationDelay: ".35s" }}>
            <div className="absolute -left-36 top-16 z-10 hidden w-52 rotate-[-6deg] rounded-md border border-curb bg-tarmac p-4 shadow-2xl xl:block">
              <div className="font-mono text-[10px] uppercase tracking-[.2em] text-concrete">Verified</div>
              {["QR scanned", "GPS · 38 m", "Photo", "Mgr approved"].map((t) => (
                <div key={t} className="mt-2 flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-onsite" /> {t}
                </div>
              ))}
            </div>
            <div className="absolute -right-16 bottom-24 z-10 hidden rotate-[5deg] rounded-md border border-overstay/50 bg-[#2a1513] px-4 py-3 shadow-2xl xl:block">
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase text-overstay">
                <Bell className="h-3.5 w-3.5" /> Overstay alert
              </div>
              <div className="mt-1 text-sm">Marcus T. · 64 min at #2741</div>
            </div>
            <Phone>
              <ScreenActive elapsed={heroElapsed} />
            </Phone>
          </div>
        </div>

        {/* marquee */}
        <div className="hazard h-2" />
        <div className="overflow-hidden border-b border-curb bg-tarmac py-4">
          <div className="marquee flex w-max gap-10 whitespace-nowrap">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="display flex items-center gap-10 text-2xl text-concrete/70">
                {b} <span className="h-2 w-2 rotate-45 bg-hivis" />
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* FLOW */}
      <section id="flow" className="mx-auto max-w-7xl px-6 py-28">
        <SectionHead n="01" kicker="Vendor · Mobile" title="The check-in, step by step" sub="Click a step to see the screen. Built for one-handed use in a parking lot at 5am." />
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <ol className="relative">
            <div className="absolute bottom-6 left-[27px] top-6 w-px bg-curb" />
            {steps.map((s, i) => {
              const Icon = s.icon;
              const on = i === step;
              return (
                <li key={s.n}>
                  <button
                    onClick={() => setStep(i)}
                    className={`group relative flex w-full gap-5 rounded-md p-3 text-left transition ${on ? "bg-tarmac" : "hover:bg-tarmac/50"}`}
                  >
                    <span
                      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border transition ${
                        on ? "border-hivis bg-hivis text-asphalt" : "border-curb bg-asphalt text-concrete group-hover:text-paper"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="pt-1">
                      <span className="flex items-baseline gap-3">
                        <span className={`font-mono text-xs ${on ? "text-hivis" : "text-concrete"}`}>{s.n}</span>
                        <span className={`text-lg font-extrabold uppercase tracking-tight ${on ? "text-paper" : "text-paper/80"}`}>{s.title}</span>
                      </span>
                      <span className={`mt-1 block max-w-lg text-sm leading-relaxed text-concrete transition-all ${on ? "max-h-40 opacity-100" : "max-h-0 overflow-hidden opacity-0 sm:max-h-40 sm:opacity-60"}`}>
                        {s.body}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="sticky top-24 mx-auto">
            <Phone>
              <div key={step} className="rise h-full" style={{ animationDuration: ".45s" }}>
                {screen}
              </div>
            </Phone>
            <div className="mt-5 flex items-center justify-between">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="font-mono text-xs uppercase text-concrete hover:text-paper disabled:opacity-30" disabled={step === 0}>
                ← Prev
              </button>
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-hivis" : "w-1.5 bg-curb"}`} />
                ))}
              </div>
              <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} className="font-mono text-xs uppercase text-hivis disabled:opacity-30" disabled={step === steps.length - 1}>
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="hazard-thin h-3 opacity-40" />

      {/* MANAGER */}
      <section id="manager" className="road-grid border-y border-curb bg-[#0e1012]">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <SectionHead
            n="02"
            kicker="Store manager · Web + Desktop"
            title="Who's in my store — right now"
            sub="Live board with timers against each store's limit. Approve the queue below — timers start the moment you do. Marcus is already over 60 minutes."
          />
          <div className="mt-14">
            <LiveBoard />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { t: "Approval queue", d: "Photo, GPS distance, QR badge. Approve or reject with a reason." },
              { t: "Visit history", d: "Filter by date, vendor company, status, visit type." },
              { t: "Store settings", d: "Brand, address, map pin, radius, max visit minutes." },
              { t: "QR poster", d: "Printable door/backroom code, regenerate anytime." },
            ].map((f) => (
              <div key={f.t} className="border-l-2 border-hivis pl-4">
                <div className="text-sm font-extrabold uppercase">{f.t}</div>
                <div className="mt-1 text-sm text-concrete">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERSTAY */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-28 lg:grid-cols-2">
        <div>
          <SectionHead n="03" kicker="Alerts" title="Overstays get loud" />
          <p className="mt-6 max-w-lg text-concrete">
            Each store sets a max visit length (default 60 min). Cross it and the visit turns red on the manager's live board and on the vendor's active screen; the desktop app fires a native
            notification. Phone push notifications come next, once the app is published with Expo push.
          </p>
        </div>
        <div className="space-y-3">
          {[
            { at: "45:00", label: "Approaching limit", tone: "pending", who: "Devon K. · Red Bull" },
            { at: "60:00", label: "Overstay — manager notified", tone: "overstay", who: "Marcus T. · Frito-Lay" },
            { at: "64:12", label: "Desktop notification sent", tone: "overstay", who: "Back office · #2741" },
          ].map((a, i) => (
            <div
              key={a.at}
              className={`ticket flex items-center gap-5 px-8 py-5 ${a.tone === "pending" ? "bg-pending/15" : "bg-overstay/15"}`}
              style={{ marginLeft: `${i * 28}px` }}
            >
              <div className={`font-mono text-2xl font-semibold ${a.tone === "pending" ? "text-pending" : "text-overstay"}`}>{a.at}</div>
              <div className="h-8 w-px bg-curb" />
              <div>
                <div className="text-sm font-bold">{a.label}</div>
                <div className="font-mono text-[11px] text-concrete">{a.who}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORMS */}
      <section id="platforms" className="border-t border-curb bg-tarmac">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <SectionHead n="04" kicker="One backend" title="Three platforms" />
          <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-curb bg-curb md:grid-cols-3">
            {[
              { icon: Smartphone, p: "Mobile", s: "iOS + Android · Expo", who: "Vendors", items: ["GPS + geofence", "QR scanner", "Camera photo proof", "Active visit timer", "History"] },
              { icon: Globe, p: "Web", s: "Browser · React", who: "Managers (+ vendors on laptop)", items: ["Live board", "Approval queue", "Visit history", "Store setup + map pin", "QR poster"] },
              { icon: Monitor, p: "Desktop", s: "Mac + Windows · Electron", who: "Store back office", items: ["Always-on live board", "Native notifications", "New approvals ping", "Overstay alerts", "Same login"] },
            ].map((c) => (
              <div key={c.p} className="bg-asphalt p-8">
                <c.icon className="h-7 w-7 text-hivis" />
                <div className="display mt-6 text-4xl">{c.p}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-concrete">{c.s}</div>
                <div className="mt-6 inline-block rounded-sm bg-hivis/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-hivis">For: {c.who}</div>
                <ul className="mt-6 space-y-2 text-sm">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-concrete" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD SPEC */}
      <section id="build" className="mx-auto max-w-7xl px-6 py-28">
        <SectionHead n="05" kicker="Under the hood" title="Build spec" sub="What actually gets built. Auth is Google sign-in + email/password; each user picks vendor or store manager on first sign-in." />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-curb bg-tarmac">
            <div className="flex items-center gap-2 border-b border-curb px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-concrete">
              <Database className="h-4 w-4 text-hivis" /> Data model
            </div>
            <div className="divide-y divide-curb">
              {[
                ["profile", "userId · role · fullName · company · phone"],
                ["store", "name · brand · address · lat/lng · radiusMeters · maxVisitMinutes · qrToken · managerId"],
                ["visit", "storeId · vendorId · status · checkInAt · approvedAt/By · checkOutAt · lat/lng · distanceM · qrVerified · photos · visitType · servicedItems · notes · rejectReason"],
                ["auth", "user · session · account (built-in)"],
              ].map(([t, f]) => (
                <div key={t} className="grid grid-cols-[90px_1fr] gap-4 px-5 py-4">
                  <span className="font-mono text-sm font-semibold text-hivis">{t}</span>
                  <span className="font-mono text-xs leading-relaxed text-concrete">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-curb bg-tarmac">
            <div className="flex items-center gap-2 border-b border-curb px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-concrete">
              <ArrowRight className="h-4 w-4 text-hivis" /> API procedures
            </div>
            <div className="grid gap-x-6 gap-y-1.5 p-5 font-mono text-xs sm:grid-cols-2">
              {[
                "profile.get", "profile.setup", "stores.list", "stores.get", "stores.byQr", "stores.create", "stores.update", "stores.mine",
                "visits.checkIn", "visits.checkOut", "visits.myActive", "visits.myHistory", "visits.storeLive", "visits.pending",
                "visits.approve", "visits.reject", "visits.storeHistory", "uploads.photo",
              ].map((r) => (
                <div key={r} className="flex items-center gap-2 py-1">
                  <span className="h-1 w-1 bg-hivis" />
                  <span className="text-concrete">{r.split(".")[0]}.</span>
                  <span className="-ml-2 text-paper">{r.split(".")[1]}</span>
                </div>
              ))}
            </div>
            <div className="perf mx-5" />
            <div className="p-5 text-xs text-concrete">
              Geofence distance is computed server-side in <span className="font-mono text-paper">visits.checkIn</span>, so a modified app can't fake it. Photos go to built-in object storage.
            </div>
          </div>
        </div>
      </section>

      {/* DECISIONS */}
      <section id="decide" className="border-t border-curb">
        <div className="hazard h-2" />
        <div className="mx-auto max-w-7xl px-6 py-28">
          <SectionHead n="06" kicker="Before we build" title="Two calls to make" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Decision
              q="Approval mode"
              a="Manager approves every check-in"
              alt="Or: auto-approve when QR + GPS + photo all pass; managers just review."
            />
            <Decision q="Defaults" a="150 m geofence · 60 min visit limit" alt="Both editable per store. Big-box Walmart lots may want 300 m." />
          </div>
          <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-curb pt-12 md:flex-row md:items-end">
            <div className="display text-[clamp(2.4rem,6vw,5rem)]">
              Ready to <span className="text-hivis">roll.</span>
            </div>
            <div className="font-mono text-xs uppercase leading-relaxed tracking-wider text-concrete">
              Demo stores seeded: Circle K · Wawa · Walmart · 7-Eleven · Sheetz
              <br />
              RouteStamp — plan preview · Oct 2026
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ n, kicker, title, sub }: { n: string; kicker: string; title: string; sub?: string }) {
  return (
    <div>
      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[.25em]">
        <span className="text-hivis">{n}</span>
        <span className="h-px w-8 bg-curb" />
        <span className="text-concrete">{kicker}</span>
      </div>
      <h2 className="display mt-5 max-w-4xl text-[clamp(2.2rem,5vw,4.25rem)]">{title}</h2>
      {sub && <p className="mt-5 max-w-2xl text-concrete">{sub}</p>}
    </div>
  );
}

function Decision({ q, a, alt }: { q: string; a: string; alt: string }) {
  return (
    <div className="rounded-md border border-curb bg-tarmac p-8">
      <div className="font-mono text-[11px] uppercase tracking-[.2em] text-concrete">{q}</div>
      <div className="mt-4 text-2xl font-extrabold">{a}</div>
      <div className="mt-2 inline-block rounded-sm bg-hivis px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-asphalt">Current plan</div>
      <p className="mt-5 text-sm text-concrete">{alt}</p>
    </div>
  );
}

export default Index;
