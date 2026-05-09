import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { IntroLoader } from "@/components/IntroLoader";
import { Hero, Countdown, PARTY } from "@/components/Hero";
import { PlayerCard } from "@/components/PlayerCard";
import { EventDetails } from "@/components/EventDetails";
import { RSVP } from "@/components/RSVP";
import { PartyWall } from "@/components/PartyWall";
import { Gallery } from "@/components/Gallery";
import { GameShowcase, PartyCardExport } from "@/components/Showcase";
import { HudNav, CursorGlow } from "@/components/HudNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${PARTY.name} — Level Up Party | Cyberpunk Birthday Invite` },
      { name: "description", content: `Join ${PARTY.name} for a cinematic cyberpunk birthday — ${PARTY.tagline}. RSVP to the mission.` },
      { property: "og:title", content: `${PARTY.name} — Level Up Party` },
      { property: "og:description", content: `${PARTY.tagline}. ${PARTY.dateLabel}` },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);

  return (
    <main id="hero" className="relative min-h-screen text-foreground">
      {!booted && <IntroLoader onDone={() => setBooted(true)} />}
      <CursorGlow />
      <HudNav />

      <Hero />
      <Countdown />
      <PlayerCard />
      <GameShowcase />
      <EventDetails />
      <RSVP />
      <PartyWall />
      <Gallery />
      <PartyCardExport />

      <footer className="relative py-10 text-center font-hud text-xs text-muted-foreground border-t border-white/10">
        <div className="text-[var(--neon-cyan)]">END_OF_TRANSMISSION</div>
        <div className="mt-1">© NEXUS_OS // ALL RIGHTS RESERVED // 2026</div>
      </footer>
    </main>
  );
}
