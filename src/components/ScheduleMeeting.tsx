import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCalendar } from "react-icons/hi";
import { FiX } from "react-icons/fi";

const ScheduleMeeting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getCalendarUrl = () => {
    const now = new Date();
    const start = new Date(now.getTime() + 5 * 60000); // 5 min from now
    const end = new Date(start.getTime() + 30 * 60000); // 30 min duration
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    return `https://calendar.google.com/calendar/u/0/r/eventedit?text=Meeting+with+Sajesan+Ghimire&details=Discuss+project+opportunities+and+collaboration&location=Google+Meet&dates=${fmt(start)}/${fmt(end)}&add=sajesan031@gmail.com&sendUpdates=required`;
  };

  return (
    <div className="w-full mt-10">
      <button
        onClick={toggleModal}
        className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] transition-all duration-300 transform hover:scale-[1.02]"
      >
        <HiOutlineCalendar className="text-2xl" />
        <span>Schedule a meeting</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1a1f2e] rounded-2xl p-8 shadow-2xl border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                Meeting with Sajesan Ghimire
              </h2>

              <div className="flex flex-col gap-4">
                <a
                  href={getCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-xl transition-colors duration-300"
                >
                  <HiOutlineCalendar className="text-xl" />
                  Schedule via Google
                </a>

                <button
                  onClick={toggleModal}
                  className="w-full py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold rounded-xl transition-colors duration-300"
                >
                  Close
                </button>
              </div>

              {/* Close Icon */}
              <button
                onClick={toggleModal}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScheduleMeeting;
