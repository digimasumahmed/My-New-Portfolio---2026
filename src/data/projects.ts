export type ShowcaseProject = {
  letter: "C" | "H" | "K" | "W";
  meta: string;
  title: string;
  headline: string;
  body: string;
  designFocus: string[];
  projectType: string;
  preview: string;
  caseStudyHref: string;
};

/**
 * Featured showcase set mapped to C → H → K → W (Figma 148:2 / 148:81 / 148:157).
 */
export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    letter: "C",
    meta: "2026 · TRAVEL MANAGEMENT DASHBOARD UI/UX DESIGN",
    title: "Crafted Routes Dashboard",
    headline:
      "Turning Complex Travel Operations Into a Seamless Dashboard Experience",
    body: "Designed a clean, structured, and insight-driven admin dashboard for Crafted Routes, a travel business managing bookings, customers, tours, and departures. The interface brings key metrics, revenue trends, booking statuses, and live activity into one organized workspace. With intuitive navigation, readable data visualizations, and clearly prioritized information, the dashboard helps teams monitor operations, understand performance, and manage daily travel activities through a more efficient and consistent digital experience.",
    designFocus: ["Dashboard UX.", "Data Visualization.", "Booking Management."],
    projectType: "Travel Management Dashboard Design",
    preview: "/projects/crafted-routes.png",
    caseStudyHref: "/projects",
  },
  {
    letter: "H",
    meta: "2026 · EVENT PLANNING WEBSITE UI/UX DESIGN",
    title: "Habibi Events",
    headline:
      "Creating an Elegant Digital Experience for Unforgettable Celebrations",
    body: "Designed an elegant, welcoming, and visually engaging website for Habibi Events, an event-planning brand creating memorable celebrations and showcasing its venue in Plaistow. The design combines refined typography, warm colors, and immersive photography to highlight the atmosphere and services behind each occasion. With clear service information, prominent enquiry options, and thoughtfully arranged content, the website helps visitors explore event possibilities, connect with the team, and take the next step toward planning a special celebration.",
    designFocus: [
      "Visual Storytelling.",
      "Elegant UI Design.",
      "Enquiry Experience.",
    ],
    projectType: "Event Planning Website Design.",
    preview: "/projects/habibi-events-showcase.png",
    caseStudyHref: "/projects",
  },
  {
    letter: "K",
    meta: "2026 · CLEANING SERVICE WEBSITE UI/UX DESIGN",
    title: "Kleaner Klub",
    headline:
      "Making Professional Cleaning Services Easier to Explore and Request",
    body: "Designed a modern, professional, and user-friendly website for Kleaner Klub, a cleaning service offering residential, commercial, and emergency cleaning solutions. The design pairs bold service imagery with clear navigation, concise messaging, and an accessible quote-request form. With prominent calls to action, straightforward service discovery, and responsive layouts, the website helps potential customers understand available cleaning options, communicate their needs, and move confidently from their first visit toward making an enquiry.",
    designFocus: [
      "User-Friendly Navigation.",
      "Service Presentation.",
      "Conversion-Focused Design.",
    ],
    projectType: "Cleaning Service Website Design",
    preview: "/projects/kleaner-klub-showcase.png",
    caseStudyHref: "/projects",
  },
  {
    letter: "W",
    meta: "2026 · CHARITY WEBSITE UI/UX DESIGN",
    title: "Wellwick Relief",
    headline:
      "Designing a Compassionate Digital Experience That Inspires Giving",
    body: "Designed a clean, engaging, and purpose-driven website for Wellwick Relief, a charity supporting vulnerable families through clean water, winter assistance, and humanitarian aid. The design combines emotional storytelling, impactful photography, and intuitive navigation to communicate the organization's mission.",
    designFocus: ["UI/UX", "Visual Storytelling", "Donation Experience"],
    projectType: "Charity Website Design",
    preview: "/projects/wellwick-preview.png",
    caseStudyHref: "/projects/wellwick-relief",
  },
];

export const PROJECT_STATS = [
  { label: "TOTAL PROJECTS", value: 10, display: "10", accent: false },
  { label: "FEATURED", value: 4, display: "04", accent: true },
  { label: "LATEST", value: 2, display: "02", accent: false },
] as const;

export const PROJECT_FILTERS = [
  "ALL",
  "UI/UX DESIGN",
  "WEB DEVELOPMENT",
  "DIGITAL MARKETING",
] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export type PortfolioProject = {
  id: string;
  category: string;
  title: string;
  description: string;
  designFocus: string[];
  filter: Exclude<ProjectFilter, "ALL">;
  featured: boolean;
  latest: boolean;
  preview: string;
  caseStudyHref: string;
  liveHref: string;
};

/** Full projects index — aligned with Figma Projects page 64:1602. */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "kleaner-klub",
    category: "WEB DESIGN",
    title: "KLEANER KLUB",
    description:
      "Designed a clean, modern, and user-friendly website for Kleaner Klub, helping customers explore professional cleaning services, request quotes, and connect with ease.",
    designFocus: [
      "User-Friendly Navigation.",
      "Service Presentation.",
      "Conversion-Focused Design.",
    ],
    filter: "WEB DEVELOPMENT",
    featured: true,
    latest: true,
    preview: "/projects-page/kleaner-klub.png",
    caseStudyHref: "/projects",
    liveHref: "#",
  },
  {
    id: "studyshathi-dashboard",
    category: "WEB DESIGN",
    title: "STUDYSHATHI ADMIN DASHBOARD",
    description:
      "Designed an intuitive, data-driven dashboard for StudyShathi, simplifying tutor management, student activity, applications, and bookings through a seamless interface.",
    designFocus: [
      "Dashboard UX.",
      "Data Visualization.",
      "Information Architecture.",
    ],
    filter: "WEB DEVELOPMENT",
    featured: true,
    latest: true,
    preview: "/projects-page/studyshathi-dashboard.png",
    caseStudyHref: "/projects",
    liveHref: "#",
  },
  {
    id: "habibi-events",
    category: "WEB DESIGN",
    title: "HABIBI EVENTS",
    description:
      "Crafted an elegant and visually engaging website for Habibi Events, showcasing beautiful celebrations, creative event styling, and memorable experiences for every occasion.",
    designFocus: [
      "Visual Storytelling.",
      "Elegant UI Design.",
      "Portfolio Showcase.",
    ],
    filter: "WEB DEVELOPMENT",
    featured: true,
    latest: false,
    preview: "/projects-page/habibi-events.png",
    caseStudyHref: "/projects",
    liveHref: "#",
  },
  {
    id: "al-noor-academy",
    category: "UI/UX DESIGN",
    title: "AL-NOOR ACADEMY",
    description:
      "Designed a welcoming youth workshop website that introduces key topics, highlights educational sessions, and makes booking free workshops simple and accessible.",
    designFocus: [
      "Workshop Presentation.",
      "User-Friendly Navigation.",
      "Booking Experience.",
    ],
    filter: "UI/UX DESIGN",
    featured: true,
    latest: false,
    preview: "/projects-page/al-noor-academy.png",
    caseStudyHref: "/projects",
    liveHref: "#",
  },
  {
    id: "crafted-routes",
    category: "UI/UX DESIGN",
    title: "CRAFTED ROUTES DASHBOARD",
    description:
      "Designed a structured travel management dashboard that brings bookings, revenue, departures, and customer activity into one clear, easy-to-navigate interface.",
    designFocus: [
      "Dashboard UX.",
      "Data Visualization.",
      "Booking Management.",
    ],
    filter: "UI/UX DESIGN",
    featured: false,
    latest: false,
    preview: "/projects-page/crafted-routes.png",
    caseStudyHref: "/projects",
    liveHref: "#",
  },
  {
    id: "ems-logistics",
    category: "UI/UX DESIGN",
    title: "EMS LOGISTICS UK LIMITED",
    description:
      "Designed a professional logistics website highlighting transportation services, operational expertise, service locations, and a straightforward quote enquiry experience.",
    designFocus: [
      "Service Presentation.",
      "Information Architecture.",
      "Enquiry Experience.",
    ],
    filter: "UI/UX DESIGN",
    featured: false,
    latest: false,
    preview: "/projects-page/ems-logistics.png",
    caseStudyHref: "/projects",
    liveHref: "#",
  },
  {
    id: "green-earth-fest",
    category: "UI/UX DESIGN",
    title: "GREEN EARTH FEST",
    description:
      "Created a vibrant community festival website showcasing eco-friendly activities, event schedules, speakers, and ticket options through a fresh, nature-inspired visual experience.",
    designFocus: [
      "Event Experience.",
      "Visual Storytelling.",
      "Ticket Presentation.",
    ],
    filter: "DIGITAL MARKETING",
    featured: false,
    latest: false,
    preview: "/projects-page/green-earth-fest.png",
    caseStudyHref: "/projects",
    liveHref: "#",
  },
  {
    id: "smec",
    category: "UI/UX DESIGN",
    title: "SMEC - STUDY ABROAD CONSULTANCY",
    description:
      "Designed a professional study-abroad consultancy website presenting international education opportunities, student guidance, and consultation services through a clear, trustworthy interface.",
    designFocus: [
      "User-Friendly Navigation.",
      "Service Presentation.",
      "Consultation Experience.",
    ],
    filter: "DIGITAL MARKETING",
    featured: false,
    latest: false,
    preview: "/projects-page/smec.png",
    caseStudyHref: "/projects",
    liveHref: "#",
  },
  {
    id: "thikana",
    category: "UI/UX DESIGN",
    title: "THIKANA",
    description:
      "Designed a modern property discovery website helping users explore verified homes, find trusted service providers, and navigate their rental journey with confidence.",
    designFocus: [
      "Property Discovery.",
      "Trust-Focused Design.",
      "Service Navigation.",
    ],
    filter: "UI/UX DESIGN",
    featured: false,
    latest: false,
    preview: "/projects-page/thikana.png",
    caseStudyHref: "/projects",
    liveHref: "#",
  },
  {
    id: "wellwick-relief",
    category: "UI/UX DESIGN",
    title: "WELLWICK RELIEF",
    description:
      "Designed a compassionate charity website that showcases humanitarian initiatives, communicates social impact, and guides visitors toward meaningful ways to contribute.",
    designFocus: [
      "Visual Storytelling.",
      "Campaign Presentation.",
      "Donation Experience.",
    ],
    filter: "UI/UX DESIGN",
    featured: false,
    latest: false,
    preview: "/projects-page/wellwick-relief.png",
    caseStudyHref: "/projects/wellwick-relief",
    liveHref: "#",
  },
];
