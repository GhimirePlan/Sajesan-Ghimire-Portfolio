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
  panchase,
  advance,
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
    description: "Expert in designing comprehensive electrical systems for various applications",
    details: [
      "Power distribution system design and optimization",
      "Load calculation and system sizing",
      "Single Line Diagram (SLD) development",
      "Emergency power system design",
      "Lighting system design and optimization",
      "Cable sizing and routing",
      "Protection system coordination",
      "Compliance with electrical codes and standards"
    ],
    tools: ["AutoCAD", "DIALux", "ETAP", "MATLAB"],
    experience: "3+ years"
  },
  {
    title: "Researcher",
    icon: mobile,
    description: "Conducting cutting-edge research in electrical engineering and power systems",
    details: [
      "Power system stability analysis",
      "Renewable energy integration studies",
      "Smart grid technology research",
      "Control system optimization",
      "Power quality analysis",
      "Energy efficiency studies",
      "Published research papers",
      "Conference presentations"
    ],
    tools: ["MATLAB", "Simulink", "Python", "ResearchGate"],
    experience: "2+ years"
  },
  {
    title: "PV System Designer",
    icon: creator,
    description: "Designing smarter energy systems for a sustainable future.",
    details: [
      "PV system design and optimization",
      "Detailed feasibility study (DFS)",
      "Solar panel selection and sizing",
      "Battery storage system design",
      "Procurement Coordination and Construction Supervision."
    ],
    tools: ["PVsyst", "HelioScope", "SketchUp", "AutoCAD","Vitro Solar"],
    experience: "1+ years"
  },
  {
    title: "Robotics & Automation",
    icon: backend,
    description: "Specializing in industrial automation and robotic system integration",
    details: [
      "PLC programming and implementation",
      "Industrial automation system design",
      "Robotic system integration",
      "Process control optimization",
      "SCADA system development",
      "IoT-based automation solutions",
      "Motion control systems",
      "Safety system implementation"
    ],
    tools: ["Arduino", "Raspberry Pi", "Python", "C++"],
    experience: "2+ years"
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
    title: "Electrical Design Engineer",
    companyName: "Advanced Energy Construction Pvt. Ltd.",
    icon: advance,
    iconBg: "#383E56",
    date: "March 2025 – Present",
    points: [
      "Designed and optimized rooftop and ground-mounted solar PV systems (on-grid/of f -grid) using PVsyst, Helioscope, SketchUp, AutoCAD, and Vitro Solar. ",
      "Conducted site surveys, system sizing, and prepared Detailed Feasibility Study (DFS) reports for commercial, industrial, and utility-scale clients.",
      "Led design and DFS preparation for rooftop solar projects totaling over 20 MW and ground-mounted utility-scale projects exceeding 100 MW. ",
      "Oversaw procurement, coordinated with vendors, and supervised construction activities to ensure technical accuracy, regulatory compliance, and timely execution.",
      "Collaborated with stakeholders for grid integration and supported commissioning documentation.",
     
    ],
  },
  {
    title: "Electrical Engineer (Site)",
    companyName: "Panchase Engineering Consultancy",
    icon: panchase,
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
      "Organized and led various student-centered events such as quiz contests, futsal tournaments,welcome/farewell programs, and poetry competitions to enhance campus engagement.", 
      "Strengthened leadership, communication, and event coordination skills by managing cross functional teams and collaborating with faculty and students.",


  


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
    image: "https://cdn.vectorstock.com/i/500p/22/63/a-simple-black-silhouette-of-man-in-suit-vector-55942263.jpg",
  },
  {
    testimonial:
      "Working closely with the team, they ensured every electrical design was precise and practical, helping us meet tight deadlines without compromising quality.",
    name: "Ramesh Shrestha",
    designation: "Senior Engineer",
    company: "ElectroTech Solutions",
    image: "https://cdn.vectorstock.com/i/500p/22/63/a-simple-black-silhouette-of-man-in-suit-vector-55942263.jpg",
  },

  {
    testimonial:
      "Their attention to detail and strict adherence to safety protocols gave us confidence throughout the project lifecycle.",
    name: "Bibek Karki",
    designation: "Site Manager",
    company: "Lumbini Electrical Contractors",
    image: "https://cdn.vectorstock.com/i/500p/22/63/a-simple-black-silhouette-of-man-in-suit-vector-55942263.jpg",
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
    image: carrent,
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
    image: tripguide,
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
    image: jobit,
    sourceCodeLink: "https://www.linkedin.com/posts/sajesan_teamurja-hardwarehackathon-activity-7155555264052486144-Or6Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAADk4wCsBjLFTlUqsTlcQrGPSo3T73aeu9Is",
  },
  {
    name: "Smart Energy Management System",
    description:
      "Developed an intelligent energy management system that optimizes power consumption using machine learning algorithms and real-time monitoring, resulting in 30% energy savings.",
    tags: [
      {
        name: "ML",
        color: "blue-text-gradient",
      },
      {
        name: "IoT",
        color: "green-text-gradient",
      },
      {
        name: "Python",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    sourceCodeLink: "https://www.researchgate.net/profile/Sajesan-Ghimire",
  },
  {
    name: "Power System Stability Analysis",
    description:
      "Conducted comprehensive stability analysis of power systems using MATLAB, focusing on transient stability and voltage regulation under various fault conditions.",
    tags: [
      {
        name: "matlab",
        color: "blue-text-gradient",
      },
      {
        name: "power-systems",
        color: "green-text-gradient",
      },
      {
        name: "analysis",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    sourceCodeLink: "https://www.researchgate.net/profile/Sajesan-Ghimire",
  },
  {
    name: "Renewable Energy Integration Study",
    description:
      "Analyzed and implemented strategies for integrating renewable energy sources into existing power grids, focusing on grid stability and efficiency.",
    tags: [
      {
        name: "renewable",
        color: "blue-text-gradient",
      },
      {
        name: "grid",
        color: "green-text-gradient",
      },
      {
        name: "analysis",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    sourceCodeLink: "https://www.researchgate.net/profile/Sajesan-Ghimire",
  },
  {
    name: "Smart Grid Communication Protocol",
    description:
      "Designed and implemented a secure communication protocol for smart grid applications, ensuring reliable data transmission and system security.",
    tags: [
      {
        name: "smart-grid",
        color: "blue-text-gradient",
      },
      {
        name: "security",
        color: "green-text-gradient",
      },
      {
        name: "protocol",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    sourceCodeLink: "https://www.researchgate.net/profile/Sajesan-Ghimire",
  },
  {
    name: "Electric Vehicle Charging Station Design",
    description:
      "Developed a comprehensive design for EV charging infrastructure, including load management and grid integration solutions.",
    tags: [
      {
        name: "EV",
        color: "blue-text-gradient",
      },
      {
        name: "charging",
        color: "green-text-gradient",
      },
      {
        name: "design",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    sourceCodeLink: "https://www.researchgate.net/profile/Sajesan-Ghimire",
  },
  {
    name: "Power Quality Monitoring System",
    description:
      "Created a real-time power quality monitoring system using Arduino and IoT technologies to detect and analyze power quality issues.",
    tags: [
      {
        name: "arduino",
        color: "blue-text-gradient",
      },
      {
        name: "IoT",
        color: "green-text-gradient",
      },
      {
        name: "monitoring",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    sourceCodeLink: "https://www.researchgate.net/profile/Sajesan-Ghimire",
  },
 
];


export { services, technologies, experiences, testimonials, projects };
