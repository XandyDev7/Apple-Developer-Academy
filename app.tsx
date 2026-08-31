'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, Code2, ExternalLink, GitBranch, Globe2, Pencil, RotateCcw } from 'lucide-react'

type Project = {
  id: string
  title: string
  url: string
  category: 'Web' | 'Jogo'
  description: string
  accent: string
  icon: typeof Code2
}

const projects: Project[] = [
  { id: 'cp', title: 'CP', url: 'https://github.com/xandydrv/cp', category: 'Web', description: 'Um projeto experimental publicado no GitHub. Adicione aqui o contexto, as tecnologias usadas e o que torna este trabalho especial.', accent: 'coral', icon: GitBranch },
  { id: 'buiu-trab', title: 'Buiu Trab', url: 'https://xandydrv.github.io/buiu-trab', category: 'Web', description: 'Uma experiência web construída para transformar uma ideia em algo navegável, visual e funcional.', accent: 'blue', icon: Globe2 },
  { id: 'biblioteca-book', title: 'Biblioteca Book', url: 'https://xandydrv.github.io/biblioteca-book-/#', category: 'Web', description: 'Uma biblioteca digital com foco em descoberta, organização e uma experiência simples para encontrar livros.', accent: 'yellow', icon: Code2 },
  { id: '0000000', title: '0000000', url: 'https://xandydrv.github.io/0000000', category: 'Web', description: 'Um experimento visual de identidade marcante, explorando atmosfera, composição e interação na web.', accent: 'pink', icon: Globe2 },
  { id: 'aas', title: 'AAS', url: 'https://xandydrv.github.io/aas', category: 'Web', description: 'Projeto autoral em desenvolvimento. Use este espaço para contar a história por trás da ideia e mostrar seu processo.', accent: 'green', icon: Code2 },
]

export default function Page() {
  const [activeFilter, setActiveFilter] = useState<'Todos' | 'Web'>('Todos')
  const [openId, setOpenId] = useState<string | null>(null)
  const [descriptions, setDescriptions] = useState(() => Object.fromEntries(projects.map((project) => [project.id, project.description])))
  const [savedId, setSavedId] = useState<string | null>(null)

  const visibleProjects = projects.filter((project) => activeFilter === 'Todos' || project.category === activeFilter)

  function saveDescription(id: string) {
    setSavedId(id)
    window.setTimeout(() => setSavedId(null), 1800)
  }

  return (
    <main className="portfolio-shell">
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Início do portfólio">
          <span className="brand-mark">XD</span>
          <span>xandydrv<span className="brand-dot">.</span></span>
        </a>
        <nav className="header-nav" aria-label="Navegação principal">
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
          <a href="https://github.com/xandydrv" target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
        </nav>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Portfólio pessoal / 2026</p>
          <h1 id="hero-title">Ideias que<br /><em>ganham forma.</em></h1>
          <p className="hero-text">Uma coleção de projetos, experiências e mundos que nasceram da vontade de criar algo diferente.</p>
          <a className="hero-link" href="#projetos">Explorar projetos <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-frame"><div className="art-sun" /><div className="art-line line-one" /><div className="art-line line-two" /><span className="art-label">WORK<br />IN<br />PROGRESS</span><span className="art-number">06</span></div>
        </div>
      </section>

      <section id="projetos" className="projects-section" aria-labelledby="projects-title">
        <div className="section-heading"><div><p className="eyebrow">01 / Acervo</p><h2 id="projects-title">Projetos selecionados</h2></div><p className="section-note">Abra uma caixa para<br />ver mais detalhes.</p></div>
        <div className="filter-row" role="group" aria-label="Filtrar projetos">
          {(['Todos', 'Web'] as const).map((filter) => <button key={filter} className={activeFilter === filter ? 'filter active' : 'filter'} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>)}
          <span className="project-count">{String(visibleProjects.length).padStart(2, '0')} projetos</span>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project, index) => {
            const Icon = project.icon
            const isOpen = openId === project.id
            return <article key={project.id} className={`project-card accent-${project.accent} ${isOpen ? 'is-open' : ''}`}>
              <button className="card-trigger" onClick={() => setOpenId(isOpen ? null : project.id)} aria-expanded={isOpen} aria-controls={`details-${project.id}`}>
                <span className="card-top"><span className="card-index">0{index + 1}</span><span className="card-category">{project.category}</span></span>
                <span className="card-icon"><Icon aria-hidden="true" /></span><span className="card-title">{project.title}</span>
                <span className="card-bottom"><span>{new URL(project.url).hostname.replace('www.', '')}</span><ChevronDown aria-hidden="true" className="chevron" /></span>
              </button>
              <div id={`details-${project.id}`} className="card-details" hidden={!isOpen}>
                <label htmlFor={`description-${project.id}`}>Sobre o projeto</label>
                <textarea id={`description-${project.id}`} value={descriptions[project.id]} onChange={(event) => setDescriptions({ ...descriptions, [project.id]: event.target.value })} />
                <div className="details-actions"><button className="text-button" onClick={() => setDescriptions({ ...descriptions, [project.id]: project.description })}><RotateCcw aria-hidden="true" /> Restaurar</button><button className="save-button" onClick={() => saveDescription(project.id)}>{savedId === project.id ? <><Check aria-hidden="true" /> Salvo</> : <><Pencil aria-hidden="true" /> Salvar descrição</>}</button><a className="visit-button" href={project.url} target="_blank" rel="noreferrer">Abrir projeto <ExternalLink aria-hidden="true" /></a></div>
              </div>
            </article>
          })}
        </div>
      </section>

      <section id="sobre" className="about-section"><p className="eyebrow">02 / Manifesto</p><div className="about-content"><h2>Construir é uma<br /><em>forma de pensar.</em></h2><p>Sou um criador independente explorando código, jogos e interfaces para transformar curiosidade em experiências. Este portfólio é um registro vivo desse caminho.</p></div></section>
      <footer><span>© 2026 xandydrv</span><span>Feito com curiosidade<span className="footer-symbol"> × </span>e código</span><a href="#top">Voltar ao topo ↑</a></footer>
    </main>
  )
}
