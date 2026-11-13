import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Tech from '../components/sections/Tech';
import Works from '../components/sections/Works';
import LinkedInSpotlight from '../components/sections/LinkedInSpotlight';
import Blog from '../components/sections/Blog';
import Feedbacks from '../components/sections/Feedbacks';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';
import { config } from '../constants/config';
const StarsCanvas = lazy(() => import('../components/canvas/Stars'));
export default function HomePage() {
  const [stars, setStars] = useState(false);
  useEffect(() => {
    document.title = config.html.title;
  }, []);
  return (
    <div className="bg-primary relative z-0 min-h-screen portfolio-shell">
      <a href="#about" className="skip-to-content">
        Skip to content
      </a>
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <Navbar />
        <Hero />
      </div>
      <main>
        <About />
        <Experience />
        <Tech />
        <Works />
        <LinkedInSpotlight />
        <Blog />
        <Feedbacks />
        <Contact />
      </main>
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <Footer />
        <button className="text-secondary text-xs mt-4" onClick={() => setStars(!stars)}>
          {stars ? 'Disable animated background' : 'Enable animated background'}
        </button>
      </div>
      {stars && (
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
      )}
    </div>
  );
}
