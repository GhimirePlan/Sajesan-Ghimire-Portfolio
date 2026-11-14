import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowUpRight, FiZap, FiSun, FiActivity, FiCpu } from 'react-icons/fi';

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

const serviceIcons = [FiZap, FiActivity, FiSun, FiCpu];
const ServiceCard: React.FC<IServiceCard> = ({ index, title, description, onClick }) => {
  const Icon = serviceIcons[index] || FiZap;
  return (
    <motion.button
      type="button"
      variants={fadeIn('up', 'tween', index * 0.05, 0.3)}
      onClick={onClick}
      aria-haspopup="dialog"
      className="expertise-row text-left group"
    >
      <span className="expertise-row-icon">
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="expertise-row-copy">
        <span className="expertise-row-title">{title}</span>
        <span className="expertise-row-description">{description}</span>
      </span>
      <FiArrowUpRight className="expertise-row-arrow" size={16} aria-hidden="true" />
    </motion.button>
  );
};

const ServiceModal: React.FC<{
  service: TService;
  onClose: () => void;
}> = ({ service, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  // Keep keyboard focus inside the open dialog and restore it on close.
  useEffect(() => {
    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector('button')?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const focusable = Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>('button,a[href],[tabindex="0"]') || []
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', closeOnEscape);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 8 }}
        transition={{ type: 'tween', duration: 0.2 }}
        ref={panelRef}
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
      <div className="about-intro-card">
        <div className="about-card-heading">
          <Header useMotion={false} {...config.sections.about} />
          <p className="text-secondary text-sm mt-4">
            Electrical engineer & researcher
            <br />
            <span className="text-secondary/70">Based in Nepal</span>
          </p>
        </div>
        <div className="about-card-copy">
          <p className="text-secondary text-[15px] leading-7">{config.sections.about.content}</p>
          <a href="#work" className="about-experience-link">
            View experience <FiArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="about-specialties">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              {...service}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
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
