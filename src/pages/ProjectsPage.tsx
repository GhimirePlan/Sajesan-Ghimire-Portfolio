import { Navbar, Projects, Footer, StarsCanvas } from "../components";

const ProjectsPage = () => {
  return (
    <div className="bg-primary relative z-0 min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Projects />
      </div>
      <div className="relative z-0">
        <StarsCanvas />
        <Footer />
      </div>
    </div>
  );
};

export default ProjectsPage;
