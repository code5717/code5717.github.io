export interface ContactLinks {
  github: string;
  portfolio: string;
  linkedin: string;
  email: string;
  phone: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ProjectEntry {
  name: string;
  period: string;
  bullets: string[];
  link?: string;
}

export interface PublicationEntry {
  status: string;
  title: string;
  venue: string;
  detail: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  location: string;
  period: string;
  coursework: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface VolunteerEntry {
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface CertificationEntry {
  title: string;
  issuer: string;
}

export interface LanguageEntry {
  name: string;
  fluency: string;
}

export const profile = {
  name: 'Abdussamad Farooq Saeed',
  location: 'Kingdom of Saudi Arabia',
  citizenship: 'Canadian',
  headline: 'Senior AI Engineer',
  about:
    'Senior AI Engineer specializing in production AI systems, LLM pipelines, and computer vision. Deep expertise in high performance computing, CUDA optimization, and advanced Linux infrastructure. Experienced in agentic AI architectures, RAG systems, Arabic NLP, and cybersecurity AI research. Skilled in systems programming with C, C++, and Python across embedded, autonomous, and large scale HPC environments. I take systems from research to reliable real world deployment with measurable performance gains.',
  contacts: {
    github: 'https://github.com/code5717',
    portfolio: 'https://code5717.github.io',
    linkedin: 'https://linkedin.com/in/code5717',
    email: 'abdussamadf350@gmail.com',
    phone: '+966 55 950 8722'
  } as ContactLinks,
  experience: [
    {
      role: 'AI Engineer (Full-Time)',
      company: 'Etlaq.sa',
      companyUrl: 'https://www.etlaq.sa/',
      location: 'Al-Khobar, Saudi Arabia',
      period: 'Feb 2026 - Present',
      bullets: [
        'Designing and building agentic AI systems for Vibe coding and automated web development.',
        'Developing production grade Next.js applications powered by AI agents.',
        'Delivering enterprise AI solutions for multiple Etlaq clients.'
      ]
    },
    {
      role: 'Agentic AI Engineer (Part-Time)',
      company: 'Traffic Hi Tech Company',
      companyUrl: 'https://thtc.sa/',
      location: 'Al-Khobar, Saudi Arabia',
      period: 'Aug 2025 - Feb 2026',
      bullets: [
        'Built enterprise AI systems for live traffic analysis and optimization across Saudi infrastructure.',
        'Developed AI agents for police and city management operations.'
      ]
    },
    {
      role: 'Enterprise AI Specialist',
      company: 'National Center for Vegetation Cover Development and Combating Desertification',
      companyUrl: 'https://ncvc.gov.sa/',
      location: 'Riyadh, Saudi Arabia',
      period: 'Aug 2025 - Jan 2026',
      bullets: [
        'Designed and deployed on premise enterprise AI platforms for project management and land use land cover analysis.'
      ]
    },
    {
      role: 'Agentic AI Engineer (Part-Time)',
      company: 'Etlaq.sa',
      companyUrl: 'https://www.etlaq.sa/',
      location: 'Dhahran, Saudi Arabia',
      period: 'June 2025 - Jan 2026',
      bullets: [
        'Built AI agents to automate development workflows and improve engineering productivity.'
      ]
    },
    {
      role: 'Cyber Security AI Researcher (Part-Time)',
      company: 'Interdisciplinary Research Center for Intelligent Secure Systems, KFUPM',
      companyUrl: 'https://ri.kfupm.edu.sa/iss',
      location: 'Dhahran, Saudi Arabia',
      period: 'Jan 2025 - May 2025',
      bullets: [
        'Built AI agents for automated penetration testing using lightweight LLMs.',
        'Designed and maintained Linux infrastructure supporting multiple postdoctoral cybersecurity researchers.'
      ]
    },
    {
      role: 'Arabic and Islamic NLP AI Engineer (Part-Time)',
      company: 'SDAIA Joint Research Center for Artificial Intelligence, KFUPM',
      companyUrl: 'https://ri.kfupm.edu.sa/JRCAI',
      location: 'Dhahran, Saudi Arabia',
      period: 'Sep 2024 - Dec 2024',
      bullets: [
        'Led Arabic NLP initiatives including LLM pretraining, fine tuning, and evaluation.',
        'Built a production RAG system with custom retrieval. Improved query accuracy by 35 percent.'
      ]
    },
    {
      role: 'Cyber Security AI Engineering Intern',
      company: 'Interdisciplinary Research Center for Intelligent Secure Systems, KFUPM',
      companyUrl: 'https://ri.kfupm.edu.sa/iss',
      location: 'Dhahran, Saudi Arabia',
      period: 'Jan 2024 - Jun 2024',
      bullets: [
        'Created cybersecurity datasets with 35K plus malware scripts used to train over 20 LLMs.',
        'Built a multimodal AI agent with terminal control, Python execution, web search, and RAG.'
      ]
    }
  ] as ExperienceEntry[],
  projects: [
    {
      name: 'Space Debris Detection CubeSat System (Senior Capstone)',
      period: '2024',
      bullets: [
        'AI and ML: Built YOLOv11 based debris detection system. Achieved over 60 percent accuracy on Raspberry Pi 5 through model and pipeline optimizations.',
        'Embedded Systems: Developed C and C++ ADCS with gyroscope and magnetometer achieving under 2 degree orientation error.',
        'Communication: Implemented RF telemetry for real time data transfer and remote AI model updates.',
        'Simulation: Built 3D orbital simulator in Godot for trajectory testing and collision prediction.',
        'Ground Control: Developed Flask based control station with telemetry visualization.',
        'System Integration: Delivered complete 2U CubeSat prototype under 5,000 SAR budget.'
      ]
    },
    {
      name: 'Arcade Gaming Consoles',
      period: '2026',
      bullets: [
        'Built custom arcade console using Raspberry Pi 5.',
        'Developed WASM based games targeting legacy hardware platforms.'
      ]
    },
    {
      name: 'Programming Language from Scratch',
      period: '2026',
      link: 'https://code5717.github.io/a7-py',
      bullets: [
        'Designed and implemented a programming language from scratch, from lexer and parser to execution pipeline.',
        'Built parsing, AST construction, semantic analysis, and diagnostics for end to end language handling.',
        'Validated the language with runnable examples, iterative debugging, and full pipeline testing.',
        'Documented the architecture, implementation decisions, and development progress in a public project page.'
      ]
    },
    {
      name: 'High Performance Custom Compiler',
      period: '2021-2022',
      link: 'https://github.com/code5717/rotate',
      bullets: [
        'Built recursive descent compiler in C and C++.',
        'Achieved 150 plus MB per second tokenization on i7 and 186 MB per second on i9.',
        'Implemented robust syntax error detection and reporting.',
        'Maintained compatibility with C standard library while preserving C style syntax.'
      ]
    },
    {
      name: 'Arraylist for C',
      period: '2024-2026',
      link: 'https://code5717.github.io/Arraylist',
      bullets: [
        'Built a lightweight C library providing macro based type safe dynamic arrays with two API tiers: checked and unchecked.',
        'Implemented overflow checked allocation, bounds checked access, safe reallocation preserving data on failure, and zero capacity growth.',
        'Supports strict C11 and C17 as well as GNU and Clang extensions.',
        'Created full documentation site with React and Vite including quickstart, API reference, and examples.'
      ]
    },
    {
      name: 'Deep Agent AI Systems',
      period: '2024-2026',
      bullets: [
        'Deep Agent Architectures: Designed multi agent systems with long horizon planning, self reflection, and goal driven execution.',
        'Advanced Retrieval and Memory: Built RAG systems with custom embeddings and dynamic context selection. Improved relevance by 40 percent.',
        'Persistent Agent Memory: Implemented long term and episodic memory for multi session continuity.',
        'Agent Orchestration and Tooling: Developed autonomous workflows with terminal access, Python execution, and web retrieval.',
        'Inference and Systems Optimization: Optimized agent inference pipelines and scheduling. Reduced end to end latency significantly while preserving accuracy.'
      ]
    }
  ] as ProjectEntry[],
  publication: {
    status: 'Under Review',
    title: 'Automating Cyber Security Penetration Testing Tasks with AI Agents Using Lightweight LLMs',
    venue: 'ACM journal',
    detail: 'First author submission. Expected release mid 2026.'
  } as PublicationEntry,
  education: {
    institution: 'King Fahd University of Petroleum and Minerals',
    degree: 'Bachelor of Science in Computer Science',
    location: 'Dhahran, Saudi Arabia',
    period: 'Aug 2019 - Aug 2025',
    coursework:
      'Computer Graphics, Game Programming, Cybersecurity, Artificial Intelligence, Independent Research in AI and Cybersecurity.'
  } as EducationEntry,
  skillGroups: [
    {
      label: 'Programming Languages',
      items: ['Python', 'C', 'C++', 'CUDA', 'JavaScript', 'Go', 'C#', 'SQL', 'Zig', 'Odin', 'Assembly']
    },
    {
      label: 'AI and ML',
      items: ['PyTorch', 'Hugging Face Transformers', 'YOLO', 'TinyGrad', 'OpenCV']
    },
    {
      label: 'Tools and Systems',
      items: ['Linux', 'Git', 'Docker', 'CMake', 'Ninja', 'Vim', 'Unity', 'Raylib']
    },
    {
      label: 'Specialization',
      items: ['Systems programming', 'High Performance Computing', 'Cybersecurity', 'Computer Vision', 'NLP']
    }
  ] as SkillGroup[],
  certification: {
    title: 'Fundamentals of Accelerated Computing with CUDA C and C++',
    issuer: 'NVIDIA'
  } as CertificationEntry,
  volunteering: {
    role: 'Accountant and Program Supervisor',
    organization: 'Mawhibah 2025 Summer Program, KFUPM',
    location: 'Dhahran, Saudi Arabia',
    period: 'Summer 2024 and 2025',
    bullets: [
      'Supervised over 160 high school students in intensive STEM programs.',
      'Managed program finances and operational logistics.',
      'Taught ESP32 based IoT course for high school students.'
    ]
  } as VolunteerEntry,
  languages: [
    { name: 'Arabic', fluency: 'Native' },
    { name: 'English', fluency: 'Native' }
  ] as LanguageEntry[]
};
