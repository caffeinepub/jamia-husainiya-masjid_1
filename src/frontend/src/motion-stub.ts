// Stub for the 'motion' package which is installed but not used in this app.
// This prevents React 19 incompatibility issues from the motion library
// causing a white screen at runtime.
export default {};
export const motion = {};
export const animate = () => {};
export const AnimatePresence = () => null;
export const useAnimate = () => [{}, () => {}];
export const useMotionValue = () => ({ get: () => 0, set: () => {} });
export const useTransform = () => ({ get: () => 0 });
export const useSpring = () => ({ get: () => 0 });
export const useScroll = () => ({ scrollY: { get: () => 0 } });
export const MotionConfig = ({ children }: { children: React.ReactNode }) =>
  children;
