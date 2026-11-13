import { motion } from 'framer-motion';

import { styles } from '../../constants/styles';
import { lazy, Suspense, useState } from 'react';
const ComputersCanvas = lazy(() => import('../canvas/Computers'));
import desktopPreview from '../../assets/desktop-preview.webp';
import { config } from '../../constants/config';

const Hero = () => {
  const [showScene, setShowScene] = useState(false);
  return (
    <section className={`relative mx-auto h-screen w-full`}>
      <div
        className={`absolute inset-0 top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">{config.hero.name}</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-6 top-[46%] bottom-28 sm:top-[43%]">
        {showScene ? (
          <Suspense
            fallback={<p className="text-secondary text-center">Loading interactive scene…</p>}
          >
            <ComputersCanvas />
          </Suspense>
        ) : (
          <div className="h-full max-w-6xl mx-auto relative flex items-end justify-center pb-12">
            <img
              src={desktopPreview}
              width={1100}
              height={362}
              alt="Preview of the original interactive desktop scene"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <div className="relative z-10 flex gap-4">
              <a
                href="#work"
                className="rounded-full bg-[#915EFF] px-5 py-3 text-white text-sm font-medium"
              >
                Explore my work
              </a>
              <button
                onClick={() => setShowScene(true)}
                className="rounded-full border border-white/20 bg-primary/80 px-5 py-3 text-secondary text-sm hover:text-white"
              >
                Explore in 3D
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center">
        <a href="#about" aria-label="Scroll to about">
          <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
