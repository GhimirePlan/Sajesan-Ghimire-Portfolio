import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiResearchgate } from 'react-icons/si';

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map((input) => [input, ""])
);

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
};

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
  const formRef = useRef<React.LegacyRef<HTMLFormElement> | undefined>();
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          form_name: form.name,
          to_name: config.html.fullName,
          from_email: form.email,
          to_email: config.html.email,
          message: form.message,
        },
        emailjsConfig.accessToken
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm(INITIAL_STATE);
        },
        (error) => {
          setLoading(false);

          console.log(error);
          alert("Something went wrong.");
        }
      );
  };

  return (
    <div
      className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 flex-[0.75] rounded-2xl p-8"
      >
        <Header useMotion={false} {...config.contact} />

        <form
          // @ts-expect-error
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {Object.keys(config.contact.form).map((input) => {
            const { span, placeholder } =
              config.contact.form[input as keyof typeof config.contact.form];
            const Component = input === "message" ? "textarea" : "input";

            return (
              <label key={input} className="flex flex-col">
                <span className="mb-4 font-medium text-white">{span}</span>
                <Component
                  type={input === "email" ? "email" : "text"}
                  name={input}
                  value={form[`${input}`]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
                  {...(input === "message" && { rows: 7 })}
                />
              </label>
            );
          })}
          <button
            type="submit"
            className="bg-tertiary shadow-primary w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        <SocialLinks />
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
