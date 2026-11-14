import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

import { services } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { config } from '../../constants/config';
import { Header } from '../atoms/Header';
import { TService } from '../../types';

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
  description: string;
  details: string[];
  tools: string[];
  experience: string;
  onClick: () => void;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon, description, onClick }) => (
  <div className="surface-interaction h-full">
    <div className="h-full w-full">
      <motion.div
        variants={fadeIn('right', 'spring', index * 0.08, 0.3)}
        className="border border-white/10 w-full rounded-2xl p-[1px]"
      >
        <div
          className="bg-tertiary/60 flex min-h-[260px] flex-col items-center justify-evenly rounded-[20px] px-6 py-6 cursor-pointer hover:bg-opacity-80 transition-all group"
          role="button"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onClick();
            }
          }}
          onClick={onClick}
        >
          <div className="relative">
            <img
              src={icon}
              alt={title}
              className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300" />
          </div>

          <h3 className="text-center text-[18px] font-semibold text-white group-hover:text-[#915EFF] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-secondary text-center text-[14px] mt-2 line-clamp-3">{description}</p>
        </div>
      </motion.div>
    </div>
  </div>
);

const ServiceModal: React.FC<{
  service: TService;
  onClose: () => void;
}> = ({ service, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    const previous = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        role="dialog"
        aria-modal="true"
        aria-label={service.title}
        className="bg-tertiary rounded-[20px] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black-100 hover:bg-red-500 transition-colors duration-300"
          aria-label="Close modal"
        >
          <FiX className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img src={service.icon} alt={service.title} className="h-16 w-16 object-contain" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-full" />
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-white">{service.title}</h3>
            <p className="text-secondary text-[14px] flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {service.experience} experience
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div>
            <h4 className="text-[18px] font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              Key Responsibilities
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.details.map((detail, index) => (
                <li
                  key={index}
                  className="text-secondary text-[14px] bg-black-100/50 p-3 rounded-lg hover:bg-black-100 transition-colors duration-300"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              Tools & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool, index) => (
                <span
                  key={index}
                  className="bg-black-100 px-4 py-2 rounded-full text-[14px] text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const [selectedService, setSelectedService] = useState<TService | null>(null);

  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="text-secondary mt-4 max-w-3xl text-[16px] leading-[28px]"
      >
        {config.sections.about.content}
      </motion.p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 max-sm:justify-center">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            {...service}
            onClick={() => setSelectedService(service)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(About, 'about');
