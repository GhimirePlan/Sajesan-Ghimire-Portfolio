import { useState } from 'react'; // Import useState for managing visibility
import { FiX } from 'react-icons/fi'; // Import a modern close icon

function Footer() {
  const [isVisible, setIsVisible] = useState(true); // State for visibility

  // Hide the footer when the close button is clicked
  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="bg-[#0d1224] border border-[#353951] text-white p-4 rounded-lg shadow-lg w-full max-w-[240px] transition-transform duration-300 hover:scale-105 relative">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-white bg-[#353951] hover:bg-red-600 p-2 rounded-full focus:outline-none shadow-md hover:shadow-lg transition duration-300 transform hover:scale-110"
        aria-label="Close Footer"
      >
        <FiX size={18} />
      </button>

      {/* Footer Content */}
      <div className="text-sm ">
        <p className="">
          © Made with ❤️ by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.plan.com.np"
            className="text-[#16f2b3] hover:underline hover:text-violet-400 transition duration-300"
          >
            Plan
          </a>
        </p>
      </div>
    </div>
  ) : null; // Return null when not visible
}

export default Footer;
