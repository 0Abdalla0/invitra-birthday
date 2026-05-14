import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Configurable
export const PARTY = {
  name: "NEXUS",
  tagline: "LEVELING UP TO 21",
  date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21), // 21 days out
  dateLabel: "SAT • 12.07.26 • 21:00",
  location: "Neo-District 7, Holo-Lounge",
  dressCode: "Neon Cyber / Black Tie Tech",
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-[var(--neon-purple)]/30 blur-[120px]"
      />
      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 -right-20 w-[460px] h-[460px] rounded-full bg-[var(--neon-cyan)]/25 blur-[120px]"
      />

      {/* particles */}
      {[...Array(24)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: [-20, -120] }}
          transition={{
            duration: 6 + (i % 5),
            repeat: Infinity,
            delay: (i * 0.4) % 6,
          }}
          className="absolute size-1 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]"
          style={{ left: `${(i * 37) % 100}%`, bottom: `${(i * 17) % 80}%` }}
        />
      ))}

      <div className="relative z-10 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass font-hud text-xs text-[var(--neon-cyan)]"
        >
          <span className="size-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
          INVITE :: ENCRYPTED PORTAL ACCESS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
          className="glitch mt-6 font-display font-black text-[18vw] md:text-[10rem] leading-none text-neon-gradient drop-shadow-[0_0_30px_oklch(0.7_0.28_305/0.5)]"
        >
          {PARTY.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="font-hud text-xl md:text-2xl text-silver tracking-[0.4em]"
        >
          {PARTY.tagline}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-4 font-display text-3xl md:text-5xl text-foreground"
        >
          LEVEL UP <span className="text-[var(--neon-cyan)]">PARTY</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-6 inline-flex items-center gap-3 glass rounded-full px-5 py-2 font-hud text-sm"
        >
          <span className="text-[var(--neon-cyan)]">◈</span>
          {PARTY.dateLabel}
          <span className="text-[var(--neon-purple)]">◈</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#rsvp"
            className="group relative font-hud tracking-widest px-8 py-3 rounded-md bg-neon text-primary-foreground font-bold glow-purple hover:scale-[1.03] transition"
          >
            JOIN MISSION
          </a>
          <a
            href="#countdown"
            className="font-hud tracking-widest px-8 py-3 rounded-md glass hover:border-[var(--neon-cyan)] transition"
          >
            VIEW BRIEFING
          </a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-hud text-xs text-muted-foreground"
      >
        ▼ SCROLL TO DIVE IN
      </motion.div>

      {/* corner HUD */}
      <div className="hidden md:block absolute top-6 left-6 font-hud text-[10px] text-[var(--neon-cyan)]/80">
        <div>LAT 40.7128° N</div>
        <div>LON 74.0060° W</div>
        <div>SIG ▮▮▮▮▯</div>
      </div>
      <div className="hidden md:block absolute top-6 right-6 font-hud text-[10px] text-[var(--neon-cyan)]/80 text-right">
        <div>STATUS :: LIVE</div>
        <div>CH 0xNEXUS</div>
        <div className="flicker">REC ●</div>
      </div>
    </section>
  );
}

export function Countdown() {
  const [t, setT] = useState(() => diff(PARTY.date));
  useEffect(() => {
    const id = setInterval(() => setT(diff(PARTY.date)), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "DAYS", v: t.d },
    { label: "HOURS", v: t.h },
    { label: "MINUTES", v: t.m },
    { label: "SECONDS", v: t.s },
  ];

  return (
    <section id="countdown" className="relative py-24 px-6">
      <SectionHeader kicker="T-MINUS" title="MISSION COUNTDOWN" />
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {items.map((it) => (
          <motion.div
            key={it.label}
            whileHover={{ y: -4 }}
            className="relative glass hud-border rounded-xl p-6 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--neon-purple)]/10 to-transparent pointer-events-none" />
            <div className="font-display text-5xl md:text-6xl text-neon-gradient">{pad(it.v)}</div>
            <div className="mt-2 font-hud text-xs text-[var(--neon-cyan)]">{it.label}</div>
            <div className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

export function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 font-hud text-xs text-[var(--neon-cyan)]">
        <span className="h-px w-10 bg-[var(--neon-cyan)]" />
        {kicker}
        <span className="h-px w-10 bg-[var(--neon-cyan)]" />
      </div>
      <h2 className="mt-3 font-display text-4xl md:text-6xl font-black text-neon-gradient">
        {title}
      </h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
