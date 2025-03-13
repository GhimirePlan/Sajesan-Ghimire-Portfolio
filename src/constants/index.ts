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

  manipal,
  nea,
  egen,
  essotl,
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
    title: "Electrical Engineer (Site)",
    companyName: "Panchase Engineering Consultancy",
    icon: "./src/assets/company/panchase.png",
    iconBg: "#383E56",
    date: "Nov 2024 – jan 2025",
    points: [
      "Supervised and executed MEP electrical works, ensuring design compliance and site safety.",
      "Implemented, revised, and optimized electrical designs as per field conditions.",
      "Managed measurements, billing, testing, and commissioning of electrical systems.",
     
    ],
  },
  {
    title: "Electrical Engineering Internship",
    companyName: "Nepal Manipal Teaching Hospital",
    icon: manipal,
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
    icon: nea,
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
    icon: egen,
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
    icon: essotl,
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
      "Working on-site, I ensured electrical designs were not just implemented but optimized in real-time, overcoming challenges to enhance efficiency and project success.",
    name: "Sanat Poudel",
    designation: "Operations Manager",
    company: "Himal Enginnering Inc.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
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
      "Their expertise in power distribution and energy optimization significantly reduced our operational costs.",
    name: "Ghi Wang",
    designation: "Project Manager",
    company: "GreenGrid Enterprises",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
];
const projects: TProject[] = [
  {
    name: "Comparative Assessment of PID and ANFIS Controllers in an AVR",
    description:
      "This research analyzes PID and ANFIS controllers in AVR systems using MATLAB-SIMULINK, revealing ANFIS's superior performance with a 1.7277s settling time and 1.8716% overshoot, validating its efficiency for power sector applications.",
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
        name: "ANFS",
        color: "pink-text-gradient",
      },
    ],
    image: carrent, // Replace with a relevant image
    sourceCodeLink: "https://www.researchgate.net/publication/389150640_Comparative_Assessment_of_PID_and_ANFIS_Controllers_in_an_Automatic_Voltage_Regulator",
  },
  {
    name: "ANN-BASED UPFC FOR ENHANCEMENT OF POWER FLOW AND VOLTAGE PROFILE",
    description:
      "This research proposes an ANN-based UPFC for enhanced power flow and voltage regulation in modern power systems, achieving faster response, improved stability, and reduced faults compared to PID-based control, as validated by MATLAB/Simulink simulations.",
    tags: [
      {
        name: "matlab",
        color: "blue-text-gradient",
      },
      {
        name: "UPFC",
        color: "green-text-gradient",
      },
      {
        name: "ANN",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide, // Replace with a relevant image
    sourceCodeLink: "https://www.linkedin.com/in/sajesan/",
  },
  {
    name: "IoT-Based Complete Home Automation System",
    description:
      "This project presents an advanced IoT-powered home automation system integrating Arduino, Python, and NodeMCU, enabling seamless remote control of appliances and security, revolutionizing smart living with efficiency and convenience.",
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
    sourceCodeLink: "https://www.linkedin.com/posts/sajesan_teamurja-hardwarehackathon-activity-7155555264052486144-Or6Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAADk4wCsBjLFTlUqsTlcQrGPSo3T73aeu9Is",
  },
 
];


export { services, technologies, experiences, testimonials, projects };
