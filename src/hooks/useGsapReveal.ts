import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
};

/**
 * Attach scroll-triggered reveal to a container.
 * Children with `data-gsap="reveal"` will animate in.
 * Or pass a selector string to target specific children.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  selector = '[data-gsap="reveal"]',
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0.12,
      ease = 'power3.out',
      start = 'top 85%',
    } = options;

    // Set initial state
    gsap.set(targets, { y, x, opacity });

    const tl = gsap.to(targets, {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [selector, options.y, options.x, options.duration, options.delay, options.stagger, options.ease, options.start]);

  return ref;
}
