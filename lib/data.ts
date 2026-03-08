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
  name: "Jason Mclaren",
  title: "PhD student",
  institution: "University of Bristol",
  department: "School of Engineering Maths and Technology",
  summary:
    "I am a PhD student on the Data-Driven Engineering and Sciences program. I work at the broad intersection of machine learning and engineering systems. In terms of application areas I am a generalist, although I have a particular interest in space physics/systems and robotics.",
  email: "qu21443@bristol.ac.uk",
  links: [
    { label: "github", href: "https://github.com/Bucephelus"},
    { label: "email", href: "mailto:qu21443@bristol.ac.uk" },
  ],
};

export const researchInterests = [
  {
    title: "scientific machine learning",
    description:
      "developing machine learning methods that integrate physical models and data to analyse and predict complex dynamical systems.",
  },
  {
    title: "data-driven dynamical systems",
    description:
      "learning governing equations and low-dimensional representations of nonlinear systems using techniques such as system identification.",
  },
  {
    title: "reduced-order modelling",
    description:
      "implementing efficient low-dimensional models of high-dimensional physical systems to enable fast simulation, control, and real-time prediction.",
  },
  {
    title: "nonlinear dynamics",
    description:
      "studying emergent behaviour, instabilities, and pattern formation in nonlinear systems arising in physics and engineering.",
  },
  {
    title: "optimisation",
    description:
      "optimisation methods for learning, control, and model discovery in complex systems",
  },
  {
    title: "computational physics",
    description:
      "implementing computational tools to study physical systems and combine numerical modelling with machine learning approaches.",
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
