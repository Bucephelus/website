export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: number;
  featured: boolean;
  link?: string;
  github?: string;
};

export const bio = {
  name: "jason mclaren",
  title: "phd student",
  institution: "university of bristol",
  department: "school of engineering maths and technology",
  summary:
    "i am a phd student on the data-driven engineering and sciences program. working at the broad intersection of machine learning and engineering systems. in terms of application areas, i am a generalist although, i have a particular interest in space physics/systems and robotics.",
  email: "qu21443@bristol.ac.uk",
  links: [
    { label: "github", href: "https://github.com/Bucephelus"},
  ],
};

export const researchInterests = [
  {
    title: "optimisation",
    description:
      "gaussian processes, bayesian neural networks, and uncertainty quantification for engineering models.",
  },
  {
    title: "structural health monitoring",
    description:
      "data-driven approaches for damage detection, localisation, and prognosis in engineering structures.",
  },
  {
    title: "physics-informed learning",
    description:
      "embedding domain knowledge and physical constraints into machine learning architectures.",
  },
  {
    title: "digital twins",
    description:
      "creating adaptive computational models that evolve with their physical counterparts using streaming data.",
  },
  {
    title: "transfer learning",
    description:
      "population-based approaches for sharing information across heterogeneous engineering structures.",
  },
  {
    title: "active learning",
    description:
      "optimal experimental design and sensor placement for resource-efficient data acquisition.",
  },
];

export const projects: Project[] = [
  {
    slug: "bayesian-shm",
    title: "bayesian structural health monitoring",
    description:
      "a framework for probabilistic damage detection in bridge structures using gaussian process models. the approach quantifies epistemic uncertainty in damage predictions, enabling risk-informed maintenance scheduling.",
    tags: ["gaussian processes", "shm", "bayesian inference"],
    year: 2025,
    featured: true,
    link: "https://example.com/paper-1",
    github: "https://github.com",
  },
];
