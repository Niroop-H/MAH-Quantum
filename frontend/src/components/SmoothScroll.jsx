import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Wraps the app in buttery Lenis smooth-scrolling and renders a thin
 * gradient scroll-progress bar fixed under the navbar.
 */
export default function SmoothScroll({ children }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.1,
      }}
    >
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[100] h-[2.5px] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg,#00B4FF 0%,#7C5CFF 50%,#FF00A0 100%)' }}
      />
      {children}
    </ReactLenis>
  );
}
