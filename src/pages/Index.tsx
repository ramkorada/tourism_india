import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Mountain, Waves, MapPin, Star, Users, Map, Compass } from "lucide-react";
import { states } from "@/data/states";
import StateCard from "@/components/StateCard";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Floating destination card data ─── */
const floatingCards = [
  { name: "Araku Valley", emoji: "🌿", tag: "Hill Station", color: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-400/30", x: "8%", y: "18%", delay: "0s" },
  { name: "Tirupati", emoji: "🛕", tag: "Temples", color: "from-amber-500/20 to-orange-500/20", border: "border-amber-400/30", x: "78%", y: "14%", delay: "0.8s" },
  { name: "Rishikonda", emoji: "🌊", tag: "Beaches", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-400/30", x: "82%", y: "55%", delay: "1.6s" },
  { name: "Gandikota", emoji: "🏔️", tag: "Nature", color: "from-rose-500/20 to-pink-500/20", border: "border-rose-400/30", x: "5%", y: "62%", delay: "2.4s" },
  { name: "Nagarjuna Sagar", emoji: "💎", tag: "Heritage", color: "from-violet-500/20 to-purple-500/20", border: "border-violet-400/30", x: "60%", y: "78%", delay: "3.2s" },
];

/* ─── Typewriter words ─── */
const typewriterWords = ["Mountains", "Temples", "Beaches", "Heritage", "Wildlife", "Backwaters"];

const Index = () => {
  const featuredStates = states.slice(0, 4);
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [wordIdx, setWordIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  /* Mouse parallax */
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    const el = heroRef.current;
    el?.addEventListener("mousemove", handleMouse);
    return () => el?.removeEventListener("mousemove", handleMouse);
  }, []);

  /* Typewriter effect */
  useEffect(() => {
    const word = typewriterWords[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayText.length < word.length) {
        timeout = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1400);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 45);
      } else {
        setWordIdx((i) => (i + 1) % typewriterWords.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, typing, wordIdx]);

  /* Stats intersection observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stat1 = useCountUp(28, 1800, statsVisible);
  const stat2 = useCountUp(500, 2000, statsVisible);
  const stat3 = useCountUp(12000, 2200, statsVisible);
  const stat4 = useCountUp(98, 1600, statsVisible);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO — Interactive animated, no static photo
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "hsl(220 25% 6%)" }}
      >
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              width: "60vw", height: "60vw",
              background: "radial-gradient(circle, hsl(220 80% 50%), transparent 70%)",
              top: "-10%", left: "-10%",
              transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
          <div
            className="absolute rounded-full blur-3xl opacity-25"
            style={{
              width: "50vw", height: "50vw",
              background: "radial-gradient(circle, hsl(28 90% 55%), transparent 70%)",
              bottom: "-10%", right: "-10%",
              transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
              transition: "transform 0.12s ease-out",
            }}
          />
          <div
            className="absolute rounded-full blur-3xl opacity-15"
            style={{
              width: "35vw", height: "35vw",
              background: "radial-gradient(circle, hsl(140 60% 40%), transparent 70%)",
              top: "40%", left: "40%",
              transform: `translate(${mousePos.x * -15}px, ${mousePos.y * 15}px)`,
              transition: "transform 0.08s ease-out",
            }}
          />
        </div>

        {/* Animated grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
            transition: "transform 0.15s ease-out",
          }}
        />

        {/* Floating destination cards — parallax layers */}
        {floatingCards.map((card, i) => (
          <div
            key={card.name}
            className="absolute hidden lg:block pointer-events-none select-none"
            style={{
              left: card.x,
              top: card.y,
              transform: `translate(${mousePos.x * (i % 2 === 0 ? -30 : 30)}px, ${mousePos.y * (i % 2 === 0 ? -20 : 20)}px)`,
              transition: "transform 0.15s ease-out",
              animation: `floatCard 6s ease-in-out infinite`,
              animationDelay: card.delay,
            }}
          >
            <div
              className={`bg-gradient-to-br ${card.color} backdrop-blur-md border ${card.border} rounded-2xl px-4 py-3 shadow-2xl`}
              style={{ minWidth: "140px" }}
            >
              <div className="text-2xl mb-1">{card.emoji}</div>
              <p className="text-white font-semibold text-sm leading-tight">{card.name}</p>
              <p className="text-white/60 text-xs mt-0.5">{card.tag}</p>
            </div>
          </div>
        ))}

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8"
            style={{ animation: "fadeSlideUp 0.6s ease forwards" }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" style={{ animation: "pulse 2s infinite" }} />
            <span className="text-white/80 text-xs font-medium tracking-widest uppercase">Smart Tourism Platform</span>
          </div>

          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight mb-6"
            style={{ animation: "fadeSlideUp 0.6s 0.15s ease both" }}
          >
            Explore India's
            <br />
            <span className="relative inline-block">
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(220 80% 60%), hsl(28 90% 60%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {displayText}
              </span>
              <span
                className="inline-block w-1 ml-1 align-middle"
                style={{
                  height: "0.85em",
                  background: "hsl(28 90% 60%)",
                  animation: "blink 1s step-end infinite",
                  verticalAlign: "middle",
                  position: "relative",
                  top: "-0.05em",
                }}
              />
            </span>
          </h1>

          <p
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ animation: "fadeSlideUp 0.6s 0.3s ease both" }}
          >
            From the misty peaks of the Eastern Ghats to the golden shores of the Bay of Bengal — 
            your next unforgettable journey begins here.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-4"
            style={{ animation: "fadeSlideUp 0.6s 0.45s ease both" }}
          >
            <Link
              to="/states"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, hsl(220 80% 50%), hsl(28 90% 55%))",
                boxShadow: "0 0 30px hsl(220 80% 50% / 0.4)",
              }}
            >
              Start Exploring
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/trip-planner"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <Compass className="h-4 w-4" />
              Plan My Trip
            </Link>
          </div>

          {/* Scroll hint */}
          <div
            className="mt-16 flex flex-col items-center gap-2 opacity-50"
            style={{ animation: "fadeSlideUp 0.6s 0.8s ease both" }}
          >
            <span className="text-white/50 text-xs tracking-widest uppercase">Scroll to discover</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR — animated counters
      ══════════════════════════════════════════ */}
      <div ref={statsRef} className="relative z-10 -mt-1" style={{ background: "hsl(220 25% 8%)" }}>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Map, value: stat1, suffix: "+", label: "Indian States", color: "hsl(220 80% 60%)" },
              { icon: MapPin, value: stat2, suffix: "+", label: "Destinations", color: "hsl(28 90% 60%)" },
              { icon: Users, value: stat3, suffix: "+", label: "Happy Tourists", color: "hsl(140 60% 50%)" },
              { icon: Star, value: stat4, suffix: "%", label: "Satisfaction Rate", color: "hsl(0 0% 70%)" },
            ].map(({ icon: Icon, value, suffix, label, color }) => (
              <div key={label} className="flex flex-col items-center text-center group">
                <Icon className="h-6 w-6 mb-3 opacity-70" style={{ color }} />
                <p className="font-display text-3xl md:text-4xl font-extrabold text-white">
                  {value.toLocaleString()}{suffix}
                </p>
                <p className="text-white/40 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          EXPERIENCES — Category cards
      ══════════════════════════════════════════ */}
      <section className="section-padding bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">What moves you?</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">India Experiences</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you seek temple bells at dawn or a golden sunset over crashing waves — India has a moment made for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Mountain,
                label: "Nature & Wildlife",
                desc: "Himalayas, jungles & safari adventures",
                gradient: "from-emerald-500 to-teal-600",
                bg: "from-emerald-50 to-teal-50",
                darkBg: "dark:from-emerald-950/40 dark:to-teal-950/40",
                glow: "hsl(160 60% 40%)",
                destinations: ["Araku Valley", "Gandikota", "Talakona"],
              },
              {
                icon: MapPin,
                label: "Heritage & Temples",
                desc: "2000-year-old monuments & sacred pilgrimages",
                gradient: "from-amber-500 to-orange-600",
                bg: "from-amber-50 to-orange-50",
                darkBg: "dark:from-amber-950/40 dark:to-orange-950/40",
                glow: "hsl(28 90% 55%)",
                destinations: ["Tirupati", "Lepakshi", "Amaravati"],
              },
              {
                icon: Waves,
                label: "Coastal Escapes",
                desc: "Pristine beaches, backwaters & boat rides",
                gradient: "from-blue-500 to-cyan-600",
                bg: "from-blue-50 to-cyan-50",
                darkBg: "dark:from-blue-950/40 dark:to-cyan-950/40",
                glow: "hsl(200 80% 50%)",
                destinations: ["Rishikonda", "Yarada", "Konaseema"],
              },
            ].map((cat, i) => (
              <Link
                to="/states"
                key={cat.label}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${cat.bg} ${cat.darkBg} p-8 transition-all duration-500 hover:-translate-y-2`}
                style={{
                  animation: `fadeSlideUp 0.6s ${i * 0.15}s ease both`,
                  boxShadow: `0 4px 30px ${cat.glow}00`,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${cat.glow}33`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 30px ${cat.glow}00`; }}
              >
                {/* Gradient icon circle */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-gradient-to-br ${cat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <cat.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{cat.label}</h3>
                <p className="text-muted-foreground text-sm mb-5">{cat.desc}</p>
                {/* Destination pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.destinations.map((d) => (
                    <span
                      key={d}
                      className="text-xs font-medium px-3 py-1 rounded-full border border-border bg-background/60 text-muted-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                {/* Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED STATES
      ══════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">Pick your destination</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Discover States</h2>
            </div>
            <Link to="/states" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group">
              View all States <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStates.map((state, i) => (
              <StateCard key={state.id} stateData={state} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/states" className="inline-flex items-center gap-2 bg-muted text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted/80 transition-colors">
              View all States <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ECO AWARENESS — Gradient banner
      ══════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, hsl(140 50% 30%), hsl(160 60% 20%), hsl(220 80% 20%))" }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, hsl(140 60% 50%), transparent 50%), radial-gradient(circle at 80% 50%, hsl(220 80% 60%), transparent 50%)",
          }}
        />
        <div className="relative z-10 container mx-auto text-center max-w-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-8 mx-auto">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Travel Responsibly</h2>
          <p className="text-white/70 text-lg mb-8">
            Preserve the natural and cultural heritage of India for future generations. 
            Every mindful step you take protects what makes this land extraordinary.
          </p>
          <Link
            to="/eco-awareness"
            className="inline-flex items-center gap-2 bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
          >
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-display text-2xl font-bold text-foreground mb-1">Incredible India</p>
            <p className="text-muted-foreground text-sm">© 2026 Smart Tourism Platform</p>
          </div>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/states" className="text-sm text-muted-foreground hover:text-foreground transition-colors">States</Link>
            <Link to="/trip-planner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Planner</Link>
            <Link to="/eco-awareness" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Eco</Link>
          </div>
        </div>
      </footer>

      {/* ── Keyframes via inline style tag ── */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%       { opacity: 0.7; transform: scaleY(1.3); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default Index;
