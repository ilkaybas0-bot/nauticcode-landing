"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "primary" | "secondary" | "spark";
};

type Ripple = {
  x: number;
  y: number;
  age: number;
};

const COLORS = {
  primary: "139, 92, 246", // accent-cyan token (violet)
  secondary: "91, 33, 182", // accent-cobalt token (deep violet)
  spark: "242, 244, 247", // text-primary (near-white)
};

const CURSOR_RADIUS = 160;
const MAX_LINK_DIST = 120;

/**
 * Canvas-based "aether flow" background: drifting light particles linked by
 * faint threads, with cursor repulsion + swirl and occasional ripple rings.
 * Plain Canvas 2D rather than WebGL — same visual language, far less GPU/
 * bundle cost, and easy to cap on mobile.
 *
 * Rendered once, site-wide, as a fixed full-viewport layer (see
 * app/[locale]/layout.tsx) — pointer-events-none so it never blocks clicks,
 * and cursor position is tracked on `window` rather than the element itself
 * for exactly that reason.
 */
export default function AetherFlowHero({
  className = "fixed inset-0",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Re-bind as definitely-non-null so the closures below don't need
    // repeated null checks (TS doesn't narrow across function boundaries).
    const canvasEl = canvas;
    const containerEl = container;
    const ctx2d = ctx;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, active: false };
    let lastRippleAt = 0;
    let rafId: number | null = null;
    let visible = true;

    function particleCount() {
      // Fewer particles on small/low-power screens.
      return width < 640 ? 50 : width < 1024 ? 90 : 140;
    }

    function seedParticles() {
      const count = particleCount();
      particles = Array.from({ length: count }, () => {
        const roll = Math.random();
        const hue: Particle["hue"] =
          roll > 0.93 ? "spark" : roll > 0.5 ? "primary" : "secondary";
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: hue === "spark" ? 1.4 : Math.random() * 1.6 + 0.6,
          hue,
        };
      });
    }

    function resize() {
      const rect = containerEl.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    }

    // Tracked on window (not the canvas) since the canvas is pointer-events:
    // none — it must never intercept clicks on real page content above it.
    function onPointerMove(e: PointerEvent) {
      const rect = containerEl.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;

      const now = performance.now();
      if (now - lastRippleAt > 260) {
        lastRippleAt = now;
        ripples.push({ x: pointer.x, y: pointer.y, age: 0 });
        if (ripples.length > 6) ripples.shift();
      }
    }

    function step(t: number) {
      if (!visible) {
        rafId = requestAnimationFrame(step);
        return;
      }

      ctx2d.clearRect(0, 0, width, height);

      // Gentle flow field so drift never looks perfectly linear.
      const time = t * 0.00015;

      for (const p of particles) {
        const flowX = Math.sin(p.y * 0.006 + time) * 0.05;
        const flowY = Math.cos(p.x * 0.006 + time) * 0.05;
        p.vx += flowX * 0.02;
        p.vy += flowY * 0.02;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < CURSOR_RADIUS) {
            const force = (1 - dist / CURSOR_RADIUS) * 0.6;
            // Push away from the cursor…
            p.vx += (dx / dist) * force * 0.18;
            p.vy += (dy / dist) * force * 0.18;
            // …plus a tangential nudge for the swirl.
            p.vx += (-dy / dist) * force * 0.14;
            p.vy += (dx / dist) * force * 0.14;
          }
        }

        // Drag keeps the field from accelerating forever.
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      // Threads between nearby particles.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_LINK_DIST) {
            const opacity = (1 - dist / MAX_LINK_DIST) * 0.16;
            ctx2d.strokeStyle = `rgba(${COLORS.primary}, ${opacity})`;
            ctx2d.lineWidth = 1;
            ctx2d.beginPath();
            ctx2d.moveTo(a.x, a.y);
            ctx2d.lineTo(b.x, b.y);
            ctx2d.stroke();
          }
        }
      }

      // Particles themselves, with a soft glow.
      for (const p of particles) {
        const color = COLORS[p.hue];
        const glow = p.hue === "spark" ? 8 : 4;
        ctx2d.shadowBlur = glow;
        ctx2d.shadowColor = `rgba(${color}, 0.8)`;
        ctx2d.fillStyle = `rgba(${color}, 0.9)`;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx2d.fill();
      }
      ctx2d.shadowBlur = 0;

      // Expanding ripple rings from recent cursor movement.
      ripples = ripples.filter((r) => r.age < 1);
      for (const r of ripples) {
        r.age += 0.02;
        const radius = r.age * 90;
        const opacity = (1 - r.age) * 0.25;
        ctx2d.strokeStyle = `rgba(${COLORS.primary}, ${opacity})`;
        ctx2d.lineWidth = 1;
        ctx2d.beginPath();
        ctx2d.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx2d.stroke();
      }

      rafId = requestAnimationFrame(step);
    }

    function onVisibilityChange() {
      visible = document.visibilityState === "visible";
    }

    resize();

    if (reduceMotion) {
      // Static single frame: no rAF loop, no cursor tracking.
      step(0);
    } else {
      rafId = requestAnimationFrame(step);
      window.addEventListener("pointermove", onPointerMove);
      document.addEventListener("visibilitychange", onVisibilityChange);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(containerEl);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
