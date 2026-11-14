import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiSun,
  FiActivity,
  FiGrid,
  FiCpu,
} from 'react-icons/fi';
import { usePublicProjects } from '../../hooks/usePublicProjects';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms/Header';
import { config } from '../../constants/config';
import { fadeIn } from '../../utils/motion';
const icons = { solar: FiSun, power: FiActivity, buildings: FiGrid, automation: FiCpu };
function Works() {
  const { projects, loading, error, reload } = usePublicProjects();
  const featured = projects.filter(p => p.isFeatured);
  const entries = featured.length ? featured : projects.slice(0, 6);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const mobile = matchMedia('(max-width:639px)');
    const tablet = matchMedia('(max-width:1023px)');
    const update = () => {
      setPerPage(mobile.matches ? 1 : tablet.matches ? 2 : 3);
      setPage(0);
    };
    update();
    mobile.addEventListener('change', update);
    tablet.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
    };
  }, []);
  const pages = Math.max(1, Math.ceil(entries.length / perPage));
  const current = Math.min(page, pages - 1);
  return (
    <>
      <Header useMotion {...config.sections.works} />
      <p className="text-secondary text-sm leading-7 mt-4 max-w-2xl">
        {config.sections.works.content}
      </p>
      {loading ? (
        <p role="status" className="text-secondary text-sm mt-8">
          Loading projects…
        </p>
      ) : error ? (
        <p role="status" className="text-secondary text-sm mt-8">
          {error}{' '}
          <button className="text-[#c9b5ff] underline" onClick={reload}>
            Try again
          </button>
        </p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {entries.slice(current * perPage, (current + 1) * perPage).map((project, index) => {
              const Icon = icons[project.discipline] || FiGrid;
              return (
                <motion.div
                  className="h-full"
                  key={project.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeIn('up', 'tween', index * 0.04, 0.3)}
                >
                  <Link
                    to={`/projects?project=${encodeURIComponent(project.id)}`}
                    className="surface-interaction h-full flex flex-col bg-tertiary/40 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="mb-5">
                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={project.coverAlt || project.title}
                          className="w-full aspect-video object-cover rounded-xl"
                          loading="lazy"
                        />
                      ) : (
                        <span className="expertise-icon">
                          <Icon size={22} />
                        </span>
                      )}
                    </div>
                    <h3 className="text-white text-lg font-medium leading-snug">{project.title}</h3>
                    <p className="text-secondary text-xs leading-7 mt-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.tags?.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#bfaed7] border border-white/10 rounded-full px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex justify-between items-center border-t border-white/10 mt-6 pt-4 text-[#c9b5ff] text-xs">
                      View project
                      <FiArrowUpRight size={17} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          {!entries.length && (
            <p className="text-secondary text-sm mt-8">New projects will be published here.</p>
          )}
          {pages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-7">
              <button
                aria-label="Previous projects"
                className="adminless-project-nav"
                onClick={() => setPage((current - 1 + pages) % pages)}
              >
                <FiChevronLeft size={17} />
              </button>
              <span className="text-secondary text-xs" role="status">
                Page {current + 1} of {pages}
              </span>
              <button
                aria-label="Next projects"
                className="adminless-project-nav"
                onClick={() => setPage((current + 1) % pages)}
              >
                <FiChevronRight size={17} />
              </button>
            </div>
          )}
        </>
      )}
      <div className="flex justify-center mt-8">
        <Link to="/projects" className="text-[#c9b5ff] text-sm inline-flex items-center gap-2">
          View all projects
          <FiArrowUpRight size={16} />
        </Link>
      </div>
    </>
  );
}
export default SectionWrapper(Works, 'selected-projects');
