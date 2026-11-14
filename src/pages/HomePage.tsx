import useSeo, { SITE_URL, SITE_DESCRIPTION, PERSON } from '../hooks/useSeo';
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
export default function HomePage() {
  useSeo({ title: 'Sajesan Ghimire | Electrical Engineer in Nepal', description: SITE_DESCRIPTION, path: '/', schema: { '@context': 'https://schema.org', '@graph': [PERSON, { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'Sajesan Ghimire', publisher: { '@id': PERSON['@id'] } }] } });
  return (
    <div className="bg-primary relative z-0 min-h-screen portfolio-shell">
      <a href="#about" className="skip-to-content">
        Skip to content
      </a>
      <div className="hero-backdrop bg-hero-pattern bg-cover bg-center bg-no-repeat">
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
      </div>
    </div>
  );
}
