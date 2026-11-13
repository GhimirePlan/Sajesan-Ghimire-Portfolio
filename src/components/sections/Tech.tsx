import { lazy, Suspense, useState } from 'react';
const BallCanvas = lazy(() => import('../canvas/Ball'));
import { SectionWrapper } from '../../hoc';
import { technologies } from '../../constants';

const Tech = () => {
  const [interactive, setInteractive] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-8">
        <h2 className="text-white text-2xl font-semibold">Tools & technologies</h2>
        <button
          className="text-secondary text-sm hover:text-white"
          onClick={() => setInteractive(!interactive)}
        >
          {interactive ? 'Use lightweight view' : 'Enable interactive 3D'}
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map(technology => (
          <div className="h-28 w-28" key={technology.name}>
            {interactive ? (
              <Suspense fallback={<span className="text-secondary">{technology.name}</span>}>
                <BallCanvas icon={technology.icon} />
              </Suspense>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-tertiary/40 p-4">
                <img
                  src={technology.icon}
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  alt=""
                  className="h-12 w-12 object-contain"
                />
                <span className="text-secondary text-xs">{technology.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, 'tech');
