import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight } from 'lucide-react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';

const projects = [
  {
    img: project1,
    name: 'VEGA',
    tags: ['Branding', 'UX/UI Design', 'Web development'],
    desc: 'VEGA is a Brussels based SaaS firm. Their branding together with logo and one site was aligned to reflect innovation and simplify the way users interact with the product.',
  },
  {
    img: project2,
    name: 'Le Cenacle',
    tags: ['UX/UI Design', 'Web development', 'Photography', 'Drone Photography'],
    desc: 'Le Cenacle needed a new digital profile that reflected their premium architecture identity. We redesigned their presence end-to-end while preserving a strong local character.',
  },
  {
    img: project3,
    name: 'C-Carré',
    tags: ['Branding', 'Print', 'UX/UI Design', 'Web development', 'Ads'],
    desc: 'C-Carré ERP needed rebranding with a strong professional and B2B position. Based in Brussels and Wavre, they support installers and homeowners in electric, solar and energy performance.',
  },
  {
    img: project4,
    name: 'Varroa Diagnostic',
    tags: ['Branding', 'UX/UI Design', 'Web development'],
    desc: 'Varroa Diagnostic had no visual identity and no clear site experience. A simple visual language, icon system and animation DNA gave the team a clear and modern footprint across touchpoints.',
  },
  {
    img: project5,
    name: 'Holea',
    tags: ['Branding', 'UX/UI Design', 'Web development', 'Photography', 'Print'],
    desc: 'Holea is a hair salon with premium values. Their logo and visual identity were refreshed for social media and communications to amplify the customer experience.',
  },
];

const Projects = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { y: 60, stagger: 0.15 });

  return (
    <section id="projects" ref={ref} className="relative z-10 bg-transparent py-24 sm:py-28">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14 sm:mb-16" data-gsap="reveal">
          <div>
            <span className="text-primary font-medium tracking-wide text-[16px]">{t('projects.label')}</span>
            <h2 className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] mt-4 text-foreground">{t('projects.title')}</h2>
          </div>
          <p className="text-white/80 text-[16px] leading-[1.5] max-w-[430px] md:text-right">{t('projects.desc')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 sm:gap-y-20">
          {projects.map((project, i) => (
            <div key={project.name} className="group" data-gsap="reveal">
              <div className="relative overflow-hidden rounded-sm mb-5 border border-white/10 bg-black/40">
                <img src={project.img} alt={project.name} className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute left-3 right-3 bottom-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center bg-black/78 border border-white/20 text-white px-2 py-1 text-[11px] leading-none">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-[36px] font-semibold leading-none tracking-[-0.02em] text-foreground">{project.name}</h3>
              <p className="text-[16px] leading-[1.45] text-white/78 mt-3">{project.desc}</p>
            </div>
          ))}

          <div className="relative min-h-[320px] sm:min-h-[380px] rounded-sm border border-white/10 bg-[linear-gradient(180deg,rgba(7,20,34,0.78)_0%,rgba(2,8,18,0.95)_100%)] overflow-hidden flex flex-col items-center justify-center text-center px-6" data-gsap="reveal">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14)_0%,transparent_65%)]" />
            <h3 className="relative z-10 text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground mb-6">{t('projects.cta.title')}</h3>
            <a href="#contact" className="relative z-10 inline-flex items-center gap-2 bg-white text-black px-4 py-2 text-[16px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              {t('projects.cta.button')}
              <ChevronRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 text-center" data-gsap="reveal">
          <a href="#" className="inline-flex items-center gap-2 text-[16px] font-medium text-foreground hover:text-primary transition-colors">
            {t('projects.link')} <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
