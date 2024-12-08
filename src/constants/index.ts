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
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
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
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences: TExperience[] = [
  {
    title: "Electrical Engineering Internship",
    companyName: "Nepal Manipal Teaching Hospital",
    icon: "https://media.licdn.com/dms/image/v2/D4D0BAQFn2LprYpfaqw/company-logo_200_200/company-logo_200_200/0/1713088102200/nepalmanipal_logo?e=1741824000&v=beta&t=q9jeTfOcBVb09zhLG2RnTY180QlUpUdTNLu7IuCoSsY",
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
    icon: "https://media.licdn.com/dms/image/v2/C560BAQH-MlWDO0vKiw/company-logo_200_200/company-logo_200_200/0/1631407533564/nepal_electricity_authority_government_of_nepal_logo?e=1741824000&v=beta&t=3nv6zUw433oPjZ1cDkXewi4cYXO7D8u_6f6Qt-aN2cY",
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
    icon: "https://media.licdn.com/dms/image/v2/D560BAQHIHJkaT1HBDQ/company-logo_200_200/company-logo_200_200/0/1687169291342?e=1741824000&v=beta&t=S3NWErVqv55hwLAxZ212gYG04bo1caXhHu87L4JtHe8",
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
    icon: "https://media.licdn.com/dms/image/v2/D4E0BAQF3eBTjluaIig/company-logo_200_200/company-logo_200_200/0/1704103900483?e=1741824000&v=beta&t=ZibsNZ877xtdIT8mI6g_O106FaPt5VLyq3vOF-mi9Pg",
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
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects: TProject[] = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
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
    image: carrent,
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    sourceCodeLink: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
