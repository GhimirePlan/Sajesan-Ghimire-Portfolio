import './projects.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiSearch,
  FiX,
  FiSun,
  FiActivity,
  FiGrid,
  FiCpu,
  FiLink,
} from 'react-icons/fi';
import { projectCatalog, disciplines, type CatalogProject } from '../../constants/projectCatalog';
import { fadeIn } from '../../utils/motion';

const icons = { solar: FiSun, power: FiActivity, buildings: FiGrid, automation: FiCpu };
const scopeLabel = (scope: string) =>
  scope === 'academic' ? 'Academic & research' : 'Professional';
function ProjectDetails({ project, onClose }: { project: CatalogProject; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [copyState, setCopyState] = useState('');
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    setCopyState('');
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [project.id]);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState('Link copied');
    } catch {
      setCopyState('fallback');
    }
  }
  const Icon = icons[project.discipline];
  return createPortal(
    <dialog
      ref={ref}
      className="project-detail-dialog"
      aria-labelledby="project-detail-title"
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="project-dialog-shell">
        <div className="service-dialog-toolbar">
          <span>Project details</span>
          <button
            type="button"
            autoFocus
            className="service-dialog-close"
            aria-label="Close project details"
            onClick={onClose}
          >
            <span>Close</span>
            <FiX size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
        <div className="service-dialog-content">
          <span className="project-discipline-icon">
            <Icon size={24} aria-hidden="true" />
          </span>
          <p className="project-detail-kicker">
            {scopeLabel(project.scope)} ·{' '}
            {disciplines.find(d => d.id === project.discipline)?.label}
          </p>
          <h2 id="project-detail-title" className="project-detail-title">
            {project.title}
          </h2>
          {project.subtitle && (
            <p className="text-[#c9b5ff] text-sm leading-6 mt-3">{project.subtitle}</p>
          )}
          <div className="project-detail-section">
            <h3>Overview</h3>
            <p>{project.description}</p>
          </div>
          {!!project.details?.length && (
            <div className="project-detail-section">
              <h3>Role & outcomes</h3>
              <ul>
                {project.details.map(detail => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
          {!!project.tags?.length && (
            <div className="project-detail-section">
              <h3>Tools & topics</h3>
              <div className="project-tag-list">
                {project.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
          <div className="project-detail-actions">
            <Link
              to="/#contact"
              className="portfolio-button rounded-full bg-[#915EFF] text-white px-5 py-3 text-xs font-medium"
            >
              Discuss this project <FiArrowUpRight size={15} aria-hidden="true" />
            </Link>
            {project.sourceUrl && (
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                View source <FiArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            <button type="button" onClick={copyLink}>
              <FiLink size={15} aria-hidden="true" />
              Copy project link
            </button>
          </div>
          <p role="status" className="text-[#c9b5ff] text-xs mt-3">
            {copyState !== 'fallback' ? copyState : ''}
          </p>
          {copyState === 'fallback' && (
            <label className="project-copy-fallback">
              Project link
              <input
                readOnly
                value={window.location.href}
                onFocus={event => event.target.select()}
              />
            </label>
          )}
        </div>
      </div>
    </dialog>,
    document.body
  );
}
export default function Projects() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const scope = ['professional', 'academic'].includes(params.get('scope') || '')
    ? params.get('scope')!
    : 'all';
  const discipline = disciplines.some(d => d.id === params.get('discipline'))
    ? params.get('discipline')!
    : 'all';
  const selected = projectCatalog.find(p => p.id === params.get('project'));
  const invalidProject = params.has('project') && !selected;
  useEffect(() => {
    document.title = selected
      ? `${selected.title} | Sajesan Ghimire`
      : 'Engineering Projects | Sajesan Ghimire';
  }, [selected]);
  const visible = useMemo(
    () =>
      projectCatalog.filter(
        p =>
          (scope === 'all' || p.scope === scope) &&
          (discipline === 'all' || p.discipline === discipline) &&
          `${p.title} ${p.subtitle || ''} ${p.description} ${p.tags?.join(' ') || ''}`
            .toLowerCase()
            .includes(query.trim().toLowerCase())
      ),
    [scope, discipline, query]
  );
  function update(key: string, value: string, replace = false) {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    next.delete('project');
    setParams(next, { replace, preventScrollReset: true });
  }
  function openProject(project: CatalogProject) {
    const next = new URLSearchParams(params);
    next.set('project', project.id);
    setParams(next, { preventScrollReset: true });
  }
  function closeProject() {
    const next = new URLSearchParams(params);
    next.delete('project');
    setParams(next, { replace: true, preventScrollReset: true });
  }
  const activeFilters = !!query || scope !== 'all' || discipline !== 'all';
  return (
    <section
      id="projects"
      className="project-browser max-w-7xl mx-auto px-6 sm:px-16 pt-10 sm:pt-16 pb-12"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs text-secondary hover:text-white mb-8"
      >
        <FiArrowLeft size={15} aria-hidden="true" />
        Back to home
      </Link>
      <header className="project-browser-heading">
        <div>
          <p className="text-[#c9b5ff] text-[11px] tracking-[.18em] uppercase mb-4">
            Selected engineering work
          </p>
          <h1>Engineering projects</h1>
          <p className="project-browser-intro">
            Solar PV, power systems, building services, and automation. Explore professional work
            and academic research.
          </p>
        </div>
        <div className="project-catalog-note">
          <span>{projectCatalog.length}</span>
          <p>
            projects across
            <br />4 engineering disciplines
          </p>
        </div>
      </header>
      <div className="project-browser-toolbar">
        <div className="project-scope-filters" role="group" aria-label="Project type">
          {[
            ['all', 'All projects'],
            ['professional', 'Professional'],
            ['academic', 'Academic & research'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={scope === value}
              onClick={() => update('scope', value)}
            >
              {label}
              <span>
                {value === 'all'
                  ? projectCatalog.length
                  : projectCatalog.filter(p => p.scope === value).length}
              </span>
            </button>
          ))}
        </div>
        <label className="project-search">
          <FiSearch size={17} aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            maxLength={200}
            placeholder="Search projects, tools, or topics"
            onChange={event => update('q', event.target.value, true)}
          />
        </label>
      </div>
      <div className="project-results-bar">
        <label className="project-discipline-filter">
          Discipline
          <select
            aria-label="Discipline"
            value={discipline}
            onChange={event => update('discipline', event.target.value)}
          >
            <option value="all">All disciplines</option>
            {disciplines.map(d => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-4">
          <p role="status" className="text-secondary text-xs">
            {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          </p>
          {activeFilters && (
            <button
              type="button"
              className="text-[#c9b5ff] text-xs"
              onClick={() => setParams({}, { preventScrollReset: true })}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
      {invalidProject && (
        <div className="project-inline-notice" role="status">
          This project link is unavailable. Browse the projects below.
          <button type="button" onClick={closeProject}>
            Dismiss
          </button>
        </div>
      )}
      {visible.length ? (
        <div className="project-browser-grid">
          {visible.map((project, index) => {
            const Icon = icons[project.discipline];
            const capacity = project.tags?.find(tag => /\b(?:k|M)Wp?\b/i.test(tag));
            return (
              <motion.button
                key={project.id}
                type="button"
                className="catalog-project-card"
                aria-label={`View details: ${project.title} — ${project.subtitle || project.group}`}
                aria-haspopup="dialog"
                onClick={() => openProject(project)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn('up', 'tween', Math.min(index % 3, 2) * 0.04, 0.3)}
              >
                <span className="catalog-card-top">
                  <span className="project-discipline-icon">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <span className="catalog-card-scope">{scopeLabel(project.scope)}</span>
                  {capacity && <span className="catalog-capacity">{capacity}</span>}
                </span>
                <span className="catalog-card-title">{project.title}</span>
                <span className="catalog-card-subtitle">{project.subtitle}</span>
                <span className="catalog-card-description">{project.description}</span>
                <span className="project-tag-list">
                  {project.tags?.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
                </span>
                <span className="catalog-card-footer">
                  <span>{disciplines.find(d => d.id === project.discipline)?.label}</span>
                  <FiArrowUpRight size={18} aria-hidden="true" />
                </span>
              </motion.button>
            );
          })}
        </div>
      ) : (
        <div className="project-empty-state">
          <FiSearch size={25} aria-hidden="true" />
          <h2>No matching projects</h2>
          <p>Try a different keyword or clear the filters to see the full collection.</p>
          <button type="button" onClick={() => setParams({}, { preventScrollReset: true })}>
            Clear filters
          </button>
        </div>
      )}
      <div className="project-browser-footer">
        <p>Have a similar engineering challenge?</p>
        <Link to="/#contact">
          Let’s discuss your project <FiArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      {selected && <ProjectDetails project={selected} onClose={closeProject} />}
    </section>
  );
}
