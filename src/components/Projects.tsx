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
    titleKey: 'projects.card.1.title',
    descKey: 'projects.card.1.desc',
    tagKeys: ['projects.card.1.tag.1', 'projects.card.1.tag.2'],
  },
  {
    img: project2,
    titleKey: 'projects.card.2.title',
    descKey: 'projects.card.2.desc',
    tagKeys: ['projects.card.2.tag.1', 'projects.card.2.tag.2', 'projects.card.2.tag.3'],
  },
  {
    img: project3,
    titleKey: 'projects.card.3.title',
    descKey: 'projects.card.3.desc',
    tagKeys: ['projects.card.3.tag.1', 'projects.card.3.tag.2', 'projects.card.3.tag.3'],
  },
  {
    img: project4,
    titleKey: 'projects.card.4.title',
    descKey: 'projects.card.4.desc',
    tagKeys: ['projects.card.4.tag.1', 'projects.card.4.tag.2', 'projects.card.4.tag.3'],
  },
  {
    img: project5,
    titleKey: 'projects.card.5.title',
    descKey: 'projects.card.5.desc',
    tagKeys: ['projects.card.5.tag.1', 'projects.card.5.tag.2', 'projects.card.5.tag.3'],
  },
];

const Projects = () => {
  const { t, isRTL } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { y: 60, stagger: 0.15 });

  return (
    <section id="projects" ref={ref} className="relative z-10 bg-transparent py-20 sm:py-24">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 sm:mb-14" data-gsap="reveal">
          <div>
            <span className="text-primary font-medium tracking-wide text-[16px]">{t('projects.label')}</span>
            <h2 className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] mt-4 text-foreground">{t('projects.title')}</h2>
          </div>
          <p className="text-white/80 text-[16px] leading-[1.5] max-w-[430px] md:text-right">{t('projects.desc')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-12 sm:gap-y-16">
          {projects.map((project, i) => (
            <div key={project.titleKey} className="group" data-gsap="reveal">
              <div className="relative overflow-hidden rounded-sm mb-5 border border-white/10 bg-black/40">
                <img src={project.img} alt={t(project.titleKey)} className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute left-3 right-3 bottom-3 flex flex-wrap gap-1.5">
                  {project.tagKeys.map((tagKey) => (
                    <span key={tagKey} className="inline-flex items-center bg-black/78 border border-white/20 text-white px-2 py-1 text-[11px] leading-none">
                      {t(tagKey)}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-[36px] font-semibold leading-none tracking-[-0.02em] text-foreground">{t(project.titleKey)}</h3>
              <p className="text-[16px] leading-[1.45] text-white/78 mt-3">{t(project.descKey)}</p>
            </div>
          ))}

          <div className="relative min-h-[320px] sm:min-h-[380px] rounded-sm border border-white/10 bg-[linear-gradient(180deg,rgba(7,20,34,0.78)_0%,rgba(2,8,18,0.95)_100%)] overflow-hidden flex flex-col items-center justify-center text-center px-5" data-gsap="reveal">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14)_0%,transparent_65%)]" />
            <h3 className="relative z-10 text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground mb-6">{t('projects.cta.title')}</h3>
            <a href="/contact" className="relative z-10 inline-flex items-center gap-2 bg-white text-black px-4 py-2 text-[16px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              {t('projects.cta.button')}
              <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
            </a>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center" data-gsap="reveal">
          <a href="#" className="inline-flex items-center gap-2 text-[16px] font-medium text-foreground hover:text-primary transition-colors">
            {t('projects.link')} <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
