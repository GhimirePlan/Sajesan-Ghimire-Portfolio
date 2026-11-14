import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';

import useExperience from '../../hooks/useExperience';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms/Header';
import { TExperience } from '../../types';
import { config } from '../../constants/config';

const ExperienceCard: React.FC<TExperience> = experience => {
  const revealRef = useRef<HTMLDivElement>(null);
  const inView = useInView(revealRef, { once: true, margin: '0px 0px -32px 0px', amount: 0.1 });
  const reducedMotion = useReducedMotion();
  return (
    <VerticalTimelineElement
      className={`experience-entry ${inView || reducedMotion ? 'is-visible' : ''}`}
      contentStyle={{
        background: '#151030',
        color: '#fff',
        boxShadow: 'none',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
      }}
      contentArrowStyle={{ borderRight: '7px solid  #232631' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          {experience.icon ? <img
            loading="lazy"
            decoding="async"
            src={experience.icon || undefined}
            alt={experience.companyName}
            className="h-[60%] w-[60%] object-contain"
          /> : <span className="text-white font-semibold" aria-hidden="true">{experience.companyName.slice(0, 2).toUpperCase()}</span>}
        </div>
      }
    >
      <div ref={revealRef}>
        <h3 className="text-[20px] font-semibold text-white">{experience.title}</h3>
        <p className="text-secondary text-[14px] font-medium" style={{ margin: 0 }}>
          {experience.companyName}
        </p>
      </div>

      <ul className="ml-5 mt-5 list-disc space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-secondary pl-1 text-[14px] leading-relaxed"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const experiences = useExperience();
  return (
    <>
      <Header useMotion={true} {...config.sections.experience} />

      <div className="mt-10 flex flex-col">
        <VerticalTimeline animate={false} lineColor="#302747">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
