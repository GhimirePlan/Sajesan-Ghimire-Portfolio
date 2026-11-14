type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    bio: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
  apiBaseUrl: string;
};

export const config: TConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  html: {
    title: 'Sajesan Ghimire — Portfolio',
    fullName: 'Sajesan Ghimire',
    email: 'contact@sajesanghimire.com.np',
  },
  hero: {
    name: 'Sajesan Ghimire',
    bio: 'Electrical engineer and researcher focused on solar PV, power systems, and sustainable energy solutions.',
    p: ['Electrical Engineer · Solar PV & Power Systems', 'Based in Nepal'],
  },
  contact: {
    p: 'Contact',
    h2: 'Get in touch',
    form: {
      name: {
        span: 'Your Name',
        placeholder: 'Your full name',
      },
      email: { span: 'Your Email', placeholder: 'you@example.com' },
      message: {
        span: 'Your Message',
        placeholder: 'Tell me about your project or enquiry.',
      },
    },
  },
  sections: {
    about: {
      p: 'Introduction',
      h2: 'About me',
      content: `I am an electrical engineer working in solar PV design, power distribution, and automation. My experience covers feasibility studies, system design, technical documentation, and site supervision.
`,
    },
    experience: {
      p: 'Professional background',
      h2: 'Experience',
    },
    feedbacks: {
      p: 'Professional feedback',
      h2: 'Testimonials',
    },
    works: {
      p: 'My work',
      h2: 'Selected projects',
      content: `Selected work in solar energy, power system control, and automation. Explore the engineering approach, tools, and project scope.`,
    },
  },
};
