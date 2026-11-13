import Navbar from '../components/layout/Navbar';
import Projects from '../components/sections/Projects';
import Footer from '../components/sections/Footer';
export default function ProjectsPage() {
  return (
    <div className="bg-primary relative z-0 min-h-screen portfolio-shell">
      <Navbar />
      <main className="pt-20">
        <Projects />
      </main>
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <Footer />
      </div>
    </div>
  );
}
