export type ProjectMetaRow = {
  label: string;
  value: string;
};

export type NumberedBlock = {
  index: string;
  title: string;
  body: string;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  liveHref: string;
  hero: string;
  devices: {
    desktop: string;
    mobile: string;
    wireframe: string;
  };
  overview: string;
  meta: ProjectMetaRow[];
  pillars: NumberedBlock[];
  process: NumberedBlock[];
  goals: {
    summary: string;
    objectivesTitle: string;
    objectives: string[];
  };
  decisions: NumberedBlock[];
  outcome: string[];
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "wellwick-relief": {
    slug: "wellwick-relief",
    title: "Wellwick Relief",
    liveHref: "#",
    hero: "/project-details/hero.png",
    devices: {
      desktop: "/project-details/hero.png",
      mobile: "/project-details/mobile.png",
      wireframe: "/project-details/wireframe.png",
    },
    overview:
      "Wellwick Relief is a charity-focused digital platform designed to make humanitarian causes easier to discover, understand, and support. From clean water initiatives to winter assistance and child welfare, the website brings essential campaigns together through clear navigation, impactful visuals, and an accessible donation experience.",
    meta: [
      { label: "PROJECT TYPE", value: "Nonprofit & Charity Website" },
      { label: "MY ROLE", value: "UI/UX Designer" },
      { label: "PLATFORM", value: "Responsive Website" },
      { label: "YEAR", value: "2026" },
    ],
    pillars: [
      {
        index: "01.",
        title: "The Challenge",
        body: "Simplify complex humanitarian information and help visitors connect with causes that matter.",
      },
      {
        index: "02.",
        title: "The Approach",
        body: "Combine emotional storytelling, clear visual hierarchy, and intuitive navigation to guide users.",
      },
      {
        index: "03.",
        title: "The Solution",
        body: "Create a responsive, engaging website with accessible content and clear donation pathways.",
      },
    ],
    process: [
      {
        index: "01.",
        title: "Discovery",
        body: "Understand the project's mission, target audience, and design requirements.",
      },
      {
        index: "02.",
        title: "Wireframing",
        body: "Structure content, navigation, and layouts for a seamless user journey.",
      },
      {
        index: "03.",
        title: "Visual Design",
        body: "Create an engaging interface with purposeful typography, imagery, and colors.",
      },
      {
        index: "04.",
        title: "Responsive Design",
        body: "Optimize layouts and interactions for desktop and mobile experiences.",
      },
    ],
    goals: {
      summary:
        "Create a meaningful, user-friendly digital experience that connects people with humanitarian causes and encourages purposeful giving.",
      objectivesTitle: "Key Objectives:",
      objectives: [
        "Simplify access to humanitarian initiatives.",
        "Build trust through impactful visual storytelling.",
        "Make the donation journey clear and intuitive.",
      ],
    },
    decisions: [
      {
        index: "01.",
        title: "Clear Navigation",
        body: "Simplified content organization to help visitors explore causes effortlessly.",
      },
      {
        index: "02.",
        title: "Emotional Storytelling",
        body: "Used meaningful imagery and visual hierarchy to communicate real human needs.",
      },
      {
        index: "03.",
        title: "Donation Experience",
        body: "Designed prominent calls to action and intuitive pathways to encourage giving.",
      },
    ],
    outcome: [
      "The final design of Wellwick Relief delivers a cohesive, modern, and user-centered digital experience that connects people with meaningful humanitarian causes. By combining impactful visual storytelling, intuitive navigation, and a clear content hierarchy, the website makes it easier for visitors to explore initiatives, understand their purpose, and discover opportunities to contribute.",
      "The responsive interface maintains consistency across desktop and mobile devices, ensuring accessibility and ease of use. Thoughtfully placed calls to action, engaging imagery, and a warm visual identity create a welcoming experience that balances emotional connection with functional usability.",
      "Overall, the design establishes a strong digital foundation for Wellwick Relief, communicating its mission effectively while creating a more approachable and purposeful experience for potential donors and supporters.",
    ],
  },
};

export function getProjectDetail(slug: string): ProjectDetail | null {
  return PROJECT_DETAILS[slug] ?? null;
}

export function getAllProjectDetailSlugs(): string[] {
  return Object.keys(PROJECT_DETAILS);
}
