import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { SectionWrapper } from "../../hoc";
import { styles } from "../../constants/styles";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

type Category = "professional" | "academic";

type ProjectItem = {
  title: string;
  subtitle?: string;
  tags?: string[];
  description?: string;
  details?: string[]; // Role / Outcome / Status
  cta?: string;
};

type ProjectCategory = {
  id: string;
  title: string;
  tagline: string;
  projects: ProjectItem[];
};

type SectionData = {
  title: string;
  tagline: string;
  categories: ProjectCategory[];
};

const academicData: SectionData = {
  title: "Academic & Research Projects",
  tagline:
    "Research-driven work in power systems, renewable energy, control, and intelligent automation.",
  categories: [
    {
      id: "A1",
      title: "Power Systems & Control",
      tagline:
        "Advanced modeling and intelligent control for stable and efficient power systems.",
      projects: [
        {
          title: "ANN-Based UPFC for Power Flow Optimization",
          subtitle: "Intelligent control of FACTS devices using AI",
          tags: ["Power Systems", "ANN", "MATLAB", "Simulink"],
          description:
            "This research investigates the application of Artificial Neural Networks for adaptive control of a Unified Power Flow Controller in transmission systems. The ANN‑based controller dynamically regulates power flow and improves voltage stability under varying load conditions. Simulation results demonstrate superior performance compared to conventional PI‑based controllers, highlighting the potential of AI‑driven control strategies for future smart grids.",
          details: ["Role: Modeling, ANN training, performance analysis"],
          cta: "View Case Study",
        },
        {
          title: "PID vs ANFIS Controllers for AVR Voltage Regulation",
          subtitle: "Comparative analysis for excitation control",
          tags: ["AVR", "Intelligent Control", "MATLAB", "ANFIS"],
          details: ["Outcome: Published in OODBODHAN Journal, Vol. 7, 2024"],
          cta: "View Case Study",
        },
        {
          title: "Single-Tuned Passive Filters for THD Mitigation",
          subtitle: "Power quality enhancement study",
          tags: ["Power Quality", "Harmonics", "MATLAB"],
          details: [
            "Outcome: Published in Journal of Electrical Systems and Studies (JES²), 2024",
          ],
          cta: "View Case Study",
        },
        {
          title: "ML-Based Demand Side Management for Smart Grids",
          subtitle: "Optimizing energy consumption",
          tags: ["Machine Learning", "Smart Grids"],
          cta: "View Details",
        },
      ],
    },
    {
      id: "A2",
      title: "Solar PV & Renewable Energy Systems",
      tagline:
        "Techno-economic and performance analysis of modern solar and hybrid energy systems.",
      projects: [
        {
          title: "Hybrid Renewable Energy Microgrid Design",
          subtitle: "PV / Wind / Diesel / Battery integration",
          tags: ["Hybrid Systems", "PVsyst", "HOMER Pro", "MATLAB", "Python"],
          cta: "View Case Study",
        },
        {
          title: "Dual-Axis MPPT Solar Tracking System",
          subtitle: "Maximizing solar energy capture",
          tags: ["Solar Tracking", "MATLAB"],
          cta: "View Project Details",
        },
        {
          title: "Utility-Scale Solar PV Plant – Techno-Economic Analysis",
          subtitle: "30 MWp Plant Analysis in Dang, Nepal",
          tags: ["30 MWp", "Dang, Nepal", "PVsyst", "MATLAB"],
          details: ["Status: Manuscript under preparation"],
          cta: "View Case Study",
        },
        {
          title: "Grid-Connected Rooftop PV System – Performance Evaluation",
          subtitle: "246 kWp System Analysis",
          tags: ["246 kWp", "PVsyst", "Helioscope"],
          cta: "View Case Study",
        },
        {
          title: "Tracked Bifacial PV Plant – Design Impact Study",
          subtitle: "Advanced PV technology assessment",
          tags: ["Bifacial PV", "Tracking Systems"],
          cta: "View Details",
        },
      ],
    },
    {
      id: "A3",
      title: "Automation, Robotics & Intelligent Systems",
      tagline: "Applied intelligence through embedded systems and automation.",
      projects: [
        {
          title: "IoT-Based Smart Home Automation System",
          subtitle: "Winner of DELTA 4.0 Hackathon",
          tags: ["Arduino", "IoT", "Hackathon Winner"],
          cta: "View Case Study",
        },
        {
          title: "Automatic Color Sorting Robotic Arm",
          subtitle: "Winner of Electro-Mela",
          tags: ["Robotics", "Electro-Mela Winner"],
          cta: "View Project Details",
        },
      ],
    },
  ],
};

const professionalData: SectionData = {
  title: "Professional / Electrical Engineering Projects",
  tagline:
    "Industry-focused engineering work in solar PV, power systems, MEP design, and automation.",
  categories: [
    {
      id: "B1",
      title: "Solar PV Design & Engineering",
      tagline:
        "From rooftop systems to utility-scale solar plants — design, performance, and feasibility.",
      projects: [
        {
          title: "Utility-Scale Solar Power Plant – Feasibility & Design",
          subtitle: "30 MWp Plant in Dang, Nepal",
          tags: ["Dang, Nepal", "30 MWp", "PVsyst", "MATLAB"],
          details: ["Role: DFS/DPR support, performance & financial modeling"],
          cta: "View Case Study",
        },
        {
          title: "Utility-Scale Solar PV Plant – Techno-Economic Analysis",
          subtitle: "1 MWp Plant in Nepalgunj",
          tags: ["Nepalgunj", "1 MWp", "PVsyst"],
          cta: "View Case Study",
        },
        {
          title: "Grid-Connected Rooftop Solar PV System",
          subtitle: "246 kWp System in Kathmandu",
          tags: ["Kathmandu", "246 kWp", "PVsyst", "Helioscope", "AutoCAD"],
          cta: "View Case Study",
        },
        {
          title: "Bifacial & Tracked PV Plant Impact Study",
          subtitle: "Analysis of advanced PV systems",
          tags: ["Advanced PV Systems"],
          cta: "View Case Study",
        },
      ],
    },
    {
      id: "B2",
      title: "MEP Electrical Design & Site Supervision",
      tagline:
        "Practical building electrical design with on-site execution awareness.",
      projects: [
        {
          title: "Building Electrical System Design (MEP)",
          subtitle: "Comprehensive LV system design",
          tags: ["AutoCAD", "LV Systems"],
          cta: "View Project Details",
        },
        {
          title: "Electrical Site Supervision & Coordination",
          subtitle: "On-site execution and quality assurance",
          tags: ["Site Supervision", "QA & Coordination"],
          cta: "View Project Details",
        },
      ],
    },
    {
      id: "B3",
      title: "Power Systems & Infrastructure Exposure",
      tagline:
        "Hands-on exposure to utility-scale and critical electrical infrastructure.",
      projects: [
        {
          title: "Middle Marsyangdi Hydropower Station Internship",
          subtitle: "70 MW Hydropower Station",
          tags: ["NEA", "70 MW", "Hydropower"],
          cta: "View Experience Details",
        },
        {
          title: "Hospital Electrical Systems Design",
          subtitle: "Manipal Hospital",
          tags: ["Healthcare", "AutoCAD"],
          cta: "View Project Details",
        },
      ],
    },
    {
      id: "B4",
      title: "Automation & Embedded Engineering",
      tagline: "Smart automation and future-ready energy systems.",
      projects: [
        {
          title: "IoT-Based Load Monitoring & Control System",
          subtitle: "Remote monitoring solution",
          tags: ["Arduino", "IoT"],
          cta: "View Case Study",
        },
        {
          title: "V2X Charging System",
          subtitle: "Winner of Electro-Mela",
          tags: ["EV Infrastructure", "Electro-Mela Winner"],
          cta: "View Project Details",
        },
      ],
    },
  ],
};

const TabButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/10 ${
        active
          ? "bg-[#915EFF] text-white"
          : "bg-tertiary text-secondary hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="h-full"
    >
      <div className="bg-tertiary text-white rounded-2xl p-5 h-full flex flex-col border border-white/10">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          {project.subtitle && (
            <p className="text-sm italic text-secondary">{project.subtitle}</p>
          )}
        </div>
        
        {project.tags && project.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((t, i) => (
              <span
                key={i}
                className="bg-black/20 text-secondary text-xs px-3 py-1 rounded-full border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {project.description && (
          <p className="text-sm text-secondary mb-4 flex-grow">
            {project.description}
          </p>
        )}

        {project.details && project.details.length > 0 && (
          <div className="mt-auto mb-4">
            <ul className="list-disc ml-5 space-y-1">
              {project.details.map((d, i) => (
                <li key={i} className="text-sm text-secondary">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {project.cta && (
            <div className={`mt-${project.description || (project.details && project.details.length > 0) ? '2' : 'auto'} pt-2 border-t border-white/10`}>
                <button className="text-[#915EFF] text-sm font-semibold hover:text-white transition-colors">
                    {project.cta} →
                </button>
            </div>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState<Category>("academic");
  
  const currentData = activeTab === "academic" ? academicData : professionalData;

  return (
    <div className="w-full">
      <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-4 group">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>
      
      <div className="mb-6">
        <h2 className={styles.sectionHeadText}>Projects / Works</h2>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <TabButton
          label="Professional / Electrical Engineering"
          active={activeTab === "professional"}
          onClick={() => setActiveTab("professional")}
        />
        <TabButton
          label="Academic & Research"
          active={activeTab === "academic"}
          onClick={() => setActiveTab("academic")}
        />
      </div>

      <div className="mb-10">
        <motion.div
            key={`header-${activeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p className={styles.sectionSubText}>{currentData.title}</p>
            <h3 className="text-white font-semibold text-xl md:text-2xl mt-2 leading-relaxed">
            {currentData.tagline}
            </h3>
        </motion.div>
      </div>

      <div className="flex flex-col gap-12">
        {currentData.categories.map((category) => (
          <div key={category.id}>
            <div className="flex items-center mb-6">
              <div className="border-l-8 border-blue-500 h-10 mr-4" />
              <div>
                <h4 className="text-white font-bold text-xl">
                  {category.id}. {category.title}
                </h4>
                <p className="text-secondary text-sm mt-1">{category.tagline}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.projects.map((project, index) => (
                <ProjectCard 
                  key={`${category.id}-${index}`} 
                  project={project} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Projects, "projects");
