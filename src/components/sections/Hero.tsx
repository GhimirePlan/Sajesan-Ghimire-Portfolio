import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import portrait from '../../assets/profile.webp';

export default function Hero() {
  return (
    <section className="hero-introduction max-w-7xl mx-auto px-6 sm:px-16 pt-32 pb-16 sm:pt-40 sm:pb-24 grid md:grid-cols-[1.4fr_1fr] items-center gap-12 md:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <p className="text-[#c9b5ff] text-xs uppercase tracking-[0.18em] mb-5">
          Electrical engineer · Nepal
        </p>
        <h1 className="text-white font-semibold tracking-tight text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.1]">
          {config.hero.name}
        </h1>
        <p className="text-[#c9b5ff] text-xl sm:text-2xl mt-5">Solar PV & power systems</p>
        <p className="text-secondary text-base leading-7 mt-5 max-w-xl">
          Electrical design, feasibility studies, and project delivery for solar energy and building
          services. Research in power system control and automation.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#selected-projects"
            className="portfolio-button rounded-full bg-[#915EFF] px-6 py-3 text-white text-sm font-medium"
          >
            Explore my work
          </a>
          <a
            href="#contact"
            className="portfolio-button rounded-full border border-white/20 px-6 py-3 text-secondary text-sm hover:text-white"
          >
            Get in touch
          </a>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10 pt-5 border-t border-white/10 text-xs text-secondary">
          <span>Solar PV design</span>
          <span>Power distribution</span>
          <span>Research & automation</span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
        className="max-w-[340px] w-full justify-self-center md:justify-self-end"
      >
        <img
          src={portrait}
          width={640}
          height={640}
          alt="Sajesan Ghimire, electrical engineer"
          className="aspect-[4/5] w-full object-cover rounded-2xl border border-white/10"
        />
        <p className="text-secondary text-xs mt-4 text-center">
          Engineering design · Site coordination · Technical research
        </p>
      </motion.div>
    </section>
  );
}
