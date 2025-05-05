import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Footer,
} from "./components";
import { config } from "./constants/config";
import Loader from "./components/Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }

    // Preload hero background
    const heroImage = new Image();
    heroImage.src = '/src/assets/herobg.webp'; // Make sure to convert the image to WebP format
    heroImage.onload = () => {
      setIsHeroLoaded(true);
    };

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
        <div 
          className={`bg-hero-pattern bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            isHeroLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
