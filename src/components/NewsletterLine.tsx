'use client';

import { motion, useInView, useAnimationControls } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function NewsletterLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;

    if (isInView) {
      const loop = async () => {
        while (!cancelled) {
          await controls.start({
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 1.8, ease: 'easeInOut' },
              opacity: { duration: 0.1 },
            },
          });
          if (cancelled) break;
          await controls.start({
            pathLength: 0,
            opacity: 1,
            transition: {
              pathLength: { duration: 0.5, ease: 'easeIn' },
              opacity: { duration: 0 },
            },
          });
        }
      };
      loop();
    } else {
      controls.stop();
      controls.set({ pathLength: 0, opacity: 0 });
    }

    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [isInView, controls]);

  return (
    <div ref={ref} className="relative z-10 mt-16 flex justify-center px-4">
      <svg
        viewBox="0 0 800 60"
        className="w-full max-w-3xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.path
          d="M 20 35 C 60 18, 110 48, 160 30 C 210 12, 255 50, 310 32 C 360 16, 400 44, 450 28 C 500 12, 545 46, 600 30 C 645 16, 690 42, 740 28 C 765 21, 780 30, 790 35"
          stroke="#ed7620"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={controls}
        />
      </svg>
    </div>
  );
}
