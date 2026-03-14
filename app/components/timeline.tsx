"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TimelineEvent } from "@/lib/data";

// ─── Particle trail canvas ───────────────────────────────────────────────────

function ParticleTrail({ height }: { height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);

  type Particle = {
    y: number;
    x: number;
    vy: number;
    vx: number;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
  };

  const spawn = useCallback(
    (count: number, canvasHeight: number) => {
      for (let i = 0; i < count; i++) {
        particles.current.push({
          y: Math.random() * canvasHeight,
          x: 0.5 + (Math.random() - 0.5) * 0.3,
          vy: -0.15 - Math.random() * 0.3,
          vx: (Math.random() - 0.5) * 0.08,
          size: 1 + Math.random() * 1.5,
          opacity: 0,
          life: 0,
          maxLife: 120 + Math.random() * 180,
        });
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Initial batch
    spawn(20, canvas.offsetHeight);

    const accentStyle = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    const loop = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Spawn a couple each frame
      if (particles.current.length < 40) {
        spawn(1, h);
      }

      particles.current = particles.current.filter((p) => {
        p.life++;
        p.y += p.vy;
        p.x += p.vx;

        // Fade in then out
        const progress = p.life / p.maxLife;
        if (progress < 0.1) {
          p.opacity = progress / 0.1;
        } else if (progress > 0.7) {
          p.opacity = (1 - progress) / 0.3;
        } else {
          p.opacity = 1;
        }

        // Gentle drift back toward centre
        p.vx += (0.5 - p.x) * 0.001;

        // Wrap vertically
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const drawX = p.x * w;
        ctx.beginPath();
        ctx.arc(drawX, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `color-mix(in srgb, ${accentStyle} ${Math.round(p.opacity * 50)}%, transparent)`;
        ctx.fill();

        return p.life < p.maxLife;
      });

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, [spawn]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 pointer-events-none"
      style={{ width: 60, height: height || "100%" }}
    />
  );
}

// ─── Expandable timeline card ────────────────────────────────────────────────

const categoryColors: Record<TimelineEvent["category"], string> = {
  education: "bg-accent",
  work: "bg-emerald-500",
  award: "bg-amber-500",
  publication: "bg-sky-500",
  milestone: "bg-rose-500",
};

function TimelineCard({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  const card = (
    <motion.div
      onClick={() => setExpanded((v) => !v)}
      className="rounded-lg border border-border bg-card p-5 space-y-2 cursor-pointer select-none transition-colors hover:border-accent/40"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-accent">{event.year}</span>
        <span
          className={`h-1.5 w-1.5 rounded-full ${categoryColors[event.category]}`}
        />
        <span className="text-xs text-muted capitalize">{event.category}</span>
        <motion.span
          className="ml-auto text-muted text-xs"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▾
        </motion.span>
      </div>
      <h3 className="text-sm font-medium text-foreground">{event.title}</h3>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm leading-relaxed text-muted pt-1">
              {event.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="relative flex items-start md:justify-center">
      {/* Desktop: alternating sides */}
      <div
        className={`hidden md:flex w-full items-start ${
          isLeft ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <motion.div
          className="w-[calc(50%-2rem)]"
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {card}
        </motion.div>
        <div className="w-16 flex-shrink-0" />
        <div className="w-[calc(50%-2rem)]" />
      </div>

      {/* Mobile: left-aligned */}
      <motion.div
        className="md:hidden ml-10 flex-1"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {card}
      </motion.div>

      {/* Centre dot */}
      <motion.div
        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-5 z-10 flex h-4 w-4 items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: 0.15, type: "spring", bounce: 0.5 }}
      >
        <span className="h-3 w-3 rounded-full border-2 border-accent bg-background" />
      </motion.div>
    </div>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────

export function Timeline({ events }: { events: TimelineEvent[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.offsetHeight);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Vertical line */}
      <div className="absolute left-[7px] md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-px bg-border" />

      {/* Particle trail */}
      <ParticleTrail height={height} />

      {/* Events */}
      <div className="space-y-12">
        {events.map((event, i) => (
          <TimelineCard
            key={`${event.year}-${event.title}`}
            event={event}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
