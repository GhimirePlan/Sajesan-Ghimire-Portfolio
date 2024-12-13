import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  proteus,
  dialux,

  git,
  audrino,
  figma,
  
  carrent,
  jobit,
  tripguide,

  excel,
  Ai,
  Photoshop,
  canva,
  word,
  Matlab,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "Electrical System Designer",
    icon: web,
  },
  {
    title: "Researcher",
    icon: mobile,
  },
  {
    title: "Robotics & Automation",
    icon: backend,
  },
  {
    title: "Graphics Designer",
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: "Matlab",
    icon: Matlab,
  },
  {
    name: "Ai",
    icon: Ai,
  },
  {
    name: "word",
    icon: word,
  },
  {
    name: "excel",
    icon: excel,
  },
  {
    name: "canva",
    icon: canva,
  },
  {
    name: "Photoshop",
    icon: Photoshop,
  },
  {
    name: "proteus",
    icon: proteus,
  },
  {
    name: "audrino",
    icon: audrino,
  },
  {
    name: "dialux",
    icon: dialux,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },

];

const experiences: TExperience[] = [
  {
    title: "Electrical Engineering Internship",
    companyName: "Nepal Manipal Teaching Hospital",
    icon: "./src/assets/company/manipal.png",
    iconBg: "#383E56",
    date: "September 2024 - November 2024",
    points: [
      "Designed and analyzed comprehensive electrical systems for power distribution, lighting layouts, and biomedical equipment supply systems.",
      "Developed and reviewed detailed Single Line Diagrams (SLDs) for the hospital and hostel, incorporating load calculations, cable sizing, and safety measures.",
      "Observed and gained insights into low-voltage systems, including CCTV, PA systems, Ethernet, and telephone networks.",
      "Supervised and reported on MEP works for critical units such as ICU, MOT, and Oncology.",
      "Developed designs for biomedical equipment power systems and studied emergency systems like fire alarms, firefighting, UPS, and earthing.",
    ],
  },
  {
    title: "Engineering Intern",
    companyName: "Nepal Electricity Authority, Nepal",
    icon: "./src/assets/company/nea.png",
    iconBg: "#E6DEDD",
    date: "Nov 2023 - Dec 2023",
    points: [
      "Learned the ropes of hydropower – from how turbines work to making electricity. Practical stuff that goes beyond textbooks!",
      "Explored Nepal's electricity scene, understanding the ups and downs. It's fascinating to see how power impacts our country.",
      "Got the lowdown on Nepal Electricity Authority (NEA) – the powerhouse behind the scenes. Explored how rules and policies shape our energy world.",
      "More than just technical skills – this internship was about solving problems, paying attention to details, and becoming a better team player.",
    ],
  },
  {
    title: "Secretary",
    companyName: "Electrical Generation Club (E-GEN)",
    icon: "./src/assets/company/egen.png",
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "As a club secretary, I have played a crucial role in successfully organizing various programs and Training sessions.",
      "Successfully completed ELECTRO-MELA 2.0 as a main coordinator. (ELECTRO-MELA 2.0  is biggest electrical festival in Pokhara )",
      " I have made many improvements in this club also. ",
      
    ],
  },
  {
    title: "President",
    companyName: "Engineering Student Society of Tanahun and Lamjung (ESSOTL)",
    icon: "./src/assets/company/essotl.png",
    iconBg: "#E6DEDD",
    date: "Apr 2023 - Jun 2024",
    points: [
      "As a president, I have successfully organized various programs and Training sessions.",
      "I have made many improvements in this Society also. ",


    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      "Their designs for electrical systems are top-notch, adhering to all safety standards and delivering exceptional performance.",
    name: "Sara Lee",
    designation: "Senior Engineer",
    company: "ElectroTech Solutions",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "The automation solutions provided were seamless and efficient. Truly a game-changer for our industrial operations.",
    name: "Chris Brown",
    designation: "Operations Manager",
    company: "Innovative Systems Inc.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Their expertise in power distribution and energy optimization significantly reduced our operational costs.",
    name: "Lisa Wang",
    designation: "Project Manager",
    company: "GreenGrid Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];
const projects: TProject[] = [
  {
    name: "Smart Grid Optimization",
    description:
      "A simulation-based project that integrates smart grid technologies to enhance power distribution, monitor energy consumption, and ensure cybersecurity.",
    tags: [
      {
        name: "matlab",
        color: "blue-text-gradient",
      },
      {
        name: "simulink",
        color: "green-text-gradient",
      },
      {
        name: "cybersecurity",
        color: "pink-text-gradient",
      },
    ],
    image: carrent, // Replace with a relevant image
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "IoT-Based Automation",
    description:
      "An IoT-powered project designed to automate industrial processes and enable remote monitoring and control of operations using smart sensors and devices.",
    tags: [
      {
        name: "iot",
        color: "blue-text-gradient",
      },
      {
        name: "arduino",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "pink-text-gradient",
      },
    ],
    image: jobit, // Replace with a relevant image
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "Energy Management System",
    description:
      "A web-based platform to monitor and optimize energy usage in residential and commercial settings, incorporating renewable energy sources and load management.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide, // Replace with a relevant image
    sourceCodeLink: "https://github.com/",
  },
];


export { services, technologies, experiences, testimonials, projects };
