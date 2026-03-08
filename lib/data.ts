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
    "I am currently a PhD student on the Data-Driven Engineering and Sciences program whose research sits at the broad intersection of machine learning and engineering systems. My interests include applications in space physics/systems and robotics. This website serves as a personal portfolio of my projects, and a platform to share some of my notes and thoughts.",
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
      "optimisation methods for learning, control, and model discovery in complex systems.",
  },
  {
    title: "computational physics",
    description:
      "implementing computational tools to study physical systems and combine numerical modelling with machine learning approaches.",
  },
];

export const projects: Project[] = [
  {
    slug: "apodised-bragg-reflector",
    title: "apodised bragg reflector design for low-scattering photonic waveguides",
    description:
      "investigated the effect of apodisation profiles on sidewall Bragg reflector gratings in integrated photonic waveguides. using FDTD simulations in Lumerical, the project analysed how smoothly varying grating amplitudes reduce scattering loss and improve reflectivity by suppressing abrupt index discontinuities.",
    tags: ["photonics", "bragg gratings", "fdtd", "lumerical", "waveguides"],
    year: 2025,
    featured: true,
    link: "",
    github: "",
  },

  {
    slug: "self-solving-brio-labyrinth",
    title: "self-solving brio labyrinth using embedded vision control",
    description:
      "developed an autonomous BRIO labyrinth solver combining computer vision, path planning, and embedded control. a camera-based vision system detects the ball position in real time using OpenCV, while an A* pathfinding algorithm computes the optimal route through the maze. PID control commands servo-driven gimbal arms via an Arduino Mega to dynamically tilt the labyrinth and guide the ball to the goal.",
    tags: [
      "computer vision",
      "embedded systems",
      "control systems",
      "path planning",
      "opencv",
      "arduino",
    ],
    year: 2024,
    featured: false,
    link: "",
    github: "",
  },
];
