import { useLanguage } from '@/contexts/LanguageContext';
import { Quote } from 'lucide-react';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import LogoLoop from './LogoLoop';

const testimonials = [
  {
    quote: { en: 'AKIS Studio transformed our brand completely. The attention to detail and strategic approach exceeded all expectations.', ar: 'حوّل استوديو AKIS علامتنا التجارية بالكامل. الاهتمام بالتفاصيل والنهج الاستراتيجي فاق كل التوقعات.' },
    name: 'Sarah Mitchell',
    role: { en: 'CEO, VEGA Tech', ar: 'الرئيس التنفيذي، VEGA Tech' },
  },
  {
    quote: { en: 'Working with AKIS was a game-changer. They delivered a website that truly represents who we are and drives real results.', ar: 'العمل مع AKIS كان نقطة تحول. قدموا موقعاً يمثلنا حقاً ويحقق نتائج ملموسة.' },
    name: 'Marc Dubois',
    role: { en: 'Founder, Le Cenacle', ar: 'المؤسس، Le Cenacle' },
  },
  {
    quote: { en: 'Their design sensibility is unmatched. Every pixel has a purpose and the final product speaks for itself.', ar: 'حسهم التصميمي لا يُضاهى. كل بكسل له غرض والمنتج النهائي يتحدث عن نفسه.' },
    name: 'Léa Bernard',
    role: { en: 'CMO, Holea', ar: 'مديرة التسويق، Holea' },
  },
];

// Placeholder logos using text/icons since react-icons is not installed
const techLogos = [
  { node: <span className="text-2xl font-bold font-mono text-white/50 hover:text-white transition-colors">REACT</span>, title: "React", href: "https://react.dev" },
  { node: <span className="text-2xl font-bold font-mono text-white/50 hover:text-white transition-colors">NEXT.JS</span>, title: "Next.js", href: "https://nextjs.org" },
  { node: <span className="text-2xl font-bold font-mono text-white/50 hover:text-white transition-colors">TYPESCRIPT</span>, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <span className="text-2xl font-bold font-mono text-white/50 hover:text-white transition-colors">TAILWIND</span>, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <span className="text-2xl font-bold font-mono text-white/50 hover:text-white transition-colors">NODE.JS</span>, title: "Node.js", href: "https://nodejs.org" },
  { node: <span className="text-2xl font-bold font-mono text-white/50 hover:text-white transition-colors">THREE.JS</span>, title: "Three.js", href: "https://threejs.org" },
  { node: <span className="text-2xl font-bold font-mono text-white/50 hover:text-white transition-colors">GSAP</span>, title: "GSAP", href: "https://greensock.com" },
  { node: <span className="text-2xl font-bold font-mono text-white/50 hover:text-white transition-colors">VITE</span>, title: "Vite", href: "https://vitejs.dev" },
];

const Testimonials = () => {
  const { t, lang } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { stagger: 0.12 });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className="text-center mb-16" data-gsap="reveal">
          <span className="text-[#3b82f6] font-medium tracking-wide uppercase text-[20px]">{t('testimonials.label')}</span>
          <h2 className="text-[32px] font-bold leading-tight tracking-tight mt-4 text-foreground">{t('testimonials.title')}</h2>
          <p className="text-gray-400 text-[14px] leading-relaxed font-light mt-3">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {testimonials.map((item, i) => (
            <div key={i} className="glass-card p-8 flex flex-col" data-gsap="reveal">
              <Quote size={20} className="text-primary/40 mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{item.quote[lang]}</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Partners Loop */}
      <div className="w-full relative z-0 py-8">
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={40}
          gap={80}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Technology partners"
          className="opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>
    </section>
  );
};

export default Testimonials;
