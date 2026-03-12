'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Particle {
  id: number;
  x: number;       // % of viewport width
  y: number;       // % of viewport height
  size: number;    // px radius
  opacity: number;
  duration: number;
  delay: number;
  xDrift: number;  // horizontal float range px
  yDrift: number;  // vertical float range px
}

// ---------------------------------------------------------------------------
// Constants – defined outside render so they never change identity
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 28;

function buildParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.8,
    opacity: Math.random() * 0.4 + 0.08,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 8,
    xDrift: (Math.random() - 0.5) * 60,
    yDrift: (Math.random() - 0.5) * 40,
  }));
}

// Stagger timing for hero text elements
const STAGGER_DELAYS = {
  badge: 0.15,
  heading: 0.3,
  body: 0.48,
  buttons: 0.62,
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Floating particle dots rendered via Framer Motion */
function ParticleField({ particles }: { particles: Particle[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, p.xDrift, 0],
            y: [0, p.yDrift, 0],
            opacity: [p.opacity, p.opacity * 2.2, p.opacity],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/** Shimmering gradient text – wraps any inline content */
function ShimmerText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background: 'linear-gradient(90deg, #f19342 0%, #ed7620 30%, #de5c16 50%, #f7b87a 65%, #ed7620 80%, #f19342 100%)',
        backgroundSize: '250% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'heroShimmer 3.5s ease-in-out infinite',
      }}
    >
      {children}
    </span>
  );
}

/** Polished mouse-icon scroll indicator */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      {/* Mouse body */}
      <div className="relative w-[26px] h-[42px] rounded-full border-2 border-white/25 flex justify-center pt-[7px] backdrop-blur-sm bg-white/5">
        {/* Scrolling dot */}
        <motion.div
          animate={{ y: [0, 14, 0], opacity: [0.9, 0.2, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[3px] h-[6px] rounded-full bg-primary-400"
        />
        {/* Side notch lines */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[5px] h-px bg-white/15 -translate-x-full" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-px bg-white/15 translate-x-full" />
      </div>
      {/* Label */}
      <motion.span
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-[10px] tracking-[0.2em] uppercase text-white/35 font-medium"
      >
        scroll
      </motion.span>
    </motion.div>
  );
}

/** CTA button with animated border glow ring */
function GlowButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: 'primary' | 'ghost';
  children: React.ReactNode;
}) {
  const isPrimary = variant === 'primary';

  return (
    <Link href={href} className="relative group">
      {/* Animated glow ring – only visible on hover via parent group */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={
          isPrimary
            ? { boxShadow: ['0 0 0px 0px rgba(237,118,32,0)', '0 0 18px 4px rgba(237,118,32,0.45)', '0 0 0px 0px rgba(237,118,32,0)'] }
            : { boxShadow: ['0 0 0px 0px rgba(241,147,66,0)', '0 0 14px 3px rgba(241,147,66,0.25)', '0 0 0px 0px rgba(241,147,66,0)'] }
        }
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Persistent subtle idle glow for primary only */}
      {isPrimary && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-[2px] rounded-full"
          animate={{ boxShadow: ['0 0 10px 2px rgba(237,118,32,0.2)', '0 0 22px 6px rgba(237,118,32,0.35)', '0 0 10px 2px rgba(237,118,32,0.2)'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={
          isPrimary
            ? 'group/btn relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 overflow-hidden'
            : 'px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-primary-500/30 transition-all'
        }
      >
        {/* Shine sweep on primary button */}
        {isPrimary && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
          />
        )}
        {children}
      </motion.button>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [particles] = useState<Particle[]>(() => buildParticles());
  const fullText = 'Weison !';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      {/* Keyframe injection – avoids adding to globals.css */}
      <style>{`
        @keyframes heroShimmer {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900">

        {/* ---------------------------------------------------------------- */}
        {/* Background Layer                                                  */}
        {/* ---------------------------------------------------------------- */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

          {/* Hero image */}
          <div
            className="absolute inset-0 bg-center bg-cover opacity-20"
            style={{ backgroundImage: "url('/images/hero%20section.jpg')" }}
          />

          {/* Animated orbs (preserved from original) */}
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl"
          />

          {/* Grid dot pattern (preserved from original) */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Floating particle dots (new) */}
          <ParticleField particles={particles} />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Content                                                           */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            <div className="text-center lg:text-left">

              {/* Badge – stagger 1 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: STAGGER_DELAYS.badge, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                New Arrival
              </motion.div>

              {/* Heading – stagger 2 */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: STAGGER_DELAYS.heading, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6"
              >
                Welcome to{' '}
                {/* Shimmer gradient text (new) */}
                <ShimmerText>
                  {displayText}
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 1,
                      repeat: isTypingComplete ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                    style={{ WebkitTextFillColor: '#ed7620' }}
                  >
                    |
                  </motion.span>
                </ShimmerText>
              </motion.h1>

              {/* Body copy – stagger 3 */}
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: STAGGER_DELAYS.body, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Meet the Weison Essential Shirt—premium cotton, a modern tailored fit, and
                a polished look that moves with you from workdays to weekends.
              </motion.p>

              {/* Buttons – stagger 4 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: STAGGER_DELAYS.buttons, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <GlowButton href="/product" variant="primary">
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </GlowButton>

                <GlowButton href="/product" variant="ghost">
                  Learn More
                </GlowButton>
              </motion.div>

            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Scroll indicator (polished mouse icon)                            */}
        {/* ---------------------------------------------------------------- */}
        <ScrollIndicator />
      </section>
    </>
  );
}
