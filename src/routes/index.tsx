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
      items: [
        { i: ShieldCheck, t: "Insurance Verification" },
        { i: BadgeCheck, t: "Prior Authorization" },
        { i: Users, t: "Patient Billing Support" },
        { i: StethoscopeIcon, t: "Provider Support" },
      ]
    },
    {
      title: "Middle-Office Solutions",
      items: [
        { i: FileCheck2, t: "Medical Coding" },
        { i: FileArchive, t: "Coding Audits" },
        { i: Search, t: "Documentation Review" },
        { i: TrendingUp, t: "HCC/Risk Adjustment Coding" },
        { i: CheckSquare, t: "Quality Assurance" },
        { i: ShieldCheck, t: "Credentialing Assistance" },
      ]
    },
    {
      title: "Back-Office Solutions",
      items: [
        { i: ClipboardList, t: "Medical Billing" },
        { i: Activity, t: "AR Follow-Up" },
        { i: AlertTriangle, t: "Denial Management" },
        { i: CreditCard, t: "Payment Posting" },
        { i: FileText, t: "Charge Entry" },
        { i: LineChart, t: "Claims Submission" },
        { i: Search, t: "Claims Scrubbing" },
        { i: FileText, t: "Appeals & Reprocessing" },
        { i: Building2, t: "Back-Office Support" },
        { i: Settings, t: "Revenue Cycle Optimization" },
      ]
    }
  ];
  
  const [openCat, setOpenCat] = useState<number>(0);

  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={<>Comprehensive End-to-End <span className="text-gradient">RCM Solutions</span></>}
          sub="With a strong commitment to quality, performance, and client satisfaction, our experienced professionals deliver efficient, results-driven solutions tailored to each client’s requirements."
        />
        <div className="mt-14 max-w-4xl space-y-4">
          {categories.map((cat, idx) => {
            const isOpen = openCat === idx;
            return (
              <div key={idx} className="glass-card rounded-2xl overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenCat(isOpen ? -1 : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cyan-glow)] transition-colors"
                >
                  <h3 className="font-display text-xl font-semibold text-white">{cat.title}</h3>
                  <ChevronRight className={`h-5 w-5 text-white/50 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                </button>
                <div 
                  className="transition-all duration-300 ease-in-out" 
                  style={{ maxHeight: isOpen ? "800px" : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden" }}
                >
                  <div className="p-6 pt-2 border-t border-white/5 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cat.items.map(({ i: Icon, t }, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[color:var(--cyan-glow)]/30 transition-colors">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--cyan-glow)]/10 text-[color:var(--cyan-glow)] shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-medium text-white/90">{t}</div>
                      </div>
                    ))}
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

function Specialties() {
  const items = [
    { i: Siren, t: "Emergency Department (ED)" },
    { i: Hospital, t: "IP-DRG" },
    { i: TrendingUp, t: "HCC / Risk Adjustment" },
    { i: Syringe, t: "Surgery" },
    { i: ClipboardList, t: "Evaluation & Management" },
    { i: Activity, t: "Physical Therapy" },
    { i: Brain, t: "Behavioral Health" },
    { i: Radiation, t: "Radiology" },
    { i: Pill, t: "Anesthesia" },
    { i: Bone, t: "Orthopedics" },
    { i: HeartPulse, t: "Cardiology" },
    { i: StethoscopeIcon, t: "Internal Medicine" },
    { i: ScanFace, t: "Gastroenterology" },
    { i: ShieldCheck, t: "Dermatology" },
    { i: Baby, t: "Pediatrics" },
    { i: Users, t: "Family Medicine" },
    { i: Microscope, t: "Pathology" },
    { i: AlertTriangle, t: "Multi-specialty Denials" },
  ];
  return (
    <section id="specialties" className="py-28 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Specialties"
          title={<>Specialties We Support in <span className="text-gradient">Coding</span></>}
          sub="Our experienced professionals are trained in US healthcare workflows, payer guidelines, and medical coding standards across a wide variety of specialties."
        />
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {items.map(({ i: Icon, t }, idx) => (
            <div key={idx} className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col items-center text-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--medical-blue)]/15 border border-[color:var(--medical-blue)]/30 text-[color:var(--cyan-glow)]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-display text-sm font-semibold text-white/90">{t}</div>
            </div>
          ))}
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
    { h: "Company", l: ["About", "Leadership", "Careers", "Press"] },
    { h: "Services", l: ["Medical Coding", "Billing", "Denial Mgmt", "AR Follow-up"] },
    { h: "Industries", l: ["Hospitals", "Physician Groups", "Clinics", "Ambulatory"] },
    { h: "Legal", l: ["Privacy", "Terms", "HIPAA Notice", "Security"] },
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
                  <li key={x}><a href="#" className="text-sm text-white/70 hover:text-[color:var(--cyan-glow)] transition-colors">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} MedExodus Healthcare Solutions Pvt Ltd. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>HIPAA Compliant</span><span>SOC 2 Ready</span><span>U.S. Operations</span>
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
        <Industries />
        <Metrics />
        <CaseStudies />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
