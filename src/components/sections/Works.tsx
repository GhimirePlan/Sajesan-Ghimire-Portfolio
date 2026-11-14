import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, memo, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { researchgate } from '../../assets';
import { SectionWrapper } from '../../hoc';
import { projects } from '../../constants';
import { fadeIn } from '../../utils/motion';
import { config } from '../../constants/config';
import { Header } from '../atoms/Header';
import { TProject } from '../../types';

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
}) => {
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.08, 0.3)}>
      <div className="surface-interaction h-full">
        <div className="bg-tertiary/60 border border-white/10 w-full rounded-2xl p-5 h-[430px] flex flex-col">
          <div className="relative h-[200px] w-full">
            <img
              loading="lazy"
              decoding="async"
              src={image}
              alt={name}
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
              <a
                href={sourceCodeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Explore ${name}`}
                className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
              >
                <img src={researchgate} alt="" className="h-1/2 w-1/2 object-contain" />
              </a>
            </div>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <h3 className="text-[19px] leading-snug font-semibold text-white line-clamp-2">
              {name}
            </h3>
            <p className="text-secondary mt-2 text-[14px] line-clamp-4 flex-1">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag.name}
                  className={`text-[11px] px-2.5 py-1 rounded-full bg-[#915EFF]/10 text-[#c9b5ff]`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 48 : -48,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ProjectsWrapper = memo(
  ({
    children,
    direction,
    onSwipe,
  }: {
    children: React.ReactNode;
    direction: number;
    onSwipe: (direction: number) => void;
  }) => {
    return (
      <motion.div
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: 'tween', duration: 0.25, ease: 'easeOut' },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(_e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);
          if (swipe < -swipeConfidenceThreshold) {
            onSwipe(1);
          } else if (swipe > swipeConfidenceThreshold) {
            onSwipe(-1);
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
      >
        {children}
      </motion.div>
    );
  }
);

ProjectsWrapper.displayName = 'ProjectsWrapper';

const Works = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(3);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 639px)');
    const tablet = window.matchMedia('(max-width: 1023px)');
    const update = () => {
      setProjectsPerPage(mobile.matches ? 1 : tablet.matches ? 2 : 3);
      setCurrentPage(0);
    };
    update();
    mobile.addEventListener('change', update);
    tablet.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
    };
  }, []);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  useEffect(() => {
    setCurrentPage(0);
    setDirection(0);
  }, []);

  const handlePageChange = useCallback(
    (newPage: number, newDirection: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setDirection(newDirection);
      setCurrentPage(newPage);
      setTimeout(() => setIsTransitioning(false), 280);
    },
    [isTransitioning]
  );

  const handlePrevPage = useCallback(() => {
    const newPage = currentPage - 1;
    handlePageChange(newPage < 0 ? totalPages - 1 : newPage, -1);
  }, [currentPage, totalPages, handlePageChange]);

  const handleNextPage = useCallback(() => {
    const newPage = currentPage + 1;
    handlePageChange(newPage >= totalPages ? 0 : newPage, 1);
  }, [currentPage, totalPages, handlePageChange]);

  const startIndex = currentPage * projectsPerPage;
  const endIndex = Math.min(startIndex + projectsPerPage, projects.length);
  const visibleProjects = projects.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <ProjectsWrapper
            key={currentPage}
            direction={direction}
            onSwipe={direction => (direction > 0 ? handleNextPage() : handlePrevPage())}
          >
            {visibleProjects.map((project, index) => (
              <div key={`${currentPage}-${project.name}`} className="min-w-0 w-full">
                <ProjectCard index={index} {...project} />
              </div>
            ))}
          </ProjectsWrapper>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={handlePrevPage}
            disabled={isTransitioning}
            className={`group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm bg-tertiary px-4 py-2.5 rounded-lg text-white transition-all ${
              isTransitioning
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-opacity-80 hover:scale-105'
            }`}
          >
            <FiChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Previous
          </button>
          <span aria-live="polite" className="text-secondary text-xs flex items-center gap-2">
            <span className="bg-tertiary px-2 sm:px-4 py-2 rounded-lg">
              Page {currentPage + 1} of {totalPages}
            </span>
          </span>
          <button
            onClick={handleNextPage}
            disabled={isTransitioning}
            className={`group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm bg-tertiary px-4 py-2.5 rounded-lg text-white transition-all ${
              isTransitioning
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-opacity-80 hover:scale-105'
            }`}
          >
            Next
            <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              aria-label={`Go to project page ${i + 1}`}
              aria-current={currentPage === i ? 'page' : undefined}
              onClick={() => handlePageChange(i, i > currentPage ? 1 : -1)}
              disabled={isTransitioning}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === i ? 'bg-[#915EFF] scale-125' : 'bg-tertiary hover:bg-opacity-80'
              } ${isTransitioning ? 'opacity-50' : ''}`}
            />
          ))}
        </div>

        <Link
          to="/projects"
          className="mt-4 flex items-center gap-2 bg-tertiary text-white px-6 py-3 rounded-xl border border-white/10 font-medium text-sm hover:bg-opacity-80 transition-all hover:scale-105 shadow-md shadow-primary"
        >
          View all projects
          <FiChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'selected-projects');
