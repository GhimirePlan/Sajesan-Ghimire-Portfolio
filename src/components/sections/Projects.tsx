import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { SectionWrapper } from '../../hoc';
import { styles } from '../../constants/styles';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';

type Category = 'professional' | 'academic';

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
  title: 'Academic & research',
  tagline: 'Research and applied projects in power systems, renewable energy, and automation.',
  categories: [
    {
      id: 'A1',
      title: 'Power Systems & Control',
      tagline: 'Modeling, control, and power quality analysis.',
      projects: [
        {
          title: 'ANN-Based UPFC for Power Flow Optimization',
          subtitle: 'Intelligent control of FACTS devices using AI',
          tags: ['Power Systems', 'ANN', 'MATLAB', 'Simulink'],
          description:
            'A MATLAB/Simulink study of neural-network control for a unified power flow controller, assessing power flow and voltage response under varying loads.',
          details: ['Role: Modeling, ANN training, performance analysis'],
          cta: 'View details',
        },
        {
          title: 'PID vs ANFIS Controllers for AVR Voltage Regulation',
          subtitle: 'Comparative analysis for excitation control',
          tags: ['AVR', 'Intelligent Control', 'MATLAB', 'ANFIS'],
          details: ['Outcome: Published in OODBODHAN Journal, Vol. 7, 2024'],
          cta: 'View details',
        },
        {
          title: 'Single-Tuned Passive Filters for THD Mitigation',
          subtitle: 'Power quality enhancement study',
          tags: ['Power Quality', 'Harmonics', 'MATLAB'],
          details: ['Outcome: Published in Journal of Electrical Systems and Studies (JES²), 2024'],
          cta: 'View details',
        },
        {
          title: 'ML-Based Demand Side Management for Smart Grids',
          subtitle: 'Optimizing energy consumption',
          tags: ['Machine Learning', 'Smart Grids'],
          cta: 'View details',
        },
      ],
    },
    {
      id: 'A2',
      title: 'Solar PV & Renewable Energy Systems',
      tagline: 'Feasibility, performance, and renewable energy integration.',
      projects: [
        {
          title: 'Hybrid Renewable Energy Microgrid Design',
          subtitle: 'PV / Wind / Diesel / Battery integration',
          tags: ['Hybrid Systems', 'PVsyst', 'HOMER Pro', 'MATLAB', 'Python'],
          cta: 'View details',
        },
        {
          title: 'Dual-Axis MPPT Solar Tracking System',
          subtitle: 'Maximizing solar energy capture',
          tags: ['Solar Tracking', 'MATLAB'],
          cta: 'View details',
        },
        {
          title: 'Utility-Scale Solar PV Plant – Techno-Economic Analysis',
          subtitle: '30 MWp Plant Analysis in Dang, Nepal',
          tags: ['30 MWp', 'Dang, Nepal', 'PVsyst', 'MATLAB'],
          details: ['Status: Manuscript under preparation'],
          cta: 'View details',
        },
        {
          title: 'Grid-Connected Rooftop PV System – Performance Evaluation',
          subtitle: '246 kWp System Analysis',
          tags: ['246 kWp', 'PVsyst', 'HelioScope'],
          cta: 'View details',
        },
        {
          title: 'Tracked Bifacial PV Plant – Design Impact Study',
          subtitle: 'Advanced PV technology assessment',
          tags: ['Bifacial PV', 'Tracking Systems'],
          cta: 'View details',
        },
      ],
    },
    {
      id: 'A3',
      title: 'Automation, Robotics & Intelligent Systems',
      tagline: 'Applied intelligence through embedded systems and automation.',
      projects: [
        {
          title: 'IoT-Based Smart Home Automation System',
          subtitle: 'Winner of DELTA 4.0 Hackathon',
          tags: ['Arduino', 'IoT', 'Hackathon Winner'],
          cta: 'View details',
        },
        {
          title: 'Automatic Color Sorting Robotic Arm',
          subtitle: 'Winner of Electro-Mela',
          tags: ['Robotics', 'Electro-Mela Winner'],
          cta: 'View details',
        },
      ],
    },
  ],
};

const professionalData: SectionData = {
  title: 'Professional Projects',
  tagline: 'Solar PV, building electrical systems, and site engineering.',
  categories: [
    {
      id: 'B1',
      title: 'Solar PV Design & Engineering',
      tagline: 'Feasibility and design for rooftop and utility-scale solar.',
      projects: [
        {
          title: 'Utility-Scale Solar Power Plant – Feasibility & Design',
          subtitle: '30 MWp Plant in Dang, Nepal',
          tags: ['Dang, Nepal', '30 MWp', 'PVsyst', 'MATLAB'],
          details: ['Role: DFS/DPR support, performance & financial modeling'],
          cta: 'View details',
        },
        {
          title: 'Utility-Scale Solar PV Plant – Techno-Economic Analysis',
          subtitle: '1 MWp Plant in Nepalgunj',
          tags: ['Nepalgunj', '1 MWp', 'PVsyst'],
          cta: 'View details',
        },
        {
          title: 'Grid-Connected Rooftop Solar PV System',
          subtitle: '246 kWp System in Kathmandu',
          tags: ['Kathmandu', '246 kWp', 'PVsyst', 'HelioScope', 'AutoCAD'],
          cta: 'View details',
        },
        {
          title: 'Bifacial & Tracked PV Plant Impact Study',
          subtitle: 'Analysis of advanced PV systems',
          tags: ['Advanced PV Systems'],
          cta: 'View details',
        },
      ],
    },
    {
      id: 'B2',
      title: 'MEP Electrical Design & Site Supervision',
      tagline: 'Building services design and on-site coordination.',
      projects: [
        {
          title: 'Building Electrical System Design (MEP)',
          subtitle: 'Comprehensive LV system design',
          tags: ['AutoCAD', 'LV Systems'],
          cta: 'View details',
        },
        {
          title: 'Electrical Site Supervision & Coordination',
          subtitle: 'On-site execution and quality assurance',
          tags: ['Site Supervision', 'QA & Coordination'],
          cta: 'View details',
        },
      ],
    },
    {
      id: 'B3',
      title: 'Power Systems & Infrastructure Exposure',
      tagline: 'Experience in hydropower and healthcare infrastructure.',
      projects: [
        {
          title: 'Middle Marsyangdi Hydropower Station Internship',
          subtitle: '70 MW Hydropower Station',
          tags: ['NEA', '70 MW', 'Hydropower'],
          cta: 'View details',
        },
        {
          title: 'Hospital Electrical Systems Design',
          subtitle: 'Manipal Hospital',
          tags: ['Healthcare', 'AutoCAD'],
          cta: 'View details',
        },
      ],
    },
    {
      id: 'B4',
      title: 'Automation & Embedded Engineering',
      tagline: 'Embedded control, monitoring, and EV infrastructure.',
      projects: [
        {
          title: 'IoT-Based Load Monitoring & Control System',
          subtitle: 'Remote monitoring solution',
          tags: ['Arduino', 'IoT'],
          cta: 'View details',
        },
        {
          title: 'V2X Charging System',
          subtitle: 'Winner of Electro-Mela',
          tags: ['EV Infrastructure', 'Electro-Mela Winner'],
          cta: 'View details',
        },
      ],
    },
  ],
};

const projectSummaries: Record<string, string> = {
  'PID vs ANFIS Controllers for AVR Voltage Regulation':
    'Comparison of PID and ANFIS control methods for automatic voltage regulation, using simulation to assess control response.',
  'Single-Tuned Passive Filters for THD Mitigation':
    'Analysis of single-tuned passive filters for reducing total harmonic distortion in electrical systems.',
  'ML-Based Demand Side Management for Smart Grids':
    'A study of machine learning methods for demand-side energy management in smart grids.',
  'Hybrid Renewable Energy Microgrid Design':
    'Modeling a hybrid microgrid combining solar PV, wind generation, diesel backup, and battery storage.',
  'Dual-Axis MPPT Solar Tracking System':
    'A solar tracking project examining panel orientation and maximum power point tracking.',
  'Utility-Scale Solar PV Plant – Techno-Economic Analysis':
    'Assessment of solar PV performance and financial feasibility for the plant capacity and location listed above.',
  'Grid-Connected Rooftop PV System – Performance Evaluation':
    'Performance evaluation of a 246 kWp grid-connected rooftop solar system.',
  'Tracked Bifacial PV Plant – Design Impact Study':
    'Assessment of tracking and bifacial module choices in solar PV plant design.',
  'IoT-Based Smart Home Automation System':
    'An embedded system for remote appliance control and home monitoring.',
  'Automatic Color Sorting Robotic Arm':
    'A robotic arm project for automated identification and sorting by colour.',
  'Utility-Scale Solar Power Plant – Feasibility & Design':
    'Feasibility and design support for a 30 MWp solar PV plant in Dang, including performance and financial modeling.',
  'Grid-Connected Rooftop Solar PV System':
    'System design for a 246 kWp rooftop PV installation in Kathmandu.',
  'Bifacial & Tracked PV Plant Impact Study':
    'Analysis of bifacial modules and tracking configurations for PV plant performance.',
  'Building Electrical System Design (MEP)':
    'Low-voltage building services design, covering layouts, load calculations, and electrical distribution.',
  'Electrical Site Supervision & Coordination':
    'Site supervision and coordination of electrical installation, quality checks, and project documentation.',
  'Middle Marsyangdi Hydropower Station Internship':
    'Practical exposure to generation equipment and electrical systems at a 70 MW hydropower station.',
  'Hospital Electrical Systems Design':
    'Electrical design experience at Manipal Hospital, including power distribution and critical facility services.',
  'IoT-Based Load Monitoring & Control System':
    'An Arduino and IoT project for remote load monitoring and control.',
  'V2X Charging System': 'An electric vehicle charging project presented at Electro-Mela.',
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
      aria-pressed={active}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/10 ${
        active ? 'bg-[#915EFF] text-white' : 'bg-tertiary text-secondary hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
};

const ProjectCard = ({ project, index }: { project: ProjectItem; index: number }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
      className="h-full"
    >
      <div className="bg-tertiary text-white rounded-2xl p-5 h-full flex flex-col border border-white/10">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          {project.subtitle && <p className="text-sm text-secondary">{project.subtitle}</p>}
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
          <p className="text-sm text-secondary mb-4 flex-grow">{project.description}</p>
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
          <div
            className={`${
              project.description || project.details?.length ? 'mt-2' : 'mt-auto'
            } pt-2 border-t border-white/10`}
          >
            <button
              onClick={() => dialog.current?.showModal()}
              className="text-[#b79aff] text-sm font-semibold hover:text-white transition-colors"
            >
              {project.cta} →
            </button>
          </div>
        )}
      </div>
      <dialog
        ref={dialog}
        className="bg-tertiary text-white rounded-2xl p-8 max-w-xl w-[calc(100%_-_2rem)] border border-white/10 backdrop:bg-black/80"
        aria-label={project.title}
      >
        <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
        <p className="text-secondary text-sm leading-relaxed">
          {project.description ||
            project.subtitle ||
            'Contact me to discuss the scope, engineering approach, and available project documentation.'}
        </p>
        {project.details?.map(detail => (
          <p className="text-secondary text-sm mt-3" key={detail}>
            {detail}
          </p>
        ))}
        <div className="flex gap-5 items-center mt-6">
          <a
            href={`${import.meta.env.BASE_URL}#contact`}
            className="text-[#b79aff]"
            onClick={() => dialog.current?.close()}
          >
            Discuss this project
          </a>
          <button
            className="border border-white/20 rounded-lg px-4 py-2"
            onClick={() => dialog.current?.close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </motion.div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState<Category>('professional');

  const currentData = activeTab === 'academic' ? academicData : professionalData;

  return (
    <div className="w-full">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-4 group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      <div className="mb-6">
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <TabButton
          label="Professional"
          active={activeTab === 'professional'}
          onClick={() => setActiveTab('professional')}
        />
        <TabButton
          label="Academic & research"
          active={activeTab === 'academic'}
          onClick={() => setActiveTab('academic')}
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
          <h3 className="text-secondary text-base mt-2 leading-relaxed">{currentData.tagline}</h3>
        </motion.div>
      </div>

      <div className="flex flex-col gap-12">
        {currentData.categories.map(category => (
          <div key={category.id}>
            <div className="flex items-center mb-6">
              <div className="border-l-2 border-[#915EFF] h-10 mr-4" />
              <div>
                <h4 className="text-white font-bold text-xl">{category.title}</h4>
                <p className="text-secondary text-sm mt-1">{category.tagline}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.projects.map((project, index) => (
                <ProjectCard
                  key={`${category.id}-${index}`}
                  project={{
                    ...project,
                    description: project.description || projectSummaries[project.title],
                  }}
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

export default SectionWrapper(Projects, 'projects');
