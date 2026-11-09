import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import type { ProjectDetail } from "@/data/project-details";

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col justify-center border-b border-solid border-[#1e1e1e] py-3 first:border-t sm:py-4">
      <div className="flex w-full items-start justify-between gap-4 font-[family-name:var(--font-gugi)] text-[14px] leading-none text-[#1e1e1e] sm:text-[16px]">
        <p className="shrink-0">{label}</p>
        <p className="min-w-0 text-right">{value}</p>
      </div>
    </div>
  );
}

function NumberedCard({
  index,
  title,
  body,
  accent = false,
  compact = false,
}: {
  index: string;
  title: string;
  body: string;
  accent?: boolean;
  compact?: boolean;
}) {
  const tone = accent ? "text-[#ff7340]" : "text-[#1e1e1e]";
  const indexSize = compact
    ? "text-[clamp(36px,4vw,60px)]"
    : "text-[clamp(40px,5vw,80px)]";
  const titleSize = compact
    ? "text-[clamp(22px,3vw,48px)]"
    : "text-[clamp(24px,3.5vw,60px)]";

  return (
    <div className="flex flex-1 flex-col border border-solid border-[#1e1e1e] bg-white px-5 py-8 sm:px-[30px] sm:py-10">
      <div className="flex gap-3 sm:gap-4">
        <p
          className={`shrink-0 font-[family-name:var(--font-vina-sans)] leading-none ${indexSize} ${tone}`}
        >
          {index}
        </p>
        <div className={`flex min-w-0 flex-col gap-3 sm:gap-4 ${tone}`}>
          <h3
            className={`font-[family-name:var(--font-vina-sans)] leading-none ${titleSize}`}
          >
            {title}
          </h3>
          <p className="font-[family-name:var(--font-gugi)] text-[15px] leading-relaxed text-pretty text-[#1e1e1e] sm:text-justify sm:text-[18px]">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailPage({ project }: { project: ProjectDetail }) {
  const devices = [
    {
      src: project.devices.desktop,
      label: "DESKTOP",
      alt: "Desktop view",
      widthClass: "md:flex-[564]",
      aspectClass: "aspect-[564/361]",
      imageClass: "object-cover object-center",
    },
    {
      src: project.devices.mobile,
      label: "MOBILE",
      alt: "Mobile view",
      widthClass: "md:flex-[680]",
      aspectClass: "aspect-[680/361]",
      imageClass: "object-cover object-[center_45%]",
    },
    {
      src: project.devices.wireframe,
      label: "WIRE-FRAME",
      alt: "Wireframe view",
      widthClass: "md:flex-[564]",
      aspectClass: "aspect-[564/361]",
      imageClass: "object-cover object-center",
    },
  ] as const;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-white">
        <article className="mx-auto w-full max-w-[1920px] px-5 pb-10 sm:px-6 md:px-10 md:pb-16">
          <div className="mx-auto flex w-full max-w-[1840px] flex-col gap-10 pt-8 sm:gap-12 sm:pt-12 md:gap-10 md:pt-[100px]">
            {/* Title + media */}
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="flex flex-col gap-4 border border-solid border-[#1e1e1e] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5">
                <h1 className="min-w-0 font-[family-name:var(--font-vina-sans)] text-[clamp(36px,7vw,80px)] leading-none text-[#ff7340]">
                  {project.title}
                </h1>
                <a
                  href={project.liveHref}
                  className="group inline-flex h-[52px] shrink-0 items-center justify-center gap-2.5 bg-[#1e1e1e] px-4 sm:h-[60px] sm:px-4"
                >
                  <span className="font-[family-name:var(--font-vina-sans)] text-[16px] leading-none whitespace-nowrap text-[#ff7340] sm:text-[24px]">
                    Live Website
                  </span>
                  <span className="flex size-[30px] items-center justify-center overflow-hidden">
                    <span className="-scale-y-100 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/project-details/arrow-live.svg"
                        alt=""
                        width={15}
                        height={15}
                        className="max-w-none"
                      />
                    </span>
                  </span>
                </a>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between font-[family-name:var(--font-gugi)] text-[16px] text-[#1e1e1e] sm:text-[20px]">
                  <p>Desktop Preview</p>
                  <p>01 / 03</p>
                </div>

                <div className="relative aspect-[1840/900] w-full overflow-hidden bg-[#d9d9d9]">
                  <Image
                    src={project.hero}
                    alt={`${project.title} desktop preview`}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1920px) 100vw, 1840px"
                  />
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-4">
                  {devices.map((device) => (
                    <div
                      key={device.label}
                      className={`flex w-full flex-col items-center gap-4 sm:gap-6 ${device.widthClass}`}
                    >
                      <div
                        className={`relative w-full overflow-hidden bg-[#d9d9d9] ${device.aspectClass}`}
                      >
                        <Image
                          src={device.src}
                          alt={device.alt}
                          fill
                          className={device.imageClass}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <p className="w-full text-center font-[family-name:var(--font-gugi)] text-[18px] leading-none text-[#1e1e1e] sm:text-[24px]">
                        {device.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview + Design Outcome */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch">
                <div className="flex w-full flex-col gap-5 border border-solid border-[#1e1e1e] bg-white p-2.5 xl:min-w-0 xl:flex-1">
                  <h2 className="font-[family-name:var(--font-vina-sans)] text-[clamp(32px,5vw,60px)] leading-none text-[#ff7340]">
                    Project Overview
                  </h2>
                  <div className="flex flex-col gap-6 sm:gap-6">
                    <p className="font-[family-name:var(--font-gugi)] text-[15px] leading-relaxed text-pretty text-[#1e1e1e] sm:text-justify sm:text-[18px] sm:leading-[30px]">
                      {project.overview}
                    </p>
                    <div className="flex flex-col">
                      {project.meta.map((row) => (
                        <MetaRow key={row.label} {...row} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-5 border border-solid border-[#1e1e1e] bg-white p-5 xl:w-[min(918px,50%)]">
                  <h2 className="font-[family-name:var(--font-vina-sans)] text-[clamp(32px,5vw,60px)] leading-none text-[#ff7340]">
                    Design Outcome
                  </h2>
                  <div className="flex flex-col gap-4 font-[family-name:var(--font-gugi)] text-[15px] leading-relaxed text-pretty text-[#1e1e1e] sm:text-justify sm:text-[18px]">
                    {project.outcome.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenge / Approach / Solution */}
              <div className="flex flex-col gap-4 border border-solid border-[#1e1e1e] p-4 sm:p-5 lg:flex-row lg:items-stretch lg:gap-4">
                {project.pillars.map((pillar) => (
                  <NumberedCard key={pillar.index} {...pillar} accent />
                ))}
              </div>

              {/* Design Process + Decisions / Goals */}
              <div className="flex flex-col gap-4 xl:flex-row xl:items-stretch xl:gap-6">
                <div className="flex w-full flex-col gap-5 border border-solid border-[#1e1e1e] p-4 sm:gap-6 sm:p-5 xl:w-[min(898px,49%)]">
                  <h2 className="font-[family-name:var(--font-vina-sans)] text-[clamp(32px,5vw,60px)] leading-none text-[#ff7340]">
                    Design Process
                  </h2>
                  <div className="flex flex-1 flex-col gap-4">
                    {project.process.map((step) => (
                      <NumberedCard key={step.index} {...step} compact />
                    ))}
                  </div>
                </div>

                <div className="flex w-full flex-col gap-4 xl:min-w-0 xl:flex-1">
                  <div className="flex flex-col gap-5 border border-solid border-[#1e1e1e] p-4 sm:gap-6 sm:p-5">
                    <h2 className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,4vw,60px)] leading-none text-[#ff7340]">
                      Key Design Decisions
                    </h2>
                    <div className="flex flex-col gap-4">
                      {project.decisions.map((decision) => (
                        <NumberedCard
                          key={decision.index}
                          {...decision}
                          compact
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 border border-solid border-[#1e1e1e] bg-white p-2.5 sm:gap-5">
                    <h2 className="font-[family-name:var(--font-vina-sans)] text-[clamp(32px,5vw,60px)] leading-none text-[#ff7340]">
                      Project Goals
                    </h2>
                    <div className="flex flex-col gap-8 sm:gap-10">
                      <p className="font-[family-name:var(--font-gugi)] text-[15px] leading-relaxed text-pretty text-[#1e1e1e] sm:text-justify sm:text-[18px]">
                        {project.goals.summary}
                      </p>
                      <div className="flex flex-col gap-2 font-[family-name:var(--font-gugi)] text-[#1e1e1e]">
                        <p className="text-[15px] leading-none sm:text-[16px]">
                          {project.goals.objectivesTitle}
                        </p>
                        <ul className="list-disc space-y-2.5 pl-6 text-[15px] leading-relaxed sm:text-[16px]">
                          {project.goals.objectives.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project navigation */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/projects"
                className="group flex h-16 flex-1 items-center justify-center gap-2.5 bg-[#1e1e1e] px-4 sm:h-20"
              >
                <span className="flex size-8 items-center justify-center overflow-hidden">
                  <span className="-scale-y-100 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/project-details/arrow-nav.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="max-w-none"
                    />
                  </span>
                </span>
                <span className="font-[family-name:var(--font-vina-sans)] text-[20px] leading-none whitespace-nowrap text-[#f7f6f2] sm:text-[28px]">
                  BACK TO PROJECTS
                </span>
              </Link>
              <Link
                href="/projects"
                className="group flex h-16 flex-1 items-center justify-center gap-2.5 bg-[#ff7340] px-4 sm:h-20"
              >
                <span className="font-[family-name:var(--font-vina-sans)] text-[20px] leading-none whitespace-nowrap text-[#f7f6f2] sm:text-[28px]">
                  NEXT PROJECTS
                </span>
                <span className="flex size-8 items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/project-details/arrow-nav.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="max-w-none"
                  />
                </span>
              </Link>
            </div>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
