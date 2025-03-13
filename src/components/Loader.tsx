import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Lightning bolt shape */}
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0">
              <motion.div
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.2, 1],
                  filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#915EFF] drop-shadow-[0_0_10px_rgba(145,94,255,0.5)]"
                >
                  <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                </svg>
              </motion.div>
            </div>
          </div>
          
          {/* Electric arcs */}
          <motion.div
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-6"
          >
            <div className="w-full h-full border-2 border-[#915EFF] rounded-full opacity-20 blur-sm" />
          </motion.div>
          
          {/* Additional electric arcs */}
          <motion.div
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -inset-8"
          >
            <div className="w-full h-full border-2 border-[#915EFF] rounded-full opacity-10 blur-sm" />
          </motion.div>
        </motion.div>
        
        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#915EFF] text-center mt-6 text-lg font-medium tracking-wider"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader; 