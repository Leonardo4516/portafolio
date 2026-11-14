import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const handleScrollToProjects = (e, projectId) => {
    e.preventDefault()
    if (projectId) {
      window.dispatchEvent(new CustomEvent('highlight-project', { detail: { projectId } }))
    } else {
      const element = document.querySelector('#proyectos')
      if (element) {
        const navHeight = 70
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        if (window.history.pushState) {
          window.history.pushState(null, null, '#proyectos')
        }
      }
    }
  }

  return (
    <section id="sobre-mi" className="py-28 px-5 sm:px-8 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* El planeta violeta de esta sección está a la izquierda: el texto va a la derecha */}
        <div className="lg:ml-auto lg:w-[56%] sobre-espacio space-y-20">
          {/* Encabezado */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">{t.about.tag}</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-5">
              {t.about.title} <span className="text-violet-300">{t.about.titleHighlight}</span>
            </h2>
            <p className="text-neutral-200 text-base leading-relaxed max-w-xl">{t.about.desc}</p>

            {/* Pilares */}
            <ol className="mt-10 border-t border-white/10">
              {t.about.pillars.map((item, idx) => (
                <li key={idx} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-6 border-b border-white/10">
                  <span className="font-mono text-xs text-violet-300 pt-1.5">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-neutral-300 text-[15px] leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Experiencia y formación (del CV) */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">{t.about.experience.badge}</p>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-3 mb-8">
              {t.about.experience.title} <span className="text-violet-300">{t.about.experience.titleHighlight}</span>
            </h3>
            <ol className="border-t border-white/10">
              {t.about.experience.jobs.map((job) => (
                <li key={job.company + job.date} className="grid sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-1 py-6 border-b border-white/10">
                  <p className="font-mono text-xs text-neutral-400 pt-1">{job.date}</p>
                  <div>
                    <p className="font-display text-lg font-semibold text-white">{job.role}</p>
                    <p className="font-mono text-sm text-violet-300 mb-2">{job.company}</p>
                    <p className="text-neutral-300 text-[15px] leading-relaxed">{job.desc}</p>
                  </div>
                </li>
              ))}
              {t.about.experience.education.map((ed) => (
                <li key={ed.title} className="grid sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-1 py-6 border-b border-white/10">
                  <p className="font-mono text-xs text-neutral-400 pt-1">{ed.date}</p>
                  <div>
                    <p className="font-display text-lg font-semibold text-white">{ed.title}</p>
                    <p className="text-neutral-300 text-[15px]">{ed.company}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href="/CV_Leonardo_Hernandez.pdf"
              download
              className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-violet-300 hover:text-white transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-violet-400/40 group-hover:decoration-white">
                {t.about.experience.cv}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Estándares de ingeniería */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">{t.about.standardsBadge}</p>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-3 mb-4">
              {t.about.standardsTitle}
            </h3>
            <p className="text-neutral-200 text-base leading-relaxed mb-8">{t.about.standardsDesc}</p>
            <dl className="border-t border-white/10">
              {t.about.standards.map((standard, idx) => (
                <div key={idx} className="grid sm:grid-cols-[13rem_1fr] gap-x-6 gap-y-1 py-4 border-b border-white/10">
                  <dt className="font-mono text-sm text-white">{standard.label}</dt>
                  <dd className="text-neutral-300 text-[15px] leading-relaxed">{standard.desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Habilidades blandas con evidencia en código */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">{t.about.softSkillsBadge}</p>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-3 mb-4">
              {t.about.softSkillsTitle} <span className="text-violet-300">{t.about.softSkillsHighlight}</span>
            </h3>
            <p className="text-neutral-200 text-base leading-relaxed mb-8">{t.about.softSkillsDesc}</p>
            <ol className="border-t border-white/10">
              {t.about.softSkills.map((skill) => (
                <li key={skill.id} className="py-7 border-b border-white/10">
                  <h4 className="font-display text-xl font-semibold text-white">{skill.title}</h4>
                  <p className="font-mono text-xs text-violet-300 mt-1 mb-3">{skill.subtitle}</p>
                  <p className="text-neutral-300 text-[15px] leading-relaxed mb-4">{skill.desc}</p>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    <span className="font-mono text-xs uppercase tracking-wider mr-2">{t.about.evidenceLabel}</span>
                    <span className="text-neutral-200">{skill.evidenceProject}</span>
                    <span className="mx-2">·</span>
                    {skill.evidenceDetails}
                  </p>
                  <a
                    href="#proyectos"
                    onClick={(e) => handleScrollToProjects(e, skill.projectId)}
                    className="mt-3 inline-flex items-center gap-2 font-mono text-sm text-violet-300 hover:text-white transition-colors group"
                  >
                    <span className="underline underline-offset-4 decoration-violet-400/40 group-hover:decoration-white">
                      {t.about.viewProjectAction}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
