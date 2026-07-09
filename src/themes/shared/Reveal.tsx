'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type RevealTag = 'div' | 'li' | 'dl';

interface Props {
  children: ReactNode;
  /** ms — valid values mirror data-reveal-delay: 0, 80, 160, 240, 320, 400 */
  delay?: number;
  as?: RevealTag;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  as = 'div',
  className,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
