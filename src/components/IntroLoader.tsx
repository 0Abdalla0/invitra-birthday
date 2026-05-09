import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "> BOOT_SEQUENCE :: INITIATED",
  "> LOADING NEURAL_CORE...",
  "> AUTH :: GUEST_PROFILE_VERIFIED",
  "> SYNCING HOLO_INTERFACE...",
  "> RENDERING PORTAL_GRAPHICS",
  "> SYSTEM ONLINE — WELCOME, PLAYER",
];

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < lines.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 600);
    const t2 = setTimeout(() => onDone(), 1700);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [step, onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: done ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 scanline" />

        {/* scanning line */}
        <motion.div
          initial={{ y: "-20%" }}
          animate={{ y: "120%" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-70"
        />

        <motion.div
          animate={{ scale: done ? 1.4 : 1, opacity: done ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-[min(90vw,520px)] glass rounded-xl p-6 hud-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="size-2 rounded-full bg-[var(--neon-pink)] animate-pulse" />
            <span className="size-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
            <span className="size-2 rounded-full bg-[var(--neon-purple)] animate-pulse" />
            <span className="ml-auto font-hud text-xs text-muted-foreground">SYS://INIT</span>
          </div>

          <div className="font-display text-2xl md:text-3xl text-neon-gradient mb-4">
            SYSTEM INITIALIZING
          </div>

          <div className="font-hud text-sm space-y-1 min-h-[170px]">
            {lines.slice(0, step).map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[var(--neon-cyan)]"
              >
                {l}
              </motion.div>
            ))}
            {step < lines.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-[var(--neon-purple)]"
              >
                ▮
              </motion.span>
            )}
          </div>

          {/* progress */}
          <div className="mt-5 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / lines.length) * 100}%` }}
              transition={{ ease: "easeOut" }}
              className="h-full bg-neon glow-purple"
            />
          </div>
          <div className="mt-2 flex justify-between font-hud text-[10px] text-muted-foreground">
            <span>NEXUS_OS v2.0.77</span>
            <span>{Math.round((step / lines.length) * 100)}%</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
