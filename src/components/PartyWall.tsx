import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Hero";

type Msg = { id: number; user: string; text: string; color: string; time: string };

const seed: Msg[] = [
  { id: 1, user: "ZeroCool", text: "Locked in. Bringing the loot 🍾", color: "var(--neon-cyan)", time: "now" },
  { id: 2, user: "Aria.exe", text: "GG WP — see you in the lobby", color: "var(--neon-purple)", time: "2m" },
  { id: 3, user: "Vox", text: "Dress code understood. Full neon mode.", color: "var(--neon-pink)", time: "5m" },
  { id: 4, user: "Kira", text: "Pre-game playlist incoming 🎧", color: "var(--neon-blue)", time: "8m" },
  { id: 5, user: "N1ghtwing", text: "21? Officially a final boss now.", color: "var(--neon-cyan)", time: "12m" },
];

const colors = [
  { name: "cyan", v: "var(--neon-cyan)" },
  { name: "purple", v: "var(--neon-purple)" },
  { name: "pink", v: "var(--neon-pink)" },
  { name: "blue", v: "var(--neon-blue)" },
];

export function PartyWall() {
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState(colors[0].v);

  function send() {
    if (!text.trim()) return;
    const m: Msg = {
      id: Date.now(),
      user: name.trim() || "Anonymous",
      text: text.trim(),
      color,
      time: "now",
    };
    setMsgs((p) => [m, ...p]);
    setText("");
  }

  return (
    <section id="wall" className="relative py-24 px-6">
      <SectionHeader kicker="LIVE FEED" title="PARTY WALL" sub="Drop a message into the broadcast." />

      {/* composer */}
      <div className="mt-10 max-w-3xl mx-auto glass hud-border rounded-xl p-5">
        <div className="grid sm:grid-cols-[160px_1fr] gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="GAMERTAG"
            className="bg-black/30 border border-white/10 rounded-md px-3 py-2 font-hud text-sm focus:border-[var(--neon-cyan)] outline-none"
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type your message…"
            className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm focus:border-[var(--neon-cyan)] outline-none"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-hud text-[10px] text-muted-foreground">COLOR</span>
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.v)}
                className={`size-5 rounded-full border-2 transition ${color === c.v ? "scale-110" : "border-transparent"}`}
                style={{ background: c.v, borderColor: color === c.v ? "white" : "transparent", boxShadow: `0 0 10px ${c.v}` }}
              />
            ))}
          </div>
          {text && (
            <div className="text-xs px-3 py-1 rounded glass" style={{ color }}>
              preview: {text}
            </div>
          )}
          <button
            onClick={send}
            className="font-hud tracking-widest px-5 py-2 rounded-md bg-neon text-primary-foreground glow-purple hover:scale-[1.03] transition"
          >
            ▶ TRANSMIT
          </button>
        </div>
      </div>

      {/* feed */}
      <div className="mt-10 max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence>
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ y: -3 }}
              className="break-inside-avoid glass rounded-xl p-4 border border-white/10 relative overflow-hidden"
              style={{ borderColor: `${m.color}55` }}
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: m.color, boxShadow: `0 0 10px ${m.color}` }}
              />
              <div className="flex items-center gap-2">
                <div
                  className="size-7 rounded-md grid place-items-center font-display text-sm"
                  style={{ background: `${m.color}33`, color: m.color }}
                >
                  {m.user[0].toUpperCase()}
                </div>
                <div className="font-hud text-xs" style={{ color: m.color }}>{m.user}</div>
                <div className="ml-auto font-hud text-[10px] text-muted-foreground">{m.time}</div>
              </div>
              <div className="mt-2 text-sm text-foreground/90">{m.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
