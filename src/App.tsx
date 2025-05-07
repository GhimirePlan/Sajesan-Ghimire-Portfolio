import { BrowserRouter } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
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
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [webglError, setWebglError] = useState(false);
  const [initError, setInitError] = useState<Error | null>(null);

  const handleContextLost = useCallback((event: Event) => {
    event.preventDefault();
    setWebglError(true);
    console.warn('WebGL context lost. Attempting to recover...');
  }, []);

  const handleContextRestored = useCallback(() => {
    setWebglError(false);
    console.log('WebGL context restored');
  }, []);

  const initializeApp = useCallback(async () => {
    try {
      // Set document title
      if (document.title !== config.html.title) {
        document.title = config.html.title;
      }

      // Preload hero background
      const heroImage = new Image();
      heroImage.src = '/src/assets/herobg.webp';
      
      // Wait for hero image to load
      await new Promise((resolve, reject) => {
        heroImage.onload = resolve;
        heroImage.onerror = (_e) => reject(new Error('Failed to load hero image'));
      });

      setIsHeroLoaded(true);
      
      // Add a small delay to ensure smooth transition
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsInitialized(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing app:', error);
      setInitError(error instanceof Error ? error : new Error('Unknown initialization error'));
      // Even if there's an error, we should show the app
      setIsInitialized(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    initializeApp();

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, [handleContextLost, handleContextRestored, initializeApp]);

  if (isLoading || !isInitialized) {
    return <Loader />;
  }

  if (webglError) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">WebGL Error</h1>
          <p className="text-gray-400 mb-4">There was an issue with the 3D rendering. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#915EFF] rounded-md hover:bg-[#7b4ed1] transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (initError) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Initialization Error</h1>
          <p className="text-gray-400 mb-4">{initError.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#915EFF] rounded-md hover:bg-[#7b4ed1] transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="bg-primary relative z-0 min-h-screen">
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
    </ErrorBoundary>
  );
};

export default App;
