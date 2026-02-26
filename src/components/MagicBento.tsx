import { type CSSProperties, type ReactNode, type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 340;
const DEFAULT_GLOW_COLOR = '17, 116, 156';
const MOBILE_BREAKPOINT = 768;

export type MagicBentoCard = {
  title: string;
  description: string;
  label: string;
  icon?: ReactNode;
  color?: string;
};

type MagicBentoProps = {
  cards: MagicBentoCard[];
  className?: string;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
};

const createParticleElement = (x: number, y: number, color: string) => {
  const particle = document.createElement('span');
  particle.className = 'magic-bento-particle';
  particle.style.cssText = `
    left: ${x}px;
    top: ${y}px;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.55);
  `;
  return particle;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.9,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glowIntensity: number,
  radius: number,
) => {
  const rect = card.getBoundingClientRect();
  const x = ((mouseX - rect.left) / rect.width) * 100;
  const y = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${x}%`);
  card.style.setProperty('--glow-y', `${y}%`);
  card.style.setProperty('--glow-intensity', `${glowIntensity}`);
  card.style.setProperty('--glow-radius', `${radius}px`);
};

type ParticleCardProps = {
  children: ReactNode;
  className: string;
  style?: CSSProperties;
  disableAnimations: boolean;
  enableParticles: boolean;
  particleCount: number;
  glowColor: string;
  enableTilt: boolean;
  clickEffect: boolean;
  enableMagnetism: boolean;
};

const ParticleCard = ({
  children,
  className,
  style,
  disableAnimations,
  enableParticles,
  particleCount,
  glowColor,
  enableTilt,
  clickEffect,
  enableMagnetism,
}: ParticleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLSpanElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      gsap.killTweensOf(particle);
      particle.remove();
    });
    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    const card = cardRef.current;
    if (!card || disableAnimations || !enableParticles || particleCount <= 0) {
      return;
    }

    const rect = card.getBoundingClientRect();

    for (let index = 0; index < particleCount; index += 1) {
      const timeoutId = window.setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) {
          return;
        }

        const particle = createParticleElement(
          Math.random() * rect.width,
          Math.random() * rect.height,
          glowColor,
        );

        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(
          particle,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.28,
            ease: 'back.out(1.5)',
          },
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 90,
          y: (Math.random() - 0.5) * 90,
          duration: 2.2 + Math.random() * 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to(particle, {
          opacity: 0.25 + Math.random() * 0.3,
          duration: 1.5 + Math.random() * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }, index * 70);

      timeoutsRef.current.push(timeoutId);
    }
  }, [disableAnimations, enableParticles, particleCount, glowColor]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) {
      return;
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      spawnParticles();

      if (!disableAnimations && enableTilt) {
        gsap.to(element, {
          rotateX: 4,
          rotateY: 4,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearParticles();

      if (!disableAnimations && enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      if (!disableAnimations && enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (disableAnimations || (!enableTilt && !enableMagnetism)) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.15,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (!clickEffect || disableAnimations) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement('span');
      ripple.className = 'magic-bento-ripple';
      ripple.style.cssText = `
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        background: radial-gradient(circle, rgba(${glowColor}, 0.34) 0%, rgba(${glowColor}, 0.14) 36%, transparent 70%);
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearParticles();
      gsap.killTweensOf(element);
    };
  }, [
    clearParticles,
    clickEffect,
    disableAnimations,
    enableMagnetism,
    enableTilt,
    spawnParticles,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} magic-bento-particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

type GlobalSpotlightProps = {
  gridRef: RefObject<HTMLDivElement>;
  sectionRef: RefObject<HTMLDivElement>;
  disableAnimations: boolean;
  enabled: boolean;
  spotlightRadius: number;
  glowColor: string;
};

const GlobalSpotlight = ({
  gridRef,
  sectionRef,
  disableAnimations,
  enabled,
  spotlightRadius,
  glowColor,
}: GlobalSpotlightProps) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !enabled || !gridRef.current || !sectionRef.current) {
      return;
    }

    const spotlight = document.createElement('div');
    spotlight.className = 'magic-bento-global-spotlight';

    const size = Math.max(spotlightRadius * 2.4, 720);
    spotlight.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.16) 0%,
        rgba(${glowColor}, 0.09) 18%,
        rgba(${glowColor}, 0.05) 30%,
        rgba(${glowColor}, 0.02) 44%,
        transparent 70%
      );
    `;

    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (event: MouseEvent) => {
      const grid = gridRef.current;
      const section = sectionRef.current;
      const spotlightEl = spotlightRef.current;
      if (!grid || !section || !spotlightEl) {
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const isInside =
        event.clientX >= sectionRect.left &&
        event.clientX <= sectionRect.right &&
        event.clientY >= sectionRect.top &&
        event.clientY <= sectionRect.bottom;

      const cards = grid.querySelectorAll<HTMLElement>('.magic-bento-card');

      if (!isInside) {
        gsap.to(spotlightEl, {
          opacity: 0,
          duration: 0.28,
          ease: 'power2.out',
        });

        cards.forEach((card) => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minimumDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceFromCard =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) -
          Math.max(rect.width, rect.height) / 2;

        const normalizedDistance = Math.max(0, distanceFromCard);
        minimumDistance = Math.min(minimumDistance, normalizedDistance);

        let glowIntensity = 0;
        if (normalizedDistance <= proximity) {
          glowIntensity = 1;
        } else if (normalizedDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - normalizedDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card, event.clientX, event.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightEl, {
        left: event.clientX,
        top: event.clientY,
        duration: 0.12,
        ease: 'power2.out',
      });

      const targetOpacity =
        minimumDistance <= proximity
          ? 0.86
          : minimumDistance <= fadeDistance
            ? ((fadeDistance - minimumDistance) / (fadeDistance - proximity)) * 0.86
            : 0;

      gsap.to(spotlightEl, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      const grid = gridRef.current;
      const spotlightEl = spotlightRef.current;

      grid?.querySelectorAll<HTMLElement>('.magic-bento-card').forEach((card) => {
        card.style.setProperty('--glow-intensity', '0');
      });

      if (spotlightEl) {
        gsap.to(spotlightEl, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);

      if (spotlightRef.current) {
        spotlightRef.current.remove();
        spotlightRef.current = null;
      }
    };
  }, [disableAnimations, enabled, glowColor, gridRef, sectionRef, spotlightRadius]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const MagicBento = ({
  cards,
  className,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = false,
}: MagicBentoProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();

  const shouldDisableAnimations = disableAnimations || isMobile;

  if (!cards.length) {
    return null;
  }

  const cardClassName = [
    'magic-bento-card',
    textAutoHide ? 'magic-bento-card--text-autohide' : '',
    enableBorderGlow ? 'magic-bento-card--border-glow' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={sectionRef} className={`magic-bento-section ${className ?? ''}`}>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          sectionRef={sectionRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div ref={gridRef} className="magic-bento-grid">
        {cards.map((card, index) => {
          const style = {
            ...(card.color ? { background: card.color } : {}),
            '--glow-rgb': glowColor,
          } as CSSProperties;

          return (
            <ParticleCard
              key={`${card.title}-${index}`}
              className={cardClassName}
              style={style}
              disableAnimations={shouldDisableAnimations}
              enableParticles={enableStars}
              particleCount={particleCount}
              glowColor={glowColor}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
            >
              <div className="magic-bento-card__header">
                <span className="magic-bento-card__label">{card.label}</span>
                {card.icon ? (
                  <span className="magic-bento-card__icon" aria-hidden>
                    {card.icon}
                  </span>
                ) : null}
              </div>

              <div className="magic-bento-card__content">
                <h3 className="magic-bento-card__title">{card.title}</h3>
                <p className="magic-bento-card__description">{card.description}</p>
              </div>
            </ParticleCard>
          );
        })}
      </div>
    </div>
  );
};

export default MagicBento;
