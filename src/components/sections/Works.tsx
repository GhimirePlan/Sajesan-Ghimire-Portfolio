import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { researchgate } from "../../assets";
import { SectionWrapper } from "../../hoc";
import { projects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TProject } from "../../types";

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        glareColor="#aaa6c3"
        transitionSpeed={1500}
        scale={1.02}
        gyroscope={false}
      >
        <div className="bg-tertiary w-full rounded-2xl p-5 sm:w-[300px]">
          <div className="relative h-[230px] w-full">
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
              <div
                onClick={() => window.open(sourceCodeLink, "_blank")}
                className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
              >
                <img
                  src={researchgate}
                  alt="github"
                  className="h-1/2 w-1/2 object-contain"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-[24px] font-bold text-white">{name}</h3>
            <p className="text-secondary mt-2 text-[14px]">{description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePrevPage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPage((prev) => {
      const newPage = prev - 1;
      return newPage < 0 ? totalPages - 1 : newPage;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalPages]);

  const handleNextPage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPage((prev) => {
      const newPage = prev + 1;
      return newPage >= totalPages ? 0 : newPage;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalPages]);

  const startIndex = currentPage * projectsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  return (
    <div className="w-full">
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <AnimatePresence mode="wait">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={isTransitioning}
            className={`group flex items-center gap-2 bg-tertiary px-6 py-3 rounded-lg text-white transition-all ${
              isTransitioning 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-opacity-80 hover:scale-105'
            }`}
          >
            <FiChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Previous
          </button>
          <span className="text-white flex items-center gap-2">
            <span className="bg-tertiary px-4 py-2 rounded-lg">
              Page {currentPage + 1} of {totalPages}
            </span>
          </span>
          <button
            onClick={handleNextPage}
            disabled={isTransitioning}
            className={`group flex items-center gap-2 bg-tertiary px-6 py-3 rounded-lg text-white transition-all ${
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
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentPage(i);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPage === i 
                  ? 'bg-[#915EFF] scale-125' 
                  : 'bg-tertiary hover:bg-opacity-80'
              } ${isTransitioning ? 'opacity-50' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "");
