"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

type Dir = "up" | "down" | "left" | "right";

const DIRS: Record<Dir, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

const ALL_DIRS: Dir[] = ["up", "down", "left", "right"];

const OPPOSITE: Record<Dir, Dir> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function dirToward(fx: number, fy: number, tx: number, ty: number, cur: Dir): Dir {
  const dx = tx - fx;
  const dy = ty - fy;
  const scored = ALL_DIRS
    .filter((d) => d !== OPPOSITE[cur])
    .map((d) => ({ dir: d, score: DIRS[d][0] * dx + DIRS[d][1] * dy }))
    .sort((a, b) => b.score - a.score);
  return scored[0]?.dir ?? cur;
}

export default function PacmanBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isNotePage = /^\/notes\/.+/.test(pathname);

  const setupAndRun = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Gutter bounds
    const contentHalf = 384 + 24;
    const cx = W / 2;
    const gutters = {
      left: { min: 10, max: cx - contentHalf },
      right: { min: cx + contentHalf, max: W - 10 },
    };

    // Need at least 50px gutters
    const leftW = gutters.left.max - gutters.left.min;
    const rightW = gutters.right.max - gutters.right.min;
    if (leftW < 50 && rightW < 50) return;

    const CHASE_RADIUS = 150;
    const PAC_SPEED = 0.7;
    const GHOST_WANDER_SPEED = 0.25;
    const GHOST_CHASE_SPEED = 0.55;
    const KILL_DIST = 10;
    const RESPAWN_DELAY = 1500;

    type Gutter = { min: number; max: number };

    function randInGutter(g: Gutter) {
      return {
        x: g.min + 15 + Math.random() * Math.max(0, g.max - g.min - 30),
        y: 40 + Math.random() * (H - 80),
      };
    }

    // Create a lane for each gutter
    function createLane(g: Gutter) {
      const gW = g.max - g.min;
      if (gW < 50) return null;

      // Dots
      const dotCount = Math.floor(H / 60);
      const dots: { x: number; y: number; alive: boolean }[] = [];
      for (let i = 0; i < dotCount; i++) {
        dots.push({ ...randInGutter(g), alive: true });
      }

      // Pac-Man
      const pacPos = randInGutter(g);
      const pac = {
        x: pacPos.x,
        y: pacPos.y,
        speed: PAC_SPEED,
        dir: ALL_DIRS[Math.floor(Math.random() * 4)] as Dir,
        mouthPhase: Math.random() * Math.PI * 2,
        size: 9,
        targetDot: null as number | null,
        turnTimer: 0,
      };

      // Ghost
      const ghostPos = randInGutter(g);
      const ghost = {
        x: ghostPos.x,
        y: ghostPos.y,
        speed: GHOST_WANDER_SPEED,
        dir: ALL_DIRS[Math.floor(Math.random() * 4)] as Dir,
        size: 9,
        turnTimer: 0,
        chasing: false,
        alive: true,
      };

      let pacAlive = true;

      function spawnDot() {
        const dead = dots.find((d) => !d.alive);
        if (dead) {
          const pos = randInGutter(g);
          dead.x = pos.x;
          dead.y = pos.y;
          dead.alive = true;
        }
      }

      function wallTurn(entity: { x: number; y: number; dir: Dir; size: number }) {
        // Turn BEFORE hitting the wall so entity never gets stuck
        const lookAhead = entity.size + 6;
        const [dx, dy] = DIRS[entity.dir];
        const nextX = entity.x + dx * lookAhead;
        const nextY = entity.y + dy * lookAhead;
        const hitWall =
          nextX <= g.min + entity.size ||
          nextX >= g.max - entity.size ||
          nextY <= entity.size + 2 ||
          nextY >= H - entity.size - 2;

        if (hitWall) {
          // Pick a perpendicular direction that doesn't also hit a wall
          const perps = ALL_DIRS.filter((d) => d !== entity.dir && d !== OPPOSITE[entity.dir]);
          // Shuffle
          if (Math.random() > 0.5) perps.reverse();
          for (const p of perps) {
            const [px, py] = DIRS[p];
            const testX = entity.x + px * lookAhead;
            const testY = entity.y + py * lookAhead;
            if (
              testX > g.min + entity.size &&
              testX < g.max - entity.size &&
              testY > entity.size + 2 &&
              testY < H - entity.size - 2
            ) {
              entity.dir = p;
              return;
            }
          }
          // If both perpendiculars are blocked, reverse
          entity.dir = OPPOSITE[entity.dir];
        }
      }

      function respawnPac() {
        const pos = randInGutter(g);
        pac.x = pos.x;
        pac.y = pos.y;
        pac.dir = ALL_DIRS[Math.floor(Math.random() * 4)];
        pac.targetDot = null;
        pac.turnTimer = 0;
        pacAlive = true;
      }

      function respawnGhost() {
        // Spawn far from pac-man
        let pos = randInGutter(g);
        for (let attempt = 0; attempt < 10; attempt++) {
          pos = randInGutter(g);
          if (dist(pos.x, pos.y, pac.x, pac.y) > CHASE_RADIUS) break;
        }
        ghost.x = pos.x;
        ghost.y = pos.y;
        ghost.dir = ALL_DIRS[Math.floor(Math.random() * 4)];
        ghost.chasing = false;
        ghost.speed = GHOST_WANDER_SPEED;
        ghost.turnTimer = 0;
        ghost.alive = true;
      }

      function update() {
        // --- Pac-Man ---
        if (pacAlive) {
          pac.mouthPhase += 0.1;
          pac.turnTimer = Math.max(0, pac.turnTimer - 1);

          // Find closest dot
          if (pac.targetDot === null || !dots[pac.targetDot]?.alive) {
            let best = -1;
            let bestD = Infinity;
            for (let i = 0; i < dots.length; i++) {
              if (!dots[i].alive) continue;
              const d = dist(pac.x, pac.y, dots[i].x, dots[i].y);
              if (d < bestD) { bestD = d; best = i; }
            }
            pac.targetDot = best >= 0 ? best : null;
          }

          // Turn toward dot
          if (pac.targetDot !== null && pac.turnTimer <= 0) {
            const t = dots[pac.targetDot];
            const desired = dirToward(pac.x, pac.y, t.x, t.y, pac.dir);
            if (desired !== pac.dir) {
              pac.dir = desired;
              pac.turnTimer = 25 + Math.floor(Math.random() * 30);
            }
          }

          // Random turns
          if (Math.random() < 0.005 && pac.turnTimer <= 0) {
            const opts = ALL_DIRS.filter((d) => d !== OPPOSITE[pac.dir] && d !== pac.dir);
            pac.dir = opts[Math.floor(Math.random() * opts.length)];
            pac.turnTimer = 40;
          }

          wallTurn(pac);
          const [pdx, pdy] = DIRS[pac.dir];
          pac.x += pdx * pac.speed;
          pac.y += pdy * pac.speed;

          // Eat dots
          for (const dot of dots) {
            if (!dot.alive) continue;
            if (dist(pac.x, pac.y, dot.x, dot.y) < pac.size + 3) {
              dot.alive = false;
              pac.targetDot = null;
              setTimeout(spawnDot, 1500 + Math.random() * 2500);
            }
          }
        }

        // --- Ghost ---
        if (ghost.alive) {
          ghost.turnTimer = Math.max(0, ghost.turnTimer - 1);

          const pacDist = dist(ghost.x, ghost.y, pac.x, pac.y);

          // Chase while pac-man is in radius, stop when he leaves
          if (pacAlive && pacDist < CHASE_RADIUS) {
            if (!ghost.chasing) {
              ghost.chasing = true;
              ghost.speed = GHOST_CHASE_SPEED;
            }
          } else {
            if (ghost.chasing) {
              ghost.chasing = false;
              ghost.speed = GHOST_WANDER_SPEED;
            }
          }

          if (ghost.turnTimer <= 0) {
            if (ghost.chasing && pacAlive) {
              const desired = dirToward(ghost.x, ghost.y, pac.x, pac.y, ghost.dir);
              if (desired !== ghost.dir) {
                ghost.dir = desired;
                ghost.turnTimer = 15 + Math.floor(Math.random() * 15);
              }
            } else {
              if (Math.random() < 0.01) {
                const opts = ALL_DIRS.filter((d) => d !== OPPOSITE[ghost.dir]);
                ghost.dir = opts[Math.floor(Math.random() * opts.length)];
                ghost.turnTimer = 70 + Math.floor(Math.random() * 80);
              }
            }
          }

          wallTurn(ghost);
          const [gdx, gdy] = DIRS[ghost.dir];
          ghost.x += gdx * ghost.speed;
          ghost.y += gdy * ghost.speed;
        }

        // --- Collision: pac dies, both respawn ---
        if (pacAlive && ghost.alive) {
          if (dist(pac.x, pac.y, ghost.x, ghost.y) < KILL_DIST) {
            pacAlive = false;
            ghost.alive = false;
            setTimeout(respawnPac, RESPAWN_DELAY);
            setTimeout(respawnGhost, RESPAWN_DELAY + 500);
          }
        }
      }

      return { dots, pac, ghost, update, isPacAlive: () => pacAlive };
    }

    const leftLane = createLane(gutters.left);
    const rightLane = createLane(gutters.right);
    const lanes = [leftLane, rightLane].filter(Boolean) as NonNullable<ReturnType<typeof createLane>>[];

    if (lanes.length === 0) return;

    const ghostColors = ["#ff0000", "#00ffff"];

    function drawPacman(pac: { x: number; y: number; dir: Dir; mouthPhase: number; size: number }) {
      const mouth = Math.abs(Math.sin(pac.mouthPhase)) * 0.35;
      let base = 0;
      if (pac.dir === "right") base = 0;
      else if (pac.dir === "down") base = Math.PI * 0.5;
      else if (pac.dir === "left") base = Math.PI;
      else base = Math.PI * 1.5;

      ctx!.beginPath();
      ctx!.moveTo(pac.x, pac.y);
      ctx!.arc(pac.x, pac.y, pac.size, base + mouth, base - mouth + Math.PI * 2);
      ctx!.closePath();
      ctx!.fillStyle = "#facc15";
      ctx!.fill();
    }

    function drawGhost(ghost: { x: number; y: number; dir: Dir; size: number; chasing: boolean }, colorIdx: number) {
      const s = ghost.size;
      const x = ghost.x;
      const y = ghost.y;

      ctx!.beginPath();
      ctx!.arc(x, y - s * 0.15, s, Math.PI, 0);
      ctx!.lineTo(x + s, y + s * 0.8);
      const waves = 3;
      const waveW = (s * 2) / waves;
      for (let i = 0; i < waves; i++) {
        const wx = x + s - i * waveW;
        ctx!.quadraticCurveTo(wx - waveW * 0.25, y + s * 1.1, wx - waveW * 0.5, y + s * 0.8);
        ctx!.quadraticCurveTo(wx - waveW * 0.75, y + s * 0.5, wx - waveW, y + s * 0.8);
      }
      ctx!.closePath();
      ctx!.fillStyle = ghostColors[colorIdx];
      ctx!.fill();

      // Eyes
      const eyeOff = s * 0.3;
      const eyeY = y - s * 0.2;
      for (const sign of [-1, 1]) {
        ctx!.beginPath();
        ctx!.ellipse(x + sign * eyeOff, eyeY, s * 0.22, s * 0.28, 0, 0, Math.PI * 2);
        ctx!.fillStyle = "#ffffff";
        ctx!.fill();
        const [lx, ly] = DIRS[ghost.dir];
        ctx!.beginPath();
        ctx!.arc(x + sign * eyeOff + lx * s * 0.1, eyeY + ly * s * 0.1, s * 0.1, 0, Math.PI * 2);
        ctx!.fillStyle = "#1a1a2e";
        ctx!.fill();
      }
    }

    let animId: number;

    function loop() {
      ctx!.clearRect(0, 0, W, H);
      ctx!.globalAlpha = 0.25;

      const mutedColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--muted")
        .trim();

      lanes.forEach((lane, i) => {
        lane.update();

        // Dots
        for (const dot of lane.dots) {
          if (!dot.alive) continue;
          ctx!.beginPath();
          ctx!.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = mutedColor;
          ctx!.fill();
        }

        if (lane.isPacAlive()) drawPacman(lane.pac);
        if (lane.ghost.alive) drawGhost(lane.ghost, i);
      });

      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    }

    loop();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (isNotePage) return;
    let cleanup = setupAndRun();

    const onResize = () => {
      cleanup?.();
      cleanup = setupAndRun();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cleanup?.();
      window.removeEventListener("resize", onResize);
    };
  }, [isNotePage, setupAndRun]);

  if (isNotePage) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
