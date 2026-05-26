export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  repo_link?: string;
  image_url?: string;
  technologies: string[];
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-100
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Intelligent Portfolio AI Agent',
    description: 'A custom-engineered conversational assistant that interacts with visitors in real-time. Built from the ground up with a robust RAG architecture to deliver highly accurate, context-aware responses about my professional expertise, services, and a few personal insights into who I am outside of code.',
    technologies: ['n8n', 'Supabase Vector', 'PostgreSQL', 'Gemini', 'Webhooks'],
    link: 'https://example.com',
    // repo_link: 'https://github.com/example/ecommerce',
    image_url: 'https://qxsjywqoyqlxahgdnjup.supabase.co/storage/v1/object/sign/alastier_portfolio/project_thumbnail/Intelligent%20AI%20Agent.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MTNlZDg0ZC1iMzllLTQyMTAtOTAyMy1hNTA3ODA0NTcxMDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbGFzdGllcl9wb3J0Zm9saW8vcHJvamVjdF90aHVtYm5haWwvSW50ZWxsaWdlbnQgQUkgQWdlbnQud2VicCIsImlhdCI6MTc3OTIxNjQxOSwiZXhwIjoxODEwNzUyNDE5fQ.ZIrqwrXVt67qmMl6_IHYyy_JbfuzmrbQozPrczlFQLw',
    created_at: new Date().toISOString(),
  },
];

export const mockSkills: Skill[] = [
  // AI AGENTS & LLMs
  { id: '1', name: 'OpenAI', category: 'AI Agents & LLMs', level: 95 },
  { id: '2', name: 'Gemini', category: 'AI Agents & LLMs', level: 95 },
  { id: '3', name: 'Anthropic', category: 'AI Agents & LLMs', level: 70 },
  { id: '4', name: 'Perplexity', category: 'AI Agents & LLMs', level: 65 },
  { id: '5', name: 'Codex', category: 'AI Agents & LLMs', level: 90 },
  { id: '6', name: 'RAG', category: 'AI Agents & LLMs', level: 80 },
  { id: '24', name: 'Antigravity', category: 'AI Agents & LLMs', level: 90 },

  // AUTOMATION & INTEGRATION
  { id: '7', name: 'n8n', category: 'Automation & Integration', level: 95 },
  { id: '8', name: 'Zapier', category: 'Automation & Integration', level: 90 },
  { id: '9', name: 'Webhooks', category: 'Automation & Integration', level: 95 },
  { id: '10', name: 'Websockets', category: 'Automation & Integration', level: 85 },
  { id: '11', name: 'APIs', category: 'Automation & Integration', level: 95 },

  // LANGUAGES
  { id: '12', name: 'JavaScript', category: 'Languages', level: 90 },
  { id: '13', name: 'Python', category: 'Languages', level: 70 },
  { id: '14', name: 'PHP', category: 'Languages', level: 80 },
  { id: '15', name: 'Dart', category: 'Languages', level: 90 },
  { id: '16', name: 'Zoho Deluge', category: 'Languages', level: 60 },

  // FRONTEND & MOBILE
  { id: '17', name: 'NextJS', category: 'Frontend & Mobile', level: 85 },
  { id: '18', name: 'TailwindCSS', category: 'Frontend & Mobile', level: 90 },
  { id: '19', name: 'Flutter', category: 'Frontend & Mobile', level: 95 },
  { id: '20', name: 'WordPress', category: 'Frontend & Mobile', level: 90 },

  // BACKEND & CLOUD
  { id: '21', name: 'Supabase', category: 'Backend & Cloud', level: 90 },
  { id: '22', name: 'Firebase', category: 'Backend & Cloud', level: 90 },
  { id: '23', name: 'AWS (Lambda, S3)', category: 'Backend & Cloud', level: 80 },

  // DATABASES
  { id: '25', name: 'Postgres', category: 'Databases', level: 85 },
  { id: '26', name: 'MySQL', category: 'Databases', level: 90 },
  { id: '27', name: 'Airtable', category: 'Databases', level: 85 },

  // CRM & SYSTEMS
  { id: '28', name: 'GHL', category: 'CRM & Systems', level: 95 },
  { id: '29', name: 'HubSpot', category: 'CRM & Systems', level: 85 },
  { id: '30', name: 'Zoho Flow', category: 'CRM & Systems', level: 85 },
  { id: '31', name: 'Notion', category: 'CRM & Systems', level: 80 },
  { id: '32', name: 'Trello', category: 'CRM & Systems', level: 90 },

  // INFRASTRUCTURE
  { id: '33', name: 'DNS Configuration', category: 'Infrastructure', level: 85 },
  { id: '34', name: 'SEO', category: 'Infrastructure', level: 80 },
];

export interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string | 'Present';
  description: string[];
}

export const mockExperiences: Experience[] = [
  {
    id: '1',
    company: 'AutomateWell',
    role: 'Automation Specialist',
    start_date: '03/2026',
    end_date: 'Present',
    description: [
      'Developed a comprehensive native licensing system entirely within GoHighLevel, restructuring complex permission hierarchies and delivering a highly scalable solution for agency operations.',
      'Optimized legacy system workflows by auditing current setups and implementing advanced GoHighLevel Custom Values for dynamic event triggers, effectively eliminating previous scheduling bottlenecks and ensuring perfectly timed automations.',
      'Architected robust integrations utilizing n8n, proactively identifying architectural bottlenecks and deploying strategic enhancements that drastically improved overall system reliability and business efficiency.'
    ]
  },
  {
    id: '2',
    company: 'AgentGenius.ai',
    role: 'AI Automation Engineer (Contract)',
    start_date: '10/2025',
    end_date: '12/2025',
    description: [
      'Architected custom workflows utilizing Zoho Flow, Deluge, and n8n to automate PDF processing and Twilio call transcriptions, completely eliminating manual CRM data entry and seamlessly synchronizing records with Zoho WorkDrive.',
      'Engineered scalable web platforms using Next.js and robust marketing sites via WordPress Elementor, guaranteeing highly responsive and engaging user experiences across all digital touchpoints.',
      'Orchestrated complex cloud infrastructure updates including complete DNS configurations and Hostinger migrations, successfully deploying multi domain software and significantly optimizing overall search visibility.'
    ]
  },
  {
    id: '3',
    company: 'Cloudesk Pty Ltd',
    role: 'Full Stack Developer',
    start_date: '01/2022',
    end_date: '08/2024',
    description: [
      'Deployed highly responsive applications utilizing Flutter and CodeIgniter 4 with TailwindCSS, successfully transforming static UI designs into highly functional and performant web and mobile interfaces.',
      'Integrated WebSockets, AWS Lambda, and third party APIs alongside secure Firebase Authentication, delivering robust real time features and reliable push messaging systems for active users.',
      'Directed the complete software development lifecycle through meticulous code reviews and maintainable coding practices, culminating in highly successful application launches on both the Apple App Store and Google Play Store.'
    ]
  },
  {
    id: '4',
    company: 'MAIS Corporation',
    role: 'Software Engineer',
    start_date: '05/2019',
    end_date: '07/2021',
    description: [
      'Spearheaded deep feasibility studies and Proof of Concept development for specialized enterprise solutions, successfully aligning complex technical architectures directly with core business requirements.',
      'Built scalable and highly reliable applications utilizing PHP and C#, guaranteeing high performance software delivery tailored specifically to intensive operational needs.',
      'Executed the complete deployment and lifecycle maintenance of a standalone application for PASAR Corporation, ensuring seamless system integration while maintaining strict adherence to corporate security standards.'
    ]
  }
];
