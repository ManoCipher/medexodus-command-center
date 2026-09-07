import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Activity, ShieldCheck, FileCheck2, ClipboardList, CreditCard,
  AlertTriangle, LineChart, ArrowRight, CheckCircle2, Building2, Hospital,
  HeartPulse, Brain, Baby, Bone, Radiation, Siren, Sparkles, Lock, Cpu,
  TrendingUp, Users, Phone, Mail, MapPin, Menu, X, ChevronRight, ChevronDown,
  Award, Syringe, Pill, Microscope, Stethoscope as StethoscopeIcon, Home,
  ScanFace, CheckSquare, Search, FileText, Settings, BadgeCheck, FileArchive, Network
} from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")(({
  component: LandingPage,
}));

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */

function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.12 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ to, suffix = "", duration = 1800, decimals = 0 }: {
  to: number; suffix?: string; duration?: number; decimals?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
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

/* Fade-up wrapper driven by IntersectionObserver */
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.6s cubic-bezier(0.22,0.6,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,0.6,0.3,1) ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════
   NAV
═══════════════════════════════════════ */

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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={{ backgroundColor: "#003087" }}>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 md:h-[68px] flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="MedExodus" className="h-8 sm:h-9 w-auto object-contain" />
          <span style={{ fontFamily: '"Space Grotesk","Inter",sans-serif', fontWeight: 600, fontSize: "1.08rem", color: "#fff", letterSpacing: "-0.025em" }}>
            Med<span style={{ color: "#1A8FE3" }}>Exodus</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.875rem", fontWeight: 500, transition: "color 180ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}>
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded whitespace-nowrap transition-all"
            style={{ background: "#fff", color: "#003087" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#EFF6FF"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}>
            Get Consultation <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button onClick={() => setOpen(v => !v)}
            className="lg:hidden rounded p-2 border border-white/20 text-white"
            aria-label={open ? "Close" : "Menu"}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-white/10" style={{ backgroundColor: "#002060" }}>
          <div className="px-4 sm:px-6 py-3 flex flex-col">
            {links.map(l => (
              <a key={l} onClick={() => setOpen(false)}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="py-3 text-sm font-medium border-b border-white/5 last:border-0"
                style={{ color: "rgba(255,255,255,0.85)" }}>
                {l}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              className="mt-3 mb-1 block text-center py-3 text-sm font-semibold rounded"
              style={{ background: "#fff", color: "#003087" }}>
              Request a Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */

function StatPill({ label, value, delta }: { label: string; value: string; delta?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}
      className="ah-card rounded-xl px-4 py-3 flex items-center gap-3"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>{label}</div>
        <div className="text-lg sm:text-xl font-bold mt-0.5" style={{ color: "#003087" }}>{value}</div>
      </div>
      {delta && (
        <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0"
          style={{ background: "#DCFCE7", color: "#166534", border: "1px solid #BBF7D0" }}>
          {delta}
        </span>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden"
      style={{ paddingTop: "3.5rem", background: "linear-gradient(135deg,#F0F5FF 0%,#E8F0FE 35%,#fff 75%)" }}>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(#C7D9F8 1px,transparent 1px),linear-gradient(90deg,#C7D9F8 1px,transparent 1px)",
        backgroundSize: "52px 52px", opacity: 0.2,
      }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-16 lg:pb-22">

          {/* ── Left copy ── */}
          <FadeUp className="order-1">
            <div className="ah-badge mb-5 sm:mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: "#0066CC" }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#0066CC" }} />
              </span>
              Trusted Revenue Cycle Management Partner
            </div>

            <h1 style={{ color: "#111827", lineHeight: 1.08 }}>
              Med<span style={{ color: "#003087" }}>Exodus</span>{" "}
              <span className="text-gradient">Healthcare</span>{" "}Solutions
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "#4B5563", maxWidth: "560px" }}>
              A trusted healthcare outsourcing company delivering high-quality Revenue Cycle Management (RCM) services to healthcare organizations across the United States — reliable, scalable, and HIPAA-compliant.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="btn-primary justify-center sm:justify-start">
                Contact Us <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="btn-secondary justify-center sm:justify-start">
                Explore Services
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                { i: Lock, t: "HIPAA Compliant" },
                { i: ShieldCheck, t: "US Healthcare Focus" },
                { i: FileCheck2, t: "Certified Medical Coding" },
                { i: LineChart, t: "RCM Specialists" },
              ].map(({ i: Icon, t }) => (
                <div key={t} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#374151" }}>
                  <div className="flex h-6 w-6 items-center justify-center rounded shrink-0" style={{ background: "#EFF6FF" }}>
                    <Icon className="h-3.5 w-3.5" style={{ color: "#003087" }} />
                  </div>
                  {t}
                </div>
              ))}
            </div>
          </FadeUp>

          {/* ── Right: stats grid ── */}
          <div className="order-2 grid grid-cols-2 gap-3">
            {/* Large featured stat */}
            <FadeUp delay={60} className="col-span-2">
              <div className="ah-card rounded-2xl p-5 sm:p-6 flex items-center gap-6"
                style={{ background: "linear-gradient(135deg,#003087 0%,#0050BE 100%)" }}>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Active Clients</div>
                  <div className="text-4xl sm:text-5xl font-bold" style={{ color: "#fff", lineHeight: 1 }}>
                    <Counter to={36} suffix="+" />
                  </div>
                  <div className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.72)" }}>Healthcare organizations served</div>
                </div>
                <div className="ml-auto flex items-end gap-0.5 h-14">
                  {[40, 55, 35, 70, 60, 82, 68, 90, 78, 96].map((h, i) => (
                    <div key={i} className="w-2.5 sm:w-3 rounded-sm" style={{ height: `${h}%`, background: i >= 7 ? "#7DD3FC" : "rgba(255,255,255,0.25)" }} />
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={120}><StatPill label="Clean Claim Rate" value="98%" delta="↑ 3.1%" /></FadeUp>
            <FadeUp delay={160}><StatPill label="Denial Reduction" value="28%" delta="↓ 28%" /></FadeUp>
            <FadeUp delay={200}><StatPill label="Days in AR" value="15 Days" delta="−6d" /></FadeUp>
            <FadeUp delay={240}><StatPill label="Payment Posting" value="99%" delta="↑ 1.2%" /></FadeUp>

            {/* EDI label strip */}
            <FadeUp delay={280} className="col-span-2">
              <div className="rounded-xl px-4 py-3 flex flex-wrap gap-2 sm:gap-3"
                style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
                {["270/271 EDI", "837P/I", "835 ERA", "278 PA", "CAQH/PECOS"].map(t => (
                  <span key={t} className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#fff", color: "#003087", border: "1px solid #BFDBFE" }}>
                    {t}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#E5E7EB 20%,#E5E7EB 80%,transparent)" }} />
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION HEADING
═══════════════════════════════════════ */

function SH({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <FadeUp className="max-w-3xl">
      <div className="ah-badge mb-4">{eyebrow}</div>
      <h2 style={{ color: "#111827", fontWeight: 700 }}>{title}</h2>
      {sub && <p className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: "#4B5563" }}>{sub}</p>}
    </FadeUp>
  );
}

/* ═══════════════════════════════════════
   SERVICES & SOLUTIONS (MERGED WITH RCM CAPABILITIES)
═══════════════════════════════════════ */

function Services() {
  const categories = [
    {
      label: "Front-Office", fullTitle: "Front-Office Solutions",
      items: [
        {
          i: ShieldCheck, t: "Insurance Verification", tag: "270/271 EDI",
          desc: "Real-time 270/271 EDI transactions verify plan types (HMO/PPO/EPO), effective dates, COB order, deductible/out-of-pocket accumulators, and authorization flags before patient visits — resolving discrepancies same-day to prevent front-end denials.",
          bullets: ["HMO / PPO / EPO plan detection", "Effective date & termination check", "Deductible & OOP accumulators", "Authorization flags", "COB order verification"]
        },
        {
          i: BadgeCheck, t: "Prior Authorization", tag: "278 EDI & LCD/NCD",
          desc: "CPT/HCPCS codes are cross-walked against payer medical policies (LCD/NCD). Submissions with clinical documentation are tracked via 278 EDI or portal, with escalation to peer-to-peer review when requests are pended or denied.",
          bullets: ["CPT/HCPCS policy cross-walk", "278 EDI submission tracking", "Clinical doc escalation", "Peer-to-peer review support", "Payer portal monitoring"]
        },
        {
          i: Users, t: "Patient Billing Support", tag: "HIPAA Compliant",
          desc: "Patient-facing financial workflows — statement generation, balance inquiries, payment plan structuring, and financial counseling — reduce self-pay AR aging and bad-debt write-offs while maintaining strict HIPAA compliance.",
          bullets: ["Statement generation", "Balance inquiry portal", "Payment plan structuring", "Financial counseling", "Self-pay AR aging reduction"]
        },
        {
          i: StethoscopeIcon, t: "Provider Support", tag: "Lightweight CDI",
          desc: "A direct feedback loop between clinicians and coding/billing teams tied to specific payer documentation requirements, catching clinical documentation gaps at the point of care before claims are generated.",
          bullets: ["Point-of-care CDI alerts", "Payer-specific doc requirements", "Coder–provider feedback loop", "Denial prevention workflows", "Real-time coding support"]
        },
      ]
    },
    {
      label: "Middle-Office", fullTitle: "Middle-Office Solutions",
      items: [
        {
          i: FileCheck2, t: "Medical Coding", tag: "CPC / CCS Certified",
          desc: "CPC/CCS credentialed coders assign ICD-10-CM, CPT, and HCPCS Level II procedure codes based on clinical documentation, scrubbed against NCCI edits, MUE limits, and specialty-specific payer LCD/NCD coverage policies.",
          bullets: ["ICD-10-CM / CPT / HCPCS", "NCCI edit scrubbing", "MUE limit checks", "LCD / NCD policy compliance", "Specialty-specific coding"]
        },
        {
          i: FileArchive, t: "Coding Audits", tag: "OIG / CMS Focused",
          desc: "Statistically representative sampling weighted toward high-dollar and high-denial-risk claim types drives prospective and retrospective audits against CMS/OIG Work Plan focus areas to catch systematic coding errors before RAC audits.",
          bullets: ["Prospective & retrospective audits", "OIG Work Plan alignment", "High-denial-risk sampling", "RAC audit preparation", "Systematic error detection"]
        },
        {
          i: Search, t: "Documentation Review", tag: "AHIMA / ACDIS",
          desc: "Structured physician queries formatted to AHIMA/ACDIS guidelines close documentation gaps when clinical notes do not support required code specificity — legitimately capturing revenue without leading providers.",
          bullets: ["AHIMA-compliant queries", "Code specificity improvement", "Non-leading query format", "ACDIS best practices", "Query tracking & outcomes"]
        },
        {
          i: TrendingUp, t: "HCC / Risk Adjustment", tag: "CMS-HCC RAF Score",
          desc: "Chronic condition coding under CMS-HCC risk models for Medicare Advantage and ACA pools. Suspect-condition analytics flag uncaptured chronic diagnoses from lab/claims data for chart-chase confirmation.",
          bullets: ["CMS-HCC risk model coding", "RAF score optimization", "Medicare Advantage pools", "ACA risk pool support", "Suspect-condition analytics"]
        },
        {
          i: CheckSquare, t: "Quality Assurance", tag: "3-Tier QA",
          desc: "A tiered QA structure (coder self-audit, peer review, supervisor sign-off on high-value claims) tracks error taxonomies over time to eliminate recurring failure points across coders, payers, and CPT families.",
          bullets: ["Self-audit layer", "Peer review process", "Supervisor sign-off", "Error taxonomy tracking", "Payer / CPT failure analysis"]
        },
        {
          i: ShieldCheck, t: "Credentialing Assistance", tag: "CAQH & PECOS",
          desc: "Provider enrollment and re-credentialing monitored via CAQH ProView, PECOS, and payer portals. Proactive expiration tracking ensures credential lapses never block clean claim payment.",
          bullets: ["CAQH ProView management", "PECOS enrollment", "Payer portal monitoring", "Expiration tracking", "Re-credentialing workflows"]
        },
      ]
    },
    {
      label: "Back-Office", fullTitle: "Back-Office Solutions",
      items: [
        {
          i: ClipboardList, t: "Medical Billing", tag: "837P / 837I EDI",
          desc: "Full charge-to-cash lifecycle management: charge capture, 837P/837I EDI claim generation, clearinghouse submission, and payment reconciliation as a single coordinated workflow without siloed handoffs.",
          bullets: ["Charge capture", "837P / 837I EDI generation", "Clearinghouse submission", "Payment reconciliation", "No siloed handoffs"]
        },
        {
          i: Activity, t: "AR Follow-Up", tag: "0–90+ Days Aging",
          desc: "Outstanding claims are worked by aging bucket (0–30 / 31–60 / 61–90 / 90+ days) with payer-specific follow-up cadences prioritized by dollar value and denial risk rather than flat FIFO queues.",
          bullets: ["Aging bucket segmentation", "Payer-specific cadences", "Dollar-value prioritization", "Denial-risk scoring", "Real-time AR visibility"]
        },
        {
          i: AlertTriangle, t: "Denial Management", tag: "CARC / RARC Root Cause",
          desc: "Every denial is parsed by CARC/RARC codes and root-caused (eligibility, auth, coding, medical necessity, timely filing). Corrected claims are resubmitted, and patterns are fed back upstream to prevent recurrence.",
          bullets: ["CARC / RARC parsing", "Root-cause categorization", "Corrected claim resubmission", "Upstream recurrence prevention", "Denial trend dashboards"]
        },
        {
          i: CreditCard, t: "Payment Posting", tag: "835 ERA Auto-Post",
          desc: "835 ERA files auto-post against expected reimbursement with contracted-rate variance flagged instantly. Manual posting covers paper EOBs, exception cases, and credit-balance resolution.",
          bullets: ["835 ERA auto-posting", "Contracted-rate variance alerts", "Paper EOB manual posting", "Credit-balance resolution", "Exception handling"]
        },
        {
          i: FileText, t: "Charge Entry", tag: "DOS Lag Reduction",
          desc: "Charge reconciliation against encounter records minimizes lag between date of service and claim readiness — preventing timely-filing denials on slow-moving payers.",
          bullets: ["Encounter reconciliation", "DOS lag monitoring", "Timely-filing prevention", "Charge capture accuracy", "Daily reconciliation reports"]
        },
        {
          i: LineChart, t: "Claims Submission", tag: "999 / 277CA Reports",
          desc: "Electronic claims batched per payer companion guides. Clearinghouse acknowledgment (999/277CA) and rejection reports are monitored so front-end rejections are resolved within the same billing cycle.",
          bullets: ["Payer companion guide batching", "999 acknowledgment tracking", "277CA rejection monitoring", "Same-cycle resolution", "Clearinghouse reporting"]
        },
        {
          i: Search, t: "Claims Scrubbing", tag: "Pre-Submission Edits",
          desc: "Automated edit logic verifies NCCI/MUE bundling rules, LCD/NCD coverage policy, and payer formatting requirements to eliminate errors before claims reach clearinghouse gateways.",
          bullets: ["NCCI bundling checks", "MUE limit validation", "LCD / NCD policy edits", "Payer format verification", "Pre-clearinghouse gateway checks"]
        },
        {
          i: FileText, t: "Appeals & Reprocessing", tag: "Level 1 & 2 Appeals",
          desc: "Formal Level 1 and 2 appeals prepared with clinical documentation, submitted within payer deadlines, with underpayments recovered through contracted-rate variance audits.",
          bullets: ["Level 1 & 2 appeal preparation", "Clinical documentation packaging", "Payer deadline tracking", "Underpayment recovery", "Contracted-rate variance audits"]
        },
        {
          i: Building2, t: "Back-Office Support", tag: "EOB & Lockbox Triage",
          desc: "Correspondence triage, EOB/ERA reconciliation, lockbox matching, and general administrative processing keep revenue cycles running smoothly without client headcount additions.",
          bullets: ["EOB & lockbox matching", "Correspondence triage", "ERA reconciliation", "Administrative processing", "Seamless workflow integration"]
        },
        {
          i: Settings, t: "Revenue Cycle Optimization", tag: "Executive Dashboards",
          desc: "Recurring reviews of Days in A/R, denial rates, net collection rates, clean claim rates, and DNFB metrics to drive systemic process improvements across the revenue lifecycle.",
          bullets: ["Days in A/R tracking", "Net collection rate monitoring", "Clean claim rate reporting", "DNFB metrics", "Executive-level dashboards"]
        },
      ]
    }
  ];

  const [catIdx, setCatIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const cat = categories[catIdx];
  const active = cat.items[itemIdx] ?? cat.items[0];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24" style={{ background: "#fff" }}>
      {/* Anchor for features link */}
      <div id="features" className="scroll-mt-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SH eyebrow="Services & Solutions"
          title={<>Comprehensive <span className="text-gradient">RCM Solutions</span></>}
          sub="Delivering scalable, HIPAA-compliant, and high-performance revenue cycle services tailored to US healthcare providers and payer requirements." />

        {/* Category tabs */}
        <FadeUp delay={100} className="mt-8 flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button key={i} onClick={() => { setCatIdx(i); setItemIdx(0); setMobileOpen(null); }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded text-sm font-semibold transition-all cursor-pointer focus:outline-none flex items-center gap-2"
              style={catIdx === i
                ? { background: "#003087", color: "#fff", border: "2px solid #003087" }
                : { background: "#fff", color: "#003087", border: "2px solid #003087" }}
              onMouseEnter={e => { if (catIdx !== i) e.currentTarget.style.background = "#EFF6FF"; }}
              onMouseLeave={e => { if (catIdx !== i) e.currentTarget.style.background = "#fff"; }}>
              <span>{c.label}</span>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-full"
                style={catIdx === i ? { background: "rgba(255,255,255,0.2)", color: "#fff" } : { background: "#EFF6FF", color: "#003087" }}>
                {c.items.length}
              </span>
            </button>
          ))}
        </FadeUp>

        {/* Mobile accordion */}
        <div className="mt-6 lg:hidden space-y-2.5">
          {cat.items.map((item, i) => {
            const isOpen = mobileOpen === i;
            const Icon = item.i;
            return (
              <div key={i} className="overflow-hidden rounded-xl transition-all duration-300"
                style={{ border: isOpen ? "1px solid #003087" : "1px solid #E5E7EB", background: "#fff" }}>
                <button onClick={() => setMobileOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                  style={{ background: isOpen ? "#EFF6FF" : "#fff" }}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={isOpen ? { background: "#003087", color: "#fff" } : { background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE" }}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold flex-1 text-left" style={{ color: isOpen ? "#003087" : "#374151" }}>{item.t}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300"
                    style={{ color: isOpen ? "#003087" : "#9CA3AF", transform: isOpen ? "rotate(180deg)" : "none" }} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 animate-pop-in">
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-3"
                      style={{ background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE", fontFamily: "monospace" }}>
                      {item.tag}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{item.desc}</p>
                    <div className="mt-4 pt-3" style={{ borderTop: "1px solid #E5E7EB" }}>
                      <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "#003087" }}>Key Capabilities</div>
                      <ul className="space-y-1.5">
                        {item.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-center gap-2 text-xs" style={{ color: "#374151" }}>
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "#059669" }} />{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 flex items-center justify-between text-xs font-medium" style={{ borderTop: "1px solid #E5E7EB", color: "#6B7280" }}>
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" style={{ color: "#059669" }} /> HIPAA Compliant & SLA Backed</span>
                      <a href="#contact" className="font-bold flex items-center gap-1" style={{ color: "#003087" }}>Inquire <ArrowRight className="h-3.5 w-3.5" /></a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop side-by-side */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 mt-8 items-start">
          <div className="lg:col-span-5 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9CA3AF" }}>Select a service:</div>
            {cat.items.map((item, i) => {
              const sel = itemIdx === i;
              const Icon = item.i;
              return (
                <button key={i} onClick={() => setItemIdx(i)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all cursor-pointer focus:outline-none"
                  style={sel
                    ? { background: "#EFF6FF", border: "1px solid #BFDBFE", boxShadow: "0 2px 8px rgba(0,48,135,0.08)" }
                    : { background: "#fff", border: "1px solid #E5E7EB" }}
                  onMouseEnter={e => { if (!sel) e.currentTarget.style.background = "#F8FAFF"; }}
                  onMouseLeave={e => { if (!sel) e.currentTarget.style.background = "#fff"; }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={sel ? { background: "#003087", color: "#fff" } : { background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE" }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: sel ? "#003087" : "#374151" }}>{item.t}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0" style={{ color: sel ? "#003087" : "#D1D5DB" }} />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="rounded-2xl p-7 xl:p-9 transition-all duration-300"
              style={{ border: "1px solid #E5E7EB", background: "#fff", boxShadow: "0 4px 28px rgba(0,48,135,0.09)" }}>
              <div className="flex items-start justify-between gap-4 pb-5 mb-5" style={{ borderBottom: "1px solid #E5E7EB" }}>
                <div className="flex items-center gap-4">
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl p-3"
                    style={{ background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE" }}>
                    {(() => { const Icon = active.i; return <Icon className="h-6 w-6" />; })()}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "#0066CC" }}>{cat.fullTitle}</div>
                    <h3 className="text-xl font-bold mt-0.5" style={{ color: "#111827" }}>{active.t}</h3>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-bold px-3 py-1 rounded-full mt-1"
                  style={{ background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE", fontFamily: "monospace" }}>
                  {active.tag}
                </span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#4B5563" }}>{active.desc}</p>

              {/* Key Capabilities Grid */}
              <div className="mt-6 pt-5" style={{ borderTop: "1px solid #F3F4F6" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#003087" }}>
                  Core Capabilities & Workflows
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {active.bullets.map((bullet, bi) => (
                    <div key={bi} className="flex items-center gap-2 text-xs font-medium" style={{ color: "#374151" }}>
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#059669" }} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: "1px solid #E5E7EB" }}>
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: "#6B7280" }}>
                  <CheckCircle2 className="h-4 w-4" style={{ color: "#059669" }} /> HIPAA Compliant & SLA Backed
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
                  style={{ color: "#003087" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#0066CC"}
                  onMouseLeave={e => e.currentTarget.style.color = "#003087"}>
                  Inquire <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* EDI Reference Strip */}
        <FadeUp delay={120} className="mt-14">
          <div className="rounded-xl p-5 sm:p-6 lg:p-8" style={{ border: "1px solid #E5E7EB", background: "#F8F9FA" }}>
            <div className="ah-badge mb-5">EDI Transaction Reference</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { code: "270/271", name: "Eligibility Inquiry & Response", dir: "Provider ↔ Payer" },
                { code: "278", name: "Prior Authorization", dir: "Provider ↔ Payer" },
                { code: "276/277", name: "Claim Status", dir: "Provider ↔ Payer" },
                { code: "837P/I", name: "Healthcare Claims", dir: "Provider → Payer" },
                { code: "835", name: "Remittance Advice (ERA)", dir: "Payer → Provider" },
                { code: "834", name: "Benefit Enrollment", dir: "Employer → Payer" },
                { code: "820", name: "Premium Payment", dir: "Employer → Payer" },
                { code: "999", name: "Acknowledgment", dir: "Clearinghouse → Provider" },
                { code: "277CA", name: "Claim Acknowledgment", dir: "Clearinghouse → Provider" },
                { code: "CAQH/PECOS", name: "Credentialing", dir: "Provider → Payer" },
              ].map((t) => (
                <div key={t.code} className="ah-card rounded-lg p-3 transition-all cursor-default"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#BFDBFE"; e.currentTarget.style.background = "#EFF6FF"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "#fff"; }}>
                  <div className="font-mono text-sm font-bold" style={{ color: "#003087" }}>{t.code}</div>
                  <div className="text-xs mt-1 leading-snug" style={{ color: "#374151" }}>{t.name}</div>
                  <div className="text-[10px] mt-1 font-mono" style={{ color: "#9CA3AF" }}>{t.dir}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SPECIALTIES  — animated pop-out on desktop, tap-expand on mobile
═══════════════════════════════════════ */

function Specialties() {
  const items = [
    { i: Siren, t: "Emergency Department", desc: "E/M leveling (99281–99285), trauma activations, and critical care time (99291/99292). High audit scrutiny due to leveling subjectivity." },
    { i: Hospital, t: "IP-DRG", desc: "Inpatient MS-DRG assignment, principal diagnosis selection, CC/MCC capture, and procedure sequencing directly driving facility reimbursement." },
    { i: TrendingUp, t: "HCC / Risk Adjustment", desc: "CMS-HCC chronic condition coding with suspect-condition analytics to optimize RAF scores for Medicare Advantage and ACA risk pools." },
    { i: Syringe, t: "Surgery", desc: "Modifier accuracy (-25, -51, -59, -RT/-LT), global-period compliance, and pre-submission NCCI bundling checks on multi-procedure claims." },
    { i: ClipboardList, t: "Evaluation & Management", desc: "Level-of-service coding under CMS MDM/time guidelines, balanced against audit risk from consistent over or under-leveling." },
    { i: Activity, t: "Physical Therapy", desc: "Unit-based 8-minute rule billing, therapy-specific modifiers (-GP, -59, -KX), and plan of care consistency across episodes." },
    { i: Brain, t: "Behavioral Health", desc: "Time-based psychotherapy codes (90832/90834/90837), add-on codes, and parity-law payer rule compliance." },
    { i: Radiation, t: "Radiology", desc: "Professional (-26) vs technical (-TC) component splits and modality coding (CT/MRI/US/interventional radiology)." },
    { i: Pill, t: "Anesthesia", desc: "Time-unit and base-unit calculations linked to surgical CPT codes, plus qualifying circumstance add-on coding." },
    { i: Bone, t: "Orthopedics", desc: "Global-period tracking across staged procedures and modifier sequencing on multi-site musculoskeletal claims." },
    { i: HeartPulse, t: "Cardiology", desc: "Cath-lab and interventional procedure bundling edits, plus device/implant coding checked against updated NCCI rules." },
    { i: StethoscopeIcon, t: "Internal Medicine", desc: "E/M and chronic care management (CCM) coding mix, surfacing CCM time-tracking revenue opportunities." },
    { i: ScanFace, t: "Gastroenterology", desc: "Screening vs diagnostic colonoscopy coding (modifier -33/-PT) determining patient cost-share under ACA rules." },
    { i: ShieldCheck, t: "Dermatology", desc: "Medical vs cosmetic service differentiation and lesion-based procedure coding (size, location, malignancy status)." },
    { i: Baby, t: "Pediatrics", desc: "Vaccine administration coding (CPT + CVX crosswalk) and age-banded well-child visit coding aligned to ACIP schedules." },
    { i: Users, t: "Family Medicine", desc: "Preventive visits, chronic disease management, and minor procedures coded precisely within single multi-service encounters." },
    { i: Microscope, t: "Pathology", desc: "Professional/technical component splits and specimen-level coding accuracy based on specimen count and complexity." },
    { i: AlertTriangle, t: "Multi-specialty Denials", desc: "Cross-department denial root-cause analysis surfacing systemic eligibility and coding gaps across multiple departments." },
  ];

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section id="specialties" className="py-16 sm:py-20 lg:py-24"
      style={{ background: "#F8F9FA", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SH eyebrow="Specialty Expertise"
          title={<>Specialties We Support in <span className="text-gradient">Medical Coding</span></>}
          sub="Our certified coders (CPC/CCS) master specialty-specific coding rules, NCCI edits, and payer policies. Hover (desktop) or tap (mobile) any card for full coding details." />

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 specialty-grid" style={{ isolation: "isolate" }}>
          {items.map(({ i: Icon, t, desc }, idx) => {
            const isActive = activeIdx === idx;
            const isDimmed = activeIdx !== null && !isActive;
            return (
              <div key={idx}
                className={`specialty-card-wrap ${isDimmed ? "dimmed" : ""}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}>
                <div className="specialty-card-inner ah-card rounded-xl overflow-hidden"
                  style={isActive ? { borderColor: "#003087" } : {}}>
                  <div className="flex items-center gap-3 p-4 sm:p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                      style={isActive ? { background: "#003087", color: "#fff" } : { background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE" }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold leading-snug" style={{ color: "#111827" }}>{t}</h3>
                  </div>
                  <div style={{
                    maxHeight: isActive ? "200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 320ms cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    <div className="px-4 sm:px-5 pb-4" style={{ borderTop: "1px solid #E5E7EB" }}>
                      <p className="text-xs leading-relaxed mt-3" style={{ color: "#4B5563" }}>{desc}</p>
                      <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest pt-2"
                        style={{ color: "#003087", borderTop: "1px solid #F3F4F6" }}>
                        <span>CPC / CCS Certified</span>
                        <span className="flex items-center gap-1">Specialty <CheckCircle2 className="h-3 w-3" /></span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    maxHeight: isActive ? "0px" : "32px",
                    overflow: "hidden",
                    transition: "max-height 300ms ease",
                  }}>
                    <div className="px-4 sm:px-5 pb-3 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#9CA3AF", borderTop: "1px solid #F3F4F6", paddingTop: "8px" }}>
                      Hover to view details
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sm:hidden mt-8 grid grid-cols-1 gap-2.5">
          {items.map(({ i: Icon, t, desc }, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div key={idx} className="rounded-xl overflow-hidden transition-all duration-300"
                style={{ border: isOpen ? "1px solid #003087" : "1px solid #E5E7EB", background: "#fff" }}>
                <button onClick={() => setActiveIdx(isOpen ? null : idx)}
                  className="w-full flex items-center gap-3 p-4 text-left">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={isOpen ? { background: "#003087", color: "#fff" } : { background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE" }}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold flex-1" style={{ color: isOpen ? "#003087" : "#111827" }}>{t}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300"
                    style={{ color: isOpen ? "#003087" : "#9CA3AF", transform: isOpen ? "rotate(180deg)" : "none" }} />
                </button>
                <div style={{
                  maxHeight: isOpen ? "220px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 320ms cubic-bezier(0.4,0,0.2,1)",
                }}>
                  <div className="px-4 pb-4" style={{ borderTop: "1px solid #E5E7EB" }}>
                    <p className="text-sm leading-relaxed mt-3" style={{ color: "#4B5563" }}>{desc}</p>
                    <div className="mt-3 pt-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#003087", borderTop: "1px solid #F3F4F6" }}>
                      CPC / CCS Certified Coder
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

/* ═══════════════════════════════════════
   AI CODING SHOWCASE
═══════════════════════════════════════ */

function AICodingShowcase() {
  const features = [
    { icon: Cpu, title: "NLP-Powered Code Suggestions", desc: "Advanced NLP parses unstructured EHR clinical notes to pre-suggest accurate ICD-10-CM, CPT, and HCPCS codes before human review.", badge: "Speed & Velocity" },
    { icon: CheckSquare, title: "Human-in-the-Loop Validation", desc: "CPC/CCS certified coders review and sign off on every AI suggestion. The AI handles data volume while certified experts provide clinical judgment.", badge: "99%+ Accuracy" },
    { icon: ShieldCheck, title: "Pre-Submission Denial Prevention", desc: "Automated pre-flight checks validate NCCI edits, MUE limits, LCD/NCD policy rules, and payer-specific formatting before claims enter clearinghouse gateways.", badge: "Zero Rework" },
  ];

  return (
    <section className="py-16 sm:py-20" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="rounded-2xl p-6 sm:p-8 lg:p-12" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 sm:pb-8"
              style={{ borderBottom: "1px solid #BFDBFE" }}>
              <div>
                <div className="ah-badge mb-3"><Sparkles className="h-3.5 w-3.5" /> AI Automation in Medical Coding</div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: "#111827" }}>
                  Augmenting Human Coders with{" "}
                  <span className="text-gradient">Agentic AI Velocity</span>
                </h3>
              </div>
              <a href="#contact" className="btn-primary shrink-0 self-start sm:self-center">
                Request AI Demo <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {features.map((f, idx) => {
                const FIcon = f.icon;
                return (
                  <FadeUp key={idx} delay={idx * 80}>
                    <div className="ah-card ah-card-hover rounded-xl p-5 sm:p-6 h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "#DBEAFE", color: "#003087" }}>
                          <FIcon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{ background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE" }}>
                          {f.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base mb-2" style={{ color: "#111827" }}>{f.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{f.desc}</p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   INDUSTRIES
═══════════════════════════════════════ */

function Industries() {
  const items = [
    { title: "Hospitals", subs: ["Multi-specialty Hospitals", "Outpatient Hospitals", "Community Hospitals"], icon: Hospital },
    { title: "Clinics", subs: ["Physician Clinics", "Specialty Clinics", "Multi-specialty Practices", "Urgent Care Centers"], icon: Building2 },
    { title: "Laboratories", subs: ["Diagnostic Laboratories", "Pathology Laboratories"], icon: Microscope },
    { title: "RHC", desc: "Rural Health Clinics", subs: ["Supporting rural healthcare providers with billing, coding, and reimbursement workflows."], icon: Home },
    { title: "FQHC", desc: "Federally Qualified Health Centers", subs: ["Providing operational and revenue cycle support tailored to federally regulated healthcare environments."], icon: ShieldCheck },
    { title: "Additional Segments", subs: ["Ambulatory Surgery Centers (ASC)", "Telehealth Providers", "Outpatient Facilities", "Medical Billing Companies"], icon: Network },
  ];
  const [tab, setTab] = useState(0);

  return (
    <section id="industries" className="py-16 sm:py-20 lg:py-24" style={{ background: "#F8F9FA", borderTop: "1px solid #E5E7EB" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SH eyebrow="Industries" title={<>Healthcare Organizations <span className="text-gradient">We Serve</span></>}
          sub="Our growing client network reflects our commitment to quality-focused delivery, HIPAA-compliant operations, operational efficiency, reliable partnerships, and scalable solutions." />

        <div className="mt-10 flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Tab list */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {items.map((item, idx) => {
                const isA = tab === idx;
                return (
                  <button key={idx} onClick={() => setTab(idx)}
                    className="flex items-center gap-3 p-3 sm:p-3.5 text-left rounded-xl transition-all duration-200 cursor-pointer focus:outline-none shrink-0 lg:shrink lg:w-full"
                    style={isA
                      ? { background: "#fff", border: "1px solid #BFDBFE", boxShadow: "0 2px 10px rgba(0,48,135,0.09)", minWidth: "170px" }
                      : { background: "transparent", border: "1px solid transparent", minWidth: "170px" }}
                    onMouseEnter={e => { if (!isA) e.currentTarget.style.background = "#fff"; }}
                    onMouseLeave={e => { if (!isA) e.currentTarget.style.background = "transparent"; }}>
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg"
                      style={isA ? { background: "#003087", color: "#fff" } : { background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE" }}>
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: isA ? "#003087" : "#374151" }}>{item.title}</div>
                      {item.desc && <div className="text-xs mt-0.5 hidden sm:block" style={{ color: "#6B7280" }}>{item.desc}</div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="flex-1">
            <div className="ah-card rounded-2xl p-6 sm:p-8 lg:p-10" style={{ boxShadow: "0 4px 28px rgba(0,48,135,0.09)" }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl mb-5"
                style={{ background: "#EFF6FF", color: "#003087", border: "1px solid #BFDBFE" }}>
                {(() => { const Icon = items[tab].icon; return <Icon className="h-7 w-7" />; })()}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-5" style={{ color: "#111827" }}>
                {items[tab].title}
                {items[tab].desc && <span className="text-base font-normal ml-2" style={{ color: "#6B7280" }}>— {items[tab].desc}</span>}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {items[tab].subs.map((s, si) => (
                  <li key={si} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed" style={{ color: "#374151" }}>
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#059669" }} />
                    <span>{s}</span>
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

/* ═══════════════════════════════════════
   METRICS
═══════════════════════════════════════ */

function Metrics() {
  const items = [
    { v: 36, s: "+", d: 0, label: "Healthcare Clients" },
    { v: 98, s: "%", d: 0, label: "Clean Claim Rate" },
    { v: 25, s: "%", d: 0, label: "Increase in Collections" },
    { v: 15, s: " Days", d: 0, label: "Faster Reimbursement" },
    { v: 100, s: "%", d: 0, label: "HIPAA Aware" },
  ];
  return (
    <section className="py-14 sm:py-16 lg:py-20" style={{ background: "#003087" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-4">
          {items.map((m, idx) => (
            <div key={m.label} className={`text-center ${idx === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
              <div className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.85rem,4vw,2.875rem)", color: "#fff", lineHeight: 1 }}>
                <Counter to={m.v} suffix={m.s} decimals={m.d} />
              </div>
              <div className="mt-2 text-xs sm:text-sm font-medium" style={{ color: "rgba(255,255,255,0.70)", letterSpacing: "0.04em" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CASE STUDIES
═══════════════════════════════════════ */

function CaseStudies() {
  const stories = [
    { title: "Revenue Recovery Success", desc: "A physician group partnered with MedExodus to improve reimbursement efficiency and reduce aging receivables. Through proactive AR management and denial handling, the client experienced improved collections and smoother revenue cycle operations." },
    { title: "Denial Reduction Achievement", desc: "A specialty clinic struggling with recurring denials collaborated with MedExodus for denial management support. Our structured workflow and root-cause analysis helped improve claim acceptance rates and payment consistency." },
    { title: "Coding Accuracy Improvement", desc: "An outpatient healthcare facility required scalable coding support and quality assurance processes. MedExodus provided dedicated coding professionals, improving coding accuracy and reducing claim rejection risks." },
    { title: "Scalable Operational Support", desc: "A growing healthcare organization required reliable back-office operational support to manage increasing patient volume. MedExodus delivered scalable workflow support and operational efficiency improvements." },
  ];

  return (
    <section id="case-studies" className="py-16 sm:py-20 lg:py-24" style={{ background: "#fff", borderTop: "1px solid #E5E7EB" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SH eyebrow="Case Studies & Success Stories"
          title={<>Revenue Cycle Improvement for a <span className="text-gradient">Multi-Specialty Physician Group</span></>}
          sub="Your Organization Could Be Our Next Success Story. We become a trusted extension of your healthcare operations team — not just an outsourcing vendor." />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left panel */}
          <FadeUp className="lg:col-span-1">
            <div className="rounded-2xl p-6 sm:p-8 h-full" style={{ background: "#003087" }}>
              {[
                { label: "Client Challenge", items: ["High AR aging", "Delayed reimbursements", "Increased claim denials", "Workflow inefficiencies"], icon: AlertTriangle, iconColor: "#FCD34D" },
                { label: "MedExodus Solution", items: ["Daily AR follow-up workflows", "Denial analysis & appeals management", "Claims correction & resubmission", "Insurance payer escalation support", "Structured operational reporting"], icon: CheckCircle2, iconColor: "#6EE7B7" },
                { label: "Outcome", items: ["Significant reduction in AR aging", "Faster reimbursement turnaround", "Improved collections performance", "Better operational visibility", "Enhanced workflow efficiency"], icon: TrendingUp, iconColor: "#6EE7B7" },
              ].map(({ label, items, icon: Icon, iconColor }) => (
                <div key={label} className="mb-7 last:mb-0">
                  <h3 className="text-base sm:text-lg font-bold mb-3" style={{ color: "#7DD3FC" }}>{label}</h3>
                  <ul className="space-y-2">
                    {items.map(it => (
                      <li key={it} className="flex gap-2 text-sm" style={{ color: "rgba(255,255,255,0.82)" }}>
                        <Icon className="h-4 w-4 shrink-0 mt-0.5" style={{ color: iconColor }} />{it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right story cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 content-start">
            {stories.map((s, idx) => (
              <FadeUp key={idx} delay={idx * 70}>
                <div className="ah-card ah-card-hover rounded-xl p-5 sm:p-6 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shrink-0"
                      style={{ background: "#003087", color: "#fff" }}>{idx + 1}</span>
                    <h4 className="font-bold text-sm sm:text-base" style={{ color: "#111827" }}>{s.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{s.desc}</p>
                </div>
              </FadeUp>
            ))}
            <FadeUp delay={280} className="sm:col-span-2">
              <div className="rounded-xl p-5 sm:p-6 flex items-center gap-4 sm:gap-6" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl shrink-0" style={{ background: "#DBEAFE", color: "#003087" }}>
                  <Award className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1" style={{ color: "#111827" }}>And Many More Success Stories...</h4>
                  <p className="text-sm" style={{ color: "#4B5563" }}>MedExodus Healthcare Solutions proudly supports 36+ healthcare clients across the United States.</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA
═══════════════════════════════════════ */

function CTA() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24" style={{ background: "#F8F9FA", borderTop: "1px solid #E5E7EB" }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 md:p-16 lg:p-20 text-center"
            style={{ background: "#003087" }}>
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle at 80% 20%,rgba(255,255,255,0.07) 0%,transparent 55%),radial-gradient(circle at 20% 80%,rgba(255,255,255,0.04) 0%,transparent 55%)"
            }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: "rgba(255,255,255,0.12)", color: "#7DD3FC" }}>
                <TrendingUp className="h-4 w-4" /> Revenue Cycle Experts
              </div>
              <h2 className="font-bold leading-tight" style={{ color: "#fff", fontSize: "clamp(1.75rem,4vw,3rem)" }}>
                Ready to Optimize <br className="hidden sm:block" />Your Revenue Cycle?
              </h2>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
                Talk to an RCM strategist. We help your organization improve revenue performance, reimbursement efficiency, operational productivity, and coding accuracy.
              </p>
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a href="mailto:info@medexodus.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm font-bold rounded transition-all"
                  style={{ background: "#fff", color: "#003087" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#EFF6FF"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}>
                  Contact Us: info@medexodus.com <ArrowRight className="h-4 w-4" />
                </a>
                <a href="tel:+18005550187"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm font-bold rounded border-2 transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.background = "transparent"; }}>
                  <Phone className="h-4 w-4" /> +1 (800) 555-0187
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */

function Footer() {
  const cols = [
    { h: "Company", l: [{ name: "About", href: "#home" }, { name: "Leadership", href: "#contact" }, { name: "Careers", href: "#contact" }, { name: "Press", href: "#contact" }] },
    { h: "Services", l: [{ name: "Medical Coding", href: "#services" }, { name: "Medical Billing", href: "#services" }, { name: "Denial Mgmt", href: "#services" }, { name: "AR Follow-up", href: "#services" }] },
    { h: "Industries", l: [{ name: "Hospitals", href: "#industries" }, { name: "Physician Groups", href: "#industries" }, { name: "Clinics", href: "#industries" }, { name: "Ambulatory", href: "#industries" }] },
    { h: "Legal", l: [{ name: "Privacy Policy", href: "#contact" }, { name: "Terms of Service", href: "#contact" }, { name: "HIPAA Notice", href: "#contact" }, { name: "Security & SOC 2", href: "#contact" }] },
  ];
  return (
    <footer style={{ background: "#002060", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="MedExodus" className="h-8 sm:h-9 w-auto object-contain" />
              <span style={{ fontFamily: '"Space Grotesk","Inter",sans-serif', fontWeight: 600, fontSize: "1.05rem", color: "#fff", letterSpacing: "-0.025em" }}>
                Med<span style={{ color: "#1A8FE3" }}>Exodus</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.52)" }}>
              Enterprise Revenue Cycle Management for U.S. healthcare providers. Purpose-built for measurable financial outcomes.
            </p>
            <div className="mt-5 space-y-2.5">
              {[
                { i: Phone, t: "+1 (800) 555-0187" },
                { i: Mail, t: "info@medexodus.com" },
                { i: MapPin, t: "1250 Enterprise Way, Dallas, TX 75201" },
              ].map(({ i: Icon, t }) => (
                <div key={t} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.58)" }}>
                  <Icon className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#7DD3FC" }} />{t}
                </div>
              ))}
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.38)" }}>{c.h}</div>
              <ul className="space-y-2.5">
                {c.l.map(x => (
                  <li key={x.name}>
                    <a href={x.href} className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.62)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#7DD3FC"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.62)"}>
                      {x.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.32)" }}>
          <div>© {new Date().getFullYear()} MedExodus Healthcare Solutions Pvt Ltd. All rights reserved.</div>
          <div className="flex items-center gap-4 sm:gap-5">
            {["HIPAA Compliant", "SOC 2 Ready", "U.S. Operations"].map(t => (
              <span key={t} className="transition-colors cursor-default"
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.32)"}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   ROOT
═══════════════════════════════════════ */

function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#fff", color: "#111827" }}>
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
