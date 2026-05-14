import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader, PARTY } from "./Hero";

export function GameShowcase() {
  return (
    <section id="showcase" className="relative py-24 px-6 overflow-hidden">
      <SectionHeader kicker="HOLO RENDER" title="LEVEL 21 / UNLOCKED" />

      <div className="mt-16 max-w-4xl mx-auto relative h-[420px] grid place-items-center">
        {/* rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 grid place-items-center"
        >
          <div className="size-[380px] rounded-full border border-[var(--neon-purple)]/40" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 grid place-items-center"
        >
          <div className="size-[300px] rounded-full border-2 border-dashed border-[var(--neon-cyan)]/40" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 grid place-items-center"
        >
          <div className="size-[220px] rounded-full border border-[var(--neon-pink)]/50" />
        </motion.div>

        {/* center number */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 text-center"
        >
          <div className="font-display font-black text-[12rem] md:text-[16rem] leading-none text-neon-gradient drop-shadow-[0_0_60px_oklch(0.7_0.28_305/0.6)]">
            21
          </div>
          <div className="font-hud text-sm text-[var(--neon-cyan)] tracking-[0.5em] -mt-4">
            UNLOCKED
          </div>
        </motion.div>

        {/* floating chips */}
        {[
          { text: "+2400 XP", x: "10%", y: "20%" },
          { text: "ACHIEVEMENT", x: "80%", y: "25%" },
          { text: "RARE DROP", x: "15%", y: "75%" },
          { text: "BOSS DEFEATED", x: "78%", y: "70%" },
        ].map((c, i) => (
          <motion.div
            key={c.text}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="absolute glass rounded-full px-3 py-1 font-hud text-[10px] text-[var(--neon-cyan)] float-y"
            style={{ left: c.x, top: c.y, animationDelay: `${i * 0.5}s` }}
          >
            {c.text}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function PartyCardExport() {
  const [generated, setGenerated] = useState(false);
  return (
    <section className="relative py-24 px-6">
      <SectionHeader
        kicker="DIGITAL CARD"
        title="YOUR PASS"
        sub="Generate a personal invite card to share."
      />

      <div className="mt-12 max-w-md mx-auto">
        <motion.div
          whileHover={{ rotateX: 4, rotateY: -4 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="aspect-[3/4] rounded-2xl glass hud-border relative overflow-hidden"
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-purple)]/30 via-transparent to-[var(--neon-cyan)]/30" />
          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="flex justify-between font-hud text-[10px] text-[var(--neon-cyan)]">
              <span>VIP_PASS</span>
              <span>0xNEXUS</span>
            </div>
            <div className="mt-6 font-hud text-xs text-muted-foreground">PLAYER</div>
            <div className="font-display text-4xl text-foreground">{PARTY.name}</div>
            <div className="mt-2 font-hud text-xs text-[var(--neon-cyan)]">
              @{PARTY.name.toLowerCase()}_pl4yer
            </div>

            <div className="mt-auto">
              <div className="font-hud text-[10px] text-muted-foreground">EVENT</div>
              <div className="font-display text-lg">LEVEL UP PARTY</div>
              <div className="mt-1 font-hud text-xs text-[var(--neon-cyan)]">{PARTY.dateLabel}</div>

              <div className="mt-4 flex items-end justify-between">
                <div className="font-display text-6xl text-neon-gradient">21</div>
                <div className="text-right font-hud text-[9px] text-muted-foreground leading-tight">
                  ACCESS::GRANTED
                  <br />
                  TIER::DIAMOND
                  <br />
                  SEAT::FRONT_ROW
                </div>
              </div>
            </div>

            {/* corner cuts */}
            <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[var(--neon-cyan)]" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[var(--neon-purple)]" />
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setGenerated(true)}
            className="font-hud tracking-widest px-4 py-2.5 rounded-md glass hover:border-[var(--neon-cyan)] transition"
          >
            ⤓ DOWNLOAD
          </button>
          <button
            onClick={() =>
              navigator
                .share?.({ title: "Level Up Party", text: "You're invited!" })
                .catch(() => {})
            }
            className="font-hud tracking-widest px-4 py-2.5 rounded-md bg-neon text-primary-foreground glow-purple"
          >
            ↗ SHARE
          </button>
        </div>
        {generated && (
          <p className="text-center mt-3 font-hud text-xs text-[var(--neon-cyan)]">
            CARD_RENDERED ✓
          </p>
        )}
      </div>
    </section>
  );
}
