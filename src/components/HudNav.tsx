import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: "hero", label: "HOME", icon: "◉" },
  { id: "countdown", label: "TIMER", icon: "◷" },
  { id: "player", label: "PLAYER", icon: "◇" },
  { id: "event", label: "EVENT", icon: "◈" },
  { id: "rsvp", label: "RSVP", icon: "▶" },
  { id: "wall", label: "WALL", icon: "✦" },
  { id: "gallery", label: "GALLERY", icon: "◐" },
];

export function HudNav() {
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* progress bar */}
      <div className="fixed top-0 inset-x-0 h-0.5 z-[60] bg-white/5">
        <div
          className="h-full bg-neon"
          style={{ width: `${progress}%`, boxShadow: "0 0 10px var(--neon-cyan)" }}
        />
      </div>

      {/* top bar */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[60]">
        <div className="glass rounded-full px-3 py-1.5 flex items-center gap-2 font-hud text-[11px]">
          <span className="size-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
          <span className="text-[var(--neon-cyan)]">NEXUS_OS</span>
          <span className="text-muted-foreground">v2.0.77</span>
          <button
            onClick={() => setMuted((m) => !m)}
            className="ml-2 px-2 py-0.5 rounded-full border border-white/10 hover:border-[var(--neon-cyan)] transition"
            aria-label="Toggle audio"
          >
            {muted ? "♪ OFF" : "♪ ON"}
          </button>
        </div>
      </div>

      {/* floating dock */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]"
      >
        <div className="glass rounded-2xl p-2 flex gap-1 hud-border">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="group relative px-3 py-2 rounded-xl hover:bg-white/5 transition flex flex-col items-center min-w-[52px]"
            >
              <span className="text-[var(--neon-cyan)] text-sm">{l.icon}</span>
              <span className="font-hud text-[9px] text-muted-foreground group-hover:text-foreground mt-0.5 hidden sm:block">{l.label}</span>
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const m = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setShow(true);
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div
          className="pointer-events-none fixed z-[55] size-[400px] rounded-full"
          style={{
            left: pos.x - 200,
            top: pos.y - 200,
            background: "radial-gradient(circle, oklch(0.7 0.28 305 / 0.12), transparent 60%)",
            transition: "left 0.15s ease-out, top 0.15s ease-out",
          }}
        />
      )}
    </AnimatePresence>
  );
}
