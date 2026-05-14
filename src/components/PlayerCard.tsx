import { motion } from "framer-motion";
import { SectionHeader, PARTY } from "./Hero";

const stats = [
  { label: "XP", value: 99240 },
  { label: "WINS", value: 412 },
  { label: "RANK", value: "DIAMOND" },
  { label: "GUILD", value: "NEXUS//ELITE" },
];

const games = ["Cyber Drift 2087", "Halo: Eternal", "Valorant", "Elden Ring", "Apex Legends"];
const achievements = [
  { name: "Born to Win", icon: "★" },
  { name: "Night Owl", icon: "◑" },
  { name: "Speedrunner", icon: "⚡" },
  { name: "Boss Slayer", icon: "✦" },
  { name: "Loot Master", icon: "◆" },
];

export function PlayerCard() {
  return (
    <section id="player" className="relative py-24 px-6">
      <SectionHeader
        kicker="PROFILE"
        title="PLAYER ONE"
        sub="Tonight's main character. Loaded with XP, ready to drop."
      />

      <div className="mt-12 max-w-5xl mx-auto">
        <div className="relative glass hud-border rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-purple)]/15 via-transparent to-[var(--neon-cyan)]/15 pointer-events-none" />

          <div className="grid md:grid-cols-[260px_1fr] gap-6 p-6 md:p-8 relative">
            {/* avatar */}
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden relative bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-blue)] grid place-items-center glow-purple">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="font-display text-7xl text-white drop-shadow">{PARTY.name[0]}</div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 font-hud text-[10px] text-[var(--neon-cyan)]">
                  LVL 21
                </div>
              </div>
              <div className="mt-3 font-hud text-xs text-center text-muted-foreground">
                @{PARTY.name.toLowerCase()}_pl4yer
              </div>
            </div>

            {/* info */}
            <div>
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <h3 className="font-display text-3xl md:text-4xl text-foreground">{PARTY.name}</h3>
                <span className="font-hud text-xs text-[var(--neon-cyan)] px-2 py-0.5 rounded border border-[var(--neon-cyan)]/40">
                  ONLINE
                </span>
                <span className="font-hud text-xs text-[var(--neon-purple)] px-2 py-0.5 rounded border border-[var(--neon-purple)]/40">
                  VIP
                </span>
              </div>

              {/* XP bar */}
              <div className="mt-4">
                <div className="flex justify-between font-hud text-[11px] text-muted-foreground mb-1">
                  <span>XP TO LVL 22</span>
                  <span className="text-[var(--neon-cyan)]">76%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "76%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="h-full bg-neon glow-purple"
                  />
                </div>
              </div>

              {/* stats grid */}
              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="glass rounded-md p-3">
                    <div className="font-hud text-[10px] text-muted-foreground">{s.label}</div>
                    <div className="font-display text-lg text-[var(--neon-cyan)] truncate">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* games */}
              <div className="mt-5">
                <div className="font-hud text-xs text-muted-foreground mb-2">FAVORITE LOADOUT</div>
                <div className="flex flex-wrap gap-2">
                  {games.map((g) => (
                    <span
                      key={g}
                      className="text-xs px-3 py-1 rounded-full glass border border-white/10 hover:border-[var(--neon-cyan)] transition"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* achievements */}
              <div className="mt-5">
                <div className="font-hud text-xs text-muted-foreground mb-2">ACHIEVEMENTS</div>
                <div className="flex flex-wrap gap-2">
                  {achievements.map((a) => (
                    <motion.div
                      key={a.name}
                      whileHover={{ y: -3, scale: 1.05 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md glass border border-[var(--neon-purple)]/30"
                    >
                      <span className="text-[var(--neon-purple)]">{a.icon}</span>
                      <span className="font-hud text-[11px]">{a.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
