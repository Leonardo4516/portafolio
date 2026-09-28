export const translations = {
  es: {
    nav: {
      home: "01. // inicio",
      about: "02. // trayectoria",
      skills: "03. // habilidades",
      projects: "04. // proyectos",
      workflow: "05. // metodología",
      contact: "06. // contacto",
      status: "Disponible para trabajar",
    },
    hero: {
      badge: "DESARROLLO DE SOFTWARE // FORMACIÓN TÉCNICA",
      greeting: "Hola, soy",
      name: "Leonardo Hernández",
      role: "Desarrollador de Software Junior",
      education: "Técnico en Desarrollo de Software",
      typewriterRoles: [
        "Desarrollador de Software Junior",
        "Backend & Java Developer",
        "Desarrollo Aumentado con IA",
        "Bases de Datos (SQL & Docker)",
        "Automatización de Procesos (n8n)"
      ],
      description: "Desarrollador junior con bases sólidas en lógica, arquitectura de software orientada a objetos y persistencia relacional. Utilizo herramientas de Inteligencia Artificial de forma práctica como copiloto para acelerar entregas, auditar código y optimizar flujos.",
      btnProjects: "Explorar Proyectos",
      btnWorkflow: "Ver Metodología de Trabajo",
      stats: [
        { value: "Técnico", label: "Formación en Software" },
        { value: "Java & SQL", label: "Enfoque Backend" },
        { value: "Docker", label: "Entornos Aislados" },
        { value: "IA Asistida", label: "Productividad Ágil" }
      ]
    },
    about: {
      tag: "02. // ENFOQUE Y TRAYECTORIA",
      title: "Desarrollo con Bases Sólidas y",
      titleHighlight: "Criterio Práctico",
      desc: "Mi formación técnica me enseñó a valorar los fundamentos: arquitectura desacoplada, diseño relacional y buenas prácticas de codificación. Integro la IA con sensatez para mejorar mi productividad diaria.",
      pillars: [
        {
          title: "Backend con Java & Lógica Estructurada",
          desc: "Desarrollo de aplicaciones modulares con Java 17, principios SOLID, patrones de diseño (State, Factory, Strategy) y pruebas automatizadas con JUnit."
        },
        {
          title: "Bases de Datos & Contenedores",
          desc: "Diseño y normalización en PostgreSQL y MySQL. Implementación de triggers, procedimientos almacenados y orquestación con Docker Compose."
        },
        {
          title: "IA como Copiloto Práctico",
          desc: "Ingeniería de prompts estructurada y flujos agénticos para verificación de sintaxis, análisis de casos de prueba y automatizaciones con n8n."
        }
      ],
      standardsBadge: "ESTÁNDARES DE INGENIERÍA",
      standardsTitle: "Principios de Desarrollo & Calidad de Código",
      standardsDesc: "Criterios técnicos aplicados consistentemente en cada proyecto de software:",
      standards: [
        { label: "Spec-Driven Development (SDD)", desc: "Especificación formal de requisitos, casos de uso y contratos de datos antes de programar." },
        { label: "Diseño Relacional & 3NF", desc: "Modelado relacional estricto con PostgreSQL/MySQL garantizando integridad referencial y consistencia." },
        { label: "Arquitectura Modular en Capas", desc: "Separación limpia de responsabilidades (controladores, servicios, repositorios) y patrones de diseño." },
        { label: "Contenedores Docker & Git Flow", desc: "Entornos de desarrollo aislados con Docker Compose y control de versiones semántico." },
        { label: "Auditoría Asistida con IA", desc: "Uso de herramientas de IA para revisión estricta de sintaxis, casos de prueba y documentación técnica." }
      ]
    },
    skills: {
      tag: "03. // COMPETENCIAS TÉCNICAS",
      title: "Matriz de",
      titleHighlight: "Habilidades",
      desc: "Clasificación honesta y transparente de mis conocimientos según mi nivel de práctica y aplicación en proyectos reales.",
      tabs: {
        advanced: "Nivel Avanzado",
        intermediate: "Nivel Intermedio",
        basic: "Nivel Básico"
      },
      categories: {
        advanced: "Avanzado",
        intermediate: "Intermedio",
        basic: "Básico"
      },
      levelLabel: "Nivel declarado:"
    },
    projects: {
      tag: "04. // CASOS DE ESTUDIO",
      title: "Proyectos y",
      titleHighlight: "Desarrollos Destacados",
      desc: "Selección curada de aplicaciones donde aplico arquitectura de software, bases de datos relacionales y automatizaciones.",
      filters: {
        all: "Todos",
        java: "Java & Backend",
        data: "Bases de Datos",
        automation: "IA & Automatización"
      },
      badgeFeatured: "★ DESTACADO",
      btnCode: "Ver Código",
      btnDemo: "Demo en Vivo"
    },
    workflow: {
      tag: "05. // METODOLOGÍA & FLUJO DE TRABAJO",
      title: "Cómo Construyo",
      titleHighlight: "Software de Principio a Fin",
      desc: "Un enfoque estructurado que combina fundamentos de ingeniería, modelado riguroso de bases de datos y automatización pragmática.",
      phases: [
        {
          step: "01",
          phase: "Requisitos & Modelo de Datos",
          title: "Análisis & Diseño Relacional",
          desc: "Definición de entidades, relaciones (1:N, N:M), restricciones de integridad y normalización en 3ra Forma Normal (3NF) para evitar redundancias.",
          tools: ["PostgreSQL", "MySQL", "Diagramas E-R", "Docker"],
          caseStudyLabel: "Aplicado en:",
          caseStudyProject: "ETL & Normalización PostgreSQL",
          deliverable: "Esquema DDL validado y scripts reproducibles en contenedores."
        },
        {
          step: "02",
          phase: "Lógica Backend & Patrones",
          title: "Construcción Robusta con Java 17+",
          desc: "Implementación orientada a objetos con separación de capas (Data Access, Service, Controller/UI) y aplicación de patrones como Factory, State o Strategy.",
          tools: ["Java 17", "JDBC", "POO & SOLID", "Seguridad BCrypt"],
          caseStudyLabel: "Aplicado en:",
          caseStudyProject: "SICA (Control de Acceso) & Simulador F1",
          deliverable: "Código tipado, modular y protegido contra accesos indebidos (RBAC)."
        },
        {
          step: "03",
          phase: "Automatización & Conexiones",
          title: "Orquestación de Flujos & Webhooks",
          desc: "Integración de servicios externos mediante webhooks, flujos en n8n para reducir trabajo manual y scripts auxiliares en Python y Bash.",
          tools: ["n8n", "Telegram Bot API", "Python", "Google Sheets API"],
          caseStudyLabel: "Aplicado en:",
          caseStudyProject: "CafExpress (Bot & Flujos n8n)",
          deliverable: "Procesos automatizados de captura y notificación en tiempo real."
        },
        {
          step: "04",
          phase: "Contenedores, QA & Despliegue",
          title: "Reproducibilidad & Control de Versiones",
          desc: "Aislamiento de servicios y bases de datos con Docker Compose, pruebas unitarias automatizadas con JUnit y control de versiones semántico en Git.",
          tools: ["Docker Compose", "JUnit 5", "Git & GitHub", "Linux/Bash"],
          caseStudyLabel: "Aplicado en:",
          caseStudyProject: "Entornos Dockerizados & Suite de Pruebas",
          deliverable: "Un solo comando para levantar todo el entorno de trabajo ('docker compose up')."
        }
      ]
    },
    contact: {
      tag: "06. // CONTACTO Y CONEXIÓN",
      title: "¿Iniciamos una",
      titleHighlight: "conversación?",
      desc: "Estoy activamente en búsqueda de oportunidades profesionales como Desarrollador de Software Junior para sumarme a equipos donde pueda aportar en backend, SQL y desarrollo ágil.",
      form: {
        nameLabel: "Tu Nombre",
        namePlaceholder: "Ej: Carlos Méndez",
        emailLabel: "Tu Correo Electrónico",
        emailPlaceholder: "carlos@empresa.com",
        subjectLabel: "Asunto / Motivo",
        subjectPlaceholder: "Oportunidad Laboral / Consulta Técnica",
        messageLabel: "Mensaje",
        messagePlaceholder: "Hola Leonardo, nos interesó tu perfil y quisiéramos coordinar una entrevista...",
        submitBtn: "Enviar Mensaje Directo",
      },
      cards: {
        directEmailTitle: "Correo Electrónico",
        directEmailSub: "Respuesta rápida garantizada",
        directEmailAction: "Redactar Correo",
        availabilityTitle: "Disponibilidad Actual",
        availabilityStatus: "Buscando rol Junior",
        modalityLabel: "Modalidad:",
        modalityValue: "Remoto / Híbrido / Presencial",
        responseTimeLabel: "Tiempo de respuesta:",
        responseTimeValue: "< 24 horas",
        networksTitle: "Redes Profesionales",
        networksSub: "Conecta y revisa mi historial",
      },
      directEmail: "lehernan.07@gmail.com",
      github: "GitHub",
      linkedin: "LinkedIn"
    },
    footer: {
      copyright: "© {year} Leonardo Hernández. Desarrollador de Software Junior."
    }
  },

  en: {
    nav: {
      home: "01. // home",
      about: "02. // background",
      skills: "03. // skills",
      projects: "04. // projects",
      workflow: "05. // methodology",
      contact: "06. // contact",
      status: "Available for opportunities",
    },
    hero: {
      badge: "SOFTWARE DEVELOPMENT // TECHNICAL BACKGROUND",
      greeting: "Hello, I am",
      name: "Leonardo Hernández",
      role: "Junior Software Developer",
      education: "Associate Degree in Software Development",
      typewriterRoles: [
        "Junior Software Developer",
        "Backend & Java Developer",
        "AI-Assisted Programmer",
        "Databases (SQL & Docker)",
        "Workflow Automation (n8n)"
      ],
      description: "Junior software developer with a technical degree and solid fundamentals in object-oriented software architecture, relational database modeling, and practical AI tools to streamline delivery and code quality.",
      btnProjects: "Explore Projects",
      btnWorkflow: "Explore Workflow & Methodology",
      stats: [
        { value: "Degree", label: "Software Technician" },
        { value: "Java & SQL", label: "Backend Core" },
        { value: "Docker", label: "Isolated Envs" },
        { value: "AI-Assisted", label: "Agile Workflow" }
      ]
    },
    about: {
      tag: "02. // BACKGROUND & APPROACH",
      title: "Building Software with",
      titleHighlight: "Practical Rigor",
      desc: "My technical education taught me the value of fundamentals: decoupled architecture, relational design, and clean coding practices. I use AI sensibly as an accelerator for daily development.",
      pillars: [
        {
          title: "Java Backend & Structured Logic",
          desc: "Developing modular applications with Java 17, SOLID principles, design patterns (State, Factory, Strategy), and automated tests using JUnit."
        },
        {
          title: "Databases & Containers",
          desc: "Relational design and 3NF normalization in PostgreSQL and MySQL. Triggers, stored procedures, and containerized orchestration with Docker Compose."
        },
        {
          title: "AI as a Pragmatic Copilot",
          desc: "Structured prompt engineering and agentic workflows for syntax review, test-case planning, and process automations with n8n."
        }
      ],
      standardsBadge: "ENGINEERING STANDARDS",
      standardsTitle: "Development Principles & Code Quality",
      standardsDesc: "Technical criteria consistently applied across software projects:",
      standards: [
        { label: "Spec-Driven Development (SDD)", desc: "Formal specification of requirements, use cases, and data contracts before writing production code." },
        { label: "Relational Design & 3NF", desc: "Rigorous relational schema design in PostgreSQL/MySQL ensuring referential integrity and zero anomalies." },
        { label: "Modular Layered Architecture", desc: "Clean separation of concerns (controllers, services, repositories) and classic design patterns." },
        { label: "Docker Containers & Git Flow", desc: "Isolated and reproducible development environments via Docker Compose with semantic versioning." },
        { label: "AI-Assisted Code Audits", desc: "Targeted AI workflows for strict syntax auditing, test edge cases, and technical documentation." }
      ]
    },
    skills: {
      tag: "03. // TECHNICAL SKILLS",
      title: "Competency",
      titleHighlight: "Matrix",
      desc: "An honest and transparent breakdown of my technical competencies based on hands-on practical application in real projects.",
      tabs: {
        advanced: "Advanced Level",
        intermediate: "Intermediate Level",
        basic: "Basic Level"
      },
      categories: {
        advanced: "Advanced",
        intermediate: "Intermediate",
        basic: "Basic"
      },
      levelLabel: "Declared Level:"
    },
    projects: {
      tag: "04. // CASE STUDIES",
      title: "Featured",
      titleHighlight: "Projects & Code",
      desc: "A curated selection of applications showcasing software architecture, relational databases, and automated workflows.",
      filters: {
        all: "All",
        java: "Java & Backend",
        data: "Databases",
        automation: "AI & Automation"
      },
      badgeFeatured: "★ FEATURED",
      btnCode: "View Code",
      btnDemo: "Live Demo"
    },
    workflow: {
      tag: "05. // METHODOLOGY & WORKFLOW",
      title: "How I Build",
      titleHighlight: "Software End-to-End",
      desc: "A structured engineering approach combining foundational principles, relational database design, and pragmatic automation.",
      phases: [
        {
          step: "01",
          phase: "Requirements & Data Modeling",
          title: "Relational Analysis & Design",
          desc: "Defining entities, relationships (1:N, N:M), integrity constraints, and 3rd Normal Form (3NF) to eliminate data redundancy.",
          tools: ["PostgreSQL", "MySQL", "E-R Diagrams", "Docker"],
          caseStudyLabel: "Applied in:",
          caseStudyProject: "ETL & Normalization PostgreSQL",
          deliverable: "Validated DDL schemas and reproducible containerized scripts."
        },
        {
          step: "02",
          phase: "Backend Logic & Patterns",
          title: "Robust Construction with Java 17+",
          desc: "Object-oriented implementation with clean layer separation (Data Access, Service, Controller/UI) and design patterns like Factory, State, or Strategy.",
          tools: ["Java 17", "JDBC", "OOP & SOLID", "BCrypt Security"],
          caseStudyLabel: "Applied in:",
          caseStudyProject: "SICA (Access Control) & F1 Simulator",
          deliverable: "Strongly-typed, modular code with Role-Based Access Control (RBAC)."
        },
        {
          step: "03",
          phase: "Automation & Connectors",
          title: "Workflow Orchestration & Webhooks",
          desc: "Integrating external services via webhooks, n8n automation pipelines to eliminate manual overhead, and auxiliary Python/Bash scripts.",
          tools: ["n8n", "Telegram Bot API", "Python", "Google Sheets API"],
          caseStudyLabel: "Applied in:",
          caseStudyProject: "CafExpress (Telegram Bot & n8n)",
          deliverable: "Automated real-time capture and dispatch workflows."
        },
        {
          step: "04",
          phase: "Containers, QA & Deployment",
          title: "Reproducibility & Version Control",
          desc: "Service and database isolation using Docker Compose, automated unit tests with JUnit 5, and semantic Git workflows.",
          tools: ["Docker Compose", "JUnit 5", "Git & GitHub", "Linux/Bash"],
          caseStudyLabel: "Applied in:",
          caseStudyProject: "Containerized Stacks & Test Suites",
          deliverable: "One single command to spin up the entire dev environment ('docker compose up')."
        }
      ]
    },
    contact: {
      tag: "06. // CONTACT & CONNECT",
      title: "Let's start a",
      titleHighlight: "conversation",
      desc: "I am actively seeking junior software developer opportunities to join engineering teams where I can contribute to backend systems, databases, and agile software development.",
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "e.g., John Doe",
        emailLabel: "Your Email Address",
        emailPlaceholder: "john@company.com",
        subjectLabel: "Subject",
        subjectPlaceholder: "Job Opportunity / Technical Inquiry",
        messageLabel: "Message",
        messagePlaceholder: "Hi Leonardo, we reviewed your projects and would like to schedule a conversation...",
        submitBtn: "Send Direct Message",
      },
      cards: {
        directEmailTitle: "Direct Email",
        directEmailSub: "Guaranteed quick response",
        directEmailAction: "Compose Email",
        availabilityTitle: "Current Availability",
        availabilityStatus: "Open to Junior roles",
        modalityLabel: "Work mode:",
        modalityValue: "Remote / Hybrid / On-site",
        responseTimeLabel: "Response time:",
        responseTimeValue: "< 24 hours",
        networksTitle: "Professional Networks",
        networksSub: "Connect and review activity",
      },
      directEmail: "lehernan.07@gmail.com",
      github: "GitHub",
      linkedin: "LinkedIn"
    },
    footer: {
      copyright: "© {year} Leonardo Hernández. Junior Software Developer."
    }
  }
}
