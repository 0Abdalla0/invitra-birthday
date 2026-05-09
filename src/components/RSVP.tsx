import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Hero";

type Status = "joining" | "maybe" | "offline";

const initialCounts: Record<Status, number> = {
  joining: 87,
  maybe: 24,
  offline: 9,
};

export function RSVP() {
  const [counts, setCounts] = useState(initialCounts);
  const [picked, setPicked] = useState<Status | null>(null);
  const [burst, setBurst] = useState(0);

  const total = counts.joining + counts.maybe + counts.offline;

  function pick(s: Status) {
    if (picked === s) return;
    setCounts((c) => {
      const next = { ...c, [s]: c[s] + 1 };
      if (picked) next[picked] = Math.max(0, next[picked] - 1);
      return next;
    });
    setPicked(s);
    setBurst((b) => b + 1);
  }

  const opts: { id: Status; label: string; color: string }[] = [
    { id: "joining", label: "JOINING", color: "var(--neon-cyan)" },
    { id: "maybe", label: "MAYBE", color: "var(--neon-purple)" },
    { id: "offline", label: "OFFLINE", color: "var(--neon-pink)" },
  ];

  return (
    <section id="rsvp" className="relative py-24 px-6">
      <SectionHeader kicker="ACCESS REQUEST" title="JOIN THE MISSION" sub="Confirm your status. Limited slots in the lobby." />

      <div className="mt-12 max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
        {opts.map((o) => {
          const pct = total ? Math.round((counts[o.id] / total) * 100) : 0;
          const active = picked === o.id;
          return (
            <motion.button
              key={o.id}
              onClick={() => pick(o.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`relative glass rounded-xl p-6 text-left overflow-hidden transition ${
                active ? "border-2" : "border border-white/10"
              }`}
              style={active ? { borderColor: o.color, boxShadow: `0 0 30px ${o.color}55` } : {}}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-hud text-xs" style={{ color: o.color }}>{o.label}</div>
                  <div className="mt-1 font-display text-3xl">{counts[o.id]}</div>
                </div>
                <div className="font-hud text-2xl text-muted-foreground">{pct}%</div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full"
                  style={{ background: o.color, boxShadow: `0 0 12px ${o.color}` }}
                />
              </div>
              {active && (
                <div className="mt-3 font-hud text-[10px] text-[var(--neon-cyan)]">✓ STATUS_LOCKED</div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* burst effect */}
      <AnimatePresence>
        {burst > 0 && (
          <motion.div
            key={burst}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          >
            {[...Array(20)].map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: Math.cos(angle) * 240, y: Math.sin(angle) * 240, opacity: 0 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="absolute size-2 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_12px_var(--neon-cyan)]"
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
