/**
 * motion-stub.ts
 *
 * No-op stub that replaces the `motion` / `motion/react` package entirely.
 * motion v12+ is incompatible with React 19 and causes a white screen at
 * runtime. Because package.json cannot be edited on this platform, we
 * intercept every motion import path via Vite aliases and redirect here so
 * the real package code is never executed.
 */

import type React from "react";

// biome-ignore lint/suspicious/noExplicitAny: stub requires any
type AnyProps = Record<string, any>;

// ─── motion proxy ─────────────────────────────────────────────────────────────
// Returns a plain passthrough component for any motion.div / motion.span etc.
// All animation props are accepted and silently ignored.

const motionHandler: ProxyHandler<AnyProps> = {
  get(_target, _prop: string) {
    // Return a passthrough component that renders children (React 19 compatible)
    return (props: AnyProps) => props.children ?? null;
  },
};

export const motion = new Proxy({} as AnyProps, motionHandler);

// ─── AnimatePresence ──────────────────────────────────────────────────────────

export function AnimatePresence(props: { children?: React.ReactNode }) {
  return props.children ?? null;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAnimate() {
  return [{}, () => Promise.resolve()] as const;
}

export function useMotionValue(initial: number) {
  return {
    get: () => initial,
    set: (_v: number) => {},
    on: (_event: string, _cb: () => void) => () => {},
    destroy: () => {},
  };
}

export function useTransform(_value: unknown, _from?: unknown, _to?: unknown) {
  return { get: () => 0, set: (_v: number) => {} };
}

export function useSpring(_value: number | unknown) {
  return { get: () => 0, set: (_v: number) => {} };
}

export function useScroll() {
  return {
    scrollY: { get: () => 0 },
    scrollX: { get: () => 0 },
    scrollYProgress: { get: () => 0 },
    scrollXProgress: { get: () => 0 },
  };
}

export function useInView(_ref: unknown, _options?: unknown) {
  return false;
}

export function useAnimation() {
  return {
    start: () => Promise.resolve(),
    stop: () => {},
    set: (_v: unknown) => {},
  };
}

export function useDragControls() {
  return { start: (_event: unknown) => {} };
}

// ─── MotionConfig ─────────────────────────────────────────────────────────────

export function MotionConfig(props: { children?: React.ReactNode }) {
  return props.children ?? null;
}

// ─── animate (imperative) ─────────────────────────────────────────────────────

export function animate(
  _target?: unknown,
  _keyframes?: unknown,
  _options?: unknown,
) {
  return { stop: () => {} };
}

// ─── stagger / easing helpers ────────────────────────────────────────────────

export function stagger() {
  return 0;
}
export const spring = () => ({});
export const easeIn = [0.4, 0, 1, 1];
export const easeOut = [0, 0, 0.2, 1];
export const easeInOut = [0.4, 0, 0.2, 1];
export const linear = [0, 0, 1, 1];
export const backIn = [0.36, 0, 0.66, -0.56];
export const backOut = [0.34, 1.56, 0.64, 1];
export const backInOut = [0.68, -0.6, 0.32, 1.6];
export const anticipate = [0.36, 0, 0.66, -0.56];
export const circIn = [0.55, 0, 1, 0.45];
export const circOut = [0, 0.55, 0.45, 1];
export const circInOut = [0.85, 0, 0.15, 1];

// ─── Default export (covers `import motion from "motion"`) ────────────────────

export default {
  motion,
  AnimatePresence,
  MotionConfig,
  animate,
  useAnimate,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
  useAnimation,
  useDragControls,
  stagger,
  spring,
};
