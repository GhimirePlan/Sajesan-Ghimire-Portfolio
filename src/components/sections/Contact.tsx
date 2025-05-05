import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiResearchgate } from 'react-icons/si';

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/sajesan/',
      color: 'hover:bg-[#0077B5]'
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF className="w-6 h-6" />,
      url: 'https://www.facebook.com/sajesan.g',
      color: 'hover:bg-[#4267B2]'
    },
    {
      name: 'Email',
      icon: <MdEmail className="w-6 h-6" />,
      url: 'mailto:contact@sajesanghimire.com.np',
      color: 'hover:bg-[#EA4335]'
    },
    {
      name: 'ResearchGate',
      icon: <SiResearchgate className="w-6 h-6" />,
      url: 'https://www.researchgate.net/profile/Sajesan-Ghimire',
      color: 'hover:bg-[#00CCBB]'
    },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h3 className="text-white font-medium mb-10 text-[20px]">
        Connect With Me
      </h3>
      <div className="flex gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              w-12 h-12
              flex items-center justify-center
              rounded-full
              bg-tertiary
              text-white
              transition-all duration-300 ease-in-out
              transform hover:scale-110
              ${link.color}
              hover:shadow-lg hover:shadow-primary
              group
              relative
            `}
          >
            <span className="group-hover:scale-110 transition-transform duration-300">
              {link.icon}
            </span>
            
            <span className="
              absolute -bottom-10
              bg-black/80
              text-white
              text-sm
              px-3 py-1
              rounded-full
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              whitespace-nowrap
            ">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // FormSubmit will handle the submission automatically
    // We just need to show loading state
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <Header useMotion={false} {...config.contact} />

        <form
          action="https://formsubmit.co/contact@sajesanghimire.com.np"
          method="POST"
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {/* Honeypot to prevent spam */}
          <input type="text" name="_honey" style={{ display: 'none' }} />
          
          {/* Disable Captcha */}
          <input type="hidden" name="_captcha" value="false" />
          
          {/* Specify redirect after submission */}
          <input type="hidden" name="_next" value={window.location.href} />

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              required
            />
          </label>

          {success && (
            <p className="text-green-500 text-sm">
              Thank you for your message. I'll get back to you soon!
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-all"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        <SocialLinks />
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
