import { motion } from "framer-motion";
import { SectionHeader, PARTY } from "./Hero";

const items = [
  { label: "DATE", value: "SAT • 12.07.26", icon: "◷" },
  { label: "TIME", value: "21:00 — LATE", icon: "◐" },
  { label: "LOCATION", value: PARTY.location, icon: "◉" },
  { label: "DRESS CODE", value: PARTY.dressCode, icon: "◇" },
];

export function EventDetails() {
  return (
    <section id="event" className="relative py-24 px-6">
      <SectionHeader kicker="MISSION BRIEFING" title="EVENT DETAILS" />

      <div className="mt-12 max-w-5xl mx-auto grid sm:grid-cols-2 gap-4">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass rounded-xl p-5 hud-border relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 text-7xl text-[var(--neon-purple)]/20 group-hover:text-[var(--neon-purple)]/40 transition">
              {it.icon}
            </div>
            <div className="font-hud text-[11px] text-[var(--neon-cyan)]">{it.label}</div>
            <div className="mt-1 font-display text-xl text-foreground">{it.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noreferrer"
          className="font-hud tracking-widest px-6 py-3 rounded-md glass hover:border-[var(--neon-cyan)] transition text-center"
        >
          ◉ OPEN MAPS
        </a>
        <a
          href="#"
          className="font-hud tracking-widest px-6 py-3 rounded-md glass hover:border-[var(--neon-purple)] transition text-center"
        >
          + ADD TO CALENDAR
        </a>
        <a
          href="#rsvp"
          className="font-hud tracking-widest px-6 py-3 rounded-md bg-neon text-primary-foreground glow-purple hover:scale-[1.03] transition text-center"
        >
          ▶ JOIN MISSION
        </a>
      </div>
    </section>
  );
}
