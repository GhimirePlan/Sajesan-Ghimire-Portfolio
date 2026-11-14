import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiResearchgate } from 'react-icons/si';

import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { config } from '../../constants/config';
import { Header } from '../atoms/Header';
import ScheduleMeeting from '../ScheduleMeeting';

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/sajesan/',
      color: 'hover:bg-[#0077B5]',
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF className="w-6 h-6" />,
      url: 'https://www.facebook.com/sajesan.g',
      color: 'hover:bg-[#4267B2]',
    },
    {
      name: 'Email',
      icon: <MdEmail className="w-6 h-6" />,
      url: 'mailto:contact@sajesanghimire.com.np',
      color: 'hover:bg-[#EA4335]',
    },
    {
      name: 'ResearchGate',
      icon: <SiResearchgate className="w-6 h-6" />,
      url: 'https://www.researchgate.net/profile/Sajesan-Ghimire',
      color: 'hover:bg-[#00CCBB]',
    },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h3 className="text-white font-medium mb-5 text-[16px]">Connect with me</h3>
      <div className="flex gap-4">
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            aria-label={link.name}
            title={link.name}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              w-12 h-12
              flex items-center justify-center
              rounded-full
              bg-tertiary
              text-white
              transition-all duration-300 ease-in-out
              transform hover:scale-105
              ${link.color}
              hover:shadow-lg hover:shadow-primary
              group
              relative
            `}
          >
            <span className="group-hover:scale-110 transition-transform duration-300">
              {link.icon}
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

  const [error, setError] = useState('');
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);
    setSuccess(false);
    setError('');
    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@sajesanghimire.com.np', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error();
      setSuccess(true);
      form.reset();
    } catch {
      setError(
        'Your message could not be sent. Please email contact@sajesanghimire.com.np directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-6 lg:gap-8 items-start">
      <motion.div
        variants={fadeIn('', 'tween', 0, 0.3)}
        className="flex-[0.75] bg-tertiary/50 border border-white/10 p-6 sm:p-8 rounded-2xl"
      >
        <Header useMotion={false} {...config.contact} />

        <a
          href="https://wa.me/9779865464147"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp at +977 9865464147 (opens in a new tab)"
          className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-emerald-300 transition-colors duration-200 hover:border-emerald-400/60 hover:bg-emerald-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
        >
          <FaWhatsapp size={26} className="shrink-0" aria-hidden="true" />
          <span className="min-w-0">
            <span className="block text-sm font-semibold">Chat on WhatsApp</span>
            <span className="block text-xs text-emerald-100/80">+977 9865464147</span>
          </span>
          <span className="ml-auto text-lg" aria-hidden="true">↗</span>
        </a>

        <form
          action="https://formsubmit.co/contact@sajesanghimire.com.np"
          method="POST"
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
        >
          {/* Honeypot to prevent spam */}
          <input type="text" name="_honey" style={{ display: 'none' }} />

          <label className="flex flex-col">
            <span className="text-white text-sm font-medium mb-2">Your name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your full name"
              className="bg-primary/60 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium"
              maxLength={100}
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white text-sm font-medium mb-2">Email address</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="bg-primary/60 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium"
              maxLength={254}
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white text-sm font-medium mb-2">Message</span>
            <textarea
              rows={5}
              name="message"
              placeholder="Tell me about your project or enquiry."
              className="bg-primary/60 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium"
              maxLength={5000}
              required
            />
          </label>

          {success && (
            <p role="status" className="text-green-400 text-sm">
              Thank you! Your message has been sent.
            </p>
          )}

          {error && (
            <p role="alert" className="text-red-300 text-sm">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#915EFF] py-3 px-6 outline-none w-fit text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-all"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <SocialLinks />
        <ScheduleMeeting />
      </motion.div>

      <motion.div variants={fadeIn('', 'tween', 0, 0.3)} className="lg:sticky lg:top-28">
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-white/10 bg-tertiary/30 p-6 sm:p-8">
          <span className="expertise-icon" aria-hidden="true">
            <MdEmail size={22} />
          </span>
          <h3 className="text-white text-2xl font-medium leading-snug">
            Discuss your next
            <br />
            engineering project.
          </h3>
          <p className="text-secondary text-sm leading-7">
            For solar PV design, electrical engineering, and research enquiries. Share your project
            scope and any relevant details.
          </p>
          <a
            className="text-[#c9b5ff] underline text-sm break-all"
            href="mailto:contact@sajesanghimire.com.np"
          >
            contact@sajesanghimire.com.np
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
