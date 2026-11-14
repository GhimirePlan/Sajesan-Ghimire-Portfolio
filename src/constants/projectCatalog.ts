export type Category = 'professional' | 'academic';

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
    'Solar PV performance and financial feasibility analysis.',
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

export type Discipline = 'solar' | 'power' | 'buildings' | 'automation';
export type CatalogProject = ProjectItem & {
  id: string;
  scope: Category;
  group: string;
  discipline: Discipline;
  description: string;
  sourceUrl?: string;
};
const disciplineByGroup: Record<string, Discipline> = {
  A1: 'power',
  A2: 'solar',
  A3: 'automation',
  B1: 'solar',
  B2: 'buildings',
  B3: 'power',
  B4: 'automation',
};
export const disciplines: { id: Discipline; label: string }[] = [
  { id: 'solar', label: 'Solar & renewables' },
  { id: 'power', label: 'Power systems' },
  { id: 'buildings', label: 'Building services' },
  { id: 'automation', label: 'Automation & IoT' },
];
export const projectCatalog: CatalogProject[] = (
  [
    ['professional', professionalData],
    ['academic', academicData],
  ] as const
).flatMap(([scope, data]) =>
  data.categories.flatMap(group =>
    group.projects.map(project => ({
      ...project,
      scope,
      group: group.title,
      discipline: disciplineByGroup[group.id],
      id: `${group.id.toLowerCase()}-${project.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-$/, '')}`,
      description:
        project.description || projectSummaries[project.title] || project.subtitle || group.tagline,
      sourceUrl: project.title.startsWith('PID vs ANFIS')
        ? 'https://www.researchgate.net/publication/389150640_Comparative_Assessment_of_PID_and_ANFIS_Controllers_in_an_Automatic_Voltage_Regulator'
        : project.title === 'IoT-Based Smart Home Automation System'
          ? 'https://www.linkedin.com/posts/sajesan_teamurja-hardwarehackathon-activity-7155555264052486144-Or6Z/'
          : undefined,
    }))
  )
);
