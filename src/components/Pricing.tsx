"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { Magnetic } from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const PLANS = ["Starter", "Growth", "Premium"] as const;

const MARQUEE_ITEMS = [
  { label: "PRICING", tone: "orange" as const },
  { label: "PRICING", tone: "black" as const },
  { label: "PRICING", tone: "orange" as const },
  { label: "PRICING", tone: "black" as const },
  { label: "PRICING", tone: "orange" as const },
] as const;

const CARDS = [
  {
    image: "/pricing/card-design.jpg",
    category: "01 / DESIGN",
    title: "UI/UX Design",
    description:
      "For brands and businesses looking to create intuitive, engaging, and visually impactful digital experiences.",
    price: "$200",
    features: [
      "User-focused interface design.",
      "Website or landing page UI design.",
      "Wireframing and layout structure.",
      "Responsive design considerations.",
      "Design delivery in Figma.",
    ],
    cta: "Get Design Quote",
  },
  {
    image: "/pricing/card-build.jpg",
    category: "02 / BUILD",
    title: "Development",
    description:
      "For businesses that need fast, scalable, and responsive websites built with modern technologies.",
    price: "$300",
    features: [
      "Custom website development.",
      "Responsive frontend implementation.",
      "Clean and scalable structure.",
      "Performance-focused build.",
      "Deployment-ready final delivery.",
    ],
    cta: "Get Development Quote",
  },
  {
    image: "/pricing/card-grow.jpg",
    category: "03 / GROW",
    title: "Digital Marketing",
    description:
      "For brands aiming to strengthen their online presence, reach the right audience, and grow through effective digital strategies.",
    price: "$400",
    features: [
      "Social media strategy planning.",
      "Content direction and campaign support.",
      "Basic SEO-focused recommendations.",
      "Brand visibility improvement strategy.",
      "Marketing consultation and planning.",
    ],
    cta: "Get Marketing Quote",
  },
] as const;

function MarqueeItem({
  label,
  tone,
}: {
  label: string;
  tone: "orange" | "black";
}) {
  const color = tone === "orange" ? "text-accent" : "text-foreground";
  const star =
    tone === "orange"
      ? "/pricing/star-orange.svg"
      : "/pricing/star-black.svg";

  return (
    <div className={`flex shrink-0 items-center gap-3 sm:gap-4 ${color}`}>
      <span className="relative size-[clamp(36px,8vw,100px)] shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={star}
          alt=""
          width={92}
          height={92}
          className="absolute inset-[3.89%] size-[92.22%] max-w-none"
        />
      </span>
      <span className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,8vw,100px)] leading-none whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function ArrowIcon({ variant }: { variant: "cream" | "orange" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={
        variant === "cream"
          ? "/pricing/arrow-cream.svg"
          : "/pricing/arrow-orange.svg"
      }
      alt=""
      width={24}
      height={24}
      className="size-5 max-w-none shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 sm:size-6"
    />
  );
}

export function Pricing() {
  const rootRef = useRef<HTMLElement>(null);
  const [activePlan, setActivePlan] =
    useState<(typeof PLANS)[number]>("Starter");

  useGsapContext(
    rootRef,
    () => {
      gsap.from("[data-pricing-tab]", {
        opacity: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current?.querySelector("[data-pricing-tabs]"),
          start: "top 85%",
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-pricing-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          overwrite: true,
          onComplete: () => {
            gsap.set(cards, { clearProps: "transform" });
          },
          scrollTrigger: {
            trigger: rootRef.current?.querySelector("[data-pricing-grid]"),
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.from("[data-pricing-image]", {
        clipPath: "inset(12% 12% 12% 12%)",
        scale: 1.08,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current?.querySelector("[data-pricing-grid]"),
          start: "top 78%",
        },
      });

      gsap.from("[data-pricing-price]", {
        scale: 0.85,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: rootRef.current?.querySelector("[data-pricing-grid]"),
          start: "top 70%",
        },
      });

      gsap.from("[data-custom-plan]", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: rootRef.current?.querySelector("[data-custom-plan]"),
          start: "top 88%",
          once: true,
        },
      });

      gsap.from("[data-custom-heading]", {
        x: -28,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: rootRef.current?.querySelector("[data-custom-plan]"),
          start: "top 88%",
          once: true,
        },
      });

      // Animate the Magnetic wrapper, not the CTA — avoids fighting motion transforms.
      gsap.from("[data-custom-cta-wrap]", {
        x: 28,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: rootRef.current?.querySelector("[data-custom-plan]"),
          start: "top 88%",
          once: true,
        },
      });
    },
    [],
  );

  return (
    <section
      ref={rootRef}
      id="pricing"
      className="relative w-full overflow-hidden bg-background"
      aria-label="Pricing"
    >
      <div className="mx-auto w-full max-w-[1920px] pt-12 pb-8 sm:pt-16 md:pt-[100px] md:pb-10">
        <div className="mb-6 flex w-full gap-6 overflow-hidden sm:mb-10 sm:gap-10">
          <div className="pricing-marquee flex w-max gap-6 sm:gap-10">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
              <MarqueeItem key={`${item.tone}-${index}`} {...item} />
            ))}
          </div>
        </div>

        <div className="mx-4 flex flex-col items-center gap-6 sm:mx-6 sm:gap-8 md:mx-10 md:gap-10">
          <div
            data-pricing-tabs
            className="flex w-full max-w-[848px] flex-col gap-2 sm:flex-row sm:gap-4"
          >
            {PLANS.map((plan) => {
              const active = plan === activePlan;
              return (
                <button
                  key={plan}
                  type="button"
                  data-pricing-tab
                  onClick={() => setActivePlan(plan)}
                  className={`group flex flex-1 items-center justify-between px-3 py-2.5 transition-colors sm:px-4 ${
                    active
                      ? "bg-accent text-cream"
                      : "bg-strong text-cream"
                  }`}
                  aria-pressed={active}
                >
                  <span className="font-[family-name:var(--font-gugi)] text-[16px] leading-none whitespace-nowrap sm:text-[20px]">
                    {plan}
                  </span>
                  <ArrowIcon variant="cream" />
                </button>
              );
            })}
          </div>

          <div className="flex w-full flex-col gap-4">
            <div
              data-pricing-grid
              className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {CARDS.map((card) => (
                <article
                  key={card.title}
                  data-pricing-card
                  data-cursor="expand"
                  className="group border border-solid border-ink bg-background p-2.5 transition-[border-color,box-shadow] duration-400 ease-out hover:border-accent hover:shadow-[0_12px_30px_rgba(30,30,30,0.08)]"
                >
                  <div className="flex flex-col gap-4 transition-transform duration-400 ease-out group-hover:-translate-y-1">
                  <div
                    data-pricing-image
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#d9d9d9] sm:h-[280px] sm:aspect-auto lg:h-[350px]"
                  >
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 603px"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex flex-col gap-2.5">
                      <p className="font-[family-name:var(--font-gugi)] text-[13px] leading-normal text-ink sm:text-[14px]">
                        {card.category}
                      </p>
                      <div className="h-px w-full bg-strong/80" />
                    </div>
                    <h3 className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,5vw,48px)] leading-none text-ink">
                      {card.title}
                    </h3>
                    <p className="font-[family-name:var(--font-gugi)] text-[14px] leading-relaxed text-pretty text-ink sm:text-justify sm:text-[16px] sm:leading-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-[family-name:var(--font-gugi)] text-[16px] leading-normal text-ink sm:text-[20px]">
                          {activePlan}
                        </p>
                        <p
                          data-pricing-price
                          className="origin-right font-[family-name:var(--font-vina-sans)] text-[32px] leading-none text-accent-text sm:text-[40px]"
                        >
                          {card.price}
                        </p>
                      </div>
                      <ul className="list-disc space-y-0 pl-5 font-[family-name:var(--font-gugi)] text-[13px] leading-7 text-pretty text-ink sm:pl-[21px] sm:text-justify sm:text-[14px] sm:leading-[30px]">
                        {card.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <Magnetic>
                      <a
                        href="/contact"
                        className="group flex w-full items-center justify-between gap-3 bg-accent p-3 text-cream sm:p-4"
                      >
                        <span className="font-[family-name:var(--font-vina-sans)] text-[16px] leading-none transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[20px]">
                          {card.cta}
                        </span>
                        <ArrowIcon variant="cream" />
                      </a>
                    </Magnetic>
                  </div>
                  </div>
                </article>
              ))}
            </div>

            <div
              data-custom-plan
              className="relative z-10 flex w-full flex-col items-start justify-between gap-5 overflow-hidden bg-strong p-4 sm:gap-6 sm:p-5 md:flex-row md:items-center"
            >
              <div className="flex min-w-0 max-w-[656px] flex-1 flex-col gap-3 sm:gap-4">
                <p
                  data-custom-heading
                  className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,6vw,48px)] leading-none text-accent"
                >
                  Need Custom Plan?
                </p>
                <p className="font-[family-name:var(--font-gugi)] text-[14px] leading-relaxed text-pretty text-cream sm:text-justify sm:text-[16px] sm:leading-normal">
                  Perfect for businesses with unique requirements, offering
                  tailored creative solutions designed to bring ambitious ideas
                  to life.
                </p>
              </div>
              <div data-custom-cta-wrap className="w-full shrink-0 md:w-auto">
                <Magnetic className="w-full">
                  <a
                    href="/contact"
                    data-custom-cta
                    className="group flex w-full items-center justify-between bg-panel p-3 text-ink sm:p-4 md:w-[240px] md:max-w-[240px]"
                  >
                    <span className="font-[family-name:var(--font-vina-sans)] text-[16px] leading-none whitespace-nowrap text-accent transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[20px]">
                      Contact Me
                    </span>
                    <ArrowIcon variant="orange" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
