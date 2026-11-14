import { createPortal } from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
      variants={fadeIn('up', 'tween', index * 0.04, 0.35)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -24px 0px' }}
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

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="service-dialog-backdrop"
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
        aria-labelledby="expertise-dialog-title"
        className="service-dialog"
        onClick={event => event.stopPropagation()}
      >
        <div className="service-dialog-toolbar">
          <span>Expertise</span>
          <button
            type="button"
            onClick={onClose}
            className="service-dialog-close"
            aria-label="Close modal"
          >
            <span>Close</span>
            <FiX size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
        <div className="service-dialog-content">
          <div className="flex items-start gap-4 mb-7">
            <span className="expertise-icon shrink-0">
              <FiZap size={22} aria-hidden="true" />
            </span>
            <div>
              <h3
                id="expertise-dialog-title"
                className="text-xl sm:text-2xl font-semibold text-white leading-snug"
              >
                {service.title}
              </h3>
              <p className="text-secondary text-sm mt-2">{service.experience} experience</p>
            </div>
          </div>
          <p className="text-secondary text-sm leading-7 mb-7">{service.description}</p>
          <h4 className="text-sm font-medium text-white mb-4">Responsibilities & scope</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.details.map(detail => (
              <li
                key={detail}
                className="text-secondary text-sm leading-6 border border-white/10 rounded-xl p-3"
              >
                {detail}
              </li>
            ))}
          </ul>
          <h4 className="text-sm font-medium text-white mt-7 mb-4">Tools & technologies</h4>
          <div className="flex flex-wrap gap-2">
            {service.tools.map(tool => (
              <span
                key={tool}
                className="text-[#c9b5ff] text-xs border border-[#c9b5ff]/15 bg-[#915EFF]/5 rounded-full px-3 py-2"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const About = () => {
  const reducedMotion = useReducedMotion();
  const [selectedService, setSelectedService] = useState<TService | null>(null);

  return (
    <>
      <motion.div
        className="about-intro-card"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -24px 0px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
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
      </motion.div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(About, 'about');
