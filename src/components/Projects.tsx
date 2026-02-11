import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';

const projects = [
  { img: project1, name: 'VEGA', tags: ['Branding', 'UI/UX'], desc: 'Complete brand identity and visual system for a tech startup.' },
  { img: project2, name: 'Le Cenacle', tags: ['Web Design', 'Development'], desc: 'Premium website design and development for a consulting firm.' },
  { img: project3, name: 'C-Carré', tags: ['E-commerce', 'Web Design'], desc: 'Modern e-commerce platform with seamless shopping experience.' },
  { img: project4, name: 'Varroa Diagnostic', tags: ['Branding', 'UI/UX'], desc: 'Mobile app design and brand identity for a health-tech company.' },
  { img: project5, name: 'Holea', tags: ['Branding', 'Web Development'], desc: 'Elegant brand collateral and digital presence for a luxury brand.' },
];

const Projects = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { y: 60, stagger: 0.15 });

  return (
    <section ref={ref} className="section-padding bg-black relative z-10">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16" data-gsap="reveal">
          <div>
            <span className="text-[#3b82f6] font-medium tracking-wide uppercase text-[20px]">{t('projects.label')}</span>
            <h2 className="text-[32px] font-bold leading-tight tracking-tight mt-4 text-foreground">{t('projects.title')}</h2>
          </div>
          <p className="text-gray-400 text-[14px] leading-relaxed font-light max-w-xs">{t('projects.desc')}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="group" data-gsap="reveal">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img src={project.img} alt={project.name} className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map((tag) => (<span key={tag} className="tag-pill">{tag}</span>))}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{project.desc}</p>
            </div>
          ))}

          <div className="glass-card flex flex-col items-center justify-center text-center p-12" data-gsap="reveal">
            <h3 className="text-xl font-semibold text-foreground mb-4">{t('projects.cta.title')}</h3>
            <a href="#contact" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-secondary transition-colors">
              {t('projects.cta.button')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
