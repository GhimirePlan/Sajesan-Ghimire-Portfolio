import { motion } from 'framer-motion';
import { BsLinkedin } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi';
import { config } from '../../constants/config';
import portrait from '../../assets/hero-portrait.webp';

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
        <h1 className="text-white font-semibold tracking-tight text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1]">
          {config.hero.name}
        </h1>
        <p className="text-[#c9b5ff] text-xl sm:text-2xl mt-5">Solar PV & power systems</p>
        <p className="text-secondary text-base leading-7 mt-5 max-w-xl">
          {config.hero.bio}
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
          <a
            href="https://www.linkedin.com/in/sajesan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with Sajesan Ghimire on LinkedIn (opens in a new tab)"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#915EFF]/25 bg-[#915EFF]/5 px-4 py-3 text-xs font-medium text-[#c9b5ff] transition-colors hover:border-[#915EFF]/50 hover:bg-[#915EFF]/15 hover:text-white"
          >
            <BsLinkedin size={15} aria-hidden="true" />
            LinkedIn
            <FiArrowUpRight size={14} aria-hidden="true" />
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
        className="portrait-composition max-w-[360px] w-full justify-self-center md:justify-self-end"
      >
        <div className="portrait-decoration" aria-hidden="true" />
        <div className="portrait-card">
          <div className="portrait-card-top">
            <span className="portrait-location">
              <span aria-hidden="true" />
              Based in Nepal
            </span>
            <span className="portrait-monogram" aria-hidden="true">
              SG
            </span>
          </div>
          <div className="portrait-image-frame">
            <img
              src={portrait}
              width={768}
              height={615}
              loading="eager"
              decoding="async"
              alt="Sajesan Ghimire at a solar PV installation"
              className="portrait-image"
            />
            <span className="portrait-sheen" aria-hidden="true" />
          </div>
          <div className="portrait-card-caption">
            <div>
              <p className="text-white text-base font-medium">Sajesan Ghimire</p>
              <p className="text-secondary text-xs mt-1">Electrical engineer & researcher</p>
            </div>
            <a href="#contact" className="portrait-contact" aria-label="Contact Sajesan">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M6 18 18 6M6 6h12v12" />
              </svg>
            </a>
          </div>
        </div>
        <div className="portrait-footnote">
          <span aria-hidden="true">✦</span> Solar energy. Practical engineering.
        </div>
      </motion.div>
    </section>
  );
}
