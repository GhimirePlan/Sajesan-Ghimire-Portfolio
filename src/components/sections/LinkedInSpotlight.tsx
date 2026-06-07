import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { SectionWrapper } from '../../hoc';
import { textVariant } from '../../utils/motion';
import { styles } from '../../constants/styles';
import { config } from '../../constants/config';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { BsLinkedin } from 'react-icons/bs';

interface LinkedInPost {
  _id: string;
  url: string;
  tag: string;
  isFeatured: boolean;
}

const LinkedInSpotlight = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${config.apiBaseUrl}/api/linkedin`);
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch LinkedIn posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  }, [posts.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  }, [posts.length]);

  useEffect(() => {
    if (posts.length > 1) {
      const timer = setInterval(nextSlide, 8000); // Auto-slide every 8 seconds
      return () => clearInterval(timer);
    }
  }, [nextSlide, posts.length]);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('embed')) return url;

    // Handle standard LinkedIn post URLs
    // Format 1 (Activity): https://www.linkedin.com/posts/username_activity-7200155208451837952-abcd
    // Format 2 (UGC Post): https://www.linkedin.com/posts/username_ugcPost-7462566842079887360-abcd
    
    const activityMatch = url.match(/activity-([0-9]+)/);
    const ugcPostMatch = url.match(/ugcPost-([0-9]+)/);
    const urnMatch = url.match(/activity:([0-9]+)/);
    const simpleIdMatch = url.match(/([0-9]{10,})/);

    // Prioritize ugcPost if found
    if (ugcPostMatch) {
      return `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${ugcPostMatch[1]}`;
    }

    const id = activityMatch?.[1] || urnMatch?.[1] || simpleIdMatch?.[0];

    if (id) {
      return `https://www.linkedin.com/embed/feed/update/urn:li:share:${id}`;
    }

    return url; // Fallback
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="w-10 h-10 border-4 border-[#915EFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} !text-[14px] sm:!text-[18px]`}>Professional Updates</p>
        <div className="flex items-center gap-3">
          <BsLinkedin className="text-[#0A66C2] text-[28px] sm:text-[36px]" />
          <h2 className={`${styles.sectionHeadText} !text-[30px] sm:!text-[50px]`}>LinkedIn Spotlights.</h2>
        </div>
      </motion.div>

      <div className="mt-8 relative group">
        <div className="overflow-hidden rounded-3xl bg-tertiary/30 backdrop-blur-sm border border-white/10 p-2 sm:p-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={posts[currentIndex]._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[500px] relative"
            >
              {posts[currentIndex].isFeatured && (
                <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-[#915EFF] to-[#7b4ed1] text-white px-4 py-1.5 rounded-full text-[12px] font-bold shadow-lg flex items-center gap-1.5 border border-white/20 pointer-events-none">
                  FEATURED
                </div>
              )}
              
              <div className="absolute -top-3 -left-3 z-20 pointer-events-none">
                <span className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[12px] font-bold border border-white/20 shadow-xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#915EFF] rounded-full animate-pulse" />
                  #{posts[currentIndex].tag}
                </span>
              </div>

              <div className="w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-white/5">
                <iframe
                  src={getEmbedUrl(posts[currentIndex].url)}
                  height="500"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  title="LinkedIn Post"
                  className="w-full"
                ></iframe>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {posts.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-[#915EFF] text-white transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hidden sm:block"
            >
              <HiOutlineChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-[#915EFF] text-white transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hidden sm:block"
            >
              <HiOutlineChevronRight size={24} />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-[#915EFF]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(LinkedInSpotlight, 'linkedin');
