import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Hero";

// Use Unsplash for moody cyberpunk imagery
const shots = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
  "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=1200&q=80",
  "https://images.unsplash.com/photo-1493497029755-f49c8e9a4d45?w=1200&q=80",
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
  "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=1200&q=80",
  "https://images.unsplash.com/photo-1556438064-2d7646166914?w=1200&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
];

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-24 px-6">
      <SectionHeader kicker="ARCHIVE" title="HOLO GALLERY" sub="Memories from past missions." />

      <div className="mt-12 max-w-6xl mx-auto columns-2 md:columns-3 gap-3 space-y-3">
        {shots.map((src, i) => (
          <motion.button
            key={src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setOpen(src)}
            className="block w-full break-inside-avoid relative rounded-lg overflow-hidden border border-white/10 hover:border-[var(--neon-cyan)] transition group"
          >
            <img src={src} loading="lazy" alt="" className="w-full h-auto block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="absolute bottom-2 left-2 font-hud text-[10px] text-[var(--neon-cyan)] opacity-0 group-hover:opacity-100 transition">
              CLIP_{String(i + 1).padStart(3, "0")}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md grid place-items-center p-6"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={open}
              className="max-h-[85vh] max-w-[90vw] rounded-xl glow-cyan"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
