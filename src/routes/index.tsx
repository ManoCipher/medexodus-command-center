import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Activity, ShieldCheck, Stethoscope, FileCheck2, ClipboardList, CreditCard,
  AlertTriangle, LineChart, ArrowRight, CheckCircle2, Building2, Hospital,
  HeartPulse, Brain, Baby, Bone, Radiation, Siren, Sparkles, Lock, Cpu,
  TrendingUp, Timer, Users, Phone, Mail, MapPin, Menu, X, ChevronRight,
  Quote, PlayCircle, Globe2, Award, Syringe, Pill, Microscope, Stethoscope as StethoscopeIcon, Home, Laptop, ScanFace, CheckSquare, Search, FileText, Settings, BadgeCheck, FileArchive, Network
} from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";
import opsCenter from "@/assets/operations-center.png";
import teamCollab from "@/assets/team-collaboration.png";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ---------------- helpers ---------------- */

function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.15 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), opts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ to, suffix = "", duration = 1600, decimals = 0 }: { to: number; suffix?: string; duration?: number; decimals?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

/* ---------------- sections ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = ["Home", "Services", "Specialties", "Industries", "Case Studies", "Contact"];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-[color:var(--navy-deep)]/70 border-b border-white/5" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="MedExodus Logo" className="h-9 w-auto object-contain" />
          <span className="font-display text-lg font-semibold tracking-tight">
            Med<span className="text-[color:var(--cyan-glow)]">Exodus</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} className="text-sm text-white/70 hover:text-white transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[color:var(--cyan-glow)]/40 px-4 py-2 text-sm font-medium text-white transition-all">
            Request a Consultation <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button onClick={() => setOpen(v => !v)} className="lg:hidden rounded-md p-2 border border-white/10 text-white" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/5 bg-[color:var(--navy-deep)]/95 backdrop-blur-xl">
          <div className="px-6 py-4 grid gap-2">
            {links.map(l => (
              <a key={l} onClick={() => setOpen(false)} href={`#${l.toLowerCase().replace(/ /g,"-")}`} className="py-2 text-white/80 hover:text-white text-sm">
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Particles() {
  const dots = Array.from({ length: 26 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 10) * 0.6;
        const dur = 8 + (i % 7);
        return (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[color:var(--cyan-glow)]/60"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `particle-drift ${dur}s linear ${delay}s infinite`,
              // @ts-ignore custom css vars
              "--dx": `${(i % 5) * 6 - 12}px`,
              "--dy": `${-80 - (i % 6) * 20}px`,
              boxShadow: "0 0 8px currentColor",
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

function AnalyticsCard({ label, value, delta, chart, delay = 0 }: {
  label: string; value: string; delta?: string; chart: "bars" | "line" | "ring"; delay?: number;
}) {
  return (
    <div
      className="glass-card glass-card-hover rounded-2xl p-5 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">{label}</span>
        {delta && (
          <span className="text-[10px] font-medium text-[color:var(--cyan-glow)] bg-[color:var(--cyan-glow)]/10 border border-[color:var(--cyan-glow)]/25 px-2 py-0.5 rounded-full">
            {delta}
          </span>
        )}
      </div>
      <div className="mt-2 font-display text-3xl font-semibold text-white">{value}</div>
      <div className="mt-4 h-12">
        {chart === "bars" && (
          <div className="flex items-end gap-1 h-full">
            {[40, 55, 35, 70, 60, 82, 68, 90, 78, 96].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-[color:var(--medical-blue)]/40 to-[color:var(--cyan-glow)]" style={{ height: `${h}%` }} />
            ))}
          </div>
        )}
        {chart === "line" && (
          <svg viewBox="0 0 200 48" className="w-full h-full">
            <defs>
              <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.16 210)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.82 0.16 210)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,36 L20,30 L40,32 L60,22 L80,26 L100,16 L120,20 L140,10 L160,14 L180,6 L200,10 L200,48 L0,48 Z" fill="url(#lg)" />
            <path d="M0,36 L20,30 L40,32 L60,22 L80,26 L100,16 L120,20 L140,10 L160,14 L180,6 L200,10" fill="none" stroke="oklch(0.82 0.16 210)" strokeWidth="1.5" />
          </svg>
        )}
        {chart === "ring" && (
          <div className="flex items-center gap-3 h-full">
            <svg viewBox="0 0 36 36" className="h-12 w-12">
              <circle cx="18" cy="18" r="15" fill="none" stroke="oklch(0.97 0.01 240 / 0.08)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="oklch(0.82 0.16 210)" strokeWidth="3"
                strokeDasharray="94" strokeDashoffset="10" strokeLinecap="round" transform="rotate(-90 18 18)" />
            </svg>
            <div className="text-xs text-white/60">Rolling 30-day trend across payer mix.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[color:var(--navy-deep)]" />
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(1200px 500px at 15% 20%, oklch(0.62 0.18 245 / 0.35), transparent 60%), radial-gradient(900px 400px at 85% 30%, oklch(0.82 0.16 210 / 0.22), transparent 60%)",
          }} />
        <div className="absolute inset-0 grid-overlay opacity-70" />
        <Particles />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[color:var(--navy-deep)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--cyan-glow)]/25 bg-[color:var(--cyan-glow)]/[0.06] px-3 py-1.5 text-xs text-white/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--cyan-glow)] opacity-70 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--cyan-glow)]" />
            </span>
            Trusted Revenue Cycle Management Partner
          </div>

          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]">
            Med<span className="text-[color:var(--cyan-glow)]">Exodus</span> Healthcare Solutions
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/65 leading-relaxed">
            MedExodus Healthcare Solutions Pvt Ltd is a trusted healthcare outsourcing company delivering high-quality Revenue Cycle Management (RCM) services to healthcare organizations across the United States. We specialize in reliable, scalable, and HIPAA-compliant support solutions that help providers improve operational efficiency, reduce revenue leakage, accelerate reimbursements, and maintain coding and billing accuracy.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--cyan-glow)] to-[color:var(--medical-blue)] px-6 py-3 text-sm font-semibold text-[color:var(--navy-deep)] glow-cyan hover:scale-[1.02] transition-transform">
              Contact Us <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur px-6 py-3 text-sm font-medium text-white hover:border-[color:var(--cyan-glow)]/50 hover:bg-white/[0.06] transition-all">
              Explore Our Services
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {[
              { i: Lock, t: "HIPAA Compliant" },
              { i: ShieldCheck, t: "US Healthcare Focus" },
              { i: FileCheck2, t: "Medical Coding Experts" },
              { i: LineChart, t: "Revenue Cycle Specialists" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="flex items-center gap-2 text-xs text-white/60">
                <Icon className="h-4 w-4 text-[color:var(--cyan-glow)]" />
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle at 50% 40%, oklch(0.62 0.18 245 / 0.7), transparent 60%)" }} />

          <div className="absolute inset-0 -z-[5] rounded-3xl overflow-hidden opacity-60 mix-blend-screen">
            <img src={heroDashboard} alt="RCM analytics dashboard" width={1600} height={1200}
              className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/40 to-transparent" />
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            <div className="animate-float"><AnalyticsCard label="Active Clients" value="36+" chart="bars" delay={0} /></div>
            <div className="animate-float-slow mt-8"><AnalyticsCard label="Clean Claim Rate" value="98%" delta="+3.1%" chart="ring" delay={120} /></div>
            <div className="animate-float-slow -mt-2"><AnalyticsCard label="Claim Approval" value="96.3%" delta="+2.4%" chart="bars" delay={200} /></div>
            <div className="animate-float mt-4"><AnalyticsCard label="Denial Reduction" value="28%" delta="-28%" chart="line" delay={280} /></div>
            <div className="animate-float"><AnalyticsCard label="Days in AR" value="15 Days" delta="-6d" chart="bars" delay={360} /></div>
            <div className="animate-float-slow mt-6"><AnalyticsCard label="Payment Posting" value="99%" delta="+1.2%" chart="ring" delay={440} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}


function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--cyan-glow)]">
        <span className="h-px w-8 bg-[color:var(--cyan-glow)]/60" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
        {title}
      </h2>
      {sub && <p className="mt-5 text-white/60 text-base sm:text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

function Services() {
  const categories = [
    {
      title: "Front-Office Solutions",
      desc: "Patient access, eligibility confirmation, and prior authorization workflows that resolve discrepancies before encounters occur.",
      items: [
        { 
          i: ShieldCheck, 
          t: "Insurance Verification",
          tag: "270/271 EDI",
          desc: "Real-time 270/271 EDI transactions verify plan types (HMO/PPO/EPO), effective dates, COB order, deductible/out-of-pocket accumulators, and authorization flags before patient visits—resolving discrepancies same-day to prevent front-end denials." 
        },
        { 
          i: BadgeCheck, 
          t: "Prior Authorization",
          tag: "278 EDI & LCD/NCD",
          desc: "CPT/HCPCS codes are cross-walked against payer medical policies (LCD/NCD). Submissions with clinical documentation are tracked via 278 EDI or portal, with escalation to peer-to-peer review when requests are pended or denied." 
        },
        { 
          i: Users, 
          t: "Patient Billing Support",
          tag: "HIPAA Compliant",
          desc: "Patient-facing financial workflows—statement generation, balance inquiries, payment plan structuring, and financial counseling—reduce self-pay AR aging and bad-debt write-offs while maintaining strict HIPAA compliance." 
        },
        { 
          i: StethoscopeIcon, 
          t: "Provider Support",
          tag: "Lightweight CDI",
          desc: "A direct feedback loop between clinicians and coding/billing teams tied to specific payer documentation requirements, catching clinical documentation gaps at the point of care before claims are generated." 
        },
      ]
    },
    {
      title: "Middle-Office Solutions",
      desc: "Certified medical coding, documentation query management, and risk adjustment scoring to maximize clean claim acceptance.",
      items: [
        { 
          i: FileCheck2, 
          t: "Medical Coding",
          tag: "CPC / CCS Certified",
          desc: "CPC/CCS credentialed coders assign ICD-10-CM, CPT, and HCPCS Level II procedure codes based on clinical documentation, scrubbed against NCCI edits, MUE limits, and specialty-specific payer LCD/NCD coverage policies." 
        },
        { 
          i: FileArchive, 
          t: "Coding Audits",
          tag: "OIG / CMS Focused",
          desc: "Statistically representative sampling weighted toward high-dollar and high-denial-risk claim types drives prospective and retrospective audits against CMS/OIG Work Plan focus areas to catch systematic coding errors before RAC audits." 
        },
        { 
          i: Search, 
          t: "Documentation Review",
          tag: "AHIMA / ACDIS",
          desc: "Structured physician queries formatted to AHIMA/ACDIS guidelines close documentation gaps when clinical notes do not support required code specificity—legitimately capturing revenue without leading providers." 
        },
        { 
          i: TrendingUp, 
          t: "HCC / Risk Adjustment Coding",
          tag: "CMS-HCC RAF Score",
          desc: "Chronic condition coding under CMS-HCC risk models for Medicare Advantage and ACA pools. Suspect-condition analytics flag uncaptured chronic diagnoses from lab/claims data for chart-chase confirmation." 
        },
        { 
          i: CheckSquare, 
          t: "Quality Assurance",
          tag: "3-Tier QA",
          desc: "A tiered QA structure (coder self-audit, peer review, supervisor sign-off on high-value claims) tracks error taxonomies over time to eliminate recurring failure points across coders, payers, and CPT families." 
        },
        { 
          i: ShieldCheck, 
          t: "Credentialing Assistance",
          tag: "CAQH & PECOS",
          desc: "Provider enrollment and re-credentialing monitored via CAQH ProView, PECOS, and payer portals. Proactive expiration tracking ensures credential lapses never block clean claim payment." 
        },
      ]
    },
    {
      title: "Back-Office Solutions",
      desc: "End-to-end revenue capture, 837 claim submission, 835 payment posting, and aggressive CARC/RARC denial recovery.",
      items: [
        { 
          i: ClipboardList, 
          t: "Medical Billing",
          tag: "837P / 837I EDI",
          desc: "Full charge-to-cash lifecycle management: charge capture, 837P/837I EDI claim generation, clearinghouse submission, and payment reconciliation as a single coordinated workflow without siloed handoffs." 
        },
        { 
          i: Activity, 
          t: "AR Follow-Up",
          tag: "0-90+ Days Aging",
          desc: "Outstanding claims are worked by aging bucket (0-30 / 31-60 / 61-90 / 90+ days) with payer-specific follow-up cadences prioritized by dollar value and denial risk rather than flat FIFO queues." 
        },
        { 
          i: AlertTriangle, 
          t: "Denial Management",
          tag: "CARC / RARC Root Cause",
          desc: "Every denial is parsed by CARC/RARC codes and root-caused (eligibility, auth, coding, medical necessity, timely filing). Corrected claims are resubmitted, and patterns are fed back upstream to prevent recurrence." 
        },
        { 
          i: CreditCard, 
          t: "Payment Posting",
          tag: "835 ERA Auto-Post",
          desc: "835 ERA files auto-post against expected reimbursement with contracted-rate variance flagged instantly. Manual posting covers paper EOBs, exception cases, and credit-balance resolution." 
        },
        { 
          i: FileText, 
          t: "Charge Entry",
          tag: "DOS Lag Reduction",
          desc: "Charge reconciliation against encounter records minimizes lag between date of service and claim readiness—preventing timely-filing denials on slow-moving payers." 
        },
        { 
          i: LineChart, 
          t: "Claims Submission",
          tag: "999 / 277CA Reports",
          desc: "Electronic claims batched per payer companion guides. Clearinghouse acknowledgment (999/277CA) and rejection reports are monitored so front-end rejections are resolved within the same billing cycle." 
        },
        { 
          i: Search, 
          t: "Claims Scrubbing",
          tag: "Pre-Submission Edits",
          desc: "Automated edit logic verifies NCCI/MUE bundling rules, LCD/NCD coverage policy, and payer formatting requirements to eliminate errors before claims reach clearinghouse gateways." 
        },
        { 
          i: FileText, 
          t: "Appeals & Reprocessing",
          tag: "Level 1 & 2 Appeals",
          desc: "Formal Level 1 and 2 appeals prepared with clinical documentation, submitted within payer deadlines, with underpayments recovered through contracted-rate variance audits." 
        },
        { 
          i: Building2, 
          t: "Back-Office Support",
          tag: "EOB & Lockbox Triage",
          desc: "Correspondence triage, EOB/ERA reconciliation, lockbox matching, and general administrative processing keep revenue cycles running smoothly without client headcount additions." 
        },
        { 
          i: Settings, 
          t: "Revenue Cycle Optimization",
          tag: "Executive Dashboards",
          desc: "Recurring reviews of Days in A/R, denial rates, net collection rates, clean claim rates, and DNFB metrics to drive systemic process improvements across the revenue lifecycle." 
        },
      ]
    }
  ];

  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  const currentCat = categories[activeCatIdx];
  const activeItem = currentCat.items[activeItemIdx] || currentCat.items[0];

  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services & Solutions"
          title={<>Comprehensive End-to-End <span className="text-gradient">RCM Solutions</span></>}
          sub="Delivering scalable, HIPAA-compliant, and high-performance revenue cycle services tailored to US healthcare providers and payer requirements."
        />

        <div className="mt-12 flex flex-wrap gap-3">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCatIdx(idx);
                setActiveItemIdx(0);
              }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cyan-glow)] ${
                activeCatIdx === idx
                  ? "bg-gradient-to-r from-[color:var(--cyan-glow)] to-[color:var(--medical-blue)] text-[color:var(--navy-deep)] shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                  : "bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
          {/* Item Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50 px-1">
              Select a service to view technical depth:
            </div>
            {currentCat.items.map((item, idx) => {
              const isSelected = activeItemIdx === idx;
              const ItemIcon = item.i;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveItemIdx(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cyan-glow)] ${
                    isSelected
                      ? "bg-[color:var(--medical-blue)]/20 border border-[color:var(--cyan-glow)]/50 text-white shadow-[0_0_15px_rgba(34,211,238,0.12)]"
                      : "bg-white/[0.02] border border-white/5 text-white/70 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isSelected ? "bg-[color:var(--cyan-glow)] text-[color:var(--navy-deep)]" : "bg-[color:var(--cyan-glow)]/10 text-[color:var(--cyan-glow)]"}`}>
                      <ItemIcon className="h-4.5 w-4.5" />
                    </div>
                    <span className="font-display text-sm font-medium">{item.t}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? "text-[color:var(--cyan-glow)] translate-x-1" : "text-white/30"}`} />
                </button>
              );
            })}
          </div>

          {/* Contextual Spotlight Panel */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="glass-card ambient-glow rounded-3xl p-8 md:p-10 transition-all duration-300 min-h-[380px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--cyan-glow)]/15 border border-[color:var(--cyan-glow)]/30 text-[color:var(--cyan-glow)] shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      {(() => {
                        const Icon = activeItem.i;
                        return <Icon className="h-7 w-7" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--cyan-glow)]">{currentCat.title}</div>
                      <h3 className="font-display text-2xl font-semibold text-white mt-1">{activeItem.t}</h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-[color:var(--cyan-glow)] bg-[color:var(--cyan-glow)]/10 border border-[color:var(--cyan-glow)]/20 px-3 py-1 rounded-full whitespace-nowrap">
                    {activeItem.tag}
                  </span>
                </div>

                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  {activeItem.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--cyan-glow)]" />
                  <span>HIPAA Compliant & SLA Backed</span>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--cyan-glow)] hover:underline">
                  Inquire about this solution <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Specialties() {
  const items = [
    { 
      i: Siren, 
      t: "Emergency Department (ED)",
      desc: "E/M leveling (99281–99285), trauma activations, and critical care time (99291/99292). High audit scrutiny due to leveling subjectivity." 
    },
    { 
      i: Hospital, 
      t: "IP-DRG",
      desc: "Inpatient MS-DRG assignment, principal diagnosis selection, CC/MCC capture, and procedure sequencing directly driving facility reimbursement." 
    },
    { 
      i: TrendingUp, 
      t: "HCC / Risk Adjustment",
      desc: "CMS-HCC chronic condition coding with suspect-condition analytics to optimize RAF scores for Medicare Advantage and ACA risk pools." 
    },
    { 
      i: Syringe, 
      t: "Surgery",
      desc: "Modifier accuracy (-25, -51, -59, -RT/-LT), global-period compliance, and pre-submission NCCI bundling checks on multi-procedure claims." 
    },
    { 
      i: ClipboardList, 
      t: "Evaluation & Management",
      desc: "Level-of-service coding under CMS MDM/time guidelines, balanced against audit risk from consistent over or under-leveling." 
    },
    { 
      i: Activity, 
      t: "Physical Therapy",
      desc: "Unit-based 8-minute rule billing, therapy-specific modifiers (-GP, -59, -KX), and plan of care consistency across episodes." 
    },
    { 
      i: Brain, 
      t: "Behavioral Health",
      desc: "Time-based psychotherapy codes (90832/90834/90837), add-on codes, and parity-law payer rule compliance." 
    },
    { 
      i: Radiation, 
      t: "Radiology",
      desc: "Professional (-26) vs technical (-TC) component splits and modality coding (CT/MRI/US/interventional radiology)." 
    },
    { 
      i: Pill, 
      t: "Anesthesia",
      desc: "Time-unit and base-unit calculations linked to surgical CPT codes, plus qualifying circumstance add-on coding." 
    },
    { 
      i: Bone, 
      t: "Orthopedics",
      desc: "Global-period tracking across staged procedures and modifier sequencing on multi-site musculoskeletal claims." 
    },
    { 
      i: HeartPulse, 
      t: "Cardiology",
      desc: "Cath-lab and interventional procedure bundling edits, plus device/implant coding checked against updated NCCI rules." 
    },
    { 
      i: StethoscopeIcon, 
      t: "Internal Medicine",
      desc: "E/M and chronic care management (CCM) coding mix, surfacing CCM time-tracking revenue opportunities." 
    },
    { 
      i: ScanFace, 
      t: "Gastroenterology",
      desc: "Screening vs diagnostic colonoscopy coding (modifier -33/-PT) determining patient cost-share under ACA rules." 
    },
    { 
      i: ShieldCheck, 
      t: "Dermatology",
      desc: "Medical vs cosmetic service differentiation and lesion-based procedure coding (size, location, malignancy status)." 
    },
    { 
      i: Baby, 
      t: "Pediatrics",
      desc: "Vaccine administration coding (CPT + CVX crosswalk) and age-banded well-child visit coding aligned to ACIP schedules." 
    },
    { 
      i: Users, 
      t: "Family Medicine",
      desc: "Preventive visits, chronic disease management, and minor procedures coded precisely within single multi-service encounters." 
    },
    { 
      i: Microscope, 
      t: "Pathology",
      desc: "Professional/technical component splits and specimen-level coding accuracy based on specimen count and complexity." 
    },
    { 
      i: AlertTriangle, 
      t: "Multi-specialty Denials",
      desc: "Cross-department denial root-cause analysis surfacing systemic eligibility and coding gaps across multiple departments." 
    },
  ];

  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <section id="specialties" className="py-28 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Specialty Expertise"
          title={<>Specialties We Support in <span className="text-gradient">Medical Coding</span></>}
          sub="Our certified coders (CPC/CCS) master specialty-specific coding rules, NCCI edits, and payer policies. Click or hover over any card to view detailed coding nuances."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(({ i: Icon, t, desc }, idx) => {
            const isFlipped = flippedCard === idx;
            return (
              <div 
                key={idx} 
                className="perspective-1000 h-52 cursor-pointer focus:outline-none"
                onClick={() => setFlippedCard(isFlipped ? null : idx)}
                onMouseEnter={() => setFlippedCard(idx)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div className={`relative h-full w-full rounded-2xl transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Front Face */}
                  <div className="absolute inset-0 backface-hidden glass-card glass-card-hover rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4">
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[color:var(--medical-blue)]/15 border border-[color:var(--medical-blue)]/30 text-[color:var(--cyan-glow)] shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="font-display text-base font-semibold text-white leading-snug">{t}</div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-2xl p-5 flex flex-col justify-between bg-[color:var(--navy-surface)] border-[color:var(--cyan-glow)]/40 shadow-[0_0_25px_rgba(34,211,238,0.2)] text-left">
                    <div>
                      <div className="text-xs font-semibold text-[color:var(--cyan-glow)] mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{t}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">{desc}</p>
                    </div>
                    <div className="mt-2 text-[10px] text-white/50 uppercase tracking-widest font-mono border-t border-white/10 pt-2 flex items-center justify-between">
                      <span>CPC / CCS Verified</span>
                      <span className="text-[color:var(--cyan-glow)]">Specialty Nuances</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AICodingShowcase() {
  const features = [
    {
      icon: Cpu,
      title: "NLP-Powered Code Suggestions",
      desc: "Advanced Natural Language Processing parses unstructured EHR clinical notes to pre-suggest accurate ICD-10-CM, CPT, and HCPCS codes before human review.",
      badge: "Speed & Velocity"
    },
    {
      icon: CheckSquare,
      title: "Human-in-the-Loop Validation",
      desc: "CPC/CCS certified coders review and sign off on every AI suggestion. The AI handles data processing volume while certified experts provide clinical judgment.",
      badge: "99%+ Accuracy"
    },
    {
      icon: ShieldCheck,
      title: "Pre-Submission Denial Prevention",
      desc: "Automated pre-flight checks validate NCCI edits, MUE limits, LCD/NCD policy rules, and payer-specific formatting before claims enter clearinghouse gateways.",
      badge: "Zero Rework"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="glass-card ambient-glow rounded-3xl p-8 md:p-12 border-[color:var(--cyan-glow)]/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[color:var(--cyan-glow)] font-semibold">
                <Sparkles className="h-4 w-4" /> AI Automation in Medical Coding
              </div>
              <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-white">
                Augmenting Human Coders with <span className="text-gradient">Agentic AI Velocity</span>
              </h3>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--cyan-glow)]/10 hover:bg-[color:var(--cyan-glow)]/20 border border-[color:var(--cyan-glow)]/30 px-5 py-2.5 text-xs font-semibold text-[color:var(--cyan-glow)] transition-all shrink-0">
              Request AI Demo <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const FIcon = f.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[color:var(--cyan-glow)]/30 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--cyan-glow)]/10 text-[color:var(--cyan-glow)] group-hover:scale-110 transition-transform">
                      <FIcon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded-full">{f.badge}</span>
                  </div>
                  <h4 className="font-display font-semibold text-white text-base mb-2">{f.title}</h4>
                  <p className="text-xs text-white/65 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const items = [
    { title: "Hospitals", subs: ["Multi-specialty Hospitals", "Outpatient Hospitals", "Community Hospitals"], icon: Hospital },
    { title: "Clinics", subs: ["Physician Clinics", "Specialty Clinics", "Multi-specialty Practices", "Urgent Care Centers"], icon: Building2 },
    { title: "Laboratories", subs: ["Diagnostic Laboratories", "Pathology Laboratories"], icon: Microscope },
    { title: "RHC", desc: "Rural Health Clinics", subs: ["Supporting rural healthcare providers with billing, coding, and reimbursement workflows."], icon: Home },
    { title: "FQHC", desc: "Federally Qualified Health Centers", subs: ["Providing operational and revenue cycle support tailored to federally regulated healthcare environments."], icon: ShieldCheck },
    { title: "Additional Segments", subs: ["Ambulatory Surgery Centers (ASC)", "Telehealth Providers", "Outpatient Facilities", "Medical Billing Companies"], icon: Network },
  ];
  
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="industries" className="py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries"
          title={<>Healthcare Organizations <span className="text-gradient">We Serve</span></>}
          sub="Our growing client network reflects our commitment to quality-focused delivery, HIPAA-compliant operations, operational efficiency, reliable partnerships, and scalable solutions."
        />
        
        <div className="mt-14 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {items.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-4 p-4 text-left rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cyan-glow)] ${isActive ? 'bg-[color:var(--medical-blue)]/20 border border-[color:var(--cyan-glow)]/40 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'bg-transparent border border-transparent hover:bg-white/[0.03]'}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-[color:var(--cyan-glow)] text-[color:var(--navy-deep)]' : 'bg-[color:var(--cyan-glow)]/10 text-[color:var(--cyan-glow)]'}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className={`font-display font-semibold transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}>{item.title}</div>
                    {item.desc && <div className="text-xs text-white/50">{item.desc}</div>}
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="w-full lg:w-2/3">
            <div className="glass-card ambient-glow rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--cyan-glow)]/10 border border-[color:var(--cyan-glow)]/20 text-[color:var(--cyan-glow)] mb-6">
                {(() => {
                  const Icon = items[activeTab].icon;
                  return <Icon className="h-8 w-8" />;
                })()}
              </div>
              <h3 className="font-display text-3xl font-semibold text-white mb-6">{items[activeTab].title}</h3>
              <ul className="space-y-4">
                {items[activeTab].subs.map((sub, sidx) => (
                  <li key={sidx} className="flex items-start gap-4 text-base md:text-lg text-white/80 leading-relaxed">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-[color:var(--cyan-glow)] mt-0.5" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const items = [
    { v: 36, s: "+", d: 0, label: "Healthcare Clients" },
    { v: 98, s: "%", d: 0, label: "Clean Claim Rate" },
    { v: 25, s: "%", d: 0, label: "Increase in Collections" },
    { v: 15, s: " Days", d: 0, label: "Faster Reimbursement" },
    { v: 100, s: "%", d: 0, label: "HIPAA Aware" },
  ];
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.62 0.18 245 / 0.18), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="glass-card ambient-glow rounded-3xl p-10 md:p-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {items.map((m) => (
              <div key={m.label} className="text-center md:text-left">
                <div className="font-display text-4xl md:text-5xl font-semibold text-white">
                  <Counter to={m.v} suffix={m.s} decimals={m.d} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.15em] text-white/50">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const stories = [
    {
      title: "Revenue Recovery Success",
      desc: "A physician group partnered with MedExodus to improve reimbursement efficiency and reduce aging receivables. Through proactive AR management and denial handling, the client experienced improved collections and smoother revenue cycle operations.",
    },
    {
      title: "Denial Reduction Achievement",
      desc: "A specialty clinic struggling with recurring denials collaborated with MedExodus for denial management support. Our structured workflow and root-cause analysis helped improve claim acceptance rates and payment consistency.",
    },
    {
      title: "Coding Accuracy Improvement",
      desc: "An outpatient healthcare facility required scalable coding support and quality assurance processes. MedExodus provided dedicated coding professionals, improving coding accuracy and reducing claim rejection risks.",
    },
    {
      title: "Scalable Operational Support",
      desc: "A growing healthcare organization required reliable back-office operational support to manage increasing patient volume. MedExodus delivered scalable workflow support and operational efficiency improvements.",
    },
  ];

  return (
    <section id="case-studies" className="py-28 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Case Studies & Success Stories"
          title={<>Revenue Cycle Improvement for a <span className="text-gradient">Multi-Specialty Physician Group</span></>}
          sub="Your Organization Could Be Our Next Success Story. We do not simply provide outsourcing services—we become a trusted extension of your healthcare operations team."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 glass-card rounded-2xl p-8 bg-[color:var(--navy-deep)]/60">
            <h3 className="font-display text-xl font-semibold text-[color:var(--cyan-glow)] mb-4">Client Challenge</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-2 text-white/70 text-sm"><AlertTriangle className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> High AR aging</li>
              <li className="flex gap-2 text-white/70 text-sm"><AlertTriangle className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Delayed reimbursements</li>
              <li className="flex gap-2 text-white/70 text-sm"><AlertTriangle className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Increased claim denials</li>
              <li className="flex gap-2 text-white/70 text-sm"><AlertTriangle className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Operational workflow inefficiencies</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-[color:var(--cyan-glow)] mb-4">MedExodus Solution</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-2 text-white/70 text-sm"><CheckCircle2 className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Daily AR follow-up workflows</li>
              <li className="flex gap-2 text-white/70 text-sm"><CheckCircle2 className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Denial analysis and appeals management</li>
              <li className="flex gap-2 text-white/70 text-sm"><CheckCircle2 className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Claims correction and resubmission processes</li>
              <li className="flex gap-2 text-white/70 text-sm"><CheckCircle2 className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Insurance payer escalation support</li>
              <li className="flex gap-2 text-white/70 text-sm"><CheckCircle2 className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Structured operational reporting</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-[color:var(--cyan-glow)] mb-4">Outcome</h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-white/70 text-sm"><TrendingUp className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Significant reduction in AR aging</li>
              <li className="flex gap-2 text-white/70 text-sm"><TrendingUp className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Faster reimbursement turnaround</li>
              <li className="flex gap-2 text-white/70 text-sm"><TrendingUp className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Improved collections performance</li>
              <li className="flex gap-2 text-white/70 text-sm"><TrendingUp className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Better operational visibility</li>
              <li className="flex gap-2 text-white/70 text-sm"><TrendingUp className="h-4 w-4 text-[color:var(--cyan-glow)] mt-0.5" /> Enhanced workflow efficiency</li>
            </ul>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {stories.map((s, idx) => (
              <div key={idx} className="glass-card glass-card-hover rounded-2xl p-6">
                <h4 className="font-display text-lg font-semibold text-white mb-3">{idx + 1}. {s.title}</h4>
                <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
            <div className="sm:col-span-2 glass-card rounded-2xl p-6 bg-gradient-to-r from-[color:var(--cyan-glow)]/10 to-transparent flex items-center justify-between">
              <div>
                <h4 className="font-display text-lg font-semibold text-white mb-1">And Many More Success Stories...</h4>
                <p className="text-sm text-white/60">MedExodus Healthcare Solutions proudly supports 36+ healthcare clients across the United States. Due to space limitations, we are unable to showcase every successful partnership and achievement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative overflow-hidden glass-card ambient-glow rounded-3xl p-12 md:p-20 text-center">
          <div className="absolute inset-0 -z-10 grid-overlay opacity-40" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[520px] rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, oklch(0.82 0.16 210 / 0.7), transparent 70%)" }} />
          <TrendingUp className="mx-auto h-8 w-8 text-[color:var(--cyan-glow)]" />
          <h2 className="mt-6 font-display text-4xl sm:text-5xl font-semibold text-white leading-tight">
            Ready to Optimize <br className="hidden sm:block" />Your <span className="text-gradient">Revenue Cycle?</span>
          </h2>
          <p className="mt-5 text-white/60 max-w-xl mx-auto">
            Talk to an RCM strategist. We look forward to helping your organization improve revenue performance, reimbursement efficiency, operational productivity, coding accuracy, and revenue cycle success.
          </p>
          <a href="mailto:info@medexodus.com" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--cyan-glow)] to-[color:var(--medical-blue)] px-7 py-3.5 text-sm font-semibold text-[color:var(--navy-deep)] glow-cyan hover:scale-[1.02] transition-transform">
            Contact Us: info@medexodus.com <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { 
      h: "Company", 
      l: [
        { name: "About", href: "#home" },
        { name: "Leadership", href: "#contact" },
        { name: "Careers", href: "#contact" },
        { name: "Press", href: "#contact" }
      ] 
    },
    { 
      h: "Services", 
      l: [
        { name: "Medical Coding", href: "#services" },
        { name: "Medical Billing", href: "#services" },
        { name: "Denial Mgmt", href: "#services" },
        { name: "AR Follow-up", href: "#services" }
      ] 
    },
    { 
      h: "Industries", 
      l: [
        { name: "Hospitals", href: "#industries" },
        { name: "Physician Groups", href: "#industries" },
        { name: "Clinics", href: "#industries" },
        { name: "Ambulatory", href: "#industries" }
      ] 
    },
    { 
      h: "Legal", 
      l: [
        { name: "Privacy Policy", href: "#contact" },
        { name: "Terms of Service", href: "#contact" },
        { name: "HIPAA Notice", href: "#contact" },
        { name: "Security & SOC 2", href: "#contact" }
      ] 
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-[color:var(--navy-deep)]/80 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="MedExodus Logo" className="h-9 w-auto object-contain" />
              <span className="font-display text-lg font-semibold">Med<span className="text-[color:var(--cyan-glow)]">Exodus</span></span>
            </div>
            <p className="mt-5 text-sm text-white/55 max-w-sm leading-relaxed">
              Enterprise Revenue Cycle Management for U.S. healthcare providers. Purpose-built for measurable financial outcomes.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-white/60">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[color:var(--cyan-glow)]" /> +1 (800) 555-0187</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-[color:var(--cyan-glow)]" /> info@medexodus.com</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[color:var(--cyan-glow)]" /> 1250 Enterprise Way, Dallas, TX 75201</div>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div className="text-xs uppercase tracking-[0.15em] text-white/40">{c.h}</div>
              <ul className="mt-4 space-y-2.5">
                {c.l.map(x => (
                  <li key={x.name}>
                    <a href={x.href} className="text-sm text-white/70 hover:text-[color:var(--cyan-glow)] transition-colors cursor-pointer">
                      {x.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} MedExodus Healthcare Solutions Pvt Ltd. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors">HIPAA Compliant</span>
            <span className="hover:text-white transition-colors">SOC 2 Ready</span>
            <span className="hover:text-white transition-colors">U.S. Operations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Specialties />
        <AICodingShowcase />
        <Industries />
        <Metrics />
        <CaseStudies />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

