import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from '../types';

import {
  mobile,
  backend,
  creator,
  web,
  proteus,
  git,
  audrino,
  figma,
  carrent,
  jobit,
  tripguide,
  Ai,
  Photoshop,
  canva,
  word,
  manipal,
  nea,
  egen,
  essotl,
  panchase,
  advance,
  smart,
} from '../assets';

import pvsystTool from '../assets/tech/tools/pvsyst.webp';
import helioscopeTool from '../assets/tech/tools/helioscope.webp';
import matlabTool from '../assets/tech/tools/matlab.webp';
import etapTool from '../assets/tech/tools/etap.webp';
import autocadTool from '../assets/tech/tools/autocad.webp';
import homerTool from '../assets/tech/tools/homer.webp';
import scadaTool from '../assets/tech/tools/scada.webp';
import revitTool from '../assets/tech/tools/revit.webp';
import sketchupTool from '../assets/tech/tools/sketchup.webp';
import primaveraTool from '../assets/tech/tools/primavera.webp';
import dialuxTool from '../assets/tech/tools/dialux.webp';
import storlyticsTool from '../assets/tech/tools/storlytics.webp';
import pythonTool from '../assets/tech/tools/python.webp';
import cplusplusTool from '../assets/tech/tools/cplusplus.webp';
import excelTool from '../assets/tech/tools/excel.webp';
import virtoTool from '../assets/tech/tools/virto.webp';
import chatgptTool from '../assets/tech/tools/chatgpt.webp';
import notionTool from '../assets/tech/tools/notion.webp';

export const navLinks: TNavLink[] = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'projects',
    title: 'Projects',
    link: '/projects',
  },
  {
    id: 'blog',
    title: 'Blog',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services: TService[] = [
  {
    title: 'Electrical System Designer',
    icon: web,
    description:
      'Power distribution, lighting, and protection design for buildings and energy projects.',
    details: [
      'Power distribution system design and optimization',
      'Load calculation and system sizing',
      'Single Line Diagram (SLD) development',
      'Emergency power system design',
      'Lighting system design and optimization',
      'Cable sizing and routing',
      'Protection system coordination',
      'Compliance with electrical codes and standards',
    ],
    tools: ['AutoCAD', 'DIALux', 'ETAP', 'MATLAB'],
    experience: '3+ years',
  },
  {
    title: 'Researcher',
    icon: mobile,
    description:
      'Modeling and analysis of power systems, control methods, and renewable energy integration.',
    details: [
      'Power system stability analysis',
      'Renewable energy integration studies',
      'Smart grid technology research',
      'Control system optimization',
      'Power quality analysis',
      'Energy efficiency studies',
      'Published research papers',
      'Conference presentations',
    ],
    tools: ['MATLAB', 'Simulink', 'Python', 'ResearchGate'],
    experience: '2+ years',
  },
  {
    title: 'PV System Designer',
    icon: creator,
    description: 'Solar PV feasibility, system sizing, layout design, and performance analysis.',
    details: [
      'PV system design and optimization',
      'Detailed feasibility study (DFS)',
      'Solar panel selection and sizing',
      'Battery storage system design',
      'Procurement coordination and construction supervision',
    ],
    tools: ['PVsyst', 'HelioScope', 'SketchUp', 'AutoCAD', 'Virto Solar'],
    experience: '1+ years',
  },
  {
    title: 'Robotics & Automation',
    icon: backend,
    description: 'Embedded systems, IoT monitoring, and practical automation applications.',
    details: [
      'PLC programming and implementation',
      'Industrial automation system design',
      'Robotic system integration',
      'Process control optimization',
      'SCADA system development',
      'IoT-based automation solutions',
      'Motion control systems',
      'Safety system implementation',
    ],
    tools: ['Arduino', 'Raspberry Pi', 'Python', 'C++'],
    experience: '2+ years',
  },
];

const technologies: TTechnology[] = [
  { name: 'PVsyst', icon: pvsystTool },
  { name: 'HelioScope', icon: helioscopeTool },
  { name: 'MATLAB/Simulink', icon: matlabTool },
  { name: 'ETAP', icon: etapTool },
  { name: 'AutoCAD', icon: autocadTool },
  { name: 'HOMER', icon: homerTool },
  { name: 'SCADA', icon: scadaTool },
  { name: 'Revit', icon: revitTool },
  { name: 'SketchUp', icon: sketchupTool },
  { name: 'Primavera P6', icon: primaveraTool },
  { name: 'DIALux evo', icon: dialuxTool },
  { name: 'Storlytics', icon: storlyticsTool },
  { name: 'Python', icon: pythonTool },
  { name: 'C/C++', icon: cplusplusTool },
  { name: 'MS Excel', icon: excelTool },
  { name: 'Virto Solar', icon: virtoTool },
  { name: 'ChatGPT', icon: chatgptTool },
  { name: 'Notion', icon: notionTool },
];

const additionalTechnologies: TTechnology[] = [
  {
    name: 'Illustrator',
    icon: Ai,
  },
  {
    name: 'Word',
    icon: word,
  },
  {
    name: 'Canva',
    icon: canva,
  },
  {
    name: 'Photoshop',
    icon: Photoshop,
  },
  {
    name: 'Proteus',
    icon: proteus,
  },
  {
    name: 'Arduino',
    icon: audrino,
  },
  {
    name: 'Git',
    icon: git,
  },
  {
    name: 'Figma',
    icon: figma,
  },
];

const experiences: TExperience[] = [
  {
    title: 'Electrical Engineer (BD & EPC)',
    companyName: 'Smart Solar Nepal Corporation',
    icon: smart,
    iconBg: '#383E56',
    date: 'Dec 2025 – Present',
    points: [
      'Design solar PV systems and support site execution, including system sizing and single-line diagrams.',
      'Coordinate with clients and prepare feasibility reports, technical documentation, and commissioning manuals.',
      'Conduct site surveys and prepare technical and commercial proposals for solar installations.',
    ],
  },
  {
    title: 'Electrical Design Engineer',
    companyName: 'Advanced Energy Construction Pvt. Ltd.',
    icon: advance,
    iconBg: '#383E56',
    date: 'May 2025 – Dec 2025',
    points: [
      'Designed grid-connected and off-grid solar PV systems using PVsyst, HelioScope, SketchUp, AutoCAD, and Vitro Solar.',
      'Conducted site surveys, sized systems, and prepared detailed feasibility studies for commercial, industrial, and utility-scale projects.',
      'Led design and feasibility studies for more than 20 MW of rooftop solar and 100 MW of ground-mounted projects.',
      'Coordinated procurement, vendors, and construction supervision to meet project requirements.',
      'Supported grid integration and commissioning documentation.',
    ],
  },
  {
    title: 'Electrical Engineer (Site)',
    companyName: 'Panchase Engineering Consultancy',
    icon: panchase,
    iconBg: '#383E56',
    date: 'Nov 2024 – Jan 2025',
    points: [
      'Supervised electrical works for building services, with attention to design compliance and site safety.',
      'Revised electrical layouts to reflect site conditions and installation requirements.',
      'Prepared measurements and billing records and supported testing and commissioning.',
    ],
  },
  {
    title: 'Electrical Engineering Internship',
    companyName: 'Nepal Manipal Teaching Hospital',
    icon: manipal,
    iconBg: '#383E56',
    date: 'Sep 2024 – Nov 2024',
    points: [
      'Supported power distribution, lighting, and biomedical equipment supply design.',
      'Prepared and reviewed single-line diagrams, load calculations, and cable sizing for the hospital and hostel.',
      'Reviewed low-voltage services, including CCTV, public address, Ethernet, and telephone systems.',
      'Monitored and reported on electrical works in intensive care, operating theatre, and oncology facilities.',
      'Studied emergency power, fire alarm, UPS, and earthing requirements for clinical facilities.',
    ],
  },
  {
    title: 'Engineering Intern',
    companyName: 'Nepal Electricity Authority, Nepal',
    icon: nea,
    iconBg: '#E6DEDD',
    date: 'Nov 2023 – Dec 2023',
    points: [
      'Studied hydropower generation, turbine operation, and electrical plant systems.',
      'Gained practical exposure to Nepal’s power generation and electricity supply infrastructure.',
      'Reviewed NEA operations and the regulatory context for electricity supply.',
      'Developed technical observation, problem-solving, and teamwork skills in a plant environment.',
    ],
  },
  {
    title: 'Secretary',
    companyName: 'Electrical Generation Club (E-GEN)',
    icon: egen,
    iconBg: '#383E56',
    date: 'Jan 2022 – Jan 2023',
    points: [
      'Coordinated engineering programmes, training sessions, and club administration.',
      'Served as a lead coordinator for ELECTRO-MELA 2.0 in Pokhara.',
      'Supported improvements to club coordination and member activities.',
    ],
  },
  {
    title: 'President',
    companyName: 'Engineering Student Society of Tanahun and Lamjung (ESSOTL)',
    icon: essotl,
    iconBg: '#E6DEDD',
    date: 'Apr 2023 – Jun 2024',
    points: [
      'Led student events, including academic competitions, sports tournaments, and cultural programmes.',
      'Coordinated student teams and worked with faculty on event planning and delivery.',
    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      'Working on-site, I ensured electrical designs were not just implemented but optimized in real-time, overcoming challenges to enhance efficiency and project success.',
    name: 'Sanat Poudel',
    designation: 'Operations Manager',
    company: 'Himal Engineering Inc.',
    image:
      'https://cdn.vectorstock.com/i/500p/22/63/a-simple-black-silhouette-of-man-in-suit-vector-55942263.jpg',
  },
  {
    testimonial:
      'Working closely with the team, they ensured every electrical design was precise and practical, helping us meet tight deadlines without compromising quality.',
    name: 'Ramesh Shrestha',
    designation: 'Senior Engineer',
    company: 'ElectroTech Solutions',
    image:
      'https://cdn.vectorstock.com/i/500p/22/63/a-simple-black-silhouette-of-man-in-suit-vector-55942263.jpg',
  },

  {
    testimonial:
      'Their attention to detail and strict adherence to safety protocols gave us confidence throughout the project lifecycle.',
    name: 'Bibek Karki',
    designation: 'Site Manager',
    company: 'Lumbini Electrical Contractors',
    image:
      'https://cdn.vectorstock.com/i/500p/22/63/a-simple-black-silhouette-of-man-in-suit-vector-55942263.jpg',
  },
];
const projects: TProject[] = [
  {
    name: 'PID & ANFIS Control for Voltage Regulation',
    description:
      'A MATLAB/Simulink comparison of PID and ANFIS control for an automatic voltage regulator, evaluating settling time and overshoot.',
    tags: [
      {
        name: 'matlab',
        color: 'blue-text-gradient',
      },
      {
        name: 'simulink',
        color: 'green-text-gradient',
      },
      {
        name: 'ANFIS',
        color: 'pink-text-gradient',
      },
    ],
    image: carrent,
    sourceCodeLink:
      'https://www.researchgate.net/publication/389150640_Comparative_Assessment_of_PID_and_ANFIS_Controllers_in_an_Automatic_Voltage_Regulator',
  },
  {
    name: 'ANN-based UPFC for Power Flow & Voltage Enhancement',
    description:
      'An ANN-based unified power flow controller modeled in MATLAB/Simulink to study power flow, voltage regulation, and control response.',
    tags: [
      {
        name: 'matlab',
        color: 'blue-text-gradient',
      },
      {
        name: 'UPFC',
        color: 'green-text-gradient',
      },
      {
        name: 'ANN',
        color: 'pink-text-gradient',
      },
    ],
    image: tripguide,
    sourceCodeLink: 'https://www.linkedin.com/in/sajesan/',
  },
  {
    name: 'IoT-Based Home Automation',
    description:
      'An Arduino, Python, and NodeMCU system for remote appliance control and home monitoring.',
    tags: [
      {
        name: 'iot',
        color: 'blue-text-gradient',
      },
      {
        name: 'arduino',
        color: 'green-text-gradient',
      },
      {
        name: 'python',
        color: 'pink-text-gradient',
      },
    ],
    image: jobit,
    sourceCodeLink:
      'https://www.linkedin.com/posts/sajesan_teamurja-hardwarehackathon-activity-7155555264052486144-Or6Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAADk4wCsBjLFTlUqsTlcQrGPSo3T73aeu9Is',
  },
  {
    name: 'Smart Energy Management System',
    description:
      'A study of energy consumption management using machine learning and real-time monitoring.',
    tags: [
      {
        name: 'ML',
        color: 'blue-text-gradient',
      },
      {
        name: 'IoT',
        color: 'green-text-gradient',
      },
      {
        name: 'Python',
        color: 'pink-text-gradient',
      },
    ],
    image: carrent,
    sourceCodeLink: 'https://www.researchgate.net/profile/Sajesan-Ghimire',
  },
  {
    name: 'Power System Stability Analysis',
    description:
      'MATLAB analysis of transient stability and voltage regulation under different fault conditions.',
    tags: [
      {
        name: 'matlab',
        color: 'blue-text-gradient',
      },
      {
        name: 'power-systems',
        color: 'green-text-gradient',
      },
      {
        name: 'analysis',
        color: 'pink-text-gradient',
      },
    ],
    image: tripguide,
    sourceCodeLink: 'https://www.researchgate.net/profile/Sajesan-Ghimire',
  },
  {
    name: 'Renewable Energy Integration Study',
    description:
      'Analysis of renewable energy integration, with a focus on grid stability and operating efficiency.',
    tags: [
      {
        name: 'renewable',
        color: 'blue-text-gradient',
      },
      {
        name: 'grid',
        color: 'green-text-gradient',
      },
      {
        name: 'analysis',
        color: 'pink-text-gradient',
      },
    ],
    image: jobit,
    sourceCodeLink: 'https://www.researchgate.net/profile/Sajesan-Ghimire',
  },
  {
    name: 'Smart Grid Communication Protocol',
    description:
      'A smart grid communication project focused on reliable data transfer and system security.',
    tags: [
      {
        name: 'smart-grid',
        color: 'blue-text-gradient',
      },
      {
        name: 'security',
        color: 'green-text-gradient',
      },
      {
        name: 'protocol',
        color: 'pink-text-gradient',
      },
    ],
    image: carrent,
    sourceCodeLink: 'https://www.researchgate.net/profile/Sajesan-Ghimire',
  },
  {
    name: 'Electric Vehicle Charging Station Design',
    description:
      'EV charging infrastructure design covering load management and grid connection requirements.',
    tags: [
      {
        name: 'EV',
        color: 'blue-text-gradient',
      },
      {
        name: 'charging',
        color: 'green-text-gradient',
      },
      {
        name: 'design',
        color: 'pink-text-gradient',
      },
    ],
    image: tripguide,
    sourceCodeLink: 'https://www.researchgate.net/profile/Sajesan-Ghimire',
  },
  {
    name: 'Power Quality Monitoring System',
    description: 'An Arduino and IoT system for real-time power quality monitoring and analysis.',
    tags: [
      {
        name: 'arduino',
        color: 'blue-text-gradient',
      },
      {
        name: 'IoT',
        color: 'green-text-gradient',
      },
      {
        name: 'monitoring',
        color: 'pink-text-gradient',
      },
    ],
    image: jobit,
    sourceCodeLink: 'https://www.researchgate.net/profile/Sajesan-Ghimire',
  },
];

export { services, technologies, additionalTechnologies, experiences, testimonials, projects };
