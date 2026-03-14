import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language";
import type { Lang } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Menu,
  PackageSearch,
  AlertTriangle,
  MessageSquare,
  Cloud,
  BarChart3,
  Brain,
  Clock,
  TrendingDown,
  TrendingUp,
  Zap,
  Check,
  X,
  Star,
  ArrowRight,
  Users,
  Sparkles,
  Globe,
  Phone,
  Mail,
  MapPin,
  Play,
  CircleCheck,
  Pill,
  Shield,
  Smartphone,
  GraduationCap,
  Headphones,
  Package,
  RefreshCw,
  Database,
  Tag,
  Bell,
  Heart,
  Repeat,
  Crown,
  Gift,
  Lock,
  Flame,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Wallet,
  Truck,
  Boxes,
  ShieldCheck,
  Bot,
  Send,
  Minimize2,
  Maximize2,
  RotateCcw,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import atsLogoPath from "@assets/1-_White_-_2D_1772477289066.jpg";
import { getActiveFestival, type Festival } from "@/lib/festivals";
import { useCountry } from "@/lib/geolocation";
import { usePricing } from "@/lib/pricing";

const WHATSAPP_BASE = "https://wa.me/923276393019?text=";
const WHATSAPP_LINK = `${WHATSAPP_BASE}${encodeURIComponent("Hi, I want demo of AI Pharmacy System")}`;

function getWhatsAppLink(message: string) {
  return `${WHATSAPP_BASE}${encodeURIComponent(message)}`;
}
const WHATSAPP_NUMBER = "+92 327 6393019";
const YOUTUBE_DEMO = "https://youtube.com/watch?v=1eyhilFoOgw";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function WhatsAppCTA({ text, className = "", size = "default" as "default" | "lg", message }: { text?: string; className?: string; size?: "default" | "lg"; message?: string }) {
  const { t } = useLanguage();
  const label = text || t("hero.bookDemo");
  const link = message ? getWhatsAppLink(message) : WHATSAPP_LINK;
  return (
    <Button asChild size={size} className={`bg-emerald-600 text-white border-emerald-700 gap-2 ${className}`} data-testid="button-book-demo">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <SiWhatsapp className="h-5 w-5" />
        {label}
      </a>
    </Button>
  );
}

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const { country } = useCountry();
  const secondLang = country.secondLang;

  useEffect(() => {
    if (lang !== "en" && (!secondLang || secondLang.code !== lang)) {
      setLang("en");
    }
  }, [country.code]);

  return (
    <div className="flex items-center gap-1 bg-muted/60 rounded-full p-0.5" data-testid="language-switcher">
      <button
        onClick={() => setLang("en")}
        className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
          lang === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        data-testid="button-lang-en"
      >
        EN
      </button>
      {secondLang && (
        <button
          onClick={() => setLang(secondLang.code as Lang)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
            lang === secondLang.code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-testid="button-lang-local"
        >
          {secondLang.label}
        </button>
      )}
    </div>
  );
}

function CountdownTimer({ festival }: { festival: Festival }) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    let endDate: Date;
    if (festival.endMonth < festival.startMonth) {
      endDate = new Date(year + 1, festival.endMonth - 1, festival.endDay, 23, 59, 59, 999);
    } else {
      endDate = new Date(year, festival.endMonth - 1, festival.endDay, 23, 59, 59, 999);
    }
    const endTime = endDate.getTime();

    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [festival]);

  const units = [
    { label: t("pricing.days"), value: timeLeft.days },
    { label: t("pricing.hours"), value: timeLeft.hours },
    { label: t("pricing.min"), value: timeLeft.minutes },
    { label: t("pricing.sec"), value: timeLeft.seconds },
  ];

  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-4 p-3 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 border" data-testid="countdown-timer">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-1.5 sm:gap-4">
          <div className="flex flex-col items-center">
            <motion.div
              key={u.value}
              initial={{ scale: 1.1, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <div className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground rounded-lg sm:rounded-xl w-11 h-[3.25rem] sm:w-[4.5rem] sm:h-20 flex items-center justify-center text-lg sm:text-3xl font-extrabold tabular-nums shadow-lg shadow-primary/20">
                {String(u.value).padStart(2, "0")}
              </div>
              <div className="absolute inset-x-0 top-1/2 h-px bg-primary-foreground/10" />
            </motion.div>
            <span className="text-[9px] sm:text-xs text-muted-foreground mt-2 font-semibold uppercase tracking-widest">{u.label}</span>
          </div>
          {i < units.length - 1 && (
            <div className="flex flex-col gap-1.5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const links = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.demo"), href: "#video" },
    { label: t("nav.faq"), href: "#faq" },
    { label: t("nav.contact"), href: "#footer" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <a href="#" className="flex items-center gap-2.5" data-testid="link-logo">
            <img src={atsLogoPath} alt="Anas Tech Services" className="h-10 w-10 sm:h-12 sm:w-12 rounded-md object-contain" loading="eager" />
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-sm sm:text-base leading-tight tracking-tight">Anas Tech Services</span>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight tracking-wide">{t("nav.subtitle")}</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="px-3 py-2 text-sm text-muted-foreground rounded-md transition-colors" data-testid={`link-nav-${l.label.toLowerCase()}`}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <div className="hidden sm:block">
              <WhatsAppCTA text={t("nav.bookDemo")} message="Hi, I want to book a free demo of the AI Pharmacy System." />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-6">
                <div className="flex flex-col gap-3 mt-8">
                  {links.map((l) => (
                    <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-medium py-2 border-b">
                      {l.label}
                    </a>
                  ))}
                  <div className="mt-4">
                    <WhatsAppCTA text={t("nav.bookDemo")} message="Hi, I want to book a free demo of the AI Pharmacy System." />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const { t } = useLanguage();


  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/90 via-white to-emerald-50/40" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[5%] w-80 h-80 bg-purple-300/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 right-[5%] w-96 h-96 bg-emerald-300/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-violet-200/15 rounded-full blur-[130px]"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: "12%", left: "8%", delay: 0, size: "w-3 h-3" },
          { top: "20%", left: "85%", delay: 1.5, size: "w-2 h-2" },
          { top: "55%", left: "12%", delay: 3, size: "w-2.5 h-2.5" },
          { top: "65%", left: "90%", delay: 0.8, size: "w-2 h-2" },
          { top: "35%", left: "92%", delay: 2.2, size: "w-3 h-3" },
          { top: "80%", left: "20%", delay: 4, size: "w-2 h-2" },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className={`absolute ${dot.size} rounded-full bg-gradient-to-br from-purple-400/30 to-emerald-400/30`}
            style={{ top: dot.top, left: dot.left }}
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerSlow}>
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200/60 shadow-sm shadow-purple-500/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-700 to-emerald-600 bg-clip-text text-transparent">
                {t("hero.badge")}
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] mb-7"
          >
            <span className="text-gray-900">{t("hero.title1")}</span>
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              >
                <motion.path
                  d="M2 8 C50 2, 100 2, 150 6 S250 10, 298 4"
                  stroke="url(#hero-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="hero-underline" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9333ea" />
                    <stop offset="1" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <WhatsAppCTA size="lg" text={t("hero.bookDemo")} message="Hi, I'm interested in the AI Pharmacy System.
I'd like to book a free demo.
Please share the details." />
            <Button asChild size="lg" variant="outline" className="gap-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all" data-testid="button-pricing-plans">
              <a href="#pricing">
                <Sparkles className="h-4 w-4" />
                {t("hero.watchDemo")}
              </a>
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-14">
            {[
              { icon: GraduationCap, text: t("hero.freeTraining") },
              { icon: Headphones, text: t("hero.freeSupport") },
              { icon: Smartphone, text: t("hero.worksOnMobile") },
              { icon: Shield, text: t("hero.secureCloud") },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-gray-600">
                <CircleCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                {item.text}
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      <ClientsMarquee />
    </section>
  );
}

function ClientsMarquee() {
  const { t } = useLanguage();

  const pharmacies = [
    "Al-Shifa Pharmacy", "Medcare Pharmacy", "City Care Pharmacy", "LifeLine Pharmacy",
    "Prime Health Pharmacy", "Star Medicos", "National Pharmacy", "Health First Pharmacy",
    "MedPlus Pharmacy", "Care Plus Pharmacy", "Wellness Pharmacy", "Family Pharmacy",
    "Guardian Pharmacy", "MedZone Pharmacy", "Green Cross Pharmacy", "Royal Pharmacy",
    "SafeMed Pharmacy", "Allied Pharmacy",
  ];

  return (
    <div className="relative mt-14 sm:mt-20 pb-2" data-testid="clients-marquee">
      <div className="text-center mb-5 sm:mb-6 px-4">
        <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide">
          {t("hero.ourClients")}
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-2 sm:gap-3 py-1 will-change-transform">
          {[...pharmacies, ...pharmacies].map((name, i) => (
            <div
              key={`c-${i}`}
              className="shrink-0 px-4 py-2 rounded-full border border-border/50 bg-muted/40"
              data-testid={`client-${i}`}
            >
              <span className="text-[11px] sm:text-xs font-medium text-muted-foreground whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoSection() {
  const { t } = useLanguage();
  const { country, loading } = useCountry();

  const videoId = !loading && country.code === "PK"
    ? "yqk24mAuvbg"
    : "FJDTshWWO3I";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;

  return (
    <section id="video" className="py-14 sm:py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
            {t("video.title1")}{" "}
            <span className="text-primary">{t("video.title2")}</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={scaleIn}
        >
          <div className="relative rounded-2xl overflow-hidden border bg-card shadow-xl aspect-video" data-testid="video-container">
            {loading ? (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/50">
                <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <iframe
                key={videoId}
                src={embedUrl}
                title="AI Pharmacy System Demo"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-sm text-muted-foreground">
            {t("video.subtitle")}
          </p>
          <WhatsAppCTA text={t("video.bookDemo")} message="Hi, I watched the demo video of the AI Pharmacy System.
I'm interested in seeing a live demo.
Please schedule one for me." />
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const { t } = useLanguage();
  const problems = [
    { icon: Clock, title: t("problem.1.title"), text: t("problem.1.text"), stat: t("problem.1.stat"), num: "01" },
    { icon: AlertTriangle, title: t("problem.2.title"), text: t("problem.2.text"), stat: t("problem.2.stat"), num: "02" },
    { icon: PackageSearch, title: t("problem.3.title"), text: t("problem.3.text"), stat: t("problem.3.stat"), num: "03" },
    { icon: Users, title: t("problem.4.title"), text: t("problem.4.text"), stat: t("problem.4.stat"), num: "04" },
    { icon: MessageSquare, title: t("problem.5.title"), text: t("problem.5.text"), stat: t("problem.5.stat"), num: "05" },
    { icon: TrendingDown, title: t("problem.6.title"), text: t("problem.6.text"), stat: t("problem.6.stat"), num: "06" },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/80 via-white to-purple-50/50" />
      <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] bg-emerald-100/15 rounded-full blur-[130px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.2em] font-semibold bg-purple-100 border border-purple-200 text-purple-700 px-4 py-2 rounded-full">
              <AlertTriangle className="h-3.5 w-3.5" />
              {t("problem.badge")}
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-foreground">
            {t("problem.title1")}
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">{t("problem.title2")}</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("problem.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {problems.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group relative rounded-2xl p-6 bg-white backdrop-blur-sm border border-purple-100 hover:border-purple-300:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5:bg-white/[0.07] hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              data-testid={`text-problem-${i}`}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-6 -right-6 text-[80px] font-black text-purple-500/[0.04] leading-none select-none">{p.num}</div>

              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-emerald-50 border border-purple-200/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
                  <p.icon className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-foreground text-[15px] tracking-tight">{p.title}</h3>
                  </div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">{p.stat}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex flex-col items-center gap-5 bg-gradient-to-r from-purple-50 to-emerald-50 backdrop-blur-sm rounded-2xl border border-purple-200 px-10 py-8">
            <p className="text-lg sm:text-xl font-bold text-foreground">
              {t("problem.cta1")} <span className="bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">{t("problem.cta2")}</span>
            </p>
            <WhatsAppCTA text={t("problem.ctaButton")} message="Hi, I'm facing pharmacy management challenges.
I want to see how the AI Pharmacy System can help.
Please share more info." />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const { t } = useLanguage();
  const features = [
    { icon: Zap, title: t("solution.f1.title"), desc: t("solution.f1.desc"), color: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
    { icon: PackageSearch, title: t("solution.f2.title"), desc: t("solution.f2.desc"), color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
    { icon: Bell, title: t("solution.f3.title"), desc: t("solution.f3.desc"), color: "from-red-500 to-rose-500", bg: "bg-red-50" },
    { icon: BarChart3, title: t("solution.f4.title"), desc: t("solution.f4.desc"), color: "from-violet-500 to-purple-500", bg: "bg-violet-50" },
    { icon: Users, title: t("solution.f5.title"), desc: t("solution.f5.desc"), color: "from-purple-500 to-violet-500", bg: "bg-purple-50" },
    { icon: MessageSquare, title: t("solution.f6.title"), desc: t("solution.f6.desc"), color: "from-emerald-500 to-green-500", bg: "bg-emerald-50" },
    { icon: Brain, title: t("solution.f7.title"), desc: t("solution.f7.desc"), color: "from-fuchsia-500 to-pink-500", bg: "bg-fuchsia-50", ai: true },
    { icon: Cloud, title: t("solution.f8.title"), desc: t("solution.f8.desc"), color: "from-green-500 to-emerald-500", bg: "bg-green-50" },
    { icon: Lock, title: t("solution.f9.title"), desc: t("solution.f9.desc"), color: "from-slate-600 to-slate-800", bg: "bg-slate-100" },
    { icon: TrendingUp, title: t("solution.f10.title"), desc: t("solution.f10.desc"), color: "from-teal-500 to-emerald-500", bg: "bg-teal-50" },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50/80 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block mb-5 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              {t("solution.badge")}
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            {t("solution.title1")}{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">{t("solution.title2")}</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("solution.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full" data-testid={`text-feature-${i}`}>
                {"ai" in f && f.ai && (
                  <div className="absolute -top-2.5 right-3">
                    <span className="text-[8px] font-bold text-white bg-gradient-to-r from-fuchsia-500 to-pink-500 px-2 py-0.5 rounded-full shadow-sm">
                      {t("solution.aiPowered")}
                    </span>
                  </div>
                )}
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-sm mb-1.5 tracking-tight">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <WhatsAppCTA text={t("solution.ctaButton")} message="Hi, I'm interested in the AI Pharmacy System features.
I'd like to learn more about the solution.
Please share details." />
        </motion.div>
      </div>
    </section>
  );
}

function WhatsAppPhoneMockup() {
  const { t } = useLanguage();
  const chatMessages = [
    { type: "received", text: "Assalam o Alaikum! City Pharmacy mein khush amdeed. Apki khareedari ka shukriya! Bill #1247", time: "10:30 AM" },
    { type: "sent", text: "Shukriya! Dawai kab leni hai?", time: "10:32 AM" },
    { type: "received", text: "Panadol: 1 tablet har 8 ghante baad khana khane ke baad.\nHum apko refill ka waqt yaad karwa dein ge!", time: "10:33 AM" },
    { type: "received", text: "FLASH SALE! Is hafte tamam vitamins par 15% OFF. Ye message counter par dikhayein.", time: "11:00 AM", isPromo: true },
    { type: "sent", text: "Bohat acha! Kal aata hun", time: "11:02 AM" },
    { type: "received", text: "Yaad-dehani: Apki Amlodipine ki refill 3 din mein due hai. Abhi order karein ya pharmacy visit karein!", time: "2:00 PM", isReminder: true },
  ];

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]" data-testid="whatsapp-phone-mockup">
      <div className="rounded-[2.5rem] border-[3px] border-gray-800 bg-gray-900 shadow-2xl shadow-black/25 overflow-hidden">
        <div className="relative bg-gray-900 pt-2 pb-0">
          <div className="mx-auto w-28 h-6 bg-gray-800 rounded-b-xl" />
          <div className="flex items-center justify-between px-4 pt-1 pb-0.5">
            <span className="text-[9px] text-gray-400 font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                <div className="w-[3px] h-[6px] bg-gray-400 rounded-[1px]" />
                <div className="w-[3px] h-[8px] bg-gray-400 rounded-[1px]" />
                <div className="w-[3px] h-[10px] bg-gray-400 rounded-[1px]" />
                <div className="w-[3px] h-[12px] bg-gray-500 rounded-[1px]" />
              </div>
              <div className="w-5 h-[9px] border border-gray-400 rounded-[2px] relative ml-0.5">
                <div className="absolute inset-[1px] right-[3px] bg-gray-400 rounded-[1px]" />
                <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-gray-400 rounded-r-[1px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#075e54] px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <svg className="h-3.5 w-3.5 text-white/80 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            <div className="h-9 w-9 rounded-full bg-gray-400/30 flex items-center justify-center shrink-0">
              <Pill className="h-4 w-4 text-white/90" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold leading-tight truncate">City Pharmacy</p>
              <p className="text-emerald-200/80 text-[10px]">online</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
            </div>
          </div>
        </div>

        <div className="bg-[#ece5dd] h-[370px] sm:h-[400px] overflow-y-auto px-2.5 py-3 space-y-1.5 scrollbar-hide" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
          <div className="text-center mb-2">
            <span className="inline-block bg-white/80 text-[9px] text-gray-500 px-3 py-1 rounded-lg shadow-sm font-medium">TODAY</span>
          </div>

          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.25 }}
              className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-lg px-2 py-1.5 shadow-sm relative ${
                  msg.type === "sent"
                    ? "bg-[#d9fdd3] rounded-tr-none"
                    : "bg-white rounded-tl-none"
                }`}
                data-testid={`chat-message-${i}`}
              >
                {msg.isPromo && (
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[7px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">OFFER</span>
                  </div>
                )}
                {msg.isReminder && (
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[7px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">REMINDER</span>
                  </div>
                )}
                <p className="text-[11px] leading-[1.45] text-gray-900 whitespace-pre-line">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 -mb-0.5">
                  <span className="text-[8px] text-gray-500/80">{msg.time}</span>
                  {msg.type === "sent" && (
                    <svg className="h-[11px] w-[16px] text-[#53bdeb]" viewBox="0 0 16 11" fill="none">
                      <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.136.47.47 0 0 0-.343.153l-.875.894a.518.518 0 0 0 .005.765l3.32 3.245c.095.093.218.15.352.15a.478.478 0 0 0 .37-.188l7.034-8.745a.52.52 0 0 0-.104-.721l-.143-.112z" fill="currentColor" />
                      <path d="M15.229.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.134-.942 1.166 1.79 1.752c.095.093.218.15.352.15a.478.478 0 0 0 .37-.188l7.034-8.745a.52.52 0 0 0-.104-.721l-.143-.112-.282.12z" fill="currentColor" />
                    </svg>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#f0f0f0] px-2 py-1.5 flex items-center gap-1.5">
          <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0">
            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
          </div>
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-2">
            <span className="text-[11px] text-gray-400 flex-1">Type a message</span>
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
          </div>
          <div className="h-8 w-8 rounded-full bg-[#00a884] flex items-center justify-center shrink-0">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
          </div>
        </div>

        <div className="h-1 bg-gray-900 flex items-center justify-center pt-1 pb-3">
          <div className="w-28 h-1 bg-gray-600 rounded-full" />
        </div>
      </div>

      <div className="absolute -top-3 -right-3 animate-float-1">
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 px-3 py-2 flex items-center gap-2" data-testid="card-whatsapp-feature-0">
          <div className="h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <Tag className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <span className="text-[10px] font-semibold whitespace-nowrap">{t("whatsapp.float1")}</span>
        </div>
      </div>

      <div className="absolute top-24 -left-4 sm:-left-8 animate-float-2">
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 px-3 py-2 flex items-center gap-2" data-testid="card-whatsapp-feature-1">
          <div className="h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <Bell className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <span className="text-[10px] font-semibold whitespace-nowrap">{t("whatsapp.float2")}</span>
        </div>
      </div>

      <div className="absolute bottom-28 -right-4 sm:-right-6 animate-float-3">
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 px-3 py-2 flex items-center gap-2" data-testid="card-whatsapp-feature-2">
          <div className="h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <Heart className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <span className="text-[10px] font-semibold whitespace-nowrap">{t("whatsapp.float3")}</span>
        </div>
      </div>

      <div className="absolute bottom-10 -left-2 sm:-left-6 animate-float-4">
        <div className="bg-white rounded-xl shadow-lg border border-emerald-100 px-3 py-2 flex items-center gap-2" data-testid="card-whatsapp-feature-3">
          <div className="h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <span className="text-[10px] font-semibold whitespace-nowrap">{t("whatsapp.float4")}</span>
        </div>
      </div>
    </div>
  );
}

function WhatsAppMarketingSection() {
  const { t } = useLanguage();

  const useCases = [
    {
      icon: Tag,
      color: "bg-emerald-500",
      lightBg: "bg-emerald-50",
      textColor: "text-emerald-700",
      border: "border-emerald-200",
      title: t("whatsapp.float1"),
      desc: t("whatsapp.f1desc"),
      preview: "🎁 City Pharmacy: 20% OFF Vitamins today only! Show this msg at counter.",
    },
    {
      icon: Bell,
      color: "bg-amber-500",
      lightBg: "bg-amber-50",
      textColor: "text-amber-700",
      border: "border-amber-200",
      title: t("whatsapp.float2"),
      desc: t("whatsapp.f2desc"),
      preview: "⏰ Hi Ahmed! Your Amlodipine refill is due in 3 days. Visit or order now.",
    },
    {
      icon: Heart,
      color: "bg-pink-500",
      lightBg: "bg-pink-50",
      textColor: "text-pink-700",
      border: "border-pink-200",
      title: t("whatsapp.float3"),
      desc: t("whatsapp.f3desc"),
      preview: "💚 Shukriya! Your order #1247 is ready. We hope you feel better soon! 🙏",
    },
    {
      icon: Repeat,
      color: "bg-violet-500",
      lightBg: "bg-violet-50",
      textColor: "text-violet-700",
      border: "border-violet-200",
      title: t("whatsapp.float4"),
      desc: t("whatsapp.f4desc"),
      preview: "🔄 We miss you! It's been 30 days. Come back for 15% OFF your next purchase.",
    },
  ];

  return (
    <section id="whatsapp" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/40">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-200/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <span className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest" data-testid="badge-automation-suite">
              <SiWhatsapp className="h-3.5 w-3.5 text-[#25D366]" />
              {t("whatsapp.badge")}
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight" data-testid="heading-whatsapp">
            <span className="bg-gradient-to-r from-[#128C7E] to-[#25D366] bg-clip-text text-transparent">{t("whatsapp.title")}</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-whatsapp-subtitle">
            {t("whatsapp.subtitle")}
          </motion.p>
        </motion.div>

        {/* Main 2-col layout */}
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-10 xl:gap-16 items-start">

          {/* LEFT: Use case rows */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-4"
          >
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`group flex gap-4 bg-white rounded-2xl border ${uc.border} p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-default`}
                data-testid={`card-whatsapp-feature-${i}`}
              >
                {/* Icon */}
                <div className={`h-11 w-11 rounded-xl ${uc.color} flex items-center justify-center shrink-0 mt-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <uc.icon className="h-5 w-5 text-white" />
                </div>

                {/* Text + preview bubble */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-sm mb-0.5">{uc.title}</h3>
                  <p className="text-muted-foreground text-[12px] mb-3 leading-relaxed">{uc.desc}</p>
                  {/* Mini WhatsApp message preview */}
                  <div className={`${uc.lightBg} ${uc.border} border rounded-xl rounded-tl-none px-3 py-2 inline-block max-w-full`}>
                    <p className={`text-[11px] font-medium ${uc.textColor} leading-snug`}>{uc.preview}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[9px] text-gray-400">just now</span>
                      <svg className="h-[10px] w-[14px] text-[#53bdeb]" viewBox="0 0 16 11" fill="none">
                        <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.136.47.47 0 0 0-.343.153l-.875.894a.518.518 0 0 0 .005.765l3.32 3.245c.095.093.218.15.352.15a.478.478 0 0 0 .37-.188l7.034-8.745a.52.52 0 0 0-.104-.721l-.143-.112z" fill="currentColor"/>
                        <path d="M15.229.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.134-.942 1.166 1.79 1.752c.095.093.218.15.352.15a.478.478 0 0 0 .37-.188l7.034-8.745a.52.52 0 0 0-.104-.721l-.143-.112-.282.12z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stats row */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 pt-2">
              {[
                { val: "3×", label: t("whatsapp.stat1"), color: "text-emerald-600" },
                { val: "80%", label: t("whatsapp.stat2"), color: "text-amber-600" },
                { val: "Zero", label: t("whatsapp.stat3"), color: "text-violet-600" },
              ].map((s, i) => (
                <div key={i} className="text-center bg-white rounded-2xl border border-border/60 py-4 shadow-sm" data-testid={`stat-whatsapp-${i}`}>
                  <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] text-muted-foreground font-semibold mt-0.5 leading-tight px-1">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="pt-2">
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#22c35e] text-white font-bold text-base h-14 shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:scale-[1.02] transition-all duration-200 border-0"
                data-testid="button-start-automating"
                asChild
              >
                <a href={getWhatsAppLink("Hi, I want to automate my pharmacy with WhatsApp Marketing.\nI'm interested in the WhatsApp automation features.\nPlease share the details.")} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="h-5 w-5 mr-2.5" />
                  {t("whatsapp.ctaButton")}
                </a>
              </Button>
              <p className="text-center text-muted-foreground/60 text-[11px] mt-2.5">{t("whatsapp.noApiNote")}</p>
            </motion.div>
          </motion.div>

          {/* RIGHT: Phone mockup — sticky */}
          <motion.div
            className="hidden lg:flex justify-center lg:sticky lg:top-24 self-start"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 -m-10 bg-[#25D366]/10 rounded-full blur-3xl" />
              <WhatsAppPhoneMockup />
              {/* "Automated" badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#25D366] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5 z-10">
                <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Live Automation Active
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OwnerFeatureIllustration({ type }: { type: string }) {
  switch (type) {
    case "staff":
      return (
        <div className="relative w-full h-36 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center"><span className="text-[9px] text-white font-bold">AH</span></div>
              <div className="h-1.5 w-10 bg-purple-200 rounded-full" />
            </div>
            <div className="flex flex-col items-center gap-1 -mt-4">
              <div className="h-10 w-10 rounded-full bg-violet-500 flex items-center justify-center"><span className="text-[10px] text-white font-bold">SK</span></div>
              <div className="h-1.5 w-12 bg-violet-200 rounded-full" />
              <div className="text-[7px] text-purple-500 font-bold">ADMIN</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center"><span className="text-[9px] text-white font-bold">MR</span></div>
              <div className="h-1.5 w-10 bg-violet-200 rounded-full" />
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="h-1 w-3 bg-purple-300 rounded-full" />
            <div className="h-1 w-6 bg-violet-400 rounded-full" />
            <div className="h-1 w-3 bg-violet-300 rounded-full" />
          </div>
        </div>
      );
    case "salary":
      return (
        <div className="relative w-full h-36 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6">
            <div className="w-full flex items-center justify-between bg-white/70 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center"><span className="text-[7px] text-white font-bold">AH</span></div>
                <div className="h-1.5 w-14 bg-emerald-200 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-emerald-600">35,000</span>
            </div>
            <div className="w-full flex items-center justify-between bg-white/70 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center"><span className="text-[7px] text-white font-bold">SK</span></div>
                <div className="h-1.5 w-14 bg-teal-200 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-teal-600">28,000</span>
            </div>
            <div className="w-full flex items-center justify-between bg-white/70 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center"><span className="text-[7px] text-white font-bold">MR</span></div>
                <div className="h-1.5 w-14 bg-emerald-200 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-emerald-600">22,000</span>
            </div>
          </div>
        </div>
      );
    case "profit":
      return (
        <div className="relative w-full h-36 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-[8px] font-bold text-amber-700">REVENUE</span>
              <span className="text-[8px] font-bold text-emerald-600">↑ 24%</span>
            </div>
            <div className="w-full flex items-end gap-1 h-16">
              {[30, 45, 35, 55, 50, 70, 65, 80, 72, 90, 85, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-amber-500 to-orange-400" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="w-full flex justify-between mt-1.5 px-0.5">
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
                <span key={i} className="text-[5px] text-amber-500">{m}</span>
              ))}
            </div>
          </div>
        </div>
      );
    case "ai":
      return (
        <div className="relative w-full h-36 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5">
            <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 w-full">
              <Sparkles className="h-3.5 w-3.5 text-purple-500 shrink-0" />
              <span className="text-[8px] text-purple-700 font-medium">Panadol stock running low — reorder now</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 w-full">
              <TrendingUp className="h-3.5 w-3.5 text-fuchsia-500 shrink-0" />
              <span className="text-[8px] text-fuchsia-700 font-medium">Revenue up 18% vs last month</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 w-full">
              <Brain className="h-3.5 w-3.5 text-violet-500 shrink-0" />
              <span className="text-[8px] text-violet-700 font-medium">Vitamin D demand predicted +32%</span>
            </div>
          </div>
        </div>
      );
    case "supplier":
      return (
        <div className="relative w-full h-36 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-5">
            <div className="w-full flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-emerald-100 flex items-center justify-center">
                  <Truck className="h-3 w-3 text-emerald-600" />
                </div>
                <span className="text-[8px] font-semibold">MedPharma Co.</span>
              </div>
              <span className="text-[7px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Delivered</span>
            </div>
            <div className="w-full flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-amber-100 flex items-center justify-center">
                  <Truck className="h-3 w-3 text-amber-600" />
                </div>
                <span className="text-[8px] font-semibold">HealthPlus Ltd.</span>
              </div>
              <span className="text-[7px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">In Transit</span>
            </div>
            <div className="w-full flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-green-100 flex items-center justify-center">
                  <Truck className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-[8px] font-semibold">PharmaLink</span>
              </div>
              <span className="text-[7px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Pending</span>
            </div>
          </div>
        </div>
      );
    case "reports":
      return (
        <div className="relative w-full h-36 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 gap-2">
            <div className="w-full flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-end gap-1 h-14">
                  {[60, 40, 75, 55, 85, 65].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i % 2 === 0 ? 'rgb(244,63,94)' : 'rgb(251,146,172)' }} />
                  ))}
                </div>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-rose-400 flex items-center justify-center relative">
                <span className="text-[10px] font-bold text-rose-600">87%</span>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
            </div>
            <div className="w-full flex gap-2">
              <div className="flex-1 h-2 bg-rose-200 rounded-full"><div className="h-full w-[87%] bg-rose-500 rounded-full" /></div>
              <div className="flex-1 h-2 bg-pink-200 rounded-full"><div className="h-full w-[62%] bg-pink-500 rounded-full" /></div>
            </div>
          </div>
        </div>
      );
    case "inventory":
      return (
        <div className="relative w-full h-36 bg-gradient-to-br from-lime-50 to-green-50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-5">
            {[
              { name: "Panadol 500mg", qty: "12", level: 15, alert: true },
              { name: "Vitamin D3", qty: "248", level: 85, alert: false },
              { name: "Amoxicillin", qty: "45", level: 35, alert: true },
            ].map((item, i) => (
              <div key={i} className="w-full bg-white/60 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Boxes className="h-3 w-3 text-lime-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-semibold truncate">{item.name}</span>
                    <span className="text-[7px] font-bold text-muted-foreground">{item.qty} pcs</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full mt-0.5">
                    <div className={`h-full rounded-full ${item.alert ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${item.level}%` }} />
                  </div>
                </div>
                {item.alert && <AlertTriangle className="h-3 w-3 text-red-500 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      );
    case "security":
      return (
        <div className="relative w-full h-36 bg-gradient-to-br from-slate-50 to-zinc-100 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-bold text-emerald-600">ENCRYPTED & SECURE</span>
            </div>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-1.5 w-5 bg-slate-300 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      );
    case "mobile":
      return (
        <div className="relative w-full h-36 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-28 bg-white rounded-xl border-2 border-slate-300 shadow-lg flex flex-col overflow-hidden">
              <div className="h-2 bg-purple-500 w-full" />
              <div className="flex-1 p-1.5 flex flex-col gap-1">
                <div className="h-1.5 w-10 bg-slate-200 rounded-full" />
                <div className="flex gap-1 mt-0.5">
                  <div className="h-5 w-5 rounded bg-purple-100 flex items-center justify-center"><BarChart3 className="h-2.5 w-2.5 text-purple-500" /></div>
                  <div className="h-5 w-5 rounded bg-emerald-100 flex items-center justify-center"><TrendingUp className="h-2.5 w-2.5 text-emerald-500" /></div>
                </div>
                <div className="h-1 w-8 bg-slate-200 rounded-full" />
                <div className="flex-1 bg-purple-50 rounded flex items-end gap-0.5 p-0.5">
                  {[40, 60, 45, 75, 55].map((h, i) => (
                    <div key={i} className="flex-1 bg-purple-400 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="h-1 w-6 bg-slate-300 rounded-full mx-auto mb-1" />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function OwnerControlSection() {
  const { t } = useLanguage();
  const features = [
    { type: "staff", icon: Users, title: t("owner.f1"), desc: t("owner.f1.desc") },
    { type: "salary", icon: Wallet, title: t("owner.f2"), desc: t("owner.f2.desc") },
    { type: "profit", icon: TrendingUp, title: t("owner.f3"), desc: t("owner.f3.desc") },
    { type: "ai", icon: Brain, title: t("owner.f4"), desc: t("owner.f4.desc") },
    { type: "supplier", icon: Truck, title: t("owner.f5"), desc: t("owner.f5.desc") },
    { type: "reports", icon: BarChart3, title: t("owner.f6"), desc: t("owner.f6.desc") },
    { type: "inventory", icon: Boxes, title: t("owner.f7"), desc: t("owner.f7.desc") },
    { type: "security", icon: ShieldCheck, title: t("owner.f8"), desc: t("owner.f8.desc") },
    { type: "mobile", icon: Smartphone, title: t("owner.f9"), desc: t("owner.f9.desc") },
  ];

  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block mb-5 text-xs uppercase tracking-[0.2em] text-purple-600 font-semibold" data-testid="badge-owner-system">
              {t("owner.badge")}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
            data-testid="heading-owner-control"
          >
            {t("owner.title1")}
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-emerald-500 bg-clip-text text-transparent">
              {t("owner.title2")}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            data-testid="text-owner-subtitle"
          >
            {t("owner.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              data-testid={`card-owner-feature-${i}`}
            >
              <div className="p-1.5 pb-0">
                <OwnerFeatureIllustration type={f.type} />
              </div>
              <div className="p-6 pt-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-purple-100:bg-purple-950/60 transition-colors duration-300">
                    <f.icon className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-base font-bold tracking-tight">{f.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button className="bg-purple-600 hover:bg-purple-700:bg-purple-600 text-white font-semibold rounded-xl px-8 py-3.5 h-auto text-base hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/20" data-testid="button-owner-dashboard" asChild>
            <a href={getWhatsAppLink("Hi, I want full control over my pharmacy operations.\nI'm interested in the Owner Dashboard features.\nPlease share the details.")} target="_blank" rel="noopener noreferrer">
              {t("owner.ctaButton")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4 tracking-wide">{t("owner.ctaSubtext")}</p>
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const { t } = useLanguage();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const features = [
    { key: "r1", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
    { key: "r2", icon: ShieldCheck, color: "text-red-500", bg: "bg-red-500/10" },
    { key: "r3", icon: Boxes, color: "text-blue-500", bg: "bg-blue-500/10" },
    { key: "r4", icon: Bell, color: "text-orange-500", bg: "bg-orange-500/10" },
    { key: "r5", icon: Bot, color: "text-purple-500", bg: "bg-purple-500/10" },
    { key: "r6", icon: BarChart3, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { key: "r7", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { key: "r8", icon: Cloud, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { key: "r9", icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
    { key: "r10", icon: Lock, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { key: "r11", icon: Crown, color: "text-violet-500", bg: "bg-violet-500/10" },
    { key: "r12", icon: Headphones, color: "text-teal-500", bg: "bg-teal-500/10" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
            {t("comparison.title1")}{" "}
            <span className="text-primary">{t("comparison.title2")}</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {t("comparison.subtitle")}
          </motion.p>
        </motion.div>

        <div className="hidden sm:block">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="overflow-hidden bg-background" data-testid="comparison-table-desktop">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2">
                    <TableHead className="min-w-[200px] font-bold text-sm py-4">{t("comparison.feature")}</TableHead>
                    <TableHead className="text-center font-bold text-sm py-4 text-destructive/80">{t("comparison.manual")}</TableHead>
                    <TableHead className="text-center font-bold text-sm py-4 text-amber-600">{t("comparison.oldSoftware")}</TableHead>
                    <TableHead className="text-center font-bold text-sm py-4 text-primary bg-primary/5">{t("comparison.ourSystem")}</TableHead>
                    <TableHead className="w-[50px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((f, i) => {
                    const Icon = f.icon;
                    const isExpanded = expandedRows.has(i);
                    return (
                      <TableRow
                        key={f.key}
                        className="group cursor-pointer hover:bg-muted/40 transition-colors"
                        onClick={() => toggleRow(i)}
                        data-testid={`comparison-row-${f.key}`}
                      >
                        <TableCell className="py-3">
                          <div className="flex items-center gap-3">
                            <div className={`h-9 w-9 rounded-lg ${f.bg} flex items-center justify-center shrink-0`}>
                              <Icon className={`h-4.5 w-4.5 ${f.color}`} />
                            </div>
                            <div>
                              <span className="font-semibold text-sm">{t(`comparison.${f.key}`)}</span>
                              {isExpanded && (
                                <p className="text-xs text-muted-foreground mt-1 max-w-[280px] leading-relaxed">
                                  {t(`comparison.${f.key}.desc`)}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center py-3">
                          <span className="inline-flex items-center gap-1.5 text-destructive text-sm font-medium">
                            <X className="h-3.5 w-3.5" /> {t(`comparison.${f.key}.manual`)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-3">
                          <span className="inline-flex items-center gap-1.5 text-amber-600 text-sm font-medium">
                            <AlertTriangle className="h-3.5 w-3.5" /> {t(`comparison.${f.key}.old`)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-3 bg-primary/5">
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                            <Check className="h-3.5 w-3.5" /> {t(`comparison.${f.key}.ai`)}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 text-center">
                          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        </div>

        <div className="sm:hidden space-y-2" data-testid="comparison-cards-mobile">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isExpanded = expandedRows.has(i);
            return (
              <motion.div
                key={f.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card
                  className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
                  onClick={() => toggleRow(i)}
                  data-testid={`comparison-card-${f.key}`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl ${f.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`h-5 w-5 ${f.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{t(`comparison.${f.key}`)}</h4>
                          <Badge variant="secondary" className="mt-1 text-[10px] bg-emerald-500/10 text-emerald-600 border-0">
                            {t(`comparison.${f.key}.ai`)}
                          </Badge>
                        </div>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                    </div>

                    {isExpanded && (
                      <div className="mt-4 space-y-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {t(`comparison.${f.key}.desc`)}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center p-2.5 rounded-lg bg-red-500/5 border border-red-500/10">
                            <p className="text-[10px] text-muted-foreground mb-1">{t("comparison.manual")}</p>
                            <div className="flex items-center justify-center gap-1">
                              <X className="h-3 w-3 text-destructive" />
                              <span className="text-xs font-semibold text-destructive">{t(`comparison.${f.key}.manual`)}</span>
                            </div>
                          </div>
                          <div className="text-center p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10">
                            <p className="text-[10px] text-muted-foreground mb-1">{t("comparison.oldSoftware")}</p>
                            <div className="flex items-center justify-center gap-1">
                              <AlertTriangle className="h-3 w-3 text-amber-500" />
                              <span className="text-xs font-semibold text-amber-600">{t(`comparison.${f.key}.old`)}</span>
                            </div>
                          </div>
                          <div className="text-center p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                            <p className="text-[10px] text-muted-foreground mb-1">{t("comparison.ourSystem")}</p>
                            <div className="flex items-center justify-center gap-1">
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-xs font-bold text-emerald-600">{t(`comparison.${f.key}.ai`)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <WhatsAppCTA text={t("comparison.ctaButton")} message="Hi, I compared the AI Pharmacy System with other options.
I'm convinced and want to switch.
Please guide me on getting started." />
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const { t, lang } = useLanguage();
  const { country } = useCountry();
  const pricing = usePricing();
  const cs = country.currencySymbol;

  const plans = [
    {
      name: t("pricing.basic"),
      originalPrice: pricing.starter.originalPrice,
      price: pricing.starter.price,
      saveAmount: pricing.starter.saveAmount,
      note: t("pricing.starterNote"),
      color: "emerald",
      icon: PackageSearch,
      cta: t("pricing.getStarted"),
      features: [
        t("pricing.f.pos"), t("pricing.f.inventory"), t("pricing.f.expiry"), t("pricing.f.salesReports"),
        t("pricing.f.profitTracking"), t("pricing.f.basicDashboard"), t("pricing.f.invoiceCustom"),
        t("pricing.f.multiUserLimited"), t("pricing.f.dataBackup"), t("pricing.f.freeTrainingSetup"),
      ],
    },
    {
      name: t("pricing.standard"),
      originalPrice: pricing.standard.originalPrice,
      price: pricing.standard.price,
      saveAmount: pricing.standard.saveAmount,
      note: t("pricing.standardNote"),
      color: "purple",
      icon: TrendingUp,
      popular: true,
      ai: true,
      cta: t("pricing.upgradeStandard"),
      prefix: t("pricing.everythingBasicPlus"),
      features: [
        t("pricing.f.advancedPos"), t("pricing.f.fullInventory"), t("pricing.f.advancedExpiry"),
        t("pricing.f.whatsappMarketing"), t("pricing.f.staffMgmt"), t("pricing.f.multiDevice"),
        t("pricing.f.advancedReports"), t("pricing.f.profitAnalytics"), t("pricing.f.customerHistory"),
        t("pricing.f.prioritySupport"),
      ],
    },
    {
      name: t("pricing.premium"),
      originalPrice: pricing.premium.originalPrice,
      price: pricing.premium.price,
      saveAmount: pricing.premium.saveAmount,
      note: t("pricing.premiumNote"),
      color: "violet",
      icon: Crown,
      ai: true,
      highlight: true,
      cta: t("pricing.getPremium"),
      prefix: t("pricing.everythingStandardPlus"),
      features: [
        t("pricing.f.aiSalesInsights"), t("pricing.f.aiMessageWriter"), t("pricing.f.fullAutomation"),
        t("pricing.f.cloudHosting"), t("pricing.f.advancedDashboard"), t("pricing.f.unlimitedStaff"),
        t("pricing.f.advancedSecurity"), t("pricing.f.performanceTracking"), t("pricing.f.smartRestock"),
        t("pricing.f.vipSupport"),
      ],
    },
  ];

  const colorMap: Record<string, { iconBg: string; iconColor: string; glow: string }> = {
    emerald: { iconBg: "bg-emerald-500/10", iconColor: "text-emerald-600", glow: "shadow-emerald-500/10" },
    purple: { iconBg: "bg-primary/10", iconColor: "text-primary", glow: "shadow-primary/10" },
    violet: { iconBg: "bg-violet-500/10", iconColor: "text-violet-600", glow: "shadow-violet-500/10" },
  };

  const activeFestival = getActiveFestival(country.code);
  const festivalName = activeFestival
    ? (lang !== "en" ? activeFestival.nameLocal : activeFestival.nameEn)
    : null;

  return (
    <section id="pricing" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            {activeFestival ? (
              <Badge variant="destructive" className="mb-5 gap-1.5 px-5 py-2 text-sm animate-pulse">
                <span className="text-base mr-0.5">{activeFestival.emoji}</span>
                {festivalName} — 30% OFF
              </Badge>
            ) : (
              <Badge variant="destructive" className="mb-5 gap-1.5 px-5 py-2 text-sm animate-pulse">
                <Flame className="h-4 w-4" />
                {t("pricing.limitedOffer")}
              </Badge>
            )}
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
            {activeFestival
              ? (lang !== "en"
                  ? `${activeFestival.greetingLocal} — ${lang === "ur" ? "Khaas Sale" : lang === "ar" ? "عرض خاص" : "Special Sale"}`
                  : `${activeFestival.greetingEn} — Special Sale`)
              : t("pricing.offerEnds")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-destructive font-semibold text-sm mb-8">
            {activeFestival
              ? (lang === "ur"
                  ? "Tamam plans pe 30% OFF — mehdood waqt ke liye!"
                  : lang === "ar"
                    ? "خصم 30% على جميع الخطط — لفترة محدودة!"
                    : "30% OFF on all plans — limited time only!")
              : t("pricing.missOut")}
          </motion.p>
        </motion.div>

        {activeFestival && (
          <motion.div
            className="flex justify-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <CountdownTimer festival={activeFestival} />
          </motion.div>
        )}

        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">{t("pricing.investTitle")}</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">{t("pricing.investSub")}</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {plans.map((plan) => {
            const isPopular = "popular" in plan && plan.popular;
            const isHighlight = "highlight" in plan && plan.highlight;
            const isAI = "ai" in plan && plan.ai;
            const colors = colorMap[plan.color];

            return (
              <motion.div key={plan.name} variants={scaleIn} className={isPopular ? "lg:-mt-4" : ""}>
                <Card
                  className={`p-0 bg-background flex flex-col h-full overflow-hidden ${
                    isHighlight
                      ? "border-violet-500/40 shadow-xl shadow-violet-500/5 ring-2 ring-violet-500/20"
                      : isPopular
                        ? "border-primary/40 shadow-lg shadow-primary/5 ring-2 ring-primary/15"
                        : "hover:shadow-lg transition-shadow"
                  }`}
                  data-testid={`card-pricing-${plan.name.toLowerCase()}`}
                >
                  {isPopular && (
                    <div className="bg-gradient-to-r from-primary via-purple-600 to-primary text-primary-foreground text-center py-2 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5">
                      <Star className="h-3.5 w-3.5" />
                      {t("pricing.mostPopular")}
                    </div>
                  )}

                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${colors.iconBg} shadow-md ${colors.glow}`}>
                        <plan.icon className={`h-6 w-6 ${colors.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{plan.name}</h3>
                        {isAI && (
                          <Badge className="bg-gradient-to-r from-violet-500 to-emerald-500 text-white border-0 text-[9px] px-2 py-0">
                            {t("pricing.aiPowered")}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-4 -mx-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-medium">{cs}</span>
                        <span className="text-sm text-muted-foreground line-through">{cs} {plan.originalPrice}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-muted-foreground font-medium">{cs}</span>
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">{plan.price}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-red-500/15 text-red-600 border-red-500/20 text-[10px] px-2 py-0.5 font-bold" data-testid={`badge-off-${plan.name.toLowerCase()}`}>
                          30% OFF
                        </Badge>
                        <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-500/20 text-[10px] px-2 py-0.5 font-semibold" data-testid={`badge-save-${plan.name.toLowerCase()}`}>
                          {t("pricing.save")} {cs} {plan.saveAmount}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-medium">{t("pricing.oneTime")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 flex-1 pb-4">
                    {"prefix" in plan && plan.prefix && (
                      <p className="text-xs font-bold text-primary mb-3 flex items-center gap-1">
                        <ArrowRight className="h-3 w-3" />
                        {plan.prefix}
                      </p>
                    )}
                    <div className="space-y-2">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <div className="mt-0.5 h-4 w-4 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                            <Check className="h-2.5 w-2.5 text-emerald-600" />
                          </div>
                          <span className="text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 pb-4">
                    {isHighlight ? (
                      <Button asChild size="lg" className="w-full gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-violet-500/20" data-testid="button-pricing-premium">
                        <a href={getWhatsAppLink(`Hi, I'm interested in the ${plan.name} Plan (${cs} ${plan.price}).\nI'd like to get started with the Premium AI-powered system.\nPlease share the next steps.`)} target="_blank" rel="noopener noreferrer">
                          <Flame className="h-4 w-4" />
                          {plan.cta}
                        </a>
                      </Button>
                    ) : isPopular ? (
                      <WhatsAppCTA text={plan.cta} className="w-full shadow-md shadow-emerald-500/15" size="lg" message={`Hi, I'm interested in the ${plan.name} Plan (${cs} ${plan.price}).\nI'd like to upgrade to the Standard plan.\nPlease share the details.`} />
                    ) : (
                      <Button asChild variant="outline" size="lg" className="w-full gap-2" data-testid={`button-pricing-${plan.name.toLowerCase()}`}>
                        <a href={getWhatsAppLink(`Hi, I'm interested in the ${plan.name} Plan (${cs} ${plan.price}).\nI'd like to get started with this plan.\nPlease guide me.`)} target="_blank" rel="noopener noreferrer">
                          {plan.cta}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="px-6 pb-6 pt-1">
                    <p className="text-[11px] text-center text-muted-foreground italic" data-testid={`note-${plan.name.toLowerCase()}`}>
                      {plan.note}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            {[
              { icon: Cloud, title: t("pricing.hosting"), color: "from-green-500 to-emerald-500", sub: t("pricing.hostingSub") },
              { icon: Globe, title: t("pricing.yourBrand"), color: "from-emerald-500 to-teal-500", sub: t("pricing.brandSub") },
              { icon: Shield, title: t("pricing.fullSecurity"), color: "from-violet-500 to-purple-500", sub: t("pricing.securitySub") },
            ].map((item, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Card className="p-5 bg-background text-center hover-elevate h-full">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp}>
            <div className="text-center py-4 px-6 border border-border/40 rounded-lg bg-muted/20" data-testid="card-monthly-plan">
              <p className="text-xs text-muted-foreground">
                {t("pricing.monthlyTitle")} — {t("pricing.monthlySub")}{" "}
                <a href={getWhatsAppLink("Hi, I'm interested in the Monthly Subscription Plan.\nI'd like to know the monthly pricing and what's included.\nPlease share the details.")} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1" data-testid="link-monthly-plan">
                  {t("pricing.startMonthly")} <ArrowRight className="h-3 w-3" />
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ROISection() {
  const { t } = useLanguage();
  const stats = [
    { icon: Clock, value: "20+", unit: "hrs/week", label: t("roi.s1.label"), gradient: "from-purple-500 to-primary" },
    { icon: TrendingDown, value: "25%", unit: "", label: t("roi.s2.label"), gradient: "from-emerald-500 to-teal-500" },
    { icon: TrendingUp, value: "3x", unit: "", label: t("roi.s3.label"), gradient: "from-violet-500 to-purple-500" },
    { icon: Brain, value: "90%", unit: "", label: t("roi.s4.label"), gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            {t("roi.title1")} <span className="text-primary">{t("roi.title2")}</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className="p-6 text-center bg-background hover-elevate">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-extrabold mb-1 tracking-tight" data-testid={`text-roi-${i}`}>
                  {s.value}<span className="text-lg text-muted-foreground">{s.unit}</span>
                </div>
                <div className="font-semibold text-sm">{s.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BonusesSection() {
  const { t } = useLanguage();
  const bonuses = [
    { icon: GraduationCap, title: t("bonuses.b1.title"), gradient: "from-purple-500 to-primary", desc: t("bonuses.b1.desc") },
    { icon: Headphones, title: t("bonuses.b2.title"), gradient: "from-emerald-500 to-teal-500", desc: t("bonuses.b2.desc") },
    { icon: Package, title: t("bonuses.b3.title"), gradient: "from-violet-500 to-purple-500", desc: t("bonuses.b3.desc") },
    { icon: Database, title: t("bonuses.b4.title"), gradient: "from-rose-500 to-pink-500", desc: t("bonuses.b4.desc") },
    { icon: RefreshCw, title: t("bonuses.b5.title"), gradient: "from-amber-500 to-orange-500", desc: t("bonuses.b5.desc") },
    { icon: Shield, title: t("bonuses.b6.title"), gradient: "from-emerald-500 to-green-500", desc: t("bonuses.b6.desc") },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-5 gap-1.5 px-4 py-1.5">
              <Gift className="h-3 w-3" />
              {t("bonuses.badge")}
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
            {t("bonuses.title")}
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {bonuses.slice(0, 3).map((b, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className="p-6 bg-background hover-elevate h-full">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center shrink-0 shadow-md`}>
                    <b.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1" data-testid={`text-bonus-${i}`}>{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto mt-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {bonuses.slice(3).map((b, i) => (
            <motion.div key={i + 3} variants={scaleIn}>
              <Card className="p-6 bg-background hover-elevate h-full">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center shrink-0 shadow-md`}>
                    <b.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1" data-testid={`text-bonus-${i + 3}`}>{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Ahmed Hassan",
      city: "Multan",
      date: "Nov 2025",
      review: "System ne meri pharmacy completely automate kar di. Billing se le kar inventory tak sab kuch asan ho gaya. Bohat shukriya!",
      highlight: "Complete automation",
      gradient: "from-purple-500 to-primary",
    },
    {
      name: "Fatima Khan",
      city: "Lahore",
      date: "Dec 2025",
      review: "Inventory aur sales ab bohat easy ho gayi. Pehle sab manual tha, ab ek click mein sab nazar aata hai.",
      highlight: "Easy inventory & sales",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      name: "Muhammad Usman",
      city: "Islamabad",
      date: "Dec 2025",
      review: "WhatsApp automation feature kamal ka hai. Repeat customers barh gaye hain. Revenue 30% barh gaya.",
      highlight: "Revenue +30%",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      name: "Dr. Ayesha Malik",
      city: "Karachi",
      date: "Jan 2026",
      review: "Expiry alerts ne mera bohat sara paisa bacha liya. Pehle expired stock ki wajah se loss hota tha, ab sab track ho raha hai.",
      highlight: "Saved money on expiry",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Bilal Ahmad",
      city: "Faisalabad",
      date: "Jan 2026",
      review: "Staff management feature bohat zabardast hai. Ab mujhe pata hai kaun kitna kaam kar raha hai. Full control aa gaya.",
      highlight: "Full staff control",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      name: "Hina Pervaiz",
      city: "Rawalpindi",
      date: "Feb 2026",
      review: "Cloud access se main ghar beth kar bhi pharmacy monitor kar sakti hoon. Mobile pe sab reports nazar aati hain. Best investment!",
      highlight: "Remote monitoring",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Tariq Mehmood",
      city: "Peshawar",
      date: "Feb 2026",
      review: "AI insights ne mujhe bataya ke konsi medicines zyada bik rahi hain. Ab smart ordering kar raha hoon aur profit barh gaya.",
      highlight: "Smart AI ordering",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      name: "Saima Noor",
      city: "Quetta",
      date: "Feb 2026",
      review: "POS billing itni fast hai ke customers ko wait nahi karna parta. Training bhi free mili thi. Support team bhi bohat helpful hai.",
      highlight: "Fast POS billing",
      gradient: "from-emerald-500 to-green-500",
    },
  ];

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 340;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-5 gap-1.5 px-4 py-1.5">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {t("testimonials.badge")}
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
            {t("testimonials.title1")}{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">{t("testimonials.title2")}</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-sm max-w-lg mx-auto">
            {t("testimonials.subtitle")}
          </motion.p>
        </motion.div>

        <div className="relative">
          <Button
            size="icon"
            variant="outline"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg bg-background hidden sm:flex"
            onClick={() => scroll("left")}
            data-testid="button-testimonial-prev"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg bg-background hidden sm:flex"
            onClick={() => scroll("right")}
            data-testid="button-testimonial-next"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide px-1 sm:px-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="snap-start shrink-0 w-[300px] sm:w-[320px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Card className="p-6 bg-background hover-elevate h-full flex flex-col" data-testid={`card-testimonial-${i}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md`}>
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{t.name}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{t.city}</span>
                        <span className="text-muted-foreground/40">|</span>
                        <span>{t.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed text-foreground/90 flex-1 mb-4">"{t.review}"</p>

                  <div className="pt-3 border-t">
                    <Badge variant="secondary" className="text-xs font-medium gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      {t.highlight}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const { t } = useLanguage();
  return (
    <section id="demo" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerSlow}
        >
          <motion.div variants={fadeInUp}>
            <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 items-center justify-center mb-6 shadow-lg">
              <SiWhatsapp className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
            {t("demo.title1")}{" "}
            <span className="text-primary">{t("demo.title2")}</span>
          </motion.h2>

          <motion.div variants={fadeInUp} className="mt-8">
            <Button asChild size="lg" className="bg-emerald-600 text-white border-emerald-700 gap-2 text-base" data-testid="button-demo-whatsapp">
              <a href={getWhatsAppLink("Hi, I want to book a free demo of the AI Pharmacy System.\nPlease schedule a demo for me.\nI'm available to connect.")} target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="h-5 w-5" />
                {t("demo.ctaButton")}
              </a>
            </Button>
          </motion.div>

          <motion.p variants={fadeInUp} className="mt-4 text-sm text-muted-foreground">
            {t("demo.prefilled")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { t } = useLanguage();
  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            {t("faq.title1")} <span className="text-primary">{t("faq.title2")}</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-5 bg-background" data-testid={`accordion-faq-${i}`}>
                <AccordionTrigger className="text-left font-medium text-sm sm:text-base py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  const { t } = useLanguage();

  const modules = [
    { title: "POS Billing", desc: "Fast checkout & invoicing", icon: Zap, gradient: "from-purple-600 to-indigo-600" },
    { title: "Smart Inventory", desc: "AI stock management", icon: PackageSearch, gradient: "from-emerald-600 to-teal-600" },
    { title: "WhatsApp Marketing", desc: "Automated campaigns", icon: MessageSquare, gradient: "from-green-600 to-emerald-600" },
    { title: "Sales Analytics", desc: "Real-time profit data", icon: BarChart3, gradient: "from-blue-600 to-indigo-600" },
    { title: "Expiry Alerts", desc: "Auto expiry tracking", icon: Bell, gradient: "from-rose-500 to-red-600" },
    { title: "Staff Management", desc: "Roles & access control", icon: Users, gradient: "from-amber-500 to-orange-600" },
  ];

  const modules2 = [
    { title: "AI Insights", desc: "Smart business growth", icon: Brain, gradient: "from-fuchsia-600 to-purple-600" },
    { title: "Cloud Dashboard", desc: "Access from anywhere", icon: Cloud, gradient: "from-cyan-600 to-blue-600" },
    { title: "Supplier Hub", desc: "Vendor & purchase logs", icon: Truck, gradient: "from-violet-600 to-purple-600" },
    { title: "Mobile App", desc: "Manage on the go", icon: Smartphone, gradient: "from-teal-600 to-emerald-600" },
    { title: "Profit Reports", desc: "Detailed financials", icon: TrendingUp, gradient: "from-indigo-600 to-blue-600" },
    { title: "Secure Login", desc: "Encrypted protection", icon: Lock, gradient: "from-gray-600 to-slate-700" },
  ];

  const ModuleCard = ({ mod, index }: { mod: typeof modules[0]; index: number }) => (
    <motion.div
      className="shrink-0 w-[280px] sm:w-[320px]"
      data-testid={`showcase-card-${index}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-lg transition-shadow duration-400 h-full">
        <div className="flex items-start gap-4">
          <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center shrink-0 shadow-md`}>
            <mod.icon className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-gray-900 text-[15px] leading-snug">{mod.title}</h4>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">{mod.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-white" data-testid="showcase-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-14 sm:pb-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerSlow}
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide">{t("showcase.badge")}</span>
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-gray-900 leading-[1.15] mb-5"
          >
            {t("showcase.title")}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto"
          >
            {t("showcase.subtitle")}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex justify-center">
            <WhatsAppCTA size="lg" text={t("showcase.cta")} message="Hi, I saw the AI Pharmacy System.\nI'd like to book a free demo.\nPlease share the details." />
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">{t("showcase.check1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">{t("showcase.check2")}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50/30">
        <div className="py-10 sm:py-14">
          <div className="relative overflow-hidden mb-5">
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-gray-50/90 via-gray-50/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-gray-50/90 via-gray-50/60 to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee gap-5 py-2 will-change-transform">
              {[...modules, ...modules, ...modules].map((mod, i) => (
                <ModuleCard key={`r1-${i}`} mod={mod} index={i} />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-gray-50/90 via-gray-50/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-gray-50/90 via-gray-50/60 to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee-reverse gap-5 py-2 will-change-transform">
              {[...modules2, ...modules2, ...modules2].map((mod, i) => (
                <ModuleCard key={`r2-${i}`} mod={mod} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  const { t } = useLanguage();
  return (
    <footer id="footer" className="py-12 border-t bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={atsLogoPath} alt="Anas Tech Services" className="h-10 w-10 rounded-md object-contain shrink-0" loading="lazy" />
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base leading-tight">Anas Tech Services</span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight tracking-wide">{t("nav.subtitle")}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {t("footer.smartPharmacy")}
            </p>
            <Button asChild variant="outline" className="gap-2" data-testid="button-footer-whatsapp">
              <a href={getWhatsAppLink("Hi, I have a question about the AI Pharmacy System.\nI'd like to learn more.\nPlease connect me with your team.")} target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="h-4 w-4" />
                {t("footer.chatWithUs")}
              </a>
            </Button>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">{t("footer.quickLinks")}</h4>
            <div className="space-y-2.5">
              {[
                { label: t("nav.features"), href: "#features" },
                { label: t("nav.pricing"), href: "#pricing" },
                { label: t("nav.demo"), href: "#video" },
                { label: t("nav.faq"), href: "#faq" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="block text-sm text-muted-foreground">{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">{t("footer.contact")}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                {WHATSAPP_NUMBER}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                contact@anastechservices.com
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                Pakistan
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">{t("footer.whatsapp")}</h4>
            <WhatsAppCTA text={t("nav.bookDemo")} message="Hi, I want to book a free demo of the AI Pharmacy System.\nPlease schedule a demo for me.\nLooking forward to it." />
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

function FestivalPopup() {
  const { lang } = useLanguage();
  const { country, loading } = useCountry();
  const [festival, setFestival] = useState<Festival | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loading) return;
    const active = getActiveFestival(country.code);
    if (!active) {
      setFestival(null);
      setShow(false);
      return;
    }
    setFestival(active);
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, [country.code, loading]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => setFestival(null), 300);
  };

  if (!festival) return null;

  const name = lang !== "en" ? festival.nameLocal : festival.nameEn;
  const greeting = lang !== "en" ? festival.greetingLocal : festival.greetingEn;
  const desc = lang !== "en" ? festival.descLocal : festival.descEn;

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            data-testid="festival-popup"
          >
            <div className={`bg-gradient-to-br ${festival.themeFrom} ${festival.themeTo} px-6 pt-8 pb-10 text-center relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-8 text-5xl animate-pulse">{festival.emoji}</div>
                <div className="absolute top-12 right-6 text-4xl animate-pulse" style={{ animationDelay: "0.5s" }}>{festival.emoji}</div>
                <div className="absolute bottom-4 left-1/4 text-3xl animate-pulse" style={{ animationDelay: "1s" }}>{festival.emoji}</div>
                <div className="absolute bottom-8 right-1/4 text-5xl animate-pulse" style={{ animationDelay: "0.3s" }}>{festival.emoji}</div>
              </div>

              <button
                onClick={handleClose}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                data-testid="button-festival-close"
              >
                <X className="h-4 w-4 text-white" />
              </button>

              <div className="relative">
                <span className="text-6xl block mb-3">{festival.emoji}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                  {greeting}
                </h2>
                <p className="text-white/80 text-sm font-medium">{name}</p>
              </div>
            </div>

            <div className="px-6 py-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-4">
                <Flame className="h-4 w-4 text-red-500" />
                <span className="text-sm font-bold text-red-600">30% OFF — {lang === "ur" ? "Tamam Plans Pe" : "On All Plans"}</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>

              <Button
                asChild
                size="lg"
                className={`w-full bg-gradient-to-r ${festival.themeFrom} ${festival.themeTo} text-white border-0 gap-2 text-base font-semibold h-12 shadow-lg hover:shadow-xl transition-shadow`}
                data-testid="button-festival-cta"
              >
                <a href="#pricing" onClick={handleClose}>
                  <Sparkles className="h-4 w-4" />
                  {lang === "ur" ? "Abhi Offer Dekhein" : "View Special Offer"}
                </a>
              </Button>

              <p className="text-xs text-gray-400 mt-3">
                {lang === "ur" ? "Mehdood waqt ke liye — ab hi faida uthaein!" : "Limited time only — don't miss out!"}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <FestivalPopup />
      <Navbar />
      <HeroSection />
      <VideoSection />
      <ProblemSection />
      <SolutionSection />
      <WhatsAppMarketingSection />
      <OwnerControlSection />
      <ComparisonSection />
      <PricingSection />
      <ROISection />
      <BonusesSection />
      <TestimonialsSection />
      <FAQSection />
      <ShowcaseSection />
      <FooterSection />
      <AIChatbot />
    </div>
  );
}

function AIChatbot() {
  const { t, lang } = useLanguage();
  const defaultWelcome = { role: "assistant" as const, content: t("chatbot.welcome") };
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([defaultWelcome]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevLangRef = useRef(lang);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang;
      setMessages([{ role: "assistant" as const, content: t("chatbot.welcome") }]);
    }
  }, [lang, t]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })), lang }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "assistant", content: data.error }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: t("chatbot.error") }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: "assistant" as const, content: t("chatbot.welcome") }]);
  };

  const quickQuestions = [
    t("chatbot.q1"), t("chatbot.q2"), t("chatbot.q3"), t("chatbot.q4"), t("chatbot.q5"),
  ];

  const windowClasses = isFullscreen
    ? "fixed inset-4 sm:inset-6 z-50"
    : "fixed bottom-24 right-4 sm:right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]";

  const windowHeight = isFullscreen
    ? {}
    : { maxHeight: "min(600px, calc(100vh - 140px))" };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2.5 bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-full pl-5 pr-4 py-3"
          data-testid="button-chatbot-toggle"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-semibold hidden sm:inline">{t("chatbot.askQuestions")}</span>
          <span className="text-sm font-semibold sm:hidden">{t("chatbot.askAI")}</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
        </button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`${windowClasses} bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col`}
          style={windowHeight}
          data-testid="chatbot-window"
        >
          <div className="bg-gradient-to-r from-purple-600 to-emerald-500 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-bold text-sm">{t("chatbot.title")}</h4>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-purple-100 text-[10px]">{t("chatbot.status")}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={clearChat}
                className="h-8 w-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                title={t("chatbot.newChat")}
                data-testid="button-chatbot-clear"
              >
                <RotateCcw className="h-3.5 w-3.5 text-white" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-8 w-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                title={isFullscreen ? t("chatbot.minimize") : t("chatbot.fullscreen")}
                data-testid="button-chatbot-fullscreen"
              >
                {isFullscreen ? <Minimize2 className="h-3.5 w-3.5 text-white" /> : <Maximize2 className="h-3.5 w-3.5 text-white" />}
              </button>
              <button
                onClick={() => { setIsOpen(false); setIsFullscreen(false); }}
                className="h-8 w-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                title={t("chatbot.close")}
                data-testid="button-chatbot-close"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 scrollbar-hide" data-testid="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {msg.role === "assistant" && (
                  <div className="h-7 w-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-purple-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-slate-100 text-foreground rounded-bl-sm"
                  }`}
                  data-testid={`chatbot-message-${i}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start gap-2">
                <div className="h-7 w-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <Bot className="h-3.5 w-3.5 text-purple-600" />
                </div>
                <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5 shrink-0">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-purple-200 text-purple-600 hover:bg-purple-50:bg-purple-950/30 transition-colors font-medium"
                  data-testid={`chatbot-quick-${i}`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-slate-200 shrink-0">
            <div className="px-3 py-3 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={t("chatbot.placeholder")}
                className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-muted-foreground"
                disabled={isLoading}
                data-testid="input-chatbot"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 text-white flex items-center justify-center transition-colors shrink-0"
                data-testid="button-chatbot-send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center pb-2">
              <span className="text-[9px] text-muted-foreground">{t("chatbot.powered")} <span className="font-semibold text-purple-600">Anas Tech Services</span></span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
